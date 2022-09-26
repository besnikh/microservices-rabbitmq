import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import client, { Connection, Channel, ConsumeMessage } from 'amqplib'


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let channel: Channel

const start = async () => {
    const amqpServer = 'amqp://rabbitmq:5672';
    // const amqpServer = 'amqp://guest:guest@localhost:5672';
    const connection: Connection = await client.connect(amqpServer);

    channel = await connection.createChannel()
    await channel.prefetch(1)

    await channel.assertQueue('who_is_there')
    await channel.assertQueue('i_am_here')
    // await channel.prefetch(1)
    console.log('webservice rabbitmq connected')
}

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Got response!')
})

app.listen(port, () => {
    console.log(`⚡️Server is running at https://localhost:${port}`);
});