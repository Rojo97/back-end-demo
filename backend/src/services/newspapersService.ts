import { NewspapersRepository } from "../repositories/NewspapersRepository";

export class NewspapersService {

	private newsPapersRepository: NewspapersRepository

	constructor(newspaperRepository: NewspapersRepository){
		this.newsPapersRepository = newspaperRepository;
	}

	getAllNewspapers() {
		return this.newsPapersRepository.getAllNewspapers();
	}

}