import express from "express";
import dogRouter from "./dog-router";
import userRouter from "./user-router";
import { AppError, handleError } from "./error-handler";
import { ErrorCode } from "../../models/constants";

const app = express();

app.use(express.json());

app.use("/dog", dogRouter);
app.use("/user", userRouter);
app.all("*name", (req, res, next) => {
  const err = new AppError("Not found", ErrorCode.NotFoundErr);
  next(err);
});

app.use(handleError);

export default app;
