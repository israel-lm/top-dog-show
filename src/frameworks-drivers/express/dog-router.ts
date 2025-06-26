import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { AppError } from "./error-handler";

const adapter = new ExpressAdapter();

const dogRouter = express.Router();

async function createDog(req: Request, res: Response, next: NextFunction) {
  console.log(`createDog. Request data: ${JSON.stringify(req.body, null, 2)}`);
  const responseData = await adapter.execute(UseCases.CreateDog, req.body);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.status(201).json(responseData);
}

async function updateDog(req: Request, res: Response, next: NextFunction) {
  console.log("updateDog");
  const responseData = await adapter.execute(UseCases.UpdateDog, req.body);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

async function deleteDog(req: Request, res: Response, next: NextFunction) {
  console.log("deleteDog");
  const responseData = await adapter.execute(UseCases.DeleteDog, req.query);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.status(204).json(responseData);
}

async function getDog(req: Request, res: Response, next: NextFunction) {
  const responseData = await adapter.execute(UseCases.GetDog, req.params);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

async function listAllDogs(req: Request, res: Response, next: NextFunction) {
  console.log(`listAllDogs. Parameters: ${JSON.stringify(req.query, null, 2)}`);
  const responseData = await adapter.execute(UseCases.ListDogs, req.query);
  console.log(`responseData: ${JSON.stringify(responseData, null, 2)}`);
  if (responseData.errCode) {
    return next(new AppError(responseData.status, responseData.errMsg, responseData.errCode));
  }
  res.json(responseData);
}

dogRouter.route("/").get(listAllDogs).post(createDog);
dogRouter.route("/:dogId").get(getDog).patch(updateDog).delete(deleteDog);

export default dogRouter;
