import { IController } from "./controller-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { IRepository } from "../use-cases/repository-interface";
import { LoginUseCase, ForgotPasswordUseCase, LogoutUseCase, RefreshTokenUseCase } from "../use-cases/auth-use-cases";

export class LoginController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new LoginUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class LogoutController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new LogoutUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class ForgotPasswordController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new ForgotPasswordUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class RefreshTokenController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new RefreshTokenUseCase();
    return await useCase.execute(requestModel, repository);
  }
}
