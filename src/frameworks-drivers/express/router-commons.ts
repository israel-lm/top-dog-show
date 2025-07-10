import { Response, NextFunction } from "express";
import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { AppError } from "./error-handler";

const adapter = ExpressAdapter.getInstance();

export async function executeRequest(
  useCase: UseCases,
  statusCode: number,
  payload: any,
  res: Response,
  next: NextFunction
) {
  const response = await adapter.execute(useCase, payload);
  if (response?.data?.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.status(statusCode).json(response);
}
