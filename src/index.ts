import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import http from "http";
import notFound from "./middlewares/not-found";
import errorMiddleware from "./middlewares/error";

const app: Express = express();
const server: http.Server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

app.use("/", (req, res) => {
  res.status(200).json({ message: "Main route" });
});

app.use(notFound);
app.use(errorMiddleware);

const start = async () => {
  server.listen(5000, () => {
    console.log(`Server is listening on port ${5000}`);
  });
};

start();
