import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import notFound from "./middlewares/not-found";
import errorMiddleware from "./middlewares/error";
import reservationRoutes from "./routes/reservation.route";
import userRoutes from "./routes/user.route";
import hallRoutes from "./routes/hall.route";
import { connectDB, MONGO_URI } from "./config";
import { fillServices } from "./models/service.model";
import "./models/user.model";
import "./models/hall.model";
import "./models/chatroom.model";
import "./models/reservation.model";
import "./models/service.model";
import "./models/message.model";
import "./models/offer.model";

const app: Express = express();
const server: http.Server = http.createServer(app);

// fillServices("640e2f4ce32728c2fb845bef");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/hall", hallRoutes);
app.use("/api/reservation", reservationRoutes);

app.use("/", (req, res) => {
  res.status(200).json({ message: "Main route" });
});

app.use(notFound);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(MONGO_URI!);
    server.listen(5000, () => {
      console.log(`Server is listening on port ${5000}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
