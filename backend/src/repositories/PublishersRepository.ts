import { PublisherInterface } from "../models/Publisher";


/**
 * Publisher repository spec, in order to decouple the implementation
 */
export interface PublishersRepository {
  getPublisherById(id: number): Promise<PublisherInterface>;
  createPublisher(publisher: PublisherInterface): Promise<PublisherInterface>;
  updatePublisher(id: number, publisher: PublisherInterface): Promise<PublisherInterface>;
}
