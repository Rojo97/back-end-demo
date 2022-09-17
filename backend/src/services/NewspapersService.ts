import { FilterQuery, PaginateResult } from "mongoose";
import { NewspaperInterface } from "../models/Newspaper";
import { NewspapersRepository } from "../repositories/NewspapersRepository";

export class NewspapersService {
  private newsPapersRepository: NewspapersRepository;

  constructor(newspaperRepository: NewspapersRepository) {
    this.newsPapersRepository = newspaperRepository;
  }

  async getAllNewspapers(
    limit: number,
    skip: number,
    filter: FilterQuery<NewspaperInterface>
  ): Promise<PaginateResult<NewspaperInterface>> {
    return this.newsPapersRepository.getAllNewspapers(limit, skip, filter);
  }

  async getNewspaperById(id: number): Promise<NewspaperInterface> {
    return this.newsPapersRepository.getNewspaperById(id);
  }

  async createNewspaper(
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return this.newsPapersRepository.createNewspaper(newspaper);
  }

  async updateNewspaper(
    id: number,
    newspaper: NewspaperInterface
  ): Promise<NewspaperInterface> {
    return this.newsPapersRepository.updateNewspaper(id, newspaper);
  }

  async deleteNewspaper(id: number): Promise<NewspaperInterface> {
    return this.newsPapersRepository.deleteNewspaper(id);
  }
}
