import { EmailConfig } from "../types";
import { emailsConfig } from "./emailsConfig";

export const getEmailConfig = (eventName: string): EmailConfig[] =>
  emailsConfig[eventName];
