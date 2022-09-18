import { PaginateResult } from "mongoose";
import { NewspaperInterface, Newspaper } from "../../src/models/Newspaper";
import { NewspapersRepositoryImpl } from "../../src/repositories/impl/NewspapersRepositoryImpl";
import paginate from "mongoose-paginate-v2";

const repository = new NewspapersRepositoryImpl();

describe("Test NewspaperRepositoryImpl.ts", () => {
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
    const spy = jest.mock(Newspaper.prototype, () => ({
      paginate: jest.fn().mockResolvedValue(newspapersPaginated),
    }));

    await repository.getAllNewspapers(10, 0, {}).then((response) => {
      expect(response.docs[0]._id).toBe(1);
      expect(spy).toBeCalledWith({}, {});
    });
  });

  test("findNewspaperById", async () => {
    const spy = jest
      .spyOn(Newspaper.prototype, "findById")
      .mockReturnValue(newspaper);

    await repository.getNewspaperById(1).then((response) => {
      expect(response._id).toBe(1);
      expect(spy).toBeCalledWith(1);
    });
  });

  test("createNewspaper", async () => {
    const spy = jest
      .spyOn(Newspaper.prototype, "save")
      .mockReturnValue(newspaper);

    await repository.createNewspaper(newspaper).then((response) => {
      expect(response._id).toBe(1);
      expect(spy).toBeCalled();
    });
  });

  test("updateNewspaper", async () => {
    const spy = jest
      .spyOn(Newspaper.prototype, "findByIdAndUpdate")
      .mockReturnValue(newspaper);

    await repository.updateNewspaper(1, newspaper).then((response) => {
      expect(response._id).toBe(1);
      expect(spy).toBeCalledWith(1, newspaper);
    });
  });

  test("deleteNewspaper", async () => {
    const spy = jest
      .spyOn(Newspaper.prototype, "findByIdAndDelete")
      .mockReturnValue(newspaper);

    await repository.deleteNewspaper(1).then((response) => {
      expect(response._id).toBe(1);
      expect(spy).toBeCalledWith(1);
    });
  });
});
