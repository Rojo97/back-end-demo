import { Newspaper, NewspaperInterface } from "../../models/Newspaper";
import { NewspapersRepository } from "../NewspapersRepository";

export class NewspapersRepositoryImpl implements NewspapersRepository {
  async getAllNewspapers(): Promise<Array<NewspaperInterface>> {
    return Newspaper.find().populate("publisher");
  }

  async getNewspaperById(id: string): Promise<NewspaperInterface> {
    return Newspaper.findById(id).populate("publisher");
  }

  async createNewspaper(
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return (await new Newspaper(newspaper).save()).populate("publisher");
  }

  async updateNewspaper(
    id: string,
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return Newspaper.findByIdAndUpdate(id, newspaper)
      .setOptions({"returnDocument": "after"})
      .populate("publisher");
  }

  async deleteNewspaper(id: string): Promise<NewspaperInterface> {
    return Newspaper.findByIdAndDelete(id).populate("publisher");
  }
}
