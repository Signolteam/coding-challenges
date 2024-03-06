import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import "dotenv/config";
import routes from "./routes";
dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 4000;

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(port, () => {
  console.log(`[server]: Signol Server is running at http://localhost:${port}`);
});
