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
    console.log('webservice connected')
}

async function jSendMessage() {
    channel.sendToQueue('who_is_there', Buffer.from(`Who's there?`))
}

async function useMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    jSendMessage()
    next()
}

start() // start the connection with rabbitmq

async function rtFunction(): Promise<any> {
    return new Promise((resolve, reject) => {
        let dt
        channel.consume("i_am_here", (msg: ConsumeMessage | null) => {
            dt = msg?.content.toString()
            console.log('from consume', msg?.content.toString())
            resolve(dt)
        })
    })
}

app.use(useMiddleware) // use the middleware to all routes
app.get("/hello", async (req: Request, res: Response) => {
    const serviceName = await rtFunction()
    res.status(200).send(serviceName)
})

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Got response !')
})

app.listen(port, () => {
    console.log(`⚡️Server is running at https://localhost:${port}`);
});