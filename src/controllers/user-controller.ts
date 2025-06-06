import { IController } from "./controller-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { IRepository } from "../use-cases/repository-interface";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase
} from "../use-cases/user-use-cases";

export class CreateUserController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new CreateUserUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class DeleteUserController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new DeleteUserUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class UpdateUserController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new UpdateUserUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class GetUserController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new GetUserUseCase();
    return await useCase.execute(requestModel, repository);
  }
}

export class ListUsersController implements IController {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const useCase = new ListUsersUseCase();
    return await useCase.execute(requestModel, repository);
  }
}
