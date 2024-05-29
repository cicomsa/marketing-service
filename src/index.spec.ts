import request from "supertest";
import { app, closeServer } from "./";
import { sendEmail } from "./adapters/sendEmail";

jest.mock("./adapters/sendEmail");

describe("GET /events", () => {
  afterAll(() => closeServer());

  describe("when userName and eventName are not present in the query", () => {
    it("should return 400 ", async () => {
      const response = await request(app).get("/events");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error:
          "'eventName' and 'userEmail' query params are required in the query params",
      });
    });
  });

  describe("when userEmail and eventName are present in the query", () => {
    it("should return 200 and call the sendEmail adapter", async () => {
      const eventName = "nonexistentEvent";
      const userEmail = "test@example.com";

      const response = await request(app)
        .get("/events")
        .query({ name: eventName, userEmail });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Event was emitted succesfully",
      });

      await new Promise(setImmediate);

      expect(sendEmail).toHaveBeenCalled();
    });
  });
});
