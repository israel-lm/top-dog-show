import { IFrameworkAdapter } from "../framework-adapter-interface";
import { UseCases } from "../../constants";
import { ErrorCode } from "../../constants";

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
  ListCompetitorsController,
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
import { DogRepository } from "../sql-repository/dog-repository";
import {
  CreateUserRequestModel,
  DeleteUserRequestModel,
  GetUserRequestModel,
  ListUsersRequestModel,
  UpdateUserRequestModel,
  UserData
} from "../../models/user-models";
import { UserRepository } from "../sql-repository/user-repository";
import {
  CreateShowRequestModel,
  DeleteShowRequestModel,
  GetShowRequestModel,
  ListCompetitorsRequestModel,
  ListShowsRequestModel,
  RegisterDogRequestModel,
  ShowData,
  UpdateShowRequestModel
} from "../../models/show-models";
import { ShowRepository } from "../sql-repository/show-repository";

function getInvalidDataObject() {
  return {
    status: "Fail",
    data: { errCode: ErrorCode.ValidationErr, errMsg: "Invalid data" }
  };
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

function instantiateShowData(request: any): ShowData | any {
  try {
    return new ShowData(request);
  } catch (err) {
    console.log(err);
    return getInvalidDataObject();
  }
}

export class ExpressAdapter implements IFrameworkAdapter {
  private static instance: ExpressAdapter;

  private constructor() {}

  public static getInstance(): ExpressAdapter {
    if (!ExpressAdapter.instance) {
      ExpressAdapter.instance = new ExpressAdapter();
    }
    return ExpressAdapter.instance;
  }
  async execute(useCaseId: UseCases, requestData: any): Promise<any> {
    let controller;
    let requestModel;
    let repository;
    let listData;
    let dogData;
    let userData;
    let showData;

    switch (useCaseId) {
      case UseCases.CreateDog:
        dogData = instantiateDogData(requestData);
        if (dogData.data?.errCode) {
          return dogData;
        } else {
          requestModel = new CreateDogRequestModel(dogData);
          controller = new CreateDogController();
          repository = new DogRepository();
        }
        break;
      case UseCases.UpdateDog:
        dogData = instantiateDogData(requestData);
        if (dogData.data?.errCode) {
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
          return getInvalidDataObject();
        }
        break;
      case UseCases.GetDog:
        try {
          requestModel = new GetDogRequestModel(requestData.dogId);
          controller = new GetDogController();
          repository = new DogRepository();
        } catch {
          return getInvalidDataObject();
        }
        break;
      case UseCases.ListDogs:
        listData = instantiateListData(requestData);
        if (listData.data?.errCode) {
          return listData;
        } else {
          requestModel = new ListDogsRequestModel(listData);
          controller = new ListDogsController();
          repository = new DogRepository();
        }
        break;
      case UseCases.CreateShow:
        showData = instantiateShowData(requestData);
        if (showData.data?.errCode) {
          return showData;
        } else {
          requestModel = new CreateShowRequestModel(showData);
          controller = new CreateShowController();
          repository = new ShowRepository();
        }
        break;
      case UseCases.UpdateShow:
        showData = instantiateShowData(requestData);
        if (showData.data?.errCode) {
          return showData;
        } else {
          requestModel = new UpdateShowRequestModel(showData);
          controller = new UpdateShowController();
          repository = new ShowRepository();
        }
        break;
      case UseCases.DeleteShow:
        try {
          requestModel = new DeleteShowRequestModel(requestData.showId);
          controller = new DeleteShowController();
          repository = new ShowRepository();
        } catch (err) {
          return getInvalidDataObject();
        }
        break;
      case UseCases.GetShow:
        try {
          requestModel = new GetShowRequestModel(requestData.showId);
          controller = new GetShowController();
          repository = new ShowRepository();
        } catch (err) {
          return getInvalidDataObject();
        }
        break;
      case UseCases.ListShows:
        listData = instantiateListData(requestData);
        if (listData.data?.errCode) {
          return listData;
        } else {
          requestModel = new ListShowsRequestModel(listData);
          controller = new ListShowsController();
          repository = new ShowRepository();
        }
        break;
      case UseCases.RegisterDog:
        try {
          requestModel = new RegisterDogRequestModel(requestData);
          controller = new RegisterDogController();
          repository = new ShowRepository();
        } catch (err) {
          return getInvalidDataObject();
        }
        break;

      case UseCases.ListCompetitors:
        try {
          requestModel = new ListCompetitorsRequestModel(requestData.showId);
          controller = new ListCompetitorsController();
          repository = new ShowRepository();
        } catch (err) {
          return getInvalidDataObject();
        }
        break;
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
        userData = instantiateUserData(requestData);
        if (userData.data?.errCode) {
          return userData;
        } else {
          requestModel = new CreateUserRequestModel(userData);
          controller = new CreateUserController();
          repository = new UserRepository();
        }
        break;
      case UseCases.UpdateUser:
        userData = instantiateUserData(requestData);
        if (userData.data?.errCode) {
          return userData;
        } else {
          requestModel = new UpdateUserRequestModel(userData);
          controller = new UpdateDogController();
          repository = new UserRepository();
        }
        break;
      case UseCases.DeleteUser:
        try {
          requestModel = new DeleteUserRequestModel(requestData.userId);
          controller = new DeleteUserController();
          repository = new UserRepository();
        } catch (err) {
          return getInvalidDataObject();
        }
        break;
      case UseCases.GetUser:
        try {
          requestModel = new GetUserRequestModel(requestData.userId);
          controller = new GetUserController();
          repository = new UserRepository();
        } catch (err) {
          return getInvalidDataObject();
        }
        break;
      case UseCases.ListUsers:
        listData = instantiateListData(requestData);
        if (listData.data?.errCode) {
          return listData;
        } else {
          requestModel = new ListUsersRequestModel(listData);
          controller = new ListUsersController();
          repository = new UserRepository();
        }
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
        return {
          status: "fail",
          data: { errCode: ErrorCode.InvalidRequestErr, errMsg: "Bad request" }
        };
    }

    return await controller?.execute(requestModel, repository);
  }
}
