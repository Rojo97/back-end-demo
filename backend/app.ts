import { NewspapersController } from "./src/controllers/newspapersController";
import { NewspapersService } from "./src/services/newspapersService";
import express from "express";
import config from "config";
import { NewspapersRepositoryImpl } from "./src/repositories/impl/NewspapersRepositoryImpl";
const app = express();
const port = config.get<string>("server.port");

const newspapersController = new NewspapersController(
  new NewspapersService(new NewspapersRepositoryImpl())
);

//Declare controllers
app.use("/newspapers", newspapersController.getRouter());

//App initialization
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
