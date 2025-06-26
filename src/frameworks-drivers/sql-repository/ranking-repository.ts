import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import { RegisterResultsResponseData } from "../../models/ranking-models";

export class RankingRepository implements IRepository {
  async create(input: RequestModel): Promise<ResponseData> {
    return new RegisterResultsResponseData("asdfasfkjasfasfasjfas");
  }

  async read(input: RequestModel): Promise<ResponseData> {
    return new RegisterResultsResponseData("asdfasfkjasfasfasjfas");
  }

  async update(input: RequestModel): Promise<ResponseData> {
    return new RegisterResultsResponseData("asdfasfkjasfasfasjfas");
  }

  async delete(input: RequestModel): Promise<ResponseData> {
    return new RegisterResultsResponseData("asdfasfkjasfasfasjfas");
  }
}
