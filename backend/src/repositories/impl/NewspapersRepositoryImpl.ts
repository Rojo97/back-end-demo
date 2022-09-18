import { FilterQuery, PaginateResult } from "mongoose";
import { Newspaper, NewspaperInterface } from "../../models/Newspaper";
import { NewspapersRepository } from "../NewspapersRepository";

const PUBLISHER = "publisher";

/**
 * Newspapers persistence logic
 */
export class NewspapersRepositoryImpl implements NewspapersRepository {
  //Return all newspapers but paginated
  async getAllNewspapers(
    limit: number,
    skip: number,
    filter: FilterQuery<NewspaperInterface>
  ): Promise<PaginateResult<NewspaperInterface>> {
    return Newspaper.paginate(filter, {
      populate: PUBLISHER,
      limit: limit,
      offset: skip,
    });
  }

  async getNewspaperById(id: number): Promise<NewspaperInterface> {
    return Newspaper.findById(id).populate(PUBLISHER);
  }

  async createNewspaper(
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return (await new Newspaper(newspaper).save()).populate(PUBLISHER);
  }

  async updateNewspaper(
    id: number,
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return Newspaper.findByIdAndUpdate(id, newspaper)
      .setOptions({ returnDocument: "after" })
      .populate(PUBLISHER);
  }

  async deleteNewspaper(id: number): Promise<NewspaperInterface> {
    return Newspaper.findByIdAndDelete(id).populate(PUBLISHER);
  }
}
