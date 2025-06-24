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

import { UserRole } from "../../models/constants";

export class UserRepository implements IRepository {
  create(input: RequestModel): ResponseData {
    return new CreateUserResponseData("asdfasfkjasfasfasjfas");
  }

  read(input: RequestModel): ResponseData {
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

  update(input: RequestModel): ResponseData {
    return new UpdateUserResponseData("asdfasfkjasfasfasjfas");
  }

  delete(input: RequestModel): ResponseData {
    return null;
  }
}
