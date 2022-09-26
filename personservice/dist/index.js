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
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let channel;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        // const amqpServer = process.env.RABBITMQ_URL as string;
        const amqpServer = 'amqp://rabbitmq:5672';
        // const amqpServer = 'amqp://guest:guest@localhost:5672';
        const connection = yield amqplib_1.default.connect(amqpServer);
        channel = yield connection.createChannel();
        yield channel.assertQueue("i_am_here");
        yield channel.assertQueue("who_is_there");
        // await channel.prefetch(1)
        console.log('personservice connected');
    });
}
function sndMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const dt = process.env.SERVICENAME || 'No service name';
        channel.sendToQueue("i_am_here", Buffer.from(`I'm ` + dt));
        console.log('snd message fx');
    });
}
connect()
    .then(() => {
    return channel.consume("who_is_there", (msg) => {
        console.log('got whoisthere from connect fx');
        if (msg) {
            sndMessage();
            channel.ack(msg);
        }
    });
})
    .catch((error) => {
    console.log('connect fx error', error);
});
