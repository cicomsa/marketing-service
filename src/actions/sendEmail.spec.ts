import { sendEmail } from "./sendEmail";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

const actionMock = jest.fn();
console.log = jest.fn();

describe("sendEmail action", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it("should wait for the specified delay time before sending the email", async () => {
    const delayTime = 1000;
    const userEmail = "test@example.com";

    actionMock.mockResolvedValue(true);

    const promise = sendEmail(actionMock, delayTime, userEmail);

    expect(actionMock).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(delayTime);

    await promise;

    expect(actionMock).toHaveBeenCalled();
  });

  it("should log the appropriate messages when the email is sent successfully", async () => {
    const delayTime = 1000;
    const userEmail = "test@example.com";

    actionMock.mockResolvedValue(true);

    const promise = sendEmail(actionMock, delayTime, userEmail);

    await jest.advanceTimersByTimeAsync(delayTime);

    await promise;

    expect(console.log).toHaveBeenNthCalledWith(
      1,
      `Awaiting ${delayTime} miliseconds`,
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      `Sending email to ${userEmail}`,
    );
    expect(console.log).toHaveBeenNthCalledWith(
      3,
      `Email was succesfully sent to user with email ${userEmail}`,
    );
  });

  it("should log the appropriate messages when the email fails to be sent", async () => {
    const delayTime = 1000;
    const userEmail = "test@example.com";

    actionMock.mockResolvedValue(false);

    const promise = sendEmail(actionMock, delayTime, userEmail);

    await jest.advanceTimersByTimeAsync(delayTime);

    await promise;

    expect(console.log).toHaveBeenNthCalledWith(
      1,
      `Awaiting ${delayTime} miliseconds`,
    );
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      `Sending email to ${userEmail}`,
    );
    expect(console.log).toHaveBeenNthCalledWith(
      3,
      `Email failed to be sent to user with email ${userEmail}`,
    );
  });
});
