import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../../models/constants";

export class AppError extends Error {
  errCode: ErrorCode;

  constructor(message: string, code: ErrorCode) {
    super(message);
    this.errCode = code;
  }
}

function getStatusFromError(errCode: ErrorCode): [number, string] {
  console.log(`Error code: ${errCode}`);
  if (errCode < ErrorCode.NotFoundErr) {
    return [400, "fail"];
  } else if (errCode > ErrorCode.NotFoundErr) {
    return [500, "error"];
  } else {
    return [404, "fail"];
  }
}

export function handleError(err: any, req: Request, res: Response, next: NextFunction) {
  const [code, status] = getStatusFromError(err.errCode);
  res.status(code).json({
    status: status,
    message: err.message
  });
}
