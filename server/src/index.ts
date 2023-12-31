import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./modules/user/user.route";
import messageRoute from "./modules/message/message.route";
import conversationRoute from "./modules/conversation/conversation.route";
import { CORS_ORIGIN, PORT } from "./utils/envValues";
import { decodeToken } from "./middlewares/firebaseAdmin";

dotenv.config();

const app = express();

const corsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(decodeToken);

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversation", conversationRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`);
});

// global.onlineUsers = new Map();
