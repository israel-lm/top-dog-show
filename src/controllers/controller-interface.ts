import { RequestModel, ResponseModel } from "../models/base-models";
import { IRepository } from "../use-cases/repository-interface";

export interface IController {
  execute(requestModel: RequestModel, repository: IRepository): Promise<ResponseModel>;
}
