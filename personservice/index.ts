import client, { Connection, Channel, Message } from 'amqplib'
import dotenv from 'dotenv';
dotenv.config();

let channel: Channel

async function connect() {
    // const amqpServer = process.env.RABBITMQ_URL as string;
    const amqpServer = 'amqp://rabbitmq:5672';
    const connection: Connection = await client.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("i_am_here")
    await channel.assertQueue("who_is_there")
    console.log('personservice rabbitmq connected')
}