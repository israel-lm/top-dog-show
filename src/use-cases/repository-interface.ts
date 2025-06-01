import { RequestModel } from "../models/base-models";
import { ResponseData } from "../models/base-models";

export interface IRepository {
  create(input: RequestModel): ResponseData;
  read(input: RequestModel): ResponseData;
  update(input: RequestModel): ResponseData;
  delete(input: RequestModel): ResponseData;
}
