import request from "supertest";
import { app, closeServer } from "./";

describe("GET /events", () => {
  afterAll(() => closeServer());
  it("should return 200", async () => {
    const response = await request(app).get("/events");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "success" });
  });
});
