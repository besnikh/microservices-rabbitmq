"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const amqplib_1 = __importDefault(require("amqplib"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
let channel;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const amqpServer = 'amqp://rabbitmq:5672';
    // const amqpServer = 'amqp://guest:guest@localhost:5672';
    const connection = yield amqplib_1.default.connect(amqpServer);
    channel = yield connection.createChannel();
    yield channel.prefetch(1);
    yield channel.assertQueue('who_is_there');
    yield channel.assertQueue('i_am_here');
    // await channel.prefetch(1)
    console.log('webservice connected');
});
function jSendMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        channel.sendToQueue('who_is_there', Buffer.from(`Who's there?`));
    });
}
function useMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        jSendMessage();
        next();
    });
}
start(); // start the connection with rabbitmq
function rtFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let dt;
            channel.consume("i_am_here", (msg) => {
                dt = msg === null || msg === void 0 ? void 0 : msg.content.toString();
                console.log('from consume', msg === null || msg === void 0 ? void 0 : msg.content.toString());
                resolve(dt);
            });
        });
    });
}
app.use(useMiddleware); // use the middleware to all routes
app.get("/hello", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceName = yield rtFunction();
    res.status(200).send(serviceName);
}));
app.get('/', (req, res) => {
    res.status(200).json('Got response !');
});
app.listen(port, () => {
    console.log(`⚡️Server is running at https://localhost:${port}`);
});
