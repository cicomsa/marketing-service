import express from "express";
import { EventEmitted } from "./types";
import { sendEmail } from "./adapters/sendEmail";

export const app = express();

const port: number = 3000;

app.on("eventEmitted", async (args: EventEmitted) => {
  const { userEmail, eventName } = args;

  if (!eventName) {
    console.log("No event name was provided");
    return;
  }

  if (!userEmail) {
    console.log("No email address was provided");
    return;
  }

  sendEmail();
});

app.get("/events", (req, res) => {
  const eventName = req.query.name;
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

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export const closeServer = () => {
  server.close();
};
