import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import {
  CreateShowResponseData,
  UpdateShowResponseData
} from "../../models/show-models";
import { Show } from "../db-models/show";
import { buildErrorReponseData, getUuid } from "../../commons";
import { dataManager } from "./data-source";
import { Location } from "../db-models/location";
import { Showshow } from "../db-models/show";
import { ErrorCode } from "../../constants";
import { ShowUser } from "../db-models/user";

export class ShowRepository implements IRepository {
  async create(request: RequestModel): Promise<ResponseData> {
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
  }

  async read(request: RequestModel): Promise<ResponseData> {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
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
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
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
