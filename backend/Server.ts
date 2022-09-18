import { NewspapersController } from "./src/controllers/NewspapersController";
import { PublishersController } from "./src/controllers/PublishersController";
import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { NewspapersRepositoryImpl } from "./src/repositories/impl/NewspapersRepositoryImpl";
import { NewspapersService } from "./src/services/NewspapersService";
import { PublishersService } from "./src/services/PublishersService";
import { PublishersRepositoryImpl } from "./src/repositories/impl/PublishersRepositoryImpl";
import config from "config";

/**
 * Server builder
 */
export class Server {
  private app: express.Application;
  private port: number;
  private mongoUri: string;
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
    this.mongoUri = mongoUri;

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

  public getApp(): express.Application {
    return this.app;
  }

  public connectMongo() {
    mongoose.set("runValidators", true);
    mongoose.connect(this.mongoUri);
  }

  /**
   * Error handler for common errors, such as validation errors.
   */
  private errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err.message);
    res.status(err.statusCode || 400);
    res.send(err.message);
  };
}

/**
 * Server builder with initialized instances.
 */
export function createServer(): Server {
  return new Server(
    new NewspapersController(
      new NewspapersService(new NewspapersRepositoryImpl())
    ),
    new PublishersController(
      new PublishersService(new PublishersRepositoryImpl())
    ),
    config.get<number>("server.port"),
    config.get<string>("server.mongoUri")
  );
}
