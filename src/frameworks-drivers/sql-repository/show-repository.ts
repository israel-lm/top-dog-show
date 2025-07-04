import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import { CreateShowResponseData } from "../../models/show-models";
import { Show } from "../db-models/show";
import { buildErrorReponseData, getUuid } from "../../commons";
import { dataManager } from "./data-source";
import { Location } from "../db-models/location";
import { ShowUser } from "../db-models/user";
import { ErrorCode } from "../../constants";

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
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }

  async delete(request: RequestModel): Promise<ResponseData> {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }

  instantiateShow(request: RequestModel): Show {
    const showData = request.showData;

    const location = new Location();
    location.street = showData.street;
    location.city = showData.city;
    location.zipCode = showData.zipCode;
    location.id = getUuid([location.street, location.city, location.zipCode]);

    const show = new Show();
    show.startDate = showData.startDate;
    show.endDate = showData.endDate;
    show.location = location;
    show.id = getUuid([
      location.id,
      showData.hostId,
      show.startDate,
      show.endDate
    ]);

    return show;
  }
}
