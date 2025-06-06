import { IController } from "./controller-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { IRepository } from "../use-cases/repository-interface";
import {
  RegisterResultsUseCase,
  DeleteResultsUseCase,
  GetRankingUseCase,
  GetResultsUseCase,
  UpdateResultsUseCase
} from "../use-cases/ranking-use-cases";

export class RegisterResultsController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new RegisterResultsUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class UpdateResultsController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new UpdateResultsUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class DeleteResultsController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new DeleteResultsUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class GetResultsController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new GetResultsUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class GetRankingController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new GetRankingUseCase();
    return await useCase.execute(requestModel, repository);
  }
}
