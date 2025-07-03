import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { buildResponseModel } from "../commons";

export class CreateUserUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.create(requestModel);
    return buildResponseModel(responseData);
  }
}

export class UpdateUserUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.update(requestModel);
    return buildResponseModel(responseData);
  }
}

export class DeleteUserUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.delete(requestModel);
    return buildResponseModel(responseData);
  }
}

export class GetUserUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return buildResponseModel(responseData);
  }
}

export class ListUsersUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return buildResponseModel(responseData);
  }
}
