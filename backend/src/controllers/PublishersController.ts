import { PublishersService } from "../services/PublishersService";
import createError from "http-errors";
import express from "express";

export class PublishersController {
  private PublishersService: PublishersService;
  public router: express.Router;

  constructor(PublishersService: PublishersService) {
    this.PublishersService = PublishersService;
    this.router = express.Router();

    this.router.route("/").post(async (req, res, next) => {
      try {
        res.status(201);
        res.send(await this.PublishersService.createPublisher(req.body));
      } catch (err) {
        next(err);
      }
    });

    this.router
      .route("/:PublisherId")
      .get(async (req, res, next) => {
        try {
          const publisher = await this.PublishersService.getPublisherById(
            parseInt(req.params.PublisherId)
          );
          if (!publisher) {
            return next(new createError.NotFound());
          }
          console.log(publisher);
          res.send(publisher);
        } catch (err) {
          next(err);
        }
      })
      .put(async (req, res, next) => {
        try {
          const Publisher = await this.PublishersService.getPublisherById(
            parseInt(req.params.PublisherId)
          );
          if (!Publisher) {
            return next(new createError.NotFound());
          }
          res.status(201);
          res.send(
            await this.PublishersService.updatePublisher(
              parseInt(req.params.PublisherId),
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
