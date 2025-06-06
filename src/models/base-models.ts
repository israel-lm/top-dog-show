import { ErrorCode } from "./constants";
import { PaginationSchema } from "./validation-schemas";

export class BaseModel {}

export class ResponseData {}

export class RequestModel extends BaseModel {}

export class ResponseModel extends BaseModel {
  status: string;
  data: ResponseData;
  errMsg?: string;
  errCode?: ErrorCode;

  constructor(status: string, data: ResponseData, message?: string, code?: ErrorCode) {
    super();
    this.status = status;
    this.data = data;
    this.errMsg = message;
    this.errCode = code;
  }
}

export class ListRequestData {
  limit: number;
  offset: number;
  createdAt?: Date | undefined;

  constructor(data: any) {
    const validatedData = PaginationSchema.parse(data);
    this.createdAt = validatedData.createdAt ? new Date(validatedData.createdAt) : undefined;
    this.limit = validatedData.limit;
    this.offset = validatedData.offset;
  }
}
