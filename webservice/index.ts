import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Got response!')
})

app.listen(port, () => {
    console.log(`⚡️Server is running at https://localhost:${port}`);
});