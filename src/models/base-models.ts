import { ErrorCode } from "../constants";
import { PaginationSchema } from "./validation-schemas";

export class BaseModel {}

export class ResponseData {
  errCode?: ErrorCode;
  errMsg?: string;
}

export class RequestModel extends BaseModel {}

export class ResponseModel extends BaseModel {
  status: string;
  data: ResponseData;

  constructor(status: string, data: ResponseData) {
    super();
    this.status = status;
    this.data = data;
  }
}

export class ListRequestData {
  limit: number;
  offset: number;
  createdAt?: Date | undefined;

  constructor(data: any) {
    const validatedData = PaginationSchema.parse(data);
    this.createdAt = validatedData.createdAt
      ? new Date(validatedData.createdAt)
      : undefined;
    this.limit = validatedData.limit;
    this.offset = validatedData.offset;
  }
}
