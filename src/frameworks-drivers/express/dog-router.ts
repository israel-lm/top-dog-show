import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { executeRequest } from "./router-commons";

const adapter = ExpressAdapter.getInstance();

const dogRouter = express.Router();

async function createDog(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.CreateDog, 201, req.body, res, next);
}

async function updateDog(req: Request, res: Response, next: NextFunction) {
  req.body.dogId = req.params.dogId;
  executeRequest(UseCases.UpdateDog, 200, req.body, res, next);
}

async function deleteDog(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.DeleteDog, 204, req.params, res, next);
}

async function getDog(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.GetDog, 200, req.params, res, next);
}

async function listAllDogs(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.ListDogs, 200, req.query, res, next);
}

dogRouter.route("/").get(listAllDogs).post(createDog);
dogRouter.route("/:dogId").get(getDog).patch(updateDog).delete(deleteDog);

export default dogRouter;
