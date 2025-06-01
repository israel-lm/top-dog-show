import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";

export class LoginUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class LogoutUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class FirstAccessUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class ForgotPasswordUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}

export class RefreshTokenUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    return new ResponseModel("success", null);
  }
}
