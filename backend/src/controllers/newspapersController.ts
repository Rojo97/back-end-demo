import { NewspapersService } from "../services/newspapersService";
import express from "express";

export class NewspapersController {
  private newspapersService: NewspapersService;
  private router: express.Router;

  constructor(newspapersService: NewspapersService) {
    this.newspapersService = newspapersService;
    this.router = express.Router();

    this.router
      .route("/")
      .get(function (req, res) {
        res.send(newspapersService.getAllNewspapers());
      })
      .post(function (req, res) {
        res.send("Create newspapers");
      });

    this.router
      .route("/:newspaperId")
      .get(function (req, res) {
        res.send(`Get ${req.params.newspaperId} newspaper`);
      })
      .put(function (req, res) {
        res.send(`Update ${req.params.newspaperId} newspaper`);
      })
      .patch(function (req, res) {
        res.send(`Patch ${req.params.newspaperId} newspaper`);
      });
  }

  getRouter(): express.Router {
    return this.router;
  }
}
