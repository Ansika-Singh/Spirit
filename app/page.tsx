"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ArtisanPortal from "@/components/ArtisanPortal";
import Marketplace from "@/components/Marketplace";
import CoopDashboard from "@/components/CoopDashboard";
import AgentsStudio from "@/components/AgentsStudio";
import OndcViewer from "@/components/OndcViewer";
import WhatsAppModal, { WhatsAppMessage } from "@/components/WhatsAppModal";
import { Sparkles, Heart, GitBranch, Award, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "marketplace" | "artisan" | "coop" | "agents" | "ondc"
  >("marketplace");

  // Global Craft Points Wallet
  const [craftPoints, setCraftPoints] = useState<number>(450);

  // WhatsApp Approval Gate State
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);
  const [whatsAppMessages, setWhatsAppMessages] = useState<WhatsAppMessage[]>([
    {
      id: "wa-101",
      type: "bulk_deal",
      title: "B2B Bulk Quote Request: 50 Bhujodi Shawls",
      sender: "FabIndia Handloom Procurement",
      timestamp: "10:42 AM",
      text: "Namaste Devji Kaka!\nFabIndia has requested a bulk production run of 50 Hand-Spun Kala Cotton Bhujodi Stoles.\n\nThe Bulk-Deal Agent has calculated a realistic lead time of 28 days with natural indigo dyeing.",
      dealDetails: {
        buyer: "FabIndia Luxury Craft Division",
        product: "Hand-Spun Kala Cotton Bhujodi Stole",
        quantity: 50,
        offeredTotal: 130000,
        advancePayment: 65000,
        deadlineDays: 28
      },
      status: "pending"
    },
    {
      id: "wa-102",
      type: "price_approval",
      title: "Pricing Agent Floor Guardrail Alert",
      sender: "Spirit Pricing Sentinel",
      timestamp: "Yesterday",
      text: "A commercial trader in Ahmedabad attempted to bid ₹1,100 for your 12-inch Blue Pottery Vase.\n\n🛡️ *BID BLOCKED AUTOMATICALLY*: Pricing Agent detected this is ₹200 below your verified ₹1,300 living-wage floor price. No compromise permitted.",
      status: "approved"
    }
  ]);

  // Handle earning points
  const handleEarnPoints = (points: number) => {
    setCraftPoints((prev) => prev + points);
  };

  // Trigger new WhatsApp notification from child components
  const handleTriggerWhatsApp = (title: string, text: string, dealDetails?: any) => {
    const newMsg: WhatsAppMessage = {
      id: `wa-${Date.now()}`,
      type: dealDetails?.quantity > 1 ? "bulk_deal" : "new_listing",
      title,
      sender: "Spirit Autonomous Notification Gate",
      timestamp: "Just now",
      text,
      dealDetails,
      status: "pending"
    };

    setWhatsAppMessages([newMsg, ...whatsAppMessages]);
    setIsWhatsAppOpen(true);
  };

  // Handle Artisan decision on WhatsApp
  const handleWhatsAppAction = (
    id: string,
    action: "approve" | "counter" | "decline",
    counterVal?: number
  ) => {
    setWhatsAppMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            status: action === "approve" ? "approved" : action === "counter" ? "countered" : "declined",
            counterValue: counterVal
          };
        }
        return msg;
      })
    );
  };

  const unreadCount = whatsAppMessages.filter((m) => m.status === "pending").length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-[#F3F4F6]">
      {/* Global Header & Role Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        craftPoints={craftPoints}
        unreadWhatsApp={unreadCount}
        openWhatsAppModal={() => setIsWhatsAppOpen(true)}
      />

      {/* Main Active Tab Content */}
      <main className="flex-1 pb-16">
        {activeTab === "marketplace" && (
          <Marketplace
            onEarnPoints={handleEarnPoints}
            onTriggerWhatsApp={handleTriggerWhatsApp}
          />
        )}

        {activeTab === "artisan" && (
          <ArtisanPortal onTriggerWhatsApp={handleTriggerWhatsApp} />
        )}

        {activeTab === "coop" && <CoopDashboard />}

        {activeTab === "agents" && (
          <AgentsStudio onTriggerWhatsApp={handleTriggerWhatsApp} />
        )}

        {activeTab === "ondc" && <OndcViewer />}
      </main>

      {/* WhatsApp Approval Modal Simulator */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        messages={whatsAppMessages}
        onAction={handleWhatsAppAction}
      />

      {/* Global Footer */}
      <footer className="border-t border-white/10 bg-[#090C12] py-8 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-white text-sm">Spirit</span>
            <span>• Built with heart for Gav Hackathon 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Team <strong>Dreamers</strong> (Ansika Singh &amp; Bishnu Kumar Sardar)
            </span>
            <a
              href="https://github.com/Ansika-Singh/Spirit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#E8A33D] hover:underline"
            >
              <GitBranch className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
