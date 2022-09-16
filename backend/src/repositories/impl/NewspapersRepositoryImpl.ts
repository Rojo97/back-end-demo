import { Newspaper, NewspaperInterface } from "../../models/Newspaper";
import { NewspapersRepository } from "../NewspapersRepository";

export class NewspapersRepositoryImpl implements NewspapersRepository {
  async getAllNewspapers(): Promise<Array<NewspaperInterface>> {
    return Newspaper.find();
  }

  async getNewspaperById(id: string): Promise<NewspaperInterface> {
    return Newspaper.findById(id);
  }

  async createNewspaper(
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return new Newspaper(newspaper).save();
  }

  async updateNewspaper(
    id: string,
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return Newspaper.findByIdAndUpdate(id, newspaper).setOptions({"returnDocument": "after"});;
  }

  async deleteNewspaper(id: string): Promise<NewspaperInterface> {
    return Newspaper.findByIdAndDelete(id);
  }
}
