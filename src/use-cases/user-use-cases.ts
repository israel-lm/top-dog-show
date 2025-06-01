import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";

export class CreateUserUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    let responseData = null;
    try {
      responseData = await repository.create(requestModel);
      if (responseData) {
        return new ResponseModel("success", responseData);
      } else {
        return new ResponseModel("error", "Failed to create user");
      }
    } catch (err) {
      return new ResponseModel("error", "Failed to create user");
    }
  }
}

export class UpdateUserUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    let responseData = null;
    try {
      responseData = await repository.update(requestModel);
      if (responseData) {
        return new ResponseModel("success", responseData);
      } else {
        return new ResponseModel("error", "Failed to update user");
      }
    } catch (err) {
      return new ResponseModel("error", "Failed to create user");
    }
  }
}

export class DeleteUserUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    let responseData = null;
    try {
      responseData = await repository.delete(requestModel);
      if (responseData) {
        return new ResponseModel("success", responseData);
      } else {
        return new ResponseModel("error", "Failed to delete user");
      }
    } catch (err) {
      return new ResponseModel("error", "Failed to delete user");
    }
  }
}

export class GetUserUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    let responseData = null;
    try {
      responseData = await repository.read(requestModel);
      if (responseData) {
        return new ResponseModel("success", responseData);
      } else {
        return new ResponseModel("error", "Failed to get user");
      }
    } catch (err) {
      return new ResponseModel("error", "Failed to get user");
    }
  }
}

export class ListUsersUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    let responseData = null;
    try {
      responseData = await repository.read(requestModel);
      if (responseData) {
        return new ResponseModel("success", responseData);
      } else {
        return new ResponseModel("error", "Failed to list users");
      }
    } catch (err) {
      return new ResponseModel("error", "Failed to list users");
    }
  }
}
