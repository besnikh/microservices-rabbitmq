import client, { Connection, Channel, Message } from 'amqplib'
import dotenv from 'dotenv';
dotenv.config();

let channel: Channel

async function connect() {
    // const amqpServer = process.env.RABBITMQ_URL as string;
    const amqpServer = 'amqp://rabbitmq:5672';
    // const amqpServer = 'amqp://guest:guest@localhost:5672';
    const connection: Connection = await client.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("i_am_here")
    await channel.assertQueue("who_is_there")
    // await channel.prefetch(1)
    console.log('personservice connected')
}

async function sndMessage () {
    const dt: string = process.env.SERVICENAME || 'No service name'
    channel.sendToQueue("i_am_here", Buffer.from(`I'm ` + dt))
    console.log('snd message fx')
}

connect()
    .then(() => {
        return channel.consume("who_is_there", (msg: Message | null) => {
            console.log('got whoisthere from connect fx')
            if (msg) {
                sndMessage()
                channel.ack(msg)
            }
        })
    })
    .catch((error) => {
        console.log('connect fx error', error)
    })
