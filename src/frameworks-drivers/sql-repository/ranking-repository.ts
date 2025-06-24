import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import { RegisterResultsResponseData } from "../../models/ranking-models";

export class RankingRepository implements IRepository {
  create(input: RequestModel): ResponseData {
    return new RegisterResultsResponseData("asdfasfkjasfasfasjfas");
  }

  read(input: RequestModel): ResponseData {
    return new RegisterResultsResponseData("asdfasfkjasfasfasjfas");
  }

  update(input: RequestModel): ResponseData {
    return new RegisterResultsResponseData("asdfasfkjasfasfasjfas");
  }

  delete(input: RequestModel): ResponseData {
    return new RegisterResultsResponseData("asdfasfkjasfasfasjfas");
  }
}
