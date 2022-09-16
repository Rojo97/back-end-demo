import { NewspapersController } from "./src/controllers/NewspapersController";
import { NewspapersService } from "./src/services/NewspapersService";
import express, { ErrorRequestHandler } from "express";
import config from "config";
import mongoose from "mongoose";
import { NewspapersRepositoryImpl } from "./src/repositories/impl/NewspapersRepositoryImpl";
import bodyParser from 'body-parser';

class App {
  private app: express.Application;
  private port: number;
  private newspaperController: NewspapersController;

  constructor(
    newspaperController: NewspapersController,
    port: number,
    mongoUri: string
  ) {
    this.newspaperController = newspaperController;
    this.app = express();
    this.port = port;
    mongoose.connect(mongoUri);

    this.app.use(bodyParser.json());
    this.app.use("/newspapers", this.newspaperController.getRouter());
    this.app.use(this.errorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }

  private errorHandler : ErrorRequestHandler = (err, req, res, next) => {
      console.log(err.message);
      res.status(err.status || 500);
      res.render(err.message);
    };
}

const app = new App(
  new NewspapersController(
    new NewspapersService(new NewspapersRepositoryImpl())
  ),
  config.get<number>("server.port"),
  config.get<string>("server.mongoUri")
);

app.listen();
