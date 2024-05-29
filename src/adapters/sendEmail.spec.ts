import { send } from "./sendEmail";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("sendEmail", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("should return true when email was sent succesfully", async () => {
    Math.random = jest.fn(() => 0.94);

    const sendEmailPromise = send();

    jest.runAllTimers();

    const result = await sendEmailPromise;

    expect(result).toBe(true);
  });

  it("should return false when emailfailed to be sent", async () => {
    Math.random = jest.fn(() => 0.96);

    const sendEmailPromise = send();

    jest.runAllTimers();

    const result = await sendEmailPromise;

    expect(result).toBe(false);
  });
});
