import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { AppError } from "./error-handler";
import { executeRequest } from "./router-commons";

const adapter = ExpressAdapter.getInstance();

const userRouter = express.Router();

async function createUser(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.CreateUser, 201, req.body, res, next);
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  req.body.userId = req.params.userId;
  executeRequest(UseCases.UpdateUser, 200, req.body, res, next);
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.DeleteUser, 204, req.params, res, next);
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.GetUser, 200, req.params, res, next);
}

async function listAllUsers(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.ListUsers, 200, req.query, res, next);
}

userRouter.route("/").get(listAllUsers).post(createUser);
userRouter.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
