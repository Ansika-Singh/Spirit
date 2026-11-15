import { NextResponse } from "next/server";
import { runBuyerConcierge, ConciergeQueryInput } from "@/lib/agents";

export async function POST(req: Request) {
  try {
    const body: ConciergeQueryInput = await req.json();
    const result = await runBuyerConcierge(body);
    return NextResponse.json({ success: true, agent: "Buyer Concierge", results: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
