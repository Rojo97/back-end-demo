import { PublisherInterface } from "../models/Publisher";
import { PublishersRepository } from "../repositories/PublishersRepository";

export class PublishersService {
  private PublishersRepository: PublishersRepository;

  constructor(publishersRepository: PublishersRepository) {
    this.PublishersRepository = publishersRepository;
  }

  async getPublisherById(id: number): Promise<PublisherInterface> {
    return this.PublishersRepository.getPublisherById(id);
  }

  async createPublisher(
    Publisher: PublisherInterface
  ): Promise<PublisherInterface> {
    return this.PublishersRepository.createPublisher(Publisher);
  }

  async updatePublisher(
    id: number,
    Publisher: PublisherInterface
  ): Promise<PublisherInterface> {
    return this.PublishersRepository.updatePublisher(id, Publisher);
  }

}
