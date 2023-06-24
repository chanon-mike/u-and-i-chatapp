import admin from "firebase-admin";
import { DATABASE_URL, FIREBASE_SERVER_KEY } from "../utils/envValues";
import { NextFunction, Request, Response } from "express";

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(FIREBASE_SERVER_KEY)),
});

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Split the token part, e.g.) [‘Bearer ’, ‘eyJhbGciOiJSUzI1NiIsImtpZCI6………..’]
  const token = req.header("Authorization")?.replace("Bearer", "").trim();

  try {
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decodeValue = await firebaseAdmin.auth().verifyIdToken(token);
    if (decodeValue) {
      res.locals.user = decodeValue;
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
