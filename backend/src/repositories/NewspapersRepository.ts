import { FilterQuery, PaginateResult } from "mongoose";
import { NewspaperInterface } from "../models/Newspaper";

/**
 * Newspaper repository spec, in order to decouple the implementation
 */
export interface NewspapersRepository {
  getAllNewspapers(limit: number, skip: number, filter: FilterQuery<NewspaperInterface>): Promise<PaginateResult<NewspaperInterface>>;
  getNewspaperById(id: number): Promise<NewspaperInterface>;
  createNewspaper(newspaper: NewspaperInterface): Promise<NewspaperInterface>;
  updateNewspaper(id: number, newspaper: NewspaperInterface): Promise<NewspaperInterface>;
  deleteNewspaper(id: number): Promise<NewspaperInterface>;
}
