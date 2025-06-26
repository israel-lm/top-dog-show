import { IRepository } from "../../use-cases/repository-interface";
import { RequestModel, ResponseData } from "../../models/base-models";
import {
  CreateUserResponseData,
  GetUserRequestModel,
  GetUserResponseData,
  ListUsersResponseData,
  UpdateUserResponseData,
  UserData
} from "../../models/user-models";

import { UserRole } from "../../constants";

export class UserRepository implements IRepository {
  async create(input: RequestModel): Promise<ResponseData> {
    return new CreateUserResponseData("asdfasfkjasfasfasjfas");
  }

  async read(input: RequestModel): Promise<ResponseData> {
    const userData = new UserData({
      firstName: "Israel",
      lastName: "Marinho",
      role: UserRole.Admin,
      password: "sfsfgsdgsdg",
      email: "asdfas@gmail.com",
      userId: "asfqasfasf"
    });
    if (input instanceof GetUserRequestModel) {
      return new GetUserResponseData(userData);
    } else {
      return new ListUsersResponseData([userData], 1);
    }
  }

  async update(input: RequestModel): Promise<ResponseData> {
    return new UpdateUserResponseData("asdfasfkjasfasfasjfas");
  }

  async delete(input: RequestModel): Promise<ResponseData> {
    return null;
  }
}
