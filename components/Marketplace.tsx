"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Sparkles,
  QrCode,
  ShieldCheck,
  Award,
  Layers,
  MapPin,
  TrendingDown,
  Coins,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  X,
  Volume2,
  Clock,
  Compass
} from "lucide-react";
import { PRODUCTS, ARTISANS, CraftProduct, Artisan } from "@/data/seedData";
import { runBulkDealAgent, runBuyerConcierge, BulkDealOutput, ConciergeMatch } from "@/lib/agents";

interface MarketplaceProps {
  onEarnPoints: (points: number) => void;
  onTriggerWhatsApp: (title: string, text: string, dealDetails?: any) => void;
}

export default function Marketplace({ onEarnPoints, onTriggerWhatsApp }: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [activeProduct, setActiveProduct] = useState<CraftProduct | null>(null);
  const [showProvenanceModal, setShowProvenanceModal] = useState<boolean>(false);
  const [showUpiModal, setShowUpiModal] = useState<boolean>(false);
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);

  // UPI Simulation state
  const [isProcessingUpi, setIsProcessingUpi] = useState<boolean>(false);
  const [upiSuccess, setUpiSuccess] = useState<boolean>(false);

  // Bulk RFQ state (Bulk-Deal Agent)
  const [bulkQty, setBulkQty] = useState<number>(30);
  const [bulkBuyerType, setBulkBuyerType] = useState<"boutique" | "corporate" | "export" | "wedding">("boutique");
  const [bulkDeadline, setBulkDeadline] = useState<string>("2026-12-20");
  const [bulkQuoteResult, setBulkQuoteResult] = useState<BulkDealOutput | null>(null);
  const [isCalculatingBulk, setIsCalculatingBulk] = useState<boolean>(false);

  // Buyer Concierge AI state
  const [conciergeQuery, setConciergeQuery] = useState<string>("");
  const [conciergeResults, setConciergeResults] = useState<ConciergeMatch[] | null>(null);
  const [isSearchingConcierge, setIsSearchingConcierge] = useState<boolean>(false);

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cluster.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Handle Instant UPI Checkout
  const handleSimulateUpi = () => {
    if (!activeProduct) return;
    setIsProcessingUpi(true);
    setUpiSuccess(false);

    setTimeout(() => {
      setIsProcessingUpi(false);
      setUpiSuccess(true);
      onEarnPoints(activeProduct.craftPointsAwarded);

      // Play Soundbox Audio notification simulation
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } catch (e) {
        // Fallback silently if audio context restricted
      }
    }, 1500);
  };

  // Run Bulk Deal Agent
  const handleCalculateBulkQuote = async () => {
    if (!activeProduct) return;
    setIsCalculatingBulk(true);
    try {
      const result = await runBulkDealAgent({
        productTitle: activeProduct.title,
        requestedQuantity: bulkQty,
        buyerType: bulkBuyerType,
        targetDate: bulkDeadline,
        maxMonthlyCapacity: activeProduct.maxMonthlyCapacity,
        singleUnitRetailPrice: activeProduct.price,
        singleUnitWholesaleFloor: activeProduct.minWholesalePrice,
        daysPerUnit: activeProduct.productionDays
      });
      setBulkQuoteResult(result);
    } finally {
      setIsCalculatingBulk(false);
    }
  };

  // Submit Bulk Quote to Artisan WhatsApp
  const handleSubmitBulkToArtisan = () => {
    if (!activeProduct || !bulkQuoteResult) return;
    onTriggerWhatsApp(
      `BULK ORDER INQUIRY: ${bulkQty} UNITS`,
      bulkQuoteResult.whatsappApprovalDraft,
      {
        buyer: `${bulkBuyerType.toUpperCase()} Buyer`,
        product: activeProduct.title,
        quantity: bulkQty,
        offeredTotal: bulkQuoteResult.totalQuoteAmount,
        advancePayment: Math.round(bulkQuoteResult.totalQuoteAmount * 0.5),
        deadlineDays: bulkQuoteResult.realisticLeadDays
      }
    );
    setShowBulkModal(false);
    alert("Bulk request sent directly to the Artisan's WhatsApp! Check the top WhatsApp Gate to see the approval prompt.");
  };

  // Run Buyer Concierge AI Query
  const handleConciergeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeQuery.trim()) return;
    setIsSearchingConcierge(true);
    try {
      const results = await runBuyerConcierge({ query: conciergeQuery });
      setConciergeResults(results);
    } finally {
      setIsSearchingConcierge(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-r from-[#141923] via-[#1C2538] to-[#141923] p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E8A33D]/20 border border-[#E8A33D]/30 px-3 py-1 rounded-full text-xs font-semibold text-[#F5B853]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero Middlemen • 100% Artisan Provenance Verified</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Every craft with its maker, its story and a fair price.
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Discover authentic Indian handlooms, terracotta, bell-metal, and folk art direct from verified master artisans. Traders keep up to 80% of retail margins — on Spirit, your payment goes directly into the artisan&apos;s hands with verified GI provenance cards.
          </p>

          {/* Concierge Search Bar (Agent 5) */}
          <form onSubmit={handleConciergeSearch} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ask Concierge: e.g. 'Handmade gifts under ₹2,000 for Diwali'"
                value={conciergeQuery}
                onChange={(e) => setConciergeQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0B0F17]/90 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#E8A33D]"
              />
            </div>
            <button
              type="submit"
              disabled={isSearchingConcierge}
              className="bg-gradient-to-r from-[#E8A33D] to-[#D9532F] hover:opacity-95 text-black font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSearchingConcierge ? "Matching..." : "Ask Concierge"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Concierge Results Overlay (if active) */}
      {conciergeResults && (
        <div className="bg-[#141923] border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E8A33D]" />
              <h3 className="text-base font-bold text-white">Agent 5: Buyer Concierge Recommendations</h3>
            </div>
            <button
              onClick={() => setConciergeResults(null)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Clear Results
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conciergeResults.slice(0, 3).map((match) => (
              <div key={match.productId} className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-emerald-400">
                    {match.matchScore}% Aesthetic Match
                  </span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    ₹{match.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm line-clamp-1">{match.productTitle}</h4>
                <p className="text-xs text-[#E8A33D]">{match.artisanName} • {match.cluster}</p>
                <p className="text-xs text-gray-300 italic">{match.matchReason}</p>
                <button
                  onClick={() => {
                    const prod = PRODUCTS.find((p) => p.id === match.productId);
                    if (prod) {
                      setActiveProduct(prod);
                      setShowProvenanceModal(true);
                    }
                  }}
                  className="w-full mt-2 bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg transition font-medium"
                >
                  Inspect Provenance Card
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Pills & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Master Crafts" },
            { id: "weaving", label: "Handloom Weaving" },
            { id: "pottery", label: "Blue Pottery" },
            { id: "metal", label: "Dhokra Bell-Metal" },
            { id: "wood", label: "Channapatna Woodcraft" },
            { id: "painting", label: "Madhubani Folk Art" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
                selectedCategory === cat.id
                  ? "bg-[#E8A33D] text-black font-semibold shadow-md"
                  : "bg-[#141923] text-gray-300 hover:text-white border border-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-gray-400 font-mono">
          Showing {filteredProducts.length} Authenticated Masterpieces
        </div>
      </div>

      {/* Craft Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => {
          const artisan = ARTISANS.find((a) => a.id === prod.artisanId);
          const buyerSavings = prod.traderMarketPrice - prod.price;

          return (
            <div
              key={prod.id}
              className="bg-[#141923] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/40 transition group flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {prod.verifiedGi && (
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-amber-500/40 text-[#E8A33D] text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#E8A33D]" />
                      <span>GI Certified</span>
                    </span>
                  )}
                  <span className="absolute top-3 right-3 bg-[#E8A33D]/90 backdrop-blur-md text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    <span>+{prod.craftPointsAwarded} pts</span>
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E8A33D]" />
                      <span>{prod.cluster}</span>
                    </span>
                    <span className="capitalize text-amber-300 font-mono text-[11px]">
                      {prod.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-white text-base leading-snug line-clamp-2">
                    {prod.title}
                  </h3>

                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Maker Badge */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <img
                      src={artisan?.avatar}
                      alt={prod.artisanName}
                      className="w-7 h-7 rounded-full object-cover border border-[#E8A33D]"
                    />
                    <div className="text-xs">
                      <span className="text-white font-medium block">{prod.artisanName}</span>
                      <span className="text-gray-400 text-[10px]">{artisan?.generation}</span>
                    </div>
                  </div>

                  {/* Price & Exploitation Comparison */}
                  <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-mono block">Direct Price</span>
                        <span className="text-xl font-bold font-mono text-emerald-400">
                          ₹{prod.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 line-through block font-mono">
                          Trader: ₹{prod.traderMarketPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-400">
                          You save ₹{buyerSavings.toLocaleString("en-IN")} (55%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setActiveProduct(prod);
                      setShowProvenanceModal(true);
                    }}
                    className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-2.5 rounded-xl border border-white/10 transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E8A33D]" />
                    <span>Provenance</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveProduct(prod);
                      setShowBulkModal(true);
                      setBulkQty(30);
                      setBulkQuoteResult(null);
                    }}
                    className="flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-amber-300 text-xs font-semibold py-2.5 rounded-xl border border-amber-500/20 transition"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Bulk Quote</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setActiveProduct(prod);
                    setShowUpiModal(true);
                    setUpiSuccess(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#E8A33D] hover:bg-[#F5B853] text-black text-xs font-bold py-2.5 rounded-xl transition shadow"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Direct UPI Checkout</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CRAFT TRAILS DISCOVERY SECTION */}
      <div className="bg-[#141923] border border-white/10 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E8A33D] uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Heritage Craft Tourism</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              Explore India&apos;s Living Craft Trails
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              Visit generational craft villages, learn from master artisans, and earn Craft Points on your passport.
            </p>
          </div>

          <button
            onClick={() => {
              onEarnPoints(50);
              alert("Checked in to Kutch Craft Trail! +50 Craft Points earned.");
            }}
            className="flex items-center gap-2 bg-[#E8A33D]/20 text-[#E8A33D] border border-[#E8A33D]/30 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#E8A33D]/30 transition self-start sm:self-auto"
          >
            <Coins className="w-4 h-4" />
            <span>Virtual Trail Check-in (+50 pts)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              trail: "The Rann Loom Trail",
              cluster: "Bhujodi, Kutch",
              craft: "Kala Cotton & Indigo Dyeing",
              badge: "GI Protected"
            },
            {
              trail: "Persian Glaze Trail",
              cluster: "Kot Jewar, Jaipur",
              craft: "Quartz Faience Ceramics",
              badge: "Royal Heritage"
            },
            {
              trail: "Lost-Wax Forest Trail",
              cluster: "Kondagaon, Bastar",
              craft: "Dhokra Bell-Metal Casting",
              badge: "4000-Yr Ancestry"
            },
            {
              trail: "Toy Town Lathe Trail",
              cluster: "Ramanagara, Karnataka",
              craft: "Vegetal Lac Wood Turning",
              badge: "Child-Safe Living"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 space-y-2">
              <span className="text-[10px] text-amber-400 font-semibold uppercase">{item.badge}</span>
              <h4 className="font-bold text-white text-sm">{item.trail}</h4>
              <p className="text-xs text-gray-400">{item.cluster}</p>
              <p className="text-xs text-gray-300 italic">{item.craft}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: PROVENANCE PASSPORT CARD
         ───────────────────────────────────────────────────────────── */}
      {showProvenanceModal && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#141923] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E8A33D] font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verifiable Provenance Passport</span>
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  {activeProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setShowProvenanceModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-300">
              {/* Provenance Hash & GI */}
              <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[11px]">
                <div>
                  <span className="text-gray-400 block text-[10px]">PROVENANCE LEDGER ID:</span>
                  <span className="text-[#E8A33D] font-bold">{activeProduct.provenanceHash}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">GEOGRAPHICAL INDICATION:</span>
                  <span className="text-emerald-400 font-bold">Govt. Certified GI</span>
                </div>
              </div>

              {/* Maker Story & Quote */}
              <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-xl border-l-4 border-[#E8A33D] space-y-1">
                <p className="text-white font-serif italic text-sm">
                  &quot;{activeProduct.storySnippet}&quot;
                </p>
                <span className="text-gray-400 text-[11px] block">
                  — {activeProduct.artisanName}, {activeProduct.cluster}
                </span>
              </div>

              {/* Materials & Technique */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Craft Technique</span>
                  <strong className="text-white block">{activeProduct.craftTechnique}</strong>
                </div>
                <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-gray-400 text-[10px] uppercase block">Natural Materials</span>
                  <strong className="text-white block">{activeProduct.materials.join(", ")}</strong>
                </div>
              </div>

              {/* Cost Transparency Breakdown */}
              <div className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 space-y-2">
                <h4 className="text-white font-semibold text-xs border-b border-white/5 pb-1.5 flex justify-between">
                  <span>Fair Living Wage Transparency Breakdown</span>
                  <span className="text-emerald-400 font-mono">100% Direct</span>
                </h4>
                <div className="space-y-1 text-gray-300">
                  <div className="flex justify-between">
                    <span>Verified Raw Materials:</span>
                    <span className="font-mono text-white">₹{activeProduct.costBreakdown.rawMaterials}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dedicated Craft Labor ({activeProduct.costBreakdown.laborHours} hrs @ ₹{activeProduct.costBreakdown.hourlyWage}/hr):</span>
                    <span className="font-mono text-emerald-400">
                      ₹{activeProduct.costBreakdown.laborHours * activeProduct.costBreakdown.hourlyWage}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cultural Heritage Mastery Margin:</span>
                    <span className="font-mono text-[#E8A33D]">₹{activeProduct.costBreakdown.culturalHeritageMargin}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-1.5 font-bold text-white">
                    <span>Fair Payout to Artisan:</span>
                    <span className="font-mono text-emerald-400">₹{activeProduct.price}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowProvenanceModal(false);
                setShowUpiModal(true);
              }}
              className="w-full bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Proceed to Direct UPI Payment</span>
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: DIRECT UPI INSTANT CHECKOUT (SIMULATION)
         ───────────────────────────────────────────────────────────── */}
      {showUpiModal && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#141923] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl space-y-5 text-center">
            <button
              onClick={() => setShowUpiModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!upiSuccess ? (
              <>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <QrCode className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Direct-to-Maker UPI Checkout
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    100% of payment credited directly to {activeProduct.artisanName}&apos;s verified bank account
                  </p>
                </div>

                {/* Simulated QR Code Box */}
                <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex flex-col items-center justify-center shadow-lg border-2 border-emerald-500/40">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=spirit.artisan@upi&pn=SpiritArtisanDirect&am=3450&cu=INR"
                    alt="UPI QR Code"
                    className="w-40 h-40"
                  />
                </div>

                <div className="bg-[#0B0F17] p-3 rounded-xl border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Payee VPA:</span>
                    <span className="font-mono text-emerald-400">{activeProduct.artisanName.toLowerCase().replace(/ /g, "")}@upi</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Total Amount:</span>
                    <span className="font-mono font-bold text-white text-sm">₹{activeProduct.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  onClick={handleSimulateUpi}
                  disabled={isProcessingUpi}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isProcessingUpi ? "Verifying UPI Transfer..." : "Simulate Instant UPI Payout"}</span>
                </button>
              </>
            ) : (
              <div className="space-y-4 py-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Payment Received!</h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">
                    UPI Ref: 43920199482 • Settled to Artisan Account
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/30 p-4 rounded-xl text-xs space-y-1">
                  <p className="text-white font-semibold">
                    🎉 You earned +{activeProduct.craftPointsAwarded} Craft Points!
                  </p>
                  <p className="text-gray-300 text-[11px]">
                    Points can be redeemed on your next artisan purchase or used for Craft Trail experiences.
                  </p>
                </div>

                <div className="text-[11px] text-gray-400 italic">
                  A receipt and dispatch SMS has been sent to the artisan on Celine OS.
                </div>

                <button
                  onClick={() => setShowUpiModal(false)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs py-2.5 rounded-xl transition"
                >
                  Close Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: BULK-DEAL AGENT RFQ (B2B QUOTE)
         ───────────────────────────────────────────────────────────── */}
      {showBulkModal && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#141923] border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E8A33D] font-mono flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Agent 4: Bulk-Deal Negotiation Engine</span>
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-1">
                  Request B2B Quote for {activeProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setShowBulkModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-300">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1">Quantity Requested:</label>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    value={bulkQty}
                    onChange={(e) => setBulkQty(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#E8A33D]"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1">Buyer Category:</label>
                  <select
                    value={bulkBuyerType}
                    onChange={(e: any) => setBulkBuyerType(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#E8A33D]"
                  >
                    <option value="boutique">Luxury Retail Boutique</option>
                    <option value="corporate">Corporate Festival Gifting</option>
                    <option value="wedding">Curated Wedding Favors</option>
                    <option value="export">Overseas Fair-Trade Export</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1">Target Delivery Date:</label>
                <input
                  type="date"
                  value={bulkDeadline}
                  onChange={(e) => setBulkDeadline(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              <button
                onClick={handleCalculateBulkQuote}
                disabled={isCalculatingBulk}
                className="w-full bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCalculatingBulk ? "Calculating Capacity & Lead Time..." : "Calculate Realistic Lead Time & Quote"}</span>
              </button>

              {/* Bulk Quote Assessment Output */}
              {bulkQuoteResult && (
                <div className="bg-[#0B0F17] p-4 rounded-xl border border-white/10 space-y-3 animate-in fade-in">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-bold text-white">Bulk-Deal Agent Assessment:</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      bulkQuoteResult.canFulfill ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                    }`}>
                      {bulkQuoteResult.canFulfill ? "Feasible within artisan capacity" : "Capacity warning — extended buffer needed"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400 text-[10px] block">Calculated Lead Time:</span>
                      <strong className="text-amber-300 font-mono text-sm">
                        {bulkQuoteResult.realisticLeadDays} days (by {bulkQuoteResult.completionDate})
                      </strong>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] block">Unit Rate (Tier Discount):</span>
                      <strong className="text-emerald-400 font-mono text-sm">
                        ₹{bulkQuoteResult.quotedUnitPrice} (-{bulkQuoteResult.discountPercentage}%)
                      </strong>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-2 flex justify-between font-bold text-sm text-white">
                    <span>Total Deal Volume:</span>
                    <span className="font-mono text-emerald-400">
                      ₹{bulkQuoteResult.totalQuoteAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-mono text-gray-400">Artisan Escrow Milestones:</span>
                    {bulkQuoteResult.milestones.map((m, idx) => (
                      <div key={idx} className="bg-white/[0.02] p-2 rounded-lg text-[11px] flex justify-between">
                        <span>{m.phase}</span>
                        <strong className="text-amber-400 font-mono">₹{m.amount.toLocaleString("en-IN")} ({m.percentage}%)</strong>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSubmitBulkToArtisan}
                    className="w-full mt-3 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Dispatch to Artisan WhatsApp for 1-Tap Approval</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
