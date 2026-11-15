import { NextResponse } from "next/server";
import { runStoryAgent, StoryAgentInput } from "@/lib/agents";

export async function POST(req: Request) {
  try {
    const body: StoryAgentInput = await req.json();
    const result = await runStoryAgent(body);
    return NextResponse.json({ success: true, agent: "Story Agent", data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
