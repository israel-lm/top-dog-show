import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";

export class CreateDogUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class UpdateDogUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class DeleteDogUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class GetDogUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class ListDogsUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}
