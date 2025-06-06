import { IController } from "./controller-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { IRepository } from "../use-cases/repository-interface";
import {
  CreateShowUseCase,
  DeleteShowUseCase,
  GetShowUseCase,
  ListShowsUseCase,
  RegisterDogUseCase,
  UpdateShowUseCase
} from "../use-cases/show-use-cases";

export class CreateShowController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new CreateShowUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class UpdateShowController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new UpdateShowUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class DeleteShowController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new DeleteShowUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class GetShowController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new GetShowUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class ListShowsController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new ListShowsUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class RegisterDogController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new RegisterDogUseCase();
    return await useCase.execute(requestModel, repository);
  }
}
