import { IFrameworkAdapter } from "../framework-adapter-interface";
import { UseCases } from "../../models/constants";
import { ErrorCode } from "../../models/constants";

import {
  CreateDogController,
  DeleteDogController,
  GetDogController,
  ListDogsController,
  UpdateDogController
} from "../../controllers/dog-controller";

import {
  CreateShowController,
  DeleteShowController,
  GetShowController,
  ListShowsController,
  RegisterDogController,
  UpdateShowController
} from "../../controllers/show-controller";

import {
  CreateUserController,
  DeleteUserController,
  GetUserController,
  ListUsersController,
  UpdateUserController
} from "../../controllers/user-controller";

import {
  LoginController,
  ForgotPasswordController,
  LogoutController,
  RefreshTokenController
} from "../../controllers/auth-controller";

import {
  CreateDogRequestModel,
  DogData,
  DeleteDogRequestModel,
  GetDogRequestModel,
  ListDogsRequestModel,
  UpdateDogRequestModel
} from "../../models/dog-models";

import { ListRequestData } from "../../models/base-models";
import { DogRepository } from "../SQL-repository/dog-repository";
import { UserData } from "../../models/user-models";

function getInvalidDataObject() {
  return { errCode: ErrorCode.ValidationErr, errMsg: "Invalid data" };
}

function instantiateDogData(request: any): DogData | any {
  try {
    return new DogData(request);
  } catch (err) {
    console.error(err);
    return getInvalidDataObject();
  }
}

function instantiateListData(request: any): ListRequestData | any {
  try {
    const data = {
      limit: parseInt(request.limit),
      offset: parseInt(request.offset)
    };
    return new ListRequestData(data);
  } catch (err) {
    console.error(err);
    return getInvalidDataObject();
  }
}

function instantiateUserData(request: any): UserData | any {
  try {
    return new UserData(request);
  } catch (err) {
    console.log(err);
    return getInvalidDataObject();
  }
}

export class ExpressAdapter implements IFrameworkAdapter {
  async execute(useCaseId: UseCases, requestData: any): Promise<any> {
    let controller;
    let requestModel;
    let repository;
    let dogData;
    let listData;

    switch (useCaseId) {
      case UseCases.CreateDog:
        dogData = instantiateDogData(requestData);
        if (dogData.errCode !== undefined) {
          return dogData;
        } else {
          requestModel = new CreateDogRequestModel(dogData);
          controller = new CreateDogController();
          repository = new DogRepository();
        }
        break;
      case UseCases.UpdateDog:
        dogData = instantiateDogData(requestData);
        if (dogData.errCode !== undefined) {
          return dogData;
        } else {
          requestModel = new UpdateDogRequestModel(dogData);
          controller = new UpdateDogController();
          repository = new DogRepository();
        }
        break;
      case UseCases.DeleteDog:
        try {
          requestModel = new DeleteDogRequestModel(requestData.dogId);
          controller = new DeleteDogController();
          repository = new DogRepository();
        } catch (err) {
          return { errCode: ErrorCode.ValidationErr, errMsg: "Invalid data" };
        }
        break;
      case UseCases.GetDog:
        try {
          requestModel = new GetDogRequestModel(requestData.dogId);
          controller = new GetDogController();
          repository = new DogRepository();
        } catch {
          return { errCode: ErrorCode.ValidationErr, errMsg: "Invalid data" };
        }
        break;
      case UseCases.ListDogs:
        listData = instantiateListData(requestData);
        if (listData.errCode !== undefined) {
          return listData;
        } else {
          requestModel = new ListDogsRequestModel(listData);
          controller = new ListDogsController();
          repository = new DogRepository();
        }
        break;
      //   case UseCases.CreateShow:
      //     break;
      //   case UseCases.UpdateShow:
      //     break;
      //   case UseCases.DeleteShow:
      //     break;
      //   case UseCases.GetShow:
      //     break;
      //   case UseCases.ListShows:
      //     break;
      //   case UseCases.RegisterDog:
      //     break;
      //   case UseCases.RegisterResults:
      //     break;
      //   case UseCases.UpdateResults:
      //     break;
      //   case UseCases.DeleteResults:
      //     break;
      //   case UseCases.GetResults:
      //     break;
      //   case UseCases.GetRanking:
      //     break;
      case UseCases.CreateUser:
        const userData = instantiateUserData(requestData);
        if (userData.errCode !== undefined) {
          return userData;
        } else {
        }
        break;
      case UseCases.UpdateUser:
        break;
      case UseCases.DeleteUser:
        break;
      case UseCases.GetUser:
        break;
      case UseCases.ListUsers:
        break;
      //   case UseCases.Login:
      //     break;
      //   case UseCases.Logout:
      //     break;
      //   case UseCases.ForgotPassword:
      //     break;
      //   case UseCases.RefreshToken:
      //     break;
      default:
        return { errCode: ErrorCode.InvalidRequestErr, errMsg: "Bad request" };
    }

    return await controller?.execute(requestModel, repository);
    //return JSON.stringify(responseModel);
  }
}
