import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";

import routes from "./routes";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`[server]: Signol Server is running at http://localhost:${port}`);
});
