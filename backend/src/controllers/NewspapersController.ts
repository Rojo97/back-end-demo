import { NewspapersService } from "../services/NewspapersService";
import createError from "http-errors";
import express from "express";

export class NewspapersController {
  private newspapersService: NewspapersService;
  public router: express.Router;

  constructor(newspapersService: NewspapersService) {
    this.newspapersService = newspapersService;
    this.router = express.Router();

    this.router
      .route("/")
      .get(async (req, res, next) => {
        try {
          res.send(await this.newspapersService.getAllNewspapers());
        } catch (err) {
          next(err);
        }
      })
      .post(async (req, res, next) => {
        try {
          res.status(201);
          res.send(await this.newspapersService.createNewspaper(req.body));
        } catch (err) {
          next(err);
        }
      });

    this.router
      .route("/:newspaperId")
      .get(async (req, res, next) => {
        try {
          const newspaper = await this.newspapersService.getNewspaperById(
            req.params.newspaperId
          );
          if (!newspaper) {
            return next(new createError.NotFound());
          }
          res.send(newspaper);
        } catch (err) {
          next(err);
        }
      })
      .put(async (req, res, next) => {
        try {
          const newspaper = await this.newspapersService.getNewspaperById(
            req.params.newspaperId
          );
          if (!newspaper) {
            return next(new createError.NotFound());
          }
          res.status(201);
          res.send(
            await this.newspapersService.updateNewspaper(
              req.params.newspaperId,
              req.body
            )
          );
        } catch (err) {
          next(err);
        }
      });
  }

  getRouter(): express.Router {
    return this.router;
  }
}
