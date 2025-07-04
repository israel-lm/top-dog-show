import bcrypt from "bcrypt";

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

import { ErrorCode, UserRole } from "../../constants";
import { ShowUser } from "../db-models/user";
import { dataManager } from "./data-source";
import { buildErrorReponseData, getUuid } from "../../commons";

export class UserRepository implements IRepository {
  async create(request: RequestModel): Promise<ResponseData> {
    const userData = request.userData;
    const user = new ShowUser();

    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.id = getUuid([user.firstName, user.lastName]);
    user.role = userData.role;
    user.email = userData.email;
    const salt = await bcrypt.genSalt();
    try {
      console.log("hash input");
      console.log(salt);
      console.log(userData.password);
      user.password = await bcrypt.hash(userData.password, salt);
    } catch (err) {
      console.log("hash error");
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to hash password"
      );
    }

    try {
      await dataManager.insert(ShowUser, user);
    } catch (err) {
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to create user"
      );
    }

    return new CreateUserResponseData(user.id);
  }

  async read(request: RequestModel): Promise<ResponseData> {
    if (request instanceof GetUserRequestModel) {
      let user;
      try {
        user = await dataManager.findOneBy(ShowUser, { id: request.userId });
        if (!user) {
          return buildErrorReponseData(ErrorCode.NotFoundErr, "User not found");
        }
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to get user information"
        );
      }
      return new GetUserResponseData({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        userId: user.id
      });
    } else {
      const listData = request.listData;
      let users;
      try {
        users = await dataManager
          .createQueryBuilder(ShowUser, "showUser")
          .limit(listData.limit)
          .offset(listData.offset)
          .getMany();
      } catch (err) {
        console.error(err);
        return buildErrorReponseData(
          ErrorCode.UnknownErr,
          "Failed to get user information"
        );
      }

      let count = 0;
      let userDataList = [];
      for (const user of users) {
        console.log(user);
        count++;
        const userData = new UserData({
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email,
          userId: user.id
        });
        userDataList.push(userData);
      }
      return new ListUsersResponseData(userDataList, count);
    }
  }

  async update(request: RequestModel): Promise<ResponseData> {
    let user;
    const userId = request.userData.userId;
    try {
      user = await dataManager.findOneBy(ShowUser, { id: userId });
      if (!user) {
        return buildErrorReponseData(ErrorCode.NotFoundErr, "User not found");
      }
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to retrieve user information"
      );
    }
    const newUser = this.instantiateUser(request);
    if (
      user.firstName !== newUser.firstName ||
      user.lastName !== newUser.lastName
    ) {
      const firstName = newUser.firstName || user.firstName;
      const lastName = newUser.lastName || user.lastName;
      newUser.id = getUuid([firstName, lastName]);
    }
    try {
      await dataManager.update(ShowUser, { id: userId }, newUser);
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to update user information"
      );
    }
    return new UpdateUserResponseData(newUser.id);
  }

  async delete(request: RequestModel): Promise<ResponseData> {
    try {
      const result = await dataManager.delete(ShowUser, request.userId);
      if (result.affected == 0) {
        return buildErrorReponseData(ErrorCode.NotFoundErr, "User not found");
      }
    } catch (err) {
      console.error(err);
      return buildErrorReponseData(
        ErrorCode.UnknownErr,
        "Failed to delete user information"
      );
    }
    return null;
  }

  instantiateUser(request: RequestModel): ShowUser {
    const user = new ShowUser();
    const data = request.userData;
    user.firstName = data?.firstName;
    user.lastName = data?.lastName;
    user.role = data?.role;
    user.email = data?.email;
    user.password = data?.password;
    return user;
  }
}
