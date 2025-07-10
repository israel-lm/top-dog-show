import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import {
  CreateShowRequestModel,
  CreateShowResponseData,
  DeleteShowRequestModel,
  GetShowRequestModel,
  GetShowResponseData,
  ListCompetitorsRequestModel,
  ListCompetitorsResponseData,
  ListShowsRequestModel,
  ListShowsResponseData,
  RegisterDogRequestModel,
  ShowData,
  UpdateShowResponseData
} from "../../models/show-models";
import { Show } from "../db-models/show";
import { buildErrorReponseData, getUuid } from "../../commons";
import { dataManager } from "./data-source";
import { Location } from "../db-models/location";
import { ErrorCode } from "../../constants";
import { ShowUser } from "../db-models/user";
import { Dog } from "../db-models/dog";
import { Participation } from "../db-models/participation";
import { DogData } from "../../models/dog-models";

export class ShowRepository implements IRepository {
  async create(request: RequestModel): Promise<ResponseData> {
    if (request instanceof CreateShowRequestModel) {
      let show;
      try {
        const user = await dataManager.findOneBy(ShowUser, {
          id: request.showData.hostId
        });
        if (!user) {
          return buildErrorReponseData(
            ErrorCode.NotFoundErr,
            "Host is not registered"
          );
        }
        show = this.instantiateShow(request);
        show.host = user;
        await dataManager.upsert(Location, show.location, {
          conflictPaths: ["id"],
          skipUpdateIfNoValuesChanged: true
        });
        await dataManager.insert(Show, show);
      } catch (err) {
        console.error(`Create show failed: ${err.driverError}`);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to create show"
        );
      }
      return new CreateShowResponseData(show?.id);
    } else if (request instanceof RegisterDogRequestModel) {
      let dog = undefined;
      let show = undefined;

      try {
        dog = await dataManager.findOneBy(Dog, { id: request.dogId });
        if (!dog) {
          return buildErrorReponseData(ErrorCode.NotFoundErr, "Dog not found");
        }
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to get dog information"
        );
      }

