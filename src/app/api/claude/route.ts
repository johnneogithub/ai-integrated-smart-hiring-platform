// app/api/claude/route.ts

import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const API_KEY = process.env.ANTHROPIC_API_KEY;
const AGENT_ID = process.env.ANTHROPIC_AGENT_ID;

export async function POST(request: NextRequest) {
  try {
    // Validate configuration
    if (!API_KEY) {
      console.error("ERROR: ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured. Check .env.local file." },
        { status: 500 }
      );
    }

    if (!AGENT_ID) {
      console.error("ERROR: NEXT_PUBLIC_AGENT_ID is not set");
      return NextResponse.json(
        { error: "Agent ID not configured. Check .env.local file." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages must be an array" },
        { status: 400 }
      );
    }

    console.log("Calling Claude Agent API...");
    console.log("Agent ID:", AGENT_ID);
    console.log("URL:", ANTHROPIC_API_URL);

    // Call Claude Agent API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1024,
        messages,
      }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", {
      contentType: response.headers.get("content-type"),
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response received:", text.substring(0, 500));
      return NextResponse.json(
        {
          error: "Invalid response from Claude API",
          details: text.substring(0, 200),
          status: response.status,
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      console.error("Claude API Error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Claude API error", details: data },
        { status: response.status }
      );
    }

    console.log("Success! Response from Claude:", {
      contentLength: JSON.stringify(data).length,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
