import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import { CreateShowResponseData } from "../../models/show-models";

export class ShowRepository implements IRepository {
  async create(input: RequestModel): Promise<ResponseData> {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }

  async read(input: RequestModel): Promise<ResponseData> {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }

  async update(input: RequestModel): Promise<ResponseData> {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }

  async delete(input: RequestModel): Promise<ResponseData> {
    return new CreateShowResponseData("asdfasfkjasfasfasjfas");
  }
}
