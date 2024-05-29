import express from "express";
import { EventEmitted } from "./types";
import { send } from "./adapters/sendEmail";
import { sendEmail } from "./actions/sendEmail";
import { getEmailConfig } from "./config/getEmailConfig";

export const app = express();

app.on("eventEmitted", async (args: EventEmitted) => {
  const { userEmail, eventName } = args;

  if (!eventName) {
    console.log("No event name was provided");
    return;
  }

  const emailConfig = getEmailConfig(eventName);

  if (!emailConfig) {
    console.log("Event is not an email action trigger");
    return;
  }

  if (!userEmail) {
    console.log("No email address was provided");
    return;
  }

  emailConfig
    .sort((a, b) => a.delayTime - b.delayTime)
    .forEach((config) => sendEmail(send, config.delayTime, userEmail));
});

app.get("/events", (req, res) => {
  const eventName = req.query.eventName;
  const userEmail = req.query.userEmail;

  if (!eventName || !userEmail) {
    return res
      .setHeader("Content-Type", "application/json")
      .status(400)
      .json({
        error:
          "'eventName' and 'userEmail' query params are required in the query params",
      })
      .end();
  }

  app.emit("eventEmitted", { eventName, userEmail });

  return res
    .setHeader("Content-Type", "application/json")
    .status(200)
    .json({ message: "Event was emitted succesfully" })
    .end();
});
