import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../../constants";

function getHttpCode(errCode: ErrorCode): number {
  console.log(`Error code: ${errCode}`);
  if (errCode < ErrorCode.NotFoundErr) {
    return 400;
  } else if (errCode > ErrorCode.NotFoundErr) {
    return 500;
  } else {
    return 404;
  }
}

export class AppError extends Error {
  errCode: ErrorCode;
  status: string;

  constructor(status: string, message: string, code: ErrorCode) {
    super(message);
    this.status = status;
    this.errCode = code;
  }
}

export function handleError(err: any, req: Request, res: Response, next: NextFunction) {
  res.status(getHttpCode(err.errCode)).json({
    status: err.status,
    message: err.message
  });
}
