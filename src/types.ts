import { Application } from "express";

export interface EventEmitted extends Application {
  userEmail?: string;
  eventName?: string;
}

export interface EmailConfig {
  delayTime: number;
  subject: string;
  body: string;
}
