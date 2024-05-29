import express from "express";

export const app = express();

const port: number = 3000;

app.get("/events", function (_req, res) {
  return res
    .setHeader("Content-Type", "application/json")
    .status(200)
    .json({ message: "success" })
    .end();
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export const closeServer = () => {
  server.close();
};
