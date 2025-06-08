import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";

export class CreateUserUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.create(requestModel);
    return new ResponseModel("success", responseData);
  }
}

export class UpdateUserUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.update(requestModel);
    return new ResponseModel("success", responseData);
  }
}

export class DeleteUserUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.delete(requestModel);
    return new ResponseModel("success", responseData);
  }
}

export class GetUserUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return new ResponseModel("success", responseData);
  }
}

export class ListUsersUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return new ResponseModel("success", responseData);
  }
}
