import { getEmailConfig } from "./getEmailConfig";

describe("getEmailConfig", () => {
  it("should return undefined when the email config data is not found", () => {
    const result = getEmailConfig("");
    expect(result).toBe(undefined);
  });

  it("should return the email config data when found", () => {
    const result = getEmailConfig("websiteSignup");
    expect(result).toEqual([
      {
        delayTime: 3000,
        subject: "Welcome!",
        body: "Need some socks?",
      },
    ]);
  });
});
