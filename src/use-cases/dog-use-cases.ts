import { IUseCase } from "./use-case-interface";
import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";
import { ErrorCode } from "../constants";

export class CreateDogUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.create(requestModel);
    let status = "success";
    let errMsg = undefined;
    let errCode = undefined;

    if (responseData.dogId == "") {
      status = "error";
      errMsg = "Failed to create dog";
      errCode = ErrorCode.UnknownErr;
    }
    return new ResponseModel(status, responseData, errMsg, errCode);
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
    if (responseData.dogData == undefined) {
      return new ResponseModel("fail", responseData, "Dog not found", ErrorCode.NotFoundErr);
    }
    return new ResponseModel("success", responseData);
  }
}

export class ListDogsUseCase implements IUseCase {
  async execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel> {
    const responseData = await repository.read(requestModel);
    return new ResponseModel("success", responseData);
  }
}
