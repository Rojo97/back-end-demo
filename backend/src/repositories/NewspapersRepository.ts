import { PaginateResult } from "mongoose";
import { NewspaperInterface } from "../models/Newspaper";

export interface NewspapersRepository {
  getAllNewspapers(limit: number, skip: number): Promise<PaginateResult<NewspaperInterface>>;
  getNewspaperById(id: number): Promise<NewspaperInterface>;
  createNewspaper(newspaper: NewspaperInterface): Promise<NewspaperInterface>;
  updateNewspaper(id: number, newspaper: NewspaperInterface): Promise<NewspaperInterface>;
  deleteNewspaper(id: number): Promise<NewspaperInterface>;
}
