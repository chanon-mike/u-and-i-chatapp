import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.listen(process.env.PORT, function () {
    console.log(`App is listening on port ${process.env.PORT} !`);
});
