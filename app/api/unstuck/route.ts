
import { NextResponse } from "next/server";
import { z } from "zod";
import { groq, GROQ_MODEL } from "@/lib/groq";
import { saveSessionAndAction } from "@/lib/storage";

const requestSchema = z.object({
  problem: z.string().trim().min(10).max(2000),
  clientId: z.string().uuid(),
  previousActions: z.array(z.string().max(500)).max(10).default([]),
  sessionId: z.string().regex(/^[a-f\d]{24}$/i).optional(),
});

const responseSchema = z.object({
  blocker: z.string().trim().min(1).max(300),
  action: z.string().trim().min(1).max(500),
  reason: z.string().trim().min(1).max(500),
  time: z.string().trim().min(1).max(50),
});

function normalizeAction(action: string) {
  return action
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid request data.",
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const {
      problem,
      clientId,
      previousActions,
      sessionId,
    } = validation.data;

    const previousActionsText =
      previousActions.length > 0
        ? previousActions
            .map((action, index) => `${index + 1}. ${action}`)
            .join("\n")
        : "None";

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content: `
You are Unstuck AI, a practical personal productivity assistant.

YOUR PURPOSE:
Help overwhelmed people move forward by giving them exactly ONE useful next action.

UNDERSTAND THE USER:
- Identify the biggest obstacle preventing progress.
- Understand the user's priorities and immediate situation.
- Focus on what they can realistically do right now.
- Never assume deadlines, resources, skills, or personal details that were not provided.

ACTION RULES:
- Return exactly ONE action.
- The action must be specific and immediately actionable.
- Prefer actions that take 5 to 20 minutes.
- Break large tasks into very small starting steps.
- Avoid vague suggestions.
- Do not create schedules, long plans, or multiple tasks.
- Do not suggest something the user has already completed.
- Do not repeat or rephrase previous suggestions.
- When previous actions exist, suggest a useful next step that builds on the user's progress.
- If the user is overwhelmed, reduce the amount of work rather than adding more.
- If the input is unclear, suggest a simple step to clarify the situation.

RESPONSE RULES:
- blocker: Maximum 15 words.
- action: Maximum 35 words. Give one clear instruction beginning with an action verb.
- reason: Maximum 25 words.
- time: A short estimate, such as "10 minutes".

STYLE:
- Use simple, friendly language.
- Be supportive without being overly motivational.
- Avoid unnecessary explanations.
- Never judge the user.

Previous actions to avoid:
${previousActionsText}

Return ONLY a valid JSON object.
Do not include markdown or text outside JSON.
          `,
        },
        {
          role: "user",
          content: problem,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "The AI returned an empty response." },
        { status: 502 }
      );
    }

    let parsedJson: unknown;

    try {
      parsedJson = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "The AI returned an invalid response. Please try again." },
        { status: 502 }
      );
    }

    const parsed = responseSchema.safeParse(parsedJson);

    if (!parsed.success) {
      console.error(
        "AI response validation errors:",
        parsed.error.flatten()
      );

      return NextResponse.json(
        { error: "The AI returned an invalid response. Please try again." },
        { status: 502 }
      );
    }

    const normalizedAction = normalizeAction(parsed.data.action);

    const repeatedAction = previousActions.some(
      (previousAction) =>
        normalizeAction(previousAction) === normalizedAction
    );

    if (repeatedAction) {
      return NextResponse.json(
        {
          error: "The AI repeated a previous suggestion. Please try again.",
        },
        { status: 502 }
      );
    }

    const saved = await saveSessionAndAction({
      problem,
      clientId,
      sessionId,
      ...parsed.data,
    });

    return NextResponse.json({
      ...parsed.data,
      sessionId: saved.sessionId,
      actionId: saved.actionId,
    });
  } catch (error) {
    console.error("Unstuck API error:", error);

    const apiStatus =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : null;

    if (apiStatus === 429) {
      return NextResponse.json(
        { error: "AI service is busy. Please try again shortly." },
        { status: 503 }
      );
    }

    if (apiStatus === 401) {
      return NextResponse.json(
        { error: "AI service configuration error." },
        { status: 500 }
      );
    }

    if (apiStatus !== null) {
      return NextResponse.json(
        { error: "Unable to generate your next step. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Unable to save or generate your suggestion. Please try again." },
      { status: 500 }
    );
  }
}
