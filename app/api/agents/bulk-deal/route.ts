import { NextResponse } from "next/server";
import { runBulkDealAgent, BulkDealInput } from "@/lib/agents";

export async function POST(req: Request) {
  try {
    const body: BulkDealInput = await req.json();
    const result = await runBulkDealAgent(body);
    return NextResponse.json({ success: true, agent: "Bulk-Deal Agent", data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
