import { ErrorCode } from "../../constants";
import { ResponseData } from "../../models/base-models";

export function parseError(detail: string): [string, ErrorCode] {
  let errorCode;
  let errorMsg;
  if (detail.includes("already exists")) {
    errorCode = ErrorCode.DuplicateErr;
    errorMsg = "Dog already exists";
  } else if (detail.includes("not found")) {
    errorCode = ErrorCode.NotFoundErr;
    errorMsg = "Dog not found";
  } else {
    errorCode = ErrorCode.UnknownErr;
    errorMsg = "Internal server error";
  }

  return [errorMsg, errorCode];
}

export function getErrorResponse(detail: string): ResponseData {
  const [errorMsg, errorCode] = parseError(detail);
  const response = new ResponseData();
  response.errCode = errorCode;
  response.errMsg = errorMsg;

  return response;
}
