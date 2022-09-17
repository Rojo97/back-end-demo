import { NewspapersController } from "./src/controllers/NewspapersController";
import { PublishersController } from "./src/controllers/PublishersController";
import { NewspapersService } from "./src/services/NewspapersService";
import { PublishersService } from "./src/services/PublishersService";
import { NewspapersRepositoryImpl } from "./src/repositories/impl/NewspapersRepositoryImpl";
import { PublishersRepositoryImpl } from "./src/repositories/impl/PublishersRepositoryImpl";
import express, { ErrorRequestHandler } from "express";
import config from "config";
import mongoose from "mongoose";
import bodyParser from "body-parser";

class App {
  private app: express.Application;
  private port: number;
  private newspaperController: NewspapersController;
  private publishersController: PublishersController;

  constructor(
    newspaperController: NewspapersController,
    publishersController: PublishersController,
    port: number,
    mongoUri: string
  ) {
    this.newspaperController = newspaperController;
    this.publishersController = publishersController;
    this.app = express();
    this.port = port;
    mongoose.set('runValidators', true);
    mongoose.connect(mongoUri);

    this.app.use(bodyParser.json());
    this.app.use("/publishers", this.publishersController.getRouter());
    this.app.use("/newspapers", this.newspaperController.getRouter());
    this.app.use(this.errorHandler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }

  private errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err.message);
    res.status(err.status || 500);
    res.send(err.message);
  };
}

const app = new App(
  new NewspapersController(
    new NewspapersService(new NewspapersRepositoryImpl())
  ),
  new PublishersController(
    new PublishersService(new PublishersRepositoryImpl())
  ),
  config.get<number>("server.port"),
  config.get<string>("server.mongoUri")
);

app.listen();
