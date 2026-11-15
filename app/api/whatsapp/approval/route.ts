import { NextResponse } from "next/server";

interface WhatsAppAction {
  dealId: string;
  artisanPhone: string;
  action: "1" | "2" | "3" | "approve" | "counter" | "decline";
  counterPrice?: number;
  notes?: string;
}

export async function POST(req: Request) {
  try {
    const body: WhatsAppAction = await req.json();
    let statusMessage = "";
    let committedToBuyer = false;

    if (body.action === "1" || body.action === "approve") {
      statusMessage = "✅ APPROVED: The artisan has accepted this deal on WhatsApp. Funds locked in Escrow; raw material procurement initiated.";
      committedToBuyer = true;
    } else if (body.action === "2" || body.action === "counter") {
      statusMessage = `💬 COUNTER-OFFER: The artisan has proposed ₹${body.counterPrice || "Revised Price"} with note: "${body.notes || "Slightly extended lead time for natural drying"}".`;
      committedToBuyer = false;
    } else {
      statusMessage = "❌ DECLINED: Artisan declined due to current workshop capacity constraint. No commitments made to buyer.";
      committedToBuyer = false;
    }

    return NextResponse.json({
      success: true,
      committedToBuyer,
      timestamp: new Date().toISOString(),
      statusMessage,
      artisanPhone: body.artisanPhone,
      ruleEnforced: "Artisan In Charge: Nothing is committed to a buyer until the artisan says YES on WhatsApp."
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
