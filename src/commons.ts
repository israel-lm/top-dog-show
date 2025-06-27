import { v5 as uuidv5 } from "uuid";
import { ErrorCode, NamespaceUuid } from "./constants";
import { ResponseData, ResponseModel } from "./models/base-models";

export function getUuid(strings: string[]): string {
  const combinedString = strings.join(",");
  return uuidv5(combinedString, NamespaceUuid);
}

export function getStatusFromErrorCode(code: ErrorCode): string {
  let status;
  switch (code) {
    case ErrorCode.UnknownErr:
      status = "error";
      break;
    default:
      status = "fail";
      break;
  }
  return status;
}

export function buildResponseModel(response: ResponseData): ResponseModel {
  let status = "success";
  if (response?.errCode) {
    status = getStatusFromErrorCode(response.errCode);
  }
  return new ResponseModel(status, response);
}
