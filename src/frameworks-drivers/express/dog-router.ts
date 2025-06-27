import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { AppError } from "./error-handler";

const adapter = new ExpressAdapter();

const dogRouter = express.Router();

async function createDog(req: Request, res: Response, next: NextFunction) {
  console.log(`createDog. Request data: ${JSON.stringify(req.body, null, 2)}`);
  const response = await adapter.execute(UseCases.CreateDog, req.body);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.status(201).json(response);
}

async function updateDog(req: Request, res: Response, next: NextFunction) {
  console.log("updateDog");
  req.body.dogId = req.params.dogId;
  const response = await adapter.execute(UseCases.UpdateDog, req.body);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

async function deleteDog(req: Request, res: Response, next: NextFunction) {
  console.log("deleteDog");
  const response = await adapter.execute(UseCases.DeleteDog, req.params);
  if (response?.data?.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.status(204).json(response);
}

async function getDog(req: Request, res: Response, next: NextFunction) {
  const response = await adapter.execute(UseCases.GetDog, req.params);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

async function listAllDogs(req: Request, res: Response, next: NextFunction) {
  const response = await adapter.execute(UseCases.ListDogs, req.query);
  if (response.data.errCode) {
    return next(
      new AppError(response.status, response.data.errMsg, response.data.errCode)
    );
  }
  res.json(response);
}

dogRouter.route("/").get(listAllDogs).post(createDog);
dogRouter.route("/:dogId").get(getDog).patch(updateDog).delete(deleteDog);

export default dogRouter;
