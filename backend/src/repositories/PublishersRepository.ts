import { PublisherInterface } from "../models/Publisher";

export interface PublishersRepository {
  getPublisherById(id: number): Promise<PublisherInterface>;
  createPublisher(publisher: PublisherInterface): Promise<PublisherInterface>;
  updatePublisher(id: number, publisher: PublisherInterface): Promise<PublisherInterface>;
}
