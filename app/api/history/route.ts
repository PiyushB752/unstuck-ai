import { NextResponse } from "next/server";
import { z } from "zod";
import { getDatabase } from "@/lib/db";
import type { Action, Session } from "@/types";

const querySchema = z.string().uuid();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const validation = querySchema.safeParse(
      searchParams.get("clientId")
    );

    if (!validation.success) {
      return NextResponse.json(
        { error: "A valid client ID is required." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const clientId = validation.data;

    const sessions = await db
      .collection<Session>("sessions")
      .find({ clientId })
      .sort({ updatedAt: -1 })
      .limit(50)
      .toArray();

    const actions = await db
      .collection<Action>("actions")
      .find({ clientId })
      .sort({ createdAt: -1 })
      .toArray();

    const history = sessions.map((session) => {
      const sessionActions = actions
        .filter(
          (action) =>
            action.sessionId.toString() === session._id?.toString()
        )
        .map((action) => ({
          id: action._id?.toString(),
          blocker: action.blocker,
          action: action.action,
          reason: action.reason,
          time: action.time,
          status:
            action.status === "completed" ? "Completed" : "Pending",
          createdAt: action.createdAt.toISOString(),
        }));

      return {
        id: session._id?.toString(),
        problem: session.problem,
        createdAt: session.createdAt.toISOString(),
        actions: sessionActions,
      };
    });

    return NextResponse.json({ history });
  } catch (error) {
    console.error("History API error:", error);

    return NextResponse.json(
      { error: "Unable to load your history." },
      { status: 500 }
    );
  }
}