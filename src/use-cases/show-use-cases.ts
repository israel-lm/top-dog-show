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
    const responseData = await repository.update(requestModel);
    return buildResponseModel(responseData);
  }
}

export class DeleteShowUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.delete(requestModel);
    return buildResponseModel(responseData);
  }
}

export class GetShowUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return buildResponseModel(responseData);
  }
}

export class ListShowsUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return buildResponseModel(responseData);
  }
}

export class RegisterDogUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    let responseData;
    if (requestModel.registerUnregister) {
      responseData = await repository.create(requestModel);
    } else {
      responseData = await repository.delete(requestModel);
    }

    return buildResponseModel(responseData);
  }
}

export class ListCompetitorsUseCase implements IUseCase {
  async execute(
    requestModel: RequestModel,
    repository: IRepository
  ): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return buildResponseModel(responseData);
  }
}
