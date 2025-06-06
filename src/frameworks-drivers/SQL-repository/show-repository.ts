import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import { CreateShowResponseData } from "../../models/show-models";

export class ShowRepository implements IRepository {
  create(input: RequestModel): ResponseData {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }

  read(input: RequestModel): ResponseData {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }

  update(input: RequestModel): ResponseData {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }

  delete(input: RequestModel): ResponseData {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }
}
