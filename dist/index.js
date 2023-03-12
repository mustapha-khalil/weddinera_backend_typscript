"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const not_found_1 = __importDefault(require("./middlewares/not-found"));
const error_1 = __importDefault(require("./middlewares/error"));
const reservation_route_1 = __importDefault(require("./routes/reservation.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const hall_route_1 = __importDefault(require("./routes/hall.route"));
const config_1 = require("./config");
require("./models/user.model");
require("./models/hall.model");
require("./models/chatroom.model");
require("./models/reservation.model");
require("./models/service.model");
require("./models/message.model");
require("./models/offer.model");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// fillServices("640e2f4ce32728c2fb845bef");
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/user", user_route_1.default);
app.use("/api/hall", hall_route_1.default);
app.use("/api/reservation", reservation_route_1.default);
app.use("/", (req, res) => {
    res.status(200).json({ message: "Main route" });
});
app.use(not_found_1.default);
app.use(error_1.default);
const start = async () => {
    try {
        await (0, config_1.connectDB)(config_1.MONGO_URI);
        server.listen(5000, () => {
            console.log(`Server is listening on port ${5000}`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
start();
