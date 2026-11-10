import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db";
import type { Session, Action } from "@/types";

type SaveActionInput = {
  problem: string;
  clientId: string;
  blocker: string;
  action: string;
  reason: string;
  time: string;
  sessionId?: string;
};

export async function saveSessionAndAction(data: SaveActionInput) {
  const db = await getDatabase();
  const now = new Date();

  let sessionId: ObjectId;

  if (data.sessionId) {
    if (!ObjectId.isValid(data.sessionId)) {
      throw new Error("Invalid session ID.");
    }

    sessionId = new ObjectId(data.sessionId);

    const existingSession = await db
      .collection<Session>("sessions")
      .updateOne(
        {
          _id: sessionId,
          clientId: data.clientId,
        },
        {
          $set: { updatedAt: now },
        }
      );

    if (existingSession.matchedCount === 0) {
      throw new Error("Session not found or access denied.");
    }
  } else {
    const session: Session = {
      problem: data.problem,
      clientId: data.clientId,
      createdAt: now,
      updatedAt: now,
    };

    const sessionResult = await db
      .collection<Session>("sessions")
      .insertOne(session);

    sessionId = sessionResult.insertedId;
  }

  const action: Action = {
    sessionId,
    clientId: data.clientId,
    blocker: data.blocker,
    action: data.action,
    reason: data.reason,
    time: data.time,
    status: "pending",
    createdAt: now,
    completedAt: null,
  };

  const actionResult = await db
    .collection<Action>("actions")
    .insertOne(action);

  return {
    sessionId: sessionId.toString(),
    actionId: actionResult.insertedId.toString(),
  };
}
