import { NewspaperInterface } from "../models/Newspaper";
import { NewspapersRepository } from "../repositories/NewspapersRepository";

export class NewspapersService {
  private newsPapersRepository: NewspapersRepository;

  constructor(newspaperRepository: NewspapersRepository) {
    this.newsPapersRepository = newspaperRepository;
  }

  async getAllNewspapers(): Promise<Array<NewspaperInterface>> {
    return this.newsPapersRepository.getAllNewspapers();
  }

  async getNewspaperById(id: string): Promise<NewspaperInterface> {
    return this.newsPapersRepository.getNewspaperById(id);
  }

  async createNewspaper(
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return this.newsPapersRepository.createNewspaper(newspaper);
  }

  async updateNewspaper(
    id: string,
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return this.newsPapersRepository.updateNewspaper(id, newspaper);
  }

  async deleteNewspaper(id: string): Promise<NewspaperInterface> {
    return this.newsPapersRepository.deleteNewspaper(id);
  }
}
