import { Publisher } from "./Publisher";

export class Newspaper {
  id: number;
  title: string;
  image: string;
  link: string;
  abstract: string;
  publisher: Publisher;
  languages: Array<string>;
  creation_date: Date;
}
