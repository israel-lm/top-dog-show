import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { response } from "express";

export class CreateDogUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.create(requestModel);
    return new ResponseModel("success", responseData);
  }
}

export class UpdateDogUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.update(requestModel);
    return new ResponseModel("success", responseData);
  }
}

export class DeleteDogUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.delete(requestModel);
    return new ResponseModel("success", responseData);
  }
}

export class GetDogUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return new ResponseModel("success", responseData);
  }
}

export class ListDogsUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    let response;
    try {
      response = new ResponseModel("success", responseData);
    } catch (err) {
      console.error(err);
    }

    return response;
  }
}
