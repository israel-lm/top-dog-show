import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../models/constants";
import { ExpressAdapter } from "./express-adapter";
import { AppError } from "./error-handler";

const adapter = new ExpressAdapter();

const showRouter = express.Router();

async function createShow(req: Request, res: Response, next: NextFunction) {
  console.log("createShow");
  const responseData = await adapter.execute(UseCases.CreateShow, req.body);
  if (responseData.errCode) {
    return next(new AppError(responseData.errMsg, responseData.errCode));
  }
  res.status(201).json(responseData);
}

async function updateShow(req: Request, res: Response, next: NextFunction) {
  console.log("updateShow");
  const responseData = await adapter.execute(UseCases.UpdateShow, req.body);
  if (responseData.errCode) {
    return next(new AppError(responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

async function deleteShow(req: Request, res: Response, next: NextFunction) {
  console.log("deleteShow");
  const responseData = await adapter.execute(UseCases.DeleteShow, req.query);
  if (responseData.errCode) {
    return next(new AppError(responseData.errMsg, responseData.errCode));
  }
  res.status(204).json(responseData);
}

async function getShow(req: Request, res: Response, next: NextFunction) {
  console.log("getShow");
  const responseData = await adapter.execute(UseCases.GetShow, req.query);
  if (responseData.errCode) {
    return next(new AppError(responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

async function listAllShows(req: Request, res: Response, next: NextFunction) {
  console.log("listAllShows");
  const responseData = await adapter.execute(UseCases.ListShows, req.query);
  if (responseData.errCode) {
    return next(new AppError(responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

async function registerDog(req: Request, res: Response, next: NextFunction) {
  console.log("registerDog");
  const registrationData = {
    showId: req.params.showId,
    ...req.body
  };

  const responseData = await adapter.execute(UseCases.RegisterDog, registrationData);
  if (responseData.errCode) {
    return next(new AppError(responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

showRouter.route("/").get(listAllShows).post(createShow);
showRouter.route("/:showId").get(getShow).patch(updateShow).delete(deleteShow);
showRouter.route("/:showId/registration").post(registerDog);

export default showRouter;
