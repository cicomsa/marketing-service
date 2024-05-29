import request from "supertest";
import { app } from "./";
import { getEmailConfig } from "./config/getEmailConfig";
import { sendEmail } from "./actions/sendEmail";
import { send } from "./adapters/sendEmail";

const mockEmailsConfig = {
  event1: [{ delayTime: 2000 }, { delayTime: 1000 }],
};

const mockConfig = jest.fn();
jest.mock("./config/getEmailConfig", () => {
  const original = jest.requireActual("./config/getEmailConfig");
  return {
    ...original,
    getEmailConfig: jest.fn(() => mockConfig),
  };
});

const mockSend = jest.fn();
jest.mock("./adapters/sendEmail", () => {
  const original = jest.requireActual("./adapters/sendEmail");
  return {
    ...original,
    send: jest.fn(() => mockSend),
  };
});

jest.mock("./actions/sendEmail", () => {
  const original = jest.requireActual("./actions/sendEmail");
  return {
    ...original,
    sendEmail: jest.fn(),
  };
});

const mockSendEmail = sendEmail as jest.Mock;

console.log = jest.fn();

describe("GET /events", () => {
  describe("when userName and eventName are not present in the query", () => {
    beforeEach(() => jest.clearAllMocks());

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
    beforeEach(() => jest.clearAllMocks());

    it("should return 200 and not call the sendEmail adapter when event is not an email trigger", async () => {
      const eventName = "event0";
      const userEmail = "test@example.com";

      (getEmailConfig as jest.Mock).mockReturnValue(undefined);

      const response = await request(app)
        .get("/events")
        .query({ name: eventName, userEmail });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Event was emitted succesfully",
      });

      await new Promise(setImmediate);

      expect(mockSendEmail).not.toHaveBeenCalled();
    });

    it("should return 200 and call the sendEmail adapter when event is email trigger", async () => {
      jest.setTimeout(1500000);
      const eventName = "event1";
      const userEmail = "test@example.com";

      (getEmailConfig as jest.Mock).mockReturnValue([
        { delayTime: 2000 },
        { delayTime: 1000 },
      ]);

      const response = await request(app)
        .get("/events")
        .query({ name: eventName, userEmail });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Event was emitted succesfully",
      });

      await new Promise(setImmediate);

      expect(mockSendEmail).toHaveBeenCalledTimes(
        mockEmailsConfig[eventName].length,
      );
      // expect(sendEmail).toHaveBeenNthCalledWith(1, mockSend, mockEmailsConfig[eventName][0].delayTime, userEmail);
      expect(mockSendEmail).toHaveBeenLastCalledWith(
        send as jest.Mock,
        mockEmailsConfig[eventName][0].delayTime,
        userEmail,
      );
    });
  });
});
