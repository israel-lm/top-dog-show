import express from "express";
import { Request, Response, NextFunction } from "express";

import { UseCases } from "../../constants";
import { ExpressAdapter } from "./express-adapter";
import { AppError } from "./error-handler";
import { executeRequest } from "./router-commons";

const adapter = ExpressAdapter.getInstance();

const disciplineRouter = express.Router();

async function createResults(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.RegisterResults, 201, req.body, res, next);
}

async function updateResults(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.UpdateResults, 200, req.body, res, next);
}

async function deleteResults(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.DeleteResults, 204, req.params, res, next);
}

async function getResults(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.GetResults, 200, req.params, res, next);
}

async function getRanking(req: Request, res: Response, next: NextFunction) {
  executeRequest(UseCases.GetRanking, 200, req.params, res, next);
}

disciplineRouter.route("/").post(createResults);
disciplineRouter
  .route("/:disciplineId")
  .patch(updateResults)
  .get(getResults)
  .delete(deleteResults);
disciplineRouter.route("/ranking/:showId/:rankType").get(getRanking);

export default disciplineRouter;
