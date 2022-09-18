import { PaginateResult } from "mongoose";
import { NewspaperInterface } from "../../src/models/Newspaper";
import { NewspapersRepositoryImpl } from "../../src/repositories/impl/NewspapersRepositoryImpl";

import { NewspapersService } from "../../src/services/NewspapersService";

const service = new NewspapersService(new NewspapersRepositoryImpl());

describe("Test NewspapersService.ts", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const newspapersPaginated: PaginateResult<NewspaperInterface> = {
    docs: [
      {
        _id: 1,
        title: "Test",
        image: "Test",
        link: "Test",
        abstract: "Test",
        publisher: 3,
        languages: ["Es"],
      },
    ],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 1,
    offset: 10,
    pagingCounter: 0,
    totalDocs: 1,
    totalPages: 1,
  };

  const newspaper: NewspaperInterface = {
    _id: 1,
    title: "Test",
    image: "Test",
    link: "Test",
    abstract: "Test",
    publisher: 3,
    languages: ["Es"],
  };

  test("findAllNewspapers", async () => {
    const spy = jest
      .spyOn(NewspapersRepositoryImpl.prototype, "getAllNewspapers")
      .mockReturnValueOnce(Promise.resolve(newspapersPaginated));

    await service.getAllNewspapers(10, 0, {})
      .then((response) => {
        expect(response.docs[0]._id).toBe(1);
        expect(spy).toBeCalledWith(10, 0, {});
      });
  });

  test("findNewspaperById", async () => {
    const spy = jest
      .spyOn(NewspapersRepositoryImpl.prototype, "getNewspaperById")
      .mockReturnValueOnce(Promise.resolve(newspaper));

    await service.getNewspaperById(1)
      .then((response) => {
        expect(response._id).toBe(1);
        expect(spy).toBeCalled();
      });
  });

  test("createNewspaper", async () => {
    const spy = jest
      .spyOn(NewspapersRepositoryImpl.prototype, "createNewspaper")
      .mockReturnValueOnce(Promise.resolve(newspaper));

    await service.createNewspaper(newspaper)
      .then((response) => {
        expect(response._id).toBe(1);
        expect(spy).toBeCalledWith(newspaper);
      });
  });

  test("updateNewspaper", async () => {
    const spy = jest
      .spyOn(NewspapersRepositoryImpl.prototype, "updateNewspaper")
      .mockReturnValueOnce(Promise.resolve(newspaper));

    await service.updateNewspaper(1, newspaper)
      .then((response) => {
        expect(response._id).toBe(1);
        expect(spy).toBeCalledWith(1, newspaper);
      });
  });

});
