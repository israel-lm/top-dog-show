import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { AppError } from "./error-handler";

const adapter = new ExpressAdapter();

const userRouter = express.Router();

async function createUser(req: Request, res: Response, next: NextFunction) {
  console.log("createUser");
  const responseData = await adapter.execute(UseCases.CreateUser, req.body);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.status(201).json(responseData);
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  console.log("updateUser");
  const responseData = await adapter.execute(UseCases.UpdateUser, req.body);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  console.log("deleteUser");
  const responseData = await adapter.execute(UseCases.DeleteUser, req.query);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.status(204).json(responseData);
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  console.log("getUser");
  const responseData = await adapter.execute(UseCases.GetUser, req.query);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

async function listAllUsers(req: Request, res: Response, next: NextFunction) {
  console.log("listAllUsers");
  const responseData = await adapter.execute(UseCases.ListUsers, req.query);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

userRouter.route("/").get(listAllUsers).post(createUser);
userRouter.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
