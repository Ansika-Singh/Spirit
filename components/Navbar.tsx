"use client";

import React from "react";
import {
  Sparkles,
  ShoppingBag,
  Store,
  BarChart3,
  Bot,
  Globe2,
  Coins,
  MessageSquare,
  Award,
  GitBranch
} from "lucide-react";

interface NavbarProps {
  activeTab: "marketplace" | "artisan" | "coop" | "agents" | "ondc";
  setActiveTab: (tab: "marketplace" | "artisan" | "coop" | "agents" | "ondc") => void;
  craftPoints: number;
  unreadWhatsApp: number;
  openWhatsAppModal: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  craftPoints,
  unreadWhatsApp,
  openWhatsAppModal
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0D111A]/95 backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#D9532F] via-[#E8A33D] to-[#385185] px-4 py-1 text-center text-xs font-medium text-white shadow-inner flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto">
          <Award className="w-3.5 h-3.5 text-yellow-200" />
          <span>
            <strong>Gav Hackathon 2026</strong> • Team <strong>Dreamers</strong> (Ansika Singh & Bishnu Kumar Sardar)
          </span>
          <span className="hidden md:inline">• Multi-Agent Architecture for India&apos;s Artisans</span>
        </div>
        <a
          href="https://github.com/Ansika-Singh/Spirit"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1 bg-black/30 hover:bg-black/50 px-2 py-0.5 rounded text-[11px] transition"
        >
          <GitBranch className="w-3 h-3 text-amber-300" />
          <span>GitHub Repo</span>
        </a>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("marketplace")}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8A33D] to-[#D9532F] flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold tracking-tight text-white group-hover:text-[#E8A33D] transition">
                  Spirit
                </span>
                <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[#E8A33D] font-mono">
                  Agentic Artisan Marketplace
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Switcher Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#141923] p-1.5 rounded-xl border border-white/5 shadow-inner">
            <button
              onClick={() => setActiveTab("artisan")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === "artisan"
                  ? "bg-[#E8A33D] text-black font-semibold shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Artisan OS (Celine)</span>
            </button>

            <button
              onClick={() => setActiveTab("marketplace")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === "marketplace"
                  ? "bg-[#E8A33D] text-black font-semibold shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buyer Marketplace</span>
            </button>

            <button
              onClick={() => setActiveTab("coop")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === "coop"
                  ? "bg-[#E8A33D] text-black font-semibold shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Co-op Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("agents")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === "agents"
                  ? "bg-[#E8A33D] text-black font-semibold shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>5 Agents Studio</span>
            </button>

            <button
              onClick={() => setActiveTab("ondc")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === "ondc"
                  ? "bg-[#E8A33D] text-black font-semibold shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>ONDC Network</span>
            </button>
          </nav>

          {/* Right Actions: Craft Points & WhatsApp Gate Indicator */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Approval Notification Button */}
            <button
              onClick={openWhatsAppModal}
              title="Artisan WhatsApp Approval Gate"
              className="relative p-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition flex items-center gap-1.5 text-xs font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp Gate</span>
              {unreadWhatsApp > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#25D366] text-black text-[11px] font-bold flex items-center justify-center animate-pulse">
                  {unreadWhatsApp}
                </span>
              )}
            </button>

            {/* Craft Points Loyalty Badge */}
            <div className="flex items-center gap-1.5 bg-[#E8A33D]/10 border border-[#E8A33D]/30 px-3 py-1.5 rounded-xl text-xs font-medium text-[#F5B853]">
              <Coins className="w-4 h-4 text-[#E8A33D]" />
              <span className="font-mono font-bold">{craftPoints}</span>
              <span className="hidden sm:inline text-[11px] text-[#E8A33D]/80">Craft Points</span>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-2 border-t border-white/5 scrollbar-none">
          <button
            onClick={() => setActiveTab("artisan")}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs ${
              activeTab === "artisan" ? "bg-[#E8A33D] text-black font-bold" : "bg-[#141923] text-gray-300"
            }`}
          >
            🏺 Artisan OS
          </button>
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs ${
              activeTab === "marketplace" ? "bg-[#E8A33D] text-black font-bold" : "bg-[#141923] text-gray-300"
            }`}
          >
            🛍️ Marketplace
          </button>
          <button
            onClick={() => setActiveTab("coop")}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs ${
              activeTab === "coop" ? "bg-[#E8A33D] text-black font-bold" : "bg-[#141923] text-gray-300"
            }`}
          >
            📊 Co-op Board
          </button>
          <button
            onClick={() => setActiveTab("agents")}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs ${
              activeTab === "agents" ? "bg-[#E8A33D] text-black font-bold" : "bg-[#141923] text-gray-300"
            }`}
          >
            🤖 5 Agents Studio
          </button>
          <button
            onClick={() => setActiveTab("ondc")}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs ${
              activeTab === "ondc" ? "bg-[#E8A33D] text-black font-bold" : "bg-[#141923] text-gray-300"
            }`}
          >
            🌐 ONDC
          </button>
        </div>
      </div>
    </header>
  );
}
