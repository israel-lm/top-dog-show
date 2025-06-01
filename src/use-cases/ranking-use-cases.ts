import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";

export class RegisterResultsUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class UpdateResultsUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class DeleteResultsUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class GetResultsUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class GetRankingUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}
