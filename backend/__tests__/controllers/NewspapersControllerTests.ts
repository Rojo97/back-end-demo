import { PaginateModel, PaginateResult } from "mongoose";
import supertest from "supertest";
import { createServer } from "../../Server";
import { NewspaperInterface } from "../../src/models/Newspaper";

import { NewspapersService } from "../../src/services/NewspapersService";

const server = createServer().getApp();

describe("Test NewspapersController.ts", () => {
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

  test("GET /newspapers", async () => {
    const spy = jest
      .spyOn(NewspapersService.prototype, "getAllNewspapers")
      .mockReturnValueOnce(Promise.resolve(newspapersPaginated));

    await supertest(server)
      .get("/newspapers")
      .expect(200)
      .then((response) => {
        expect(response.body.docs[0]._id).toBe(1);
        expect(spy).toBeCalledWith(10, 0, {});
      });
  });

  test("GET /newspapers with limit", async () => {
    const spy = jest
      .spyOn(NewspapersService.prototype, "getAllNewspapers")
      .mockReturnValueOnce(Promise.resolve(newspapersPaginated));

    await supertest(server)
      .get("/newspapers?limit=20")
      .expect(200)
      .then((response) => {
        expect(response.body.docs[0]._id).toBe(1);
        expect(spy).toBeCalledWith(20, 0, {});
      });
  });

  test("GET /newspapers with skip", async () => {
    const spy = jest
      .spyOn(NewspapersService.prototype, "getAllNewspapers")
      .mockReturnValueOnce(Promise.resolve(newspapersPaginated));

    await supertest(server)
      .get("/newspapers?skip=1")
      .expect(200)
      .then((response) => {
        expect(response.body.docs[0]._id).toBe(1);
        expect(spy).toBeCalledWith(10, 1, {});
      });
  });

  test("GET /newspapers with title filter", async () => {
    const spy = jest
      .spyOn(NewspapersService.prototype, "getAllNewspapers")
      .mockReturnValueOnce(Promise.resolve(newspapersPaginated));

    await supertest(server)
      .get("/newspapers?title=test")
      .expect(200)
      .then((response) => {
        expect(response.body.docs[0]._id).toBe(1);
        expect(spy).toBeCalledWith(10, 0, {
          title: { $options: "i", $regex: "test" },
        });
      });
  });

  test("GET /newspapers/:id", async () => {
    const spy = jest
      .spyOn(NewspapersService.prototype, "getNewspaperById")
      .mockReturnValueOnce(Promise.resolve(newspaper));

    await supertest(server)
      .get("/newspapers/1")
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(1);
        expect(spy).toBeCalled();
      });
  });

  test("POST /newspapers", async () => {
    const spy = jest
      .spyOn(NewspapersService.prototype, "createNewspaper")
      .mockReturnValueOnce(Promise.resolve(newspaper));

    await supertest(server)
      .post("/newspapers")
      .send(newspaper)
      .expect(201)
      .then((response) => {
        expect(response.body._id).toBe(1);
        expect(spy).toBeCalledWith(newspaper);
      });
  });

  test("PUT /newspapers/:id", async () => {
    const spyGet = jest
      .spyOn(NewspapersService.prototype, "getNewspaperById")
      .mockReturnValueOnce(Promise.resolve(newspaper));

    const spyUpdate = jest
      .spyOn(NewspapersService.prototype, "updateNewspaper")
      .mockReturnValueOnce(Promise.resolve(newspaper));

    await supertest(server)
      .put("/newspapers/1")
      .send(newspaper)
      .expect(201)
      .then((response) => {
        expect(response.body._id).toBe(1);
        expect(spyGet).toBeCalled();
        expect(spyUpdate).toBeCalledWith(1, newspaper);
      });
  });

  test("PUT /newspapers/:id not found", async () => {
    const spyGet = jest
      .spyOn(NewspapersService.prototype, "getNewspaperById")
      .mockReturnValueOnce(Promise.resolve(undefined as unknown as NewspaperInterface));
    
    const spyUpdate = jest
      .spyOn(NewspapersService.prototype, "updateNewspaper")
      .mockReturnValueOnce(Promise.resolve(newspaper));

    await supertest(server)
      .put("/newspapers/1")
      .send(newspaper)
      .expect(404)
      .then(() => {
        expect(spyGet).toBeCalledWith(1);
        expect(spyUpdate).toBeCalledTimes(0);
      });
  });
});
