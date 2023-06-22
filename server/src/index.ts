import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import decodeToken from './middlewares/decodeToken';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(decodeToken);
// app.use('api/auth/', auth);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.get('/test/', (req: Request, res: Response) => {
  console.log(req.headers);

  return res.json({
    test: 'TEST',
  });
});

app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${process.env.PORT} !`);
});
