import { RequestModel } from "../models/base-models";
import { ResponseData } from "../models/base-models";

export interface IRepository {
  create(input: RequestModel): Promise<ResponseData>;
  read(input: RequestModel): Promise<ResponseData>;
  update(input: RequestModel): Promise<ResponseData>;
  delete(input: RequestModel): Promise<ResponseData>;
}
