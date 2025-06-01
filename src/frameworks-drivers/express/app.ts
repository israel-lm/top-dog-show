import express from "express";
import { UserController } from "../../controllers/user-controller";
import { UserRepository } from "../SQL-repository/user-repository";
import { CreateUserRequestModel } from "../../models/user-models";
import { UserData } from "../../models/user-models";

const app = express();
const port = 3000;

app.post("/user", (req, res) => {
  //console.log(req);
  const controller = new UserController();
  const repository = new UserRepository();
  const userData = new UserData("Israel", "Marinho");
  const requestModel = new CreateUserRequestModel(userData);

  const response = controller.execute(requestModel, repository);
  const userId = response.data.userId;
  console.log(`userId: ${userId}`);
  res.send(userId);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
