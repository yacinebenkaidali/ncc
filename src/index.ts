import express from "express";
import { usersRouter } from "./routes/users.js";
import path from "path";
import chalk from "chalk";
import { nanoid } from "nanoid";


const app = express();
const port = 3000;

app.use("/static", express.static(path.join(process.cwd(), "src", "public")));
app.use("/users", usersRouter);
app.use("/id", (req, res) => {
  res.status(200).send(nanoid());
});
app.use("/", (req, res) => {
  res.sendStatus(200);
});

const server = app.listen(port, () => {
  console.log();
  console.log(chalk.red(`Example app listening on port ${port}`));
});
process.on("SIGINT", () => {
  console.log("Shutting down the server");
  server.close(() => console.log("Server is down"));
});
