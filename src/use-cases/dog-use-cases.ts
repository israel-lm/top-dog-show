import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { buildResponseModel } from "../commons";

export class CreateDogUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.create(requestModel);
    return buildResponseModel(responseData);
  }
}

export class UpdateDogUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.update(requestModel);
    return buildResponseModel(responseData);
  }
}

export class DeleteDogUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.delete(requestModel);
    return buildResponseModel(responseData);
  }
}

export class GetDogUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return buildResponseModel(responseData);
  }
}

export class ListDogsUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return buildResponseModel(responseData);
  }
}
