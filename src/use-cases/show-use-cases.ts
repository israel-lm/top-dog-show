import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { buildResponseModel } from "../commons";

export class CreateShowUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.create(requestModel);
    return buildResponseModel(responseData);
  }
}

export class UpdateShowUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class DeleteShowUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class GetShowUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class ListShowsUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class RegisterDogUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}
