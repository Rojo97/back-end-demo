import { Newspaper } from "../models/Newspaper";

export interface NewspapersRepository {
  getAllNewspapers(): Array<Newspaper>;
}
