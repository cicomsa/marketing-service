import { EmailConfig } from "../types";

export const emailsConfig: Record<string, EmailConfig[]> = {
  websiteSignup: [
    {
      delayTime: 3000,
      subject: "Welcome!",
      body: "Need some socks?",
    },
  ],
  socksPurchased: [
    {
      delayTime: 0,
      subject: "Payment received!",
      body: "Thank you!",
    },
    {
      delayTime: 0,
      subject: "Socks dispatched!",
      body: "Get ready!",
    },
  ],
};
