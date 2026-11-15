import { NextResponse } from "next/server";
import { runPricingAgent, PricingAgentInput } from "@/lib/agents";

export async function POST(req: Request) {
  try {
    const body: PricingAgentInput = await req.json();
    const result = await runPricingAgent(body);
    return NextResponse.json({ success: true, agent: "Pricing Agent", data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
