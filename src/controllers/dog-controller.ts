import { IController } from "./controller-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { IRepository } from "../use-cases/repository-interface";
import {
  CreateDogUseCase,
  DeleteDogUseCase,
  GetDogUseCase,
  ListDogsUseCase,
  UpdateDogUseCase
} from "../use-cases/dog-use-cases";

export class CreateDogController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new CreateDogUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class UpdateDogController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new UpdateDogUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class DeleteDogController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new DeleteDogUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class GetDogController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new GetDogUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class ListDogsController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new ListDogsUseCase();
    return await useCase.execute(requestModel, repository);
  }
}
