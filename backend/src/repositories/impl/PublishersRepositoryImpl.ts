import { Publisher, PublisherInterface } from "../../models/Publisher";
import { PublishersRepository } from "../PublishersRepository";

export class PublishersRepositoryImpl implements PublishersRepository {
  async getPublisherById(id: number): Promise<PublisherInterface> {
    return Publisher.findById(id);
  }

  async createPublisher(
    publisher: PublisherInterface
  ): Promise<PublisherInterface> {
    return new Publisher(publisher).save();
  }

  async updatePublisher(
    id: number,
    publisher: PublisherInterface
  ): Promise<PublisherInterface> {
    return Publisher.findByIdAndUpdate(id, publisher).setOptions({"returnDocument": "after"});
  }
}
