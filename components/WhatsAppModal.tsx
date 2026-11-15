"use client";

import React, { useState } from "react";
import { MessageSquare, Check, X, ArrowLeft, Send, ShieldCheck, Clock, AlertCircle } from "lucide-react";

export interface WhatsAppMessage {
  id: string;
  type: "bulk_deal" | "price_approval" | "new_listing";
  title: string;
  sender: string;
  timestamp: string;
  text: string;
  dealDetails?: {
    buyer: string;
    product: string;
    quantity: number;
    offeredTotal: number;
    advancePayment: number;
    deadlineDays: number;
  };
  status: "pending" | "approved" | "countered" | "declined";
  counterValue?: number;
}

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: WhatsAppMessage[];
  onAction: (id: string, action: "approve" | "counter" | "decline", counterVal?: number) => void;
}

export default function WhatsAppModal({
  isOpen,
  onClose,
  messages,
  onAction
}: WhatsAppModalProps) {
  const [selectedMsgId, setSelectedMsgId] = useState<string>(messages[0]?.id || "");
  const [counterInput, setCounterInput] = useState<string>("");
  const [showCounterBox, setShowCounterBox] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentMsg = messages.find((m) => m.id === selectedMsgId) || messages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#111B21] border border-[#202C33] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[640px]">
        {/* WhatsApp Header */}
        <div className="bg-[#202C33] px-4 py-3 flex items-center justify-between border-b border-[#2A3942]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center text-white font-bold text-lg shadow">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white text-sm">Spirit Artisan Approval Gate</h3>
                <span className="bg-[#00A884]/20 text-[#00A884] border border-[#00A884]/30 text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                  Verified Bot
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Official WhatsApp Business Channel • +91 800-SPIRIT-OK
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-[#182229] px-4 py-2 border-b border-[#2A3942] flex items-center gap-2 text-xs text-[#00A884]">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>Artisan Sovereignty Guarantee:</strong> No customer commitment is confirmed until you tap Approve below.
          </span>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0B141A] heritage-pattern">
          {/* Incoming Prompt Bubble */}
          {currentMsg && (
            <div className="flex flex-col items-start max-w-[90%]">
              <div className="bg-[#202C33] text-gray-200 p-3.5 rounded-2xl rounded-tl-sm shadow-md border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#00A884] font-semibold border-b border-[#2A3942] pb-1.5">
                  <span>{currentMsg.title}</span>
                  <span className="text-[11px] text-gray-400">{currentMsg.timestamp}</span>
                </div>

                <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed text-gray-200">
                  {currentMsg.text}
                </div>

                {currentMsg.dealDetails && (
                  <div className="bg-[#111B21] p-2.5 rounded-xl border border-white/5 text-xs space-y-1 mt-2">
                    <div className="flex justify-between text-gray-300">
                      <span>Buyer:</span>
                      <strong className="text-white">{currentMsg.dealDetails.buyer}</strong>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Batch Quantity:</span>
                      <strong className="text-[#E8A33D]">{currentMsg.dealDetails.quantity} units</strong>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Total Payout:</span>
                      <strong className="text-emerald-400">
                        ₹{currentMsg.dealDetails.offeredTotal.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>50% Material Advance:</span>
                      <strong className="text-[#00A884]">
                        ₹{currentMsg.dealDetails.advancePayment.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Required Lead Time:</span>
                      <strong className="text-amber-300">{currentMsg.dealDetails.deadlineDays} days</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Outcome */}
              {currentMsg.status !== "pending" && (
                <div className="mt-2 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  {currentMsg.status === "approved" && (
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Approved by Artisan on WhatsApp • Order Locked
                    </span>
                  )}
                  {currentMsg.status === "countered" && (
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Counter-Offer Sent: ₹{currentMsg.counterValue}
                    </span>
                  )}
                  {currentMsg.status === "declined" && (
                    <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Declined by Artisan • No buyer obligation
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Counter-offer Input Form */}
          {showCounterBox && currentMsg.status === "pending" && (
            <div className="bg-[#202C33] p-3 rounded-xl border border-amber-500/30 space-y-2 text-xs max-w-md">
              <label className="text-amber-300 font-medium">
                Enter your desired counter rate per unit (₹):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="e.g. 2800"
                  value={counterInput}
                  onChange={(e) => setCounterInput(e.target.value)}
                  className="flex-1 bg-[#111B21] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-[#E8A33D]"
                />
                <button
                  onClick={() => {
                    if (counterInput) {
                      onAction(currentMsg.id, "counter", Number(counterInput));
                      setShowCounterBox(false);
                      setCounterInput("");
                    }
                  }}
                  className="bg-[#E8A33D] text-black font-semibold px-3 py-1.5 rounded-lg hover:bg-[#F5B853] transition"
                >
                  Send Counter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Action Bottom Bar */}
        <div className="bg-[#202C33] p-3 border-t border-[#2A3942]">
          {currentMsg && currentMsg.status === "pending" ? (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onAction(currentMsg.id, "approve")}
                className="flex items-center justify-center gap-1.5 bg-[#00A884] hover:bg-[#029070] text-black font-semibold text-xs py-2.5 px-3 rounded-xl transition shadow"
              >
                <Check className="w-4 h-4" />
                <span>1. Approve Deal</span>
              </button>

              <button
                onClick={() => setShowCounterBox(!showCounterBox)}
                className="flex items-center justify-center gap-1.5 bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs py-2.5 px-3 rounded-xl transition shadow"
              >
                <Clock className="w-4 h-4" />
                <span>2. Counter-Offer</span>
              </button>

              <button
                onClick={() => onAction(currentMsg.id, "decline")}
                className="flex items-center justify-center gap-1.5 bg-red-600/80 hover:bg-red-600 text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition shadow"
              >
                <X className="w-4 h-4" />
                <span>3. Decline</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-2 text-xs text-gray-400">
              This request was resolved. Check back for new buyer inquires.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
