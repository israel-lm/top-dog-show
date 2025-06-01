import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import { CreateUserResponseData } from "../../models/user-models";

export class UserRepository implements IRepository {
  create(input: RequestModel): ResponseData {
    return new CreateUserResponseData("asdfasfkjasfasfasjfas");
  }

  read(input: RequestModel): ResponseData {
    return new CreateUserResponseData("asdfasfkjasfasfasjfas");
  }

  update(input: RequestModel): ResponseData {
    return new CreateUserResponseData("asdfasfkjasfasfasjfas");
  }

  delete(input: RequestModel): ResponseData {
    return new CreateUserResponseData("asdfasfkjasfasfasjfas");
  }
}
