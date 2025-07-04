import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { AppError } from "./error-handler";

const adapter = new ExpressAdapter();

const userRouter = express.Router();

async function createUser(req: Request, res: Response, next: NextFunction) {
  console.log("createUser");
  const response = await adapter.execute(UseCases.CreateUser, req.body);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.status(201).json(response);
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  console.log("updateUser");
  req.body.userId = req.params.userId;
  const response = await adapter.execute(UseCases.UpdateUser, req.body);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  console.log("deleteUser");
  const response = await adapter.execute(UseCases.DeleteUser, req.params);
  if (response.data?.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.status(204).json(response);
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  console.log("getUser");
  const response = await adapter.execute(UseCases.GetUser, req.params);
  if (response?.data?.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

async function listAllUsers(req: Request, res: Response, next: NextFunction) {
  console.log("listAllUsers");
  const response = await adapter.execute(UseCases.ListUsers, req.query);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

userRouter.route("/").get(listAllUsers).post(createUser);
userRouter.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
