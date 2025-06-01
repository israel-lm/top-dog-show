import { IRepository } from "./repository-interface";
import { RequestModel, ResponseModel } from "../models/base-models";

export interface IUseCase {
  execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel>;
}
