import { NextResponse } from "next/server";
import { runListingAgent, ListingAgentInput } from "@/lib/agents";

export async function POST(req: Request) {
  try {
    const body: ListingAgentInput = await req.json();
    const result = await runListingAgent(body);
    return NextResponse.json({ success: true, agent: "Listing Agent", data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
