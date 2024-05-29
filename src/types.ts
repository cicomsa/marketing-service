import { Application } from "express";

export interface EventEmitted extends Application {
  userEmail?: string;
  eventName?: string;
}
