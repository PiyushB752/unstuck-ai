import { ObjectId } from "mongodb";

export type Session = {
  _id?: ObjectId;
  problem: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Action = {
  _id?: ObjectId;
  sessionId: ObjectId;
  clientId: string;
  blocker: string;
  action: string;
  reason: string;
  time: string;
  status: "pending" | "completed";
  createdAt: Date;
  completedAt: Date | null;
};