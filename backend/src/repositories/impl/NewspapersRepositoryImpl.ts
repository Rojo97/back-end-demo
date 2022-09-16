import { Newspaper } from "../../models/Newspaper";
import { NewspapersRepository } from "../NewspapersRepository";

export class NewspapersRepositoryImpl implements NewspapersRepository {
  getAllNewspapers(): Array<Newspaper> {
    const newspaper: Newspaper = {
      abstract: "AAAA",
      creation_date: new Date(),
      id: Math.random(),
      image: "aaaaa",
      languages: ["bbbbb", "aaaaa"],
      link: "asjdalsdk",
      publisher: {
        id: 1,
        joined_date: new Date(),
        name: "Publisher",
      },
      title: "test",
    };
    return [newspaper, newspaper];
  }
}