      try {
        show = await dataManager.findOneBy(Show, { id: request.showId });
        if (!show) {
          return buildErrorReponseData(ErrorCode.NotFoundErr, "Show not found");
        }
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to get show information"
        );
      }

      const participation = new Participation();
      participation.dog = dog;
      participation.show = show;
      participation.id = getUuid([dog.id, show.id]);

      try {
        await dataManager.insert(Participation, participation);
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to register dog"
        );
      }

      return undefined;
    }
  }

  async read(request: RequestModel): Promise<ResponseData> {
    if (request instanceof GetShowRequestModel) {
      return this.getShow(request);
    } else if (request instanceof ListShowsRequestModel) {
      return this.listShows(request);
    } else if (request instanceof ListCompetitorsRequestModel) {
      return this.listCompetitors(request);
    }
  }

  async update(request: RequestModel): Promise<ResponseData> {
    let show;
    const showData = request.showData;
    const showId = showData.showId;

    try {
      // Check whether the show exists
      show = await dataManager.findOne(Show, {
        where: { id: showId },
        relations: { location: true, host: true }
      });
      if (!show) {
        return buildErrorReponseData(ErrorCode.NotFoundErr, "Show not found");
      }
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to retrieve show information"
      );
    }

    // Try to update location, if needed
    const newLocation = await this.updateLocation(request, show.location);
    if (!newLocation) {
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to update show information"
      );
    }

    let newHost = undefined;
    // Check whether host must be updated
    if (showData?.hostId !== show.host.id) {
      try {
        newHost = await dataManager.findOneBy(ShowUser, {
          id: showData.hostId
        });
        if (!newHost) {
          return buildErrorReponseData(
            ErrorCode.NotFoundErr,
            "New host not found"
          );
        }
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to update show information"
        );
      }
    }

    const newShow = new Show();
    newShow.location = newLocation;
    newShow.host = newHost;
    newShow.startDate = showData?.startDate || show.startDate;
    newShow.endDate = showData?.endDate || show.endDate;

    newShow.id = getUuid([
      newLocation?.id || show.location.id,
      newHost?.id || show.host.id,
      newShow.startDate.toISOString(),
      newShow.endDate.toISOString()
    ]);

    try {
      // Finally, update the show
      await dataManager.update(Show, { id: showId }, newShow);
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to update show information"
      );
    }

    return new UpdateShowResponseData(newShow.id);
  }

  async delete(request: RequestModel): Promise<ResponseData> {
    if (request instanceof DeleteShowRequestModel) {
      try {
        const result = await dataManager.delete(Show, request.showId);
        if (result.affected == 0) {
          return buildErrorReponseData(ErrorCode.NotFoundErr, "Show not found");
        }
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to delete show information"
        );
      }
    } else if (request instanceof RegisterDogRequestModel) {
      try {
        const id = getUuid([request.dogId, request.showId]);
        const result = await dataManager.delete(Participation, id);
        if (result.affected == 0) {
          return buildErrorReponseData(
            ErrorCode.NotFoundErr,
            "Registration not found"
          );
        }
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to delete registration"
        );
      }
    }

    return null;
  }

  private async listCompetitors(request: RequestModel): Promise<ResponseData> {
    const showId = request.showId;
    let registrations;

    try {
      registrations = await dataManager
        .createQueryBuilder(Participation, "participation")
        .where("show_id = :id", { id: showId })
        .innerJoinAndSelect("participation.dog", "dog")
        .innerJoinAndSelect("dog.owner", "owner")
        .getMany();
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to get dogs information"
      );
    }

    let dogList = [];
    let count = 0;
    for (const registration of registrations) {
      const dog = registration.dog;
      count++;
      const dogData = new DogData({
        dogName: dog.name,
        dogId: dog.id,
        ownerFirstName: dog.owner.firstName,
        ownerLastName: dog.owner.lastName,
        gender: dog.gender,
        weight: dog.weight,
        ageInMonths: dog.ageInMonths
      });
      dogList.push(dogData);
    }

    return new ListCompetitorsResponseData(dogList, count);
  }

  private async getShow(request: RequestModel): Promise<ResponseData> {
    let show;
    try {
      show = await dataManager.findOne(Show, {
        where: { id: request.showId },
        relations: { location: true, host: true }
      });
      if (!show) {
        return buildErrorReponseData(ErrorCode.NotFoundErr, "Show not found");
      }
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to get show information"
      );
    }
    const showData = new ShowData({
      showId: show.id,
      hostId: show.host.id,
      street: show.location.street,
      city: show.location.city,
      zipCode: show.location.zipCode,
      startDate: show.startDate.toISOString(),
      endDate: show.endDate.toISOString()
    });
    return new GetShowResponseData(showData);
  }

  private async listShows(request: RequestModel): Promise<ResponseData> {
    const listData = request.listData;
    let shows;
    try {
      shows = await dataManager
        .createQueryBuilder(Show, "show")
        .innerJoinAndSelect("show.location", "location")
        .innerJoinAndSelect("show.host", "host")
        .limit(listData.limit)
        .offset(listData.offset)
        .getMany();
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to get show information"
      );
    }

    let count = 0;
    let showDataList = [];
    for (const show of shows) {
      console.log(show);
      count++;
      const showData = new ShowData({
        showId: show.id,
        hostId: show.host.id,
        street: show.location.street,
        city: show.location.city,
        zipCode: show.location.zipCode,
        startDate: show.startDate.toISOString(),
        endDate: show.endDate.toISOString()
      });
      showDataList.push(showData);
    }
    return new ListShowsResponseData(showDataList, count);
  }

  private async updateLocation(
    request: RequestModel,
    currentLocation: Location
  ): Promise<Location | undefined> {
    let newLocation = undefined;
    const showData = request.showData;
    const street = showData?.street || currentLocation.street;
    const city = showData?.city || currentLocation.city;
    const zipCode = showData?.zipCode || currentLocation.zipCode;
    const newLocationId = getUuid([street, city, zipCode]);

    if (newLocationId !== currentLocation.id) {
      newLocation = new Location();
      newLocation.id = newLocationId;
      newLocation.city = city;
      newLocation.street = street;
      newLocation.zipCode = zipCode;
      try {
        await dataManager.upsert(Location, newLocation, {
          conflictPaths: ["id"],
          skipUpdateIfNoValuesChanged: true
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      newLocation = currentLocation;
    }
    return newLocation;
  }

  private instantiateShow(request: RequestModel): Show {
    const showData = request.showData;

    const location = new Location();
    location.street = showData?.street;
    location.city = showData?.city;
    location.zipCode = showData?.zipCode;
    location.id = getUuid([location.street, location.city, location.zipCode]);

    const show = new Show();
    show.startDate = showData?.startDate;
    show.endDate = showData?.endDate;
    show.location = location;
    show.id = getUuid([
      location.id,
      showData?.hostId,
      show.startDate,
      show.endDate
    ]);

    return show;
  }
}
