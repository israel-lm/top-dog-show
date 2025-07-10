import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { executeRequest } from "./router-commons";

const adapter = ExpressAdapter.getInstance();

const showRouter = express.Router();

async function createShow(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.CreateShow, 201, req.body, res, next);
}

async function updateShow(req: Request, res: Response, next: NextFunction) {
  req.body.showId = req.params.showId;
  executeRequest(UseCases.UpdateShow, 200, req.body, res, next);
}

async function deleteShow(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.DeleteShow, 204, req.params, res, next);
}

async function getShow(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.GetShow, 200, req.params, res, next);
}

async function listAllShows(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.ListShows, 200, req.query, res, next);
}

async function registerDog(req: Request, res: Response, next: NextFunction) {
  req.body.showId = req.params.showId;
  executeRequest(UseCases.RegisterDog, 201, req.body, res, next);
}

async function ListCompetitors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  executeRequest(UseCases.ListCompetitors, 200, req.params, res, next);
}

showRouter.route("/").get(listAllShows).post(createShow);
showRouter.route("/:showId").get(getShow).patch(updateShow).delete(deleteShow);
showRouter.route("/:showId/registration").post(registerDog);
showRouter.route("/:showId/competitors").get(ListCompetitors);

export default showRouter;
