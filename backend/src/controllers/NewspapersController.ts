import { NewspapersService } from "../services/NewspapersService";
import createError from "http-errors";
import express from "express";
import { FilterQuery } from "mongoose";
import { NewspaperInterface } from "../models/Newspaper";

/**
 * Newspapers controller manages the newspapers endpoints
 */
export class NewspapersController {
  private newspapersService: NewspapersService;
  public router: express.Router;

  constructor(newspapersService: NewspapersService) {
    this.newspapersService = newspapersService;
    this.router = express.Router();

    this.router
      .route("/")
      .get(async (req, res, next) => {
        //Pagination limit, default value 10
        const limit = req.query?.limit
          ? parseInt(req.query?.limit.toString())
          : 10;
        //Pagination offset, default value 0
        const skip = req.query?.skip
          ? parseInt(req.query?.skip.toString())
          : 0;
        const title = req.query?.title?.toString();
        //Filter params
        const filers = this.buildFilter(title)
        try {
          res.send(await this.newspapersService.getAllNewspapers(limit, skip, filers));
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
            parseInt(req.params.newspaperId)
          );
          if (!newspaper) {
            //If the newspaper is not found then return 404
            return next(new createError.NotFound());
          }
          res.send(newspaper);
        } catch (err) {
          next(err);
        }
      })
      .put(async (req, res, next) => {
        try {
          //Try to find newspaper to edit
          const newspaper = await this.newspapersService.getNewspaperById(
            parseInt(req.params.newspaperId)
          );
          if (!newspaper) {
            //Return 404 if not found
            return next(new createError.NotFound());
          }
          res.status(201);
          res.send(
            await this.newspapersService.updateNewspaper(
              parseInt(req.params.newspaperId),
              req.body
            )
          );
        } catch (err) {
          next(err);
        }
      })
      .delete(async (req, res, next) => {
        try {
          await this.newspapersService.deleteNewspaper(
            parseInt(req.params.newspaperId)
          )
        } catch (err) {
          //Ignore error because if the newspaper is not found it means that it is removed
        }
        res.status(204);
        res.send();
      });
  }

  getRouter(): express.Router {
    return this.router;
  }

  /**
   * Build mongo filer based on query params
   */
  private buildFilter(title: string) {
    const filter: FilterQuery<NewspaperInterface> = {
    }
    if(title) {
      filter.title = {'$regex' : title, '$options' : 'i'}
    }
    return filter;
  }
}
