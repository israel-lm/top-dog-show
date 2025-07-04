import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { AppError } from "./error-handler";

const adapter = new ExpressAdapter();

const showRouter = express.Router();

async function createShow(req: Request, res: Response, next: NextFunction) {
  console.log("createShow");
  const response = await adapter.execute(UseCases.CreateShow, req.body);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.status(201).json(response);
}

async function updateShow(req: Request, res: Response, next: NextFunction) {
  console.log("updateShow");
  req.body.showId = req.params.showId;
  const response = await adapter.execute(UseCases.UpdateShow, req.body);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

async function deleteShow(req: Request, res: Response, next: NextFunction) {
  console.log("deleteShow");
  const response = await adapter.execute(UseCases.DeleteShow, req.params);
  if (response?.data?.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.status(204).json(response);
}

async function getShow(req: Request, res: Response, next: NextFunction) {
  console.log("getShow");
  const response = await adapter.execute(UseCases.GetShow, req.params);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

async function listAllShows(req: Request, res: Response, next: NextFunction) {
  console.log("listAllShows");
  const response = await adapter.execute(UseCases.ListShows, req.query);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

async function registerDog(req: Request, res: Response, next: NextFunction) {
  console.log("registerDog");
  req.body.showId = req.params.showId;
  const response = await adapter.execute(UseCases.RegisterDog, req.body);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

showRouter.route("/").get(listAllShows).post(createShow);
showRouter.route("/:showId").get(getShow).patch(updateShow).delete(deleteShow);
showRouter.route("/:showId/registration").post(registerDog);

export default showRouter;
