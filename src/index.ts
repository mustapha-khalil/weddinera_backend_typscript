console.log("heelloooooo");
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import http from "http";

const app: Express = express();
const server: http.Server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

const start = async () => {
  server.listen(5000, () => {
    console.log(`Server is listening on port ${5000}`);
  });
};

start();
