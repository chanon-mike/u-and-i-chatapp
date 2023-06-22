import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT} !`);
});
