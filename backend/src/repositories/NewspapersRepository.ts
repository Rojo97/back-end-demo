import { NewspaperInterface } from "../models/Newspaper";

export interface NewspapersRepository {
  getAllNewspapers(): Promise<Array<NewspaperInterface>>;
  getNewspaperById(id: string): Promise<NewspaperInterface>;
  createNewspaper(newspaper: NewspaperInterface): Promise<NewspaperInterface>;
  updateNewspaper(id: string, newspaper: NewspaperInterface): Promise<NewspaperInterface>;
  deleteNewspaper(id: string): Promise<NewspaperInterface>;
}
