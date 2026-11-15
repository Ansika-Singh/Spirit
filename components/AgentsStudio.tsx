"use client";

import React, { useState } from "react";
import {
  Bot,
  Mic,
  Camera,
  DollarSign,
  Layers,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Send,
  Sliders,
  Play,
  RotateCcw
} from "lucide-react";
import {
  runStoryAgent,
  runListingAgent,
  runPricingAgent,
  runBulkDealAgent,
  runBuyerConcierge,
  StoryAgentOutput,
  ListingAgentOutput,
  PricingAgentOutput,
  BulkDealOutput,
  ConciergeMatch
} from "@/lib/agents";

interface AgentsStudioProps {
  onTriggerWhatsApp: (title: string, text: string, dealDetails?: any) => void;
}

export default function AgentsStudio({ onTriggerWhatsApp }: AgentsStudioProps) {
  const [activeAgent, setActiveAgent] = useState<
    "story" | "listing" | "pricing" | "bulk" | "concierge"
  >("story");

  // Agent 1: Story Agent State
  const [storyInput, setStoryInput] = useState({
    artisanName: "Devji Kaka Vankar",
    craftName: "Bhujodi Kala Cotton Weaving",
    language: "Gujarati / Hindi",
    village: "Bhujodi, Kutch",
    generation: "7th Generation"
  });
  const [storyResult, setStoryResult] = useState<StoryAgentOutput | null>(null);
  const [loadingStory, setLoadingStory] = useState(false);

  // Agent 2: Listing Agent State
  const [listingCategory, setListingCategory] = useState("shawl");
  const [listingNote, setListingNote] = useState("Organic rainwater Kala cotton with natural indigo plant dye");
  const [listingResult, setListingResult] = useState<ListingAgentOutput | null>(null);
  const [loadingListing, setLoadingListing] = useState(false);

  // Agent 3: Pricing Agent State
  const [pricingInput, setPricingInput] = useState({
    rawCost: 950,
    hours: 28,
    wage: 75,
    level: "master" as const
  });
  const [pricingResult, setPricingResult] = useState<PricingAgentOutput | null>(null);

  // Agent 4: Bulk-Deal Agent State
  const [bulkInput, setBulkInput] = useState({
    product: "Bhujodi Kala Cotton Shawl",
    qty: 40,
    buyerType: "boutique" as const,
    deadline: "2026-12-15"
  });
  const [bulkResult, setBulkResult] = useState<BulkDealOutput | null>(null);
  const [loadingBulk, setLoadingBulk] = useState(false);

  // Agent 5: Concierge State
  const [conciergeQuery, setConciergeQuery] = useState("Authentic tribal bell metal sculptures for art collector");
  const [conciergeMatches, setConciergeMatches] = useState<ConciergeMatch[] | null>(null);
  const [loadingConcierge, setLoadingConcierge] = useState(false);

  // Handlers
  const handleRunStory = async () => {
    setLoadingStory(true);
    try {
      const res = await runStoryAgent(storyInput);
      setStoryResult(res);
    } finally {
      setLoadingStory(false);
    }
  };

  const handleRunListing = async () => {
    setLoadingListing(true);
    try {
      const res = await runListingAgent({
        roughCategory: listingCategory,
        notesFromArtisan: listingNote
      });
      setListingResult(res);
    } finally {
      setLoadingListing(false);
    }
  };

  const handleRunPricing = async () => {
    const res = await runPricingAgent({
      rawMaterialCost: pricingInput.rawCost,
      laborHours: pricingInput.hours,
      hourlyWage: pricingInput.wage,
      masteryLevel: pricingInput.level,
      category: "weaving"
    });
    setPricingResult(res);
  };

  const handleRunBulk = async () => {
    setLoadingBulk(true);
    try {
      const res = await runBulkDealAgent({
        productTitle: bulkInput.product,
        requestedQuantity: bulkInput.qty,
        buyerType: bulkInput.buyerType,
        targetDate: bulkInput.deadline,
        maxMonthlyCapacity: 20,
        singleUnitRetailPrice: 3450,
        singleUnitWholesaleFloor: 2400,
        daysPerUnit: 4
      });
      setBulkResult(res);
    } finally {
      setLoadingBulk(false);
    }
  };

  const handleRunConcierge = async () => {
    setLoadingConcierge(true);
    try {
      const res = await runBuyerConcierge({ query: conciergeQuery });
      setConciergeMatches(res);
    } finally {
      setLoadingConcierge(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-[#141923] via-[#1A2232] to-[#141923] border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E8A33D] uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            <span>Autonomous Multi-Agent Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Spirit 5-Agent Interactive Studio
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
            Test and trigger each autonomous AI agent individually. Observe how oral voice notes, raw photos, cost telemetry, and buyer inquiries flow into structured outcomes governed by the WhatsApp Approval Gate.
          </p>
        </div>

        <div className="bg-black/30 border border-white/10 px-4 py-2.5 rounded-2xl text-xs space-y-1">
          <span className="text-[#E8A33D] font-bold block">Approval Gate Protocol:</span>
          <span className="text-gray-300">Nothing commits until artisan says YES</span>
        </div>
      </div>

      {/* Agent Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-[#141923] p-1.5 rounded-2xl border border-white/5">
        {[
          { id: "story", label: "1. Story Agent", icon: Mic, sub: "Voice → Story" },
          { id: "listing", label: "2. Listing Agent", icon: Camera, sub: "Photo → Catalog" },
          { id: "pricing", label: "3. Pricing Agent", icon: DollarSign, sub: "Costs → Fair Price" },
          { id: "bulk", label: "4. Bulk-Deal Agent", icon: Layers, sub: "RFQ → Lead Quote" },
          { id: "concierge", label: "5. Buyer Concierge", icon: Sparkles, sub: "Need → Maker" }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAgent(tab.id as any)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition text-center ${
                activeAgent === tab.id
                  ? "bg-[#E8A33D] text-black font-bold shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-semibold">{tab.label}</span>
              <span className="text-[10px] opacity-80">{tab.sub}</span>
            </button>
          );
        })}
      </div>

      {/* AGENT 1: STORY AGENT */}
      {activeAgent === "story" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="font-serif font-bold text-white text-lg flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#E8A33D]" />
              <span>Story Agent: Oral Heritage Extraction</span>
            </h3>
            <p className="text-xs text-gray-400">
              Interviews the maker in their mother tongue (via Sarvam Indic Voice), capturing folklore, motif geometry, and ancestral memory.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Artisan Name:</label>
                <input
                  type="text"
                  value={storyInput.artisanName}
                  onChange={(e) => setStoryInput({ ...storyInput, artisanName: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Craft Practice:</label>
                <input
                  type="text"
                  value={storyInput.craftName}
                  onChange={(e) => setStoryInput({ ...storyInput, craftName: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Cluster / Village:</label>
                <input
                  type="text"
                  value={storyInput.village}
                  onChange={(e) => setStoryInput({ ...storyInput, village: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Generational Lineage:</label>
                <input
                  type="text"
                  value={storyInput.generation}
                  onChange={(e) => setStoryInput({ ...storyInput, generation: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <button
                onClick={handleRunStory}
                disabled={loadingStory}
                className="w-full bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4" />
                <span>{loadingStory ? "Extracting Oral Narrative..." : "Execute Story Agent"}</span>
              </button>
            </div>
          </div>

          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            {storyResult ? (
              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 border-b border-white/10 pb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Story Agent Synthesis Complete</span>
                </h4>

                <div className="bg-amber-500/10 border-l-4 border-[#E8A33D] p-3 rounded-r-xl">
                  <p className="italic text-white text-xs">{storyResult.storyQuote}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 uppercase text-[10px] block font-mono">Artisan Biography:</span>
                  <p className="text-gray-300 leading-relaxed bg-[#0B0F17] p-3 rounded-xl border border-white/5">
                    {storyResult.artisanBio}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 uppercase text-[10px] block font-mono">Motif Symbolism Extracted:</span>
                  <ul className="list-disc pl-4 space-y-1 text-gray-300">
                    {storyResult.motifSymbolism.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 uppercase text-[10px] block font-mono">Video Reel Script Generated:</span>
                  <div className="space-y-1 bg-[#0B0F17] p-2.5 rounded-xl border border-white/5 font-mono text-[11px]">
                    {storyResult.reelsScript.map((sc, i) => (
                      <div key={i} className="text-gray-300">
                        <strong className="text-amber-400">Scene {i + 1}:</strong> {sc.scene}
                        <br />
                        <span className="text-gray-400 italic">&quot;{sc.voiceover}&quot;</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <Mic className="w-10 h-10 mx-auto text-gray-600 mb-2" />
                <p>Run the Story Agent to convert oral history into e-commerce storytelling &amp; social reels.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AGENT 2: LISTING AGENT */}
      {activeAgent === "listing" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="font-serif font-bold text-white text-lg flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#E8A33D]" />
              <span>Listing Agent: Multimodal Vision Parser</span>
            </h3>
            <p className="text-xs text-gray-400">
              Converts raw phone photographs into factual, studio-grade listings without exaggeration or hallucination.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Select Craft Category:</label>
                <select
                  value={listingCategory}
                  onChange={(e) => setListingCategory(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option value="shawl">Handloom Shawl (Weaving)</option>
                  <option value="vase">Quartz Blue Pottery Vase (Pottery)</option>
                  <option value="bronze">Lost-Wax Bronze Sculpture (Metal)</option>
                  <option value="toy">Channapatna Wooden Toy (Wood)</option>
                  <option value="painting">Fine-Line Mithila Painting (Painting)</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Artisan Notes / Raw Words:</label>
                <textarea
                  rows={3}
                  value={listingNote}
                  onChange={(e) => setListingNote(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <button
                onClick={handleRunListing}
                disabled={loadingListing}
                className="w-full bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4" />
                <span>{loadingListing ? "Analyzing Craft Image..." : "Execute Listing Agent"}</span>
              </button>
            </div>
          </div>

          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            {listingResult ? (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <h4 className="font-bold text-white text-sm">{listingResult.title}</h4>
                  <span className="text-emerald-400 font-mono text-[11px]">
                    Faithfulness: {listingResult.faithfulnessScore}%
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed bg-[#0B0F17] p-3 rounded-xl border border-white/5">
                  {listingResult.detailedDescription}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-[10px] block">Technique</span>
                    <strong className="text-white">{listingResult.craftTechnique}</strong>
                  </div>
                  <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-[10px] block">Dimensions</span>
                    <strong className="text-white">{listingResult.dimensions}</strong>
                  </div>
                </div>

                <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-white/5">
                  <span className="text-gray-400 text-[10px] block">Materials Verified</span>
                  <strong className="text-[#E8A33D]">{listingResult.materials.join(" • ")}</strong>
                </div>

                <button
                  onClick={() => {
                    onTriggerWhatsApp(
                      "NEW LISTING APPROVAL",
                      `Please approve listing: ${listingResult.title}`,
                      { buyer: "Direct Store", product: listingResult.title, quantity: 1, offeredTotal: 3450, advancePayment: 3450, deadlineDays: 4 }
                    );
                    alert("Listing dispatched to WhatsApp Approval Gate!");
                  }}
                  className="w-full bg-[#25D366] text-black font-bold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to WhatsApp Gate for Confirmation</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <Camera className="w-10 h-10 mx-auto text-gray-600 mb-2" />
                <p>Run the Listing Agent to generate title, materials, dimensions, and SEO tags.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AGENT 3: PRICING AGENT */}
      {activeAgent === "pricing" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="font-serif font-bold text-white text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#E8A33D]" />
              <span>Pricing Agent: Fair Floor &amp; Market Benchmark</span>
            </h3>
            <p className="text-xs text-gray-400">
              Evaluates raw material procurement costs, labor hours, and artisan mastery to set an uncompromising floor price.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Raw Materials (₹):</span>
                  <strong className="text-amber-400 font-mono">₹{pricingInput.rawCost}</strong>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={pricingInput.rawCost}
                  onChange={(e) => setPricingInput({ ...pricingInput, rawCost: Number(e.target.value) })}
                  className="w-full accent-[#E8A33D]"
                />
              </div>

              <div>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Labor Hours:</span>
                  <strong className="text-amber-400 font-mono">{pricingInput.hours} hrs</strong>
                </div>
                <input
                  type="range"
                  min="4"
                  max="60"
                  step="2"
                  value={pricingInput.hours}
                  onChange={(e) => setPricingInput({ ...pricingInput, hours: Number(e.target.value) })}
                  className="w-full accent-[#E8A33D]"
                />
              </div>

              <div>
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Fair Living Wage Standard:</span>
                  <strong className="text-emerald-400 font-mono">₹{pricingInput.wage}/hr</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="120"
                  step="5"
                  value={pricingInput.wage}
                  onChange={(e) => setPricingInput({ ...pricingInput, wage: Number(e.target.value) })}
                  className="w-full accent-[#E8A33D]"
                />
              </div>

              <button
                onClick={handleRunPricing}
                className="w-full bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2 mt-4"
              >
                <DollarSign className="w-4 h-4" />
                <span>Calculate Pricing Model</span>
              </button>
            </div>
          </div>

          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            {pricingResult ? (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <h4 className="font-bold text-white text-sm">Pricing Breakdown</h4>
                  <span className="text-emerald-400 font-mono text-xs font-bold">
                    Artisan Retains {pricingResult.marginToArtisan}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0B0F17] p-3 rounded-xl border border-amber-500/30">
                    <span className="text-[10px] text-gray-400 block font-mono">ABSOLUTE FLOOR</span>
                    <strong className="text-xl font-mono text-amber-400">
                      ₹{pricingResult.floorPrice.toLocaleString("en-IN")}
                    </strong>
                  </div>
                  <div className="bg-[#0B0F17] p-3 rounded-xl border border-emerald-500/30">
                    <span className="text-[10px] text-gray-400 block font-mono">RECOMMENDED RETAIL</span>
                    <strong className="text-xl font-mono text-emerald-400">
                      ₹{pricingResult.suggestedRetailPrice.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between text-red-300 font-bold">
                    <span>Trader Store Price:</span>
                    <span className="font-mono text-white">₹{pricingResult.traderBenchmarkPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-gray-300 text-[11px]">
                    Exploitation avoided: ₹{pricingResult.economicBreakdown.middlemanExploitationPrevented.toLocaleString("en-IN")} kept in the artisan community!
                  </p>
                </div>

                <p className="text-gray-300 leading-relaxed bg-[#0B0F17] p-3 rounded-xl border border-white/5 text-[11px]">
                  {pricingResult.explanation}
                </p>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <DollarSign className="w-10 h-10 mx-auto text-gray-600 mb-2" />
                <p>Run the Pricing Agent to calculate fair living wage floors and expose broker markups.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AGENT 4: BULK-DEAL AGENT */}
      {activeAgent === "bulk" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="font-serif font-bold text-white text-lg flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#E8A33D]" />
              <span>Bulk-Deal Agent: Capacity &amp; RFQ Drafter</span>
            </h3>
            <p className="text-xs text-gray-400">
              Evaluates monthly handcraft throughput, calculates genuine lead times, and formulates fair volume quotes.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 block mb-1">Product:</label>
                <input
                  type="text"
                  value={bulkInput.product}
                  onChange={(e) => setBulkInput({ ...bulkInput, product: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Quantity Requested:</label>
                <input
                  type="number"
                  min="10"
                  max="200"
                  value={bulkInput.qty}
                  onChange={(e) => setBulkInput({ ...bulkInput, qty: Number(e.target.value) })}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Buyer Type:</label>
                <select
                  value={bulkInput.buyerType}
                  onChange={(e: any) => setBulkInput({ ...bulkInput, buyerType: e.target.value })}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option value="boutique">Luxury Retail Boutique</option>
                  <option value="corporate">Corporate Festive Gifting</option>
                  <option value="wedding">Wedding Favors</option>
                  <option value="export">Overseas Fair-Trade</option>
                </select>
              </div>

              <button
                onClick={handleRunBulk}
                disabled={loadingBulk}
                className="w-full bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2 mt-4"
              >
                <Play className="w-4 h-4" />
                <span>{loadingBulk ? "Calculating Production Run..." : "Execute Bulk-Deal Agent"}</span>
              </button>
            </div>
          </div>

          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            {bulkResult ? (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-bold text-white">Bulk Proposal Ready</span>
                  <span className="text-emerald-400 font-mono">
                    Total: ₹{bulkResult.totalQuoteAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-[10px] block">Lead Time</span>
                    <strong className="text-amber-400 font-mono text-sm">
                      {bulkResult.realisticLeadDays} days ({bulkResult.completionDate})
                    </strong>
                  </div>
                  <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-[10px] block">Unit Price (Discount)</span>
                    <strong className="text-emerald-400 font-mono text-sm">
                      ₹{bulkResult.quotedUnitPrice} (-{bulkResult.discountPercentage}%)
                    </strong>
                  </div>
                </div>

                {/* WhatsApp Approval Draft */}
                <div className="bg-[#0B141A] p-3 rounded-xl border border-[#00A884]/30 space-y-1 font-mono text-[11px] text-gray-300 whitespace-pre-line">
                  {bulkResult.whatsappApprovalDraft}
                </div>

                <button
                  onClick={() => {
                    onTriggerWhatsApp(
                      `BULK QUOTE: ${bulkInput.qty} UNITS`,
                      bulkResult.whatsappApprovalDraft,
                      {
                        buyer: bulkInput.buyerType.toUpperCase(),
                        product: bulkInput.product,
                        quantity: bulkInput.qty,
                        offeredTotal: bulkResult.totalQuoteAmount,
                        advancePayment: Math.round(bulkResult.totalQuoteAmount * 0.5),
                        deadlineDays: bulkResult.realisticLeadDays
                      }
                    );
                    alert("Bulk quote draft pushed to WhatsApp Approval Gate!");
                  }}
                  className="w-full bg-[#25D366] text-black font-bold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to Artisan WhatsApp for Decision</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <Layers className="w-10 h-10 mx-auto text-gray-600 mb-2" />
                <p>Run the Bulk-Deal Agent to compute lead times, volume discounts, and payment escrow stages.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AGENT 5: BUYER CONCIERGE */}
      {activeAgent === "concierge" && (
        <div className="space-y-6">
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="font-serif font-bold text-white text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E8A33D]" />
              <span>Buyer Concierge: Aesthetic &amp; Heritage Matchmaking</span>
            </h3>
            <p className="text-xs text-gray-400">
              Matches customer aesthetics, budgets, and cultural preferences directly to master craftspeople.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={conciergeQuery}
                onChange={(e) => setConciergeQuery(e.target.value)}
                placeholder="Ask Concierge: e.g. 'Handmade gifts under ₹2,000 for Diwali'"
                className="flex-1 bg-[#0B0F17] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
              />
              <button
                onClick={handleRunConcierge}
                disabled={loadingConcierge}
                className="bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loadingConcierge ? "Searching..." : "Match Crafts"}</span>
              </button>
            </div>
          </div>

          {conciergeMatches && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conciergeMatches.map((m) => (
                <div key={m.productId} className="bg-[#141923] border border-white/10 rounded-2xl p-5 shadow space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-emerald-400">
                      {m.matchScore}% Aesthetic Match
                    </span>
                    <span className="font-mono font-bold text-amber-400">
                      ₹{m.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{m.productTitle}</h4>
                  <p className="text-xs text-[#E8A33D]">{m.artisanName} • {m.cluster}</p>
                  <p className="text-xs text-gray-300 italic">{m.matchReason}</p>
                  <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-white/5 text-[11px] text-gray-400">
                    {m.provenanceSummary}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
