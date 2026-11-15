"use client";

import React, { useState } from "react";
import {
  Mic,
  Camera,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  TrendingUp,
  Users,
  Package,
  Receipt,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sliders,
  Volume2
} from "lucide-react";
import { ARTISANS, PRODUCTS, CraftProduct } from "@/data/seedData";
import { runListingAgent, runPricingAgent, ListingAgentOutput, PricingAgentOutput } from "@/lib/agents";

interface ArtisanPortalProps {
  onTriggerWhatsApp: (title: string, text: string, dealDetails?: any) => void;
}

export default function ArtisanPortal({ onTriggerWhatsApp }: ArtisanPortalProps) {
  // Current active artisan persona
  const [artisan] = useState(ARTISANS[0]); // Devji Kaka Vankar

  // Celine Khata Ledger State
  const [customers, setCustomers] = useState([
    { id: 1, name: "Ramesh Bhai (Local Weaver)", phone: "98250 11223", udhar: 1200, lastDate: "Today" },
    { id: 2, name: "Suresh Potter (Clay Supplier)", phone: "94260 55443", udhar: 3400, lastDate: "Yesterday" },
    { id: 3, name: "FabIndia Store Ahmedabad", phone: "99090 88771", udhar: 0, lastDate: "3 days ago" },
    { id: 4, name: "Meena Ben (Natural Dyes)", phone: "98790 33221", udhar: 850, lastDate: "1 week ago" }
  ]);

  const [activeTab, setActiveTab] = useState<"khata" | "photo_listing" | "pricing_calculator" | "inventory">("khata");

  // Voice Assistant state
  const [voiceInput, setVoiceInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState("Tap mic to speak in Hindi or English (e.g. 'Add 500 Udhar for Ramesh' or 'List new Kala cotton shawl')");

  // Listing Agent Form State
  const [photoCategory, setPhotoCategory] = useState("shawl");
  const [artisanNote, setArtisanNote] = useState("Handspun organic Kala cotton with indigo dye. 3 days on pit-loom.");
  const [isGeneratingListing, setIsGeneratingListing] = useState(false);
  const [generatedListing, setGeneratedListing] = useState<ListingAgentOutput | null>(null);

  // Pricing Agent Form State
  const [rawMaterials, setRawMaterials] = useState<number>(950);
  const [laborHours, setLaborHours] = useState<number>(28);
  const [hourlyWage, setHourlyWage] = useState<number>(75);
  const [masteryLevel, setMasteryLevel] = useState<"apprentice" | "senior" | "master" | "shilp_guru">("master");
  const [pricingResult, setPricingResult] = useState<PricingAgentOutput | null>(null);

  // Simulated Voice Command Trigger
  const handleVoiceCommand = () => {
    setIsListening(true);
    setVoiceFeedback("Listening in Hindi/English (Sarvam Indic Voice Engine)...");

    setTimeout(() => {
      setIsListening(false);
      const commands = [
        "Record ₹800 Udhar for Ramesh Bhai",
        "Photo in: Create new listing for Bhujodi scarf",
        "Calculate fair floor price for 25 hours weaving",
        "Check pending WhatsApp approvals"
      ];
      const selected = commands[Math.floor(Math.random() * commands.length)];
      setVoiceInput(selected);
      setVoiceFeedback(`Recognized command: "${selected}". Executing via Celine OS.`);

      if (selected.includes("listing")) {
        setActiveTab("photo_listing");
      } else if (selected.includes("floor price")) {
        setActiveTab("pricing_calculator");
      }
    }, 1800);
  };

  // Run Listing Agent (Photo to Listing)
  const handleGenerateListing = async () => {
    setIsGeneratingListing(true);
    try {
      const output = await runListingAgent({
        roughCategory: photoCategory,
        notesFromArtisan: artisanNote
      });
      setGeneratedListing(output);
    } finally {
      setIsGeneratingListing(false);
    }
  };

  // Run Pricing Agent
  const handleCalculatePrice = async () => {
    const output = await runPricingAgent({
      rawMaterialCost: rawMaterials,
      laborHours: laborHours,
      hourlyWage: hourlyWage,
      masteryLevel: masteryLevel,
      category: "weaving"
    });
    setPricingResult(output);
  };

  // Send Listing to WhatsApp Approval Gate
  const handleSendToWhatsApp = () => {
    if (!generatedListing) return;
    onTriggerWhatsApp(
      "NEW LISTING APPROVAL REQUEST",
      `Namaste ${artisan.name} Ji! The Listing Agent turned your photo into a draft:\n\n*${generatedListing.title}*\nTechnique: ${generatedListing.craftTechnique}\nMaterials: ${generatedListing.materials.join(", ")}\nSuggested Retail: ₹3,450\n\nPlease approve on WhatsApp before public publish.`,
      {
        buyer: "Spirit Direct Marketplace",
        product: generatedListing.title,
        quantity: 1,
        offeredTotal: 3450,
        advancePayment: 3450,
        deadlineDays: 4
      }
    );
    alert("Draft listing sent to your WhatsApp Approval Gate! Click the green WhatsApp button above to approve.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Artisan Profile & Celine Branding */}
      <div className="bg-gradient-to-r from-[#141923] via-[#1A2232] to-[#141923] border border-amber-500/20 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={artisan.avatar}
            alt={artisan.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-[#E8A33D] shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-serif font-bold text-white">{artisan.name}</h2>
              <span className="bg-[#E8A33D]/20 text-[#E8A33D] border border-[#E8A33D]/30 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                {artisan.generation}
              </span>
            </div>
            <p className="text-sm text-gray-300 mt-0.5">
              {artisan.craft} • {artisan.cluster}, {artisan.state}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-amber-300">
              <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                GI Tag: {artisan.giTag}
              </span>
              <span className="text-emerald-400 font-semibold">
                Co-op: {artisan.coopMember}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-black/30 border border-white/5 p-3 rounded-xl text-center">
            <span className="text-[11px] text-gray-400 block uppercase">Total Udhar</span>
            <span className="text-lg font-mono font-bold text-amber-400">₹5,450</span>
          </div>
          <div className="bg-black/30 border border-white/5 p-3 rounded-xl text-center">
            <span className="text-[11px] text-gray-400 block uppercase">Today&apos;s Sales</span>
            <span className="text-lg font-mono font-bold text-emerald-400">₹14,200</span>
          </div>
          <div className="bg-black/30 border border-white/5 p-3 rounded-xl text-center">
            <span className="text-[11px] text-gray-400 block uppercase">Fair Multiplier</span>
            <span className="text-lg font-mono font-bold text-white">2.8x</span>
          </div>
        </div>
      </div>

      {/* Voice Assistant Navigation Bar (Sarvam Indic Voice) */}
      <div className="bg-[#141923] border border-white/10 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleVoiceCommand}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition shadow-lg ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-gradient-to-r from-[#E8A33D] to-[#D9532F] text-black hover:opacity-90"
            }`}
            title="Tap to speak in native Indic language"
          >
            <Mic className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#E8A33D] uppercase tracking-wider flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" /> Celine Voice OS (Indic Voice Engine)
              </span>
              {isListening && <span className="text-[11px] text-red-400 animate-pulse">• Recording...</span>}
            </div>
            <p className="text-xs text-gray-300 italic">{voiceFeedback}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setActiveTab("khata")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "khata" ? "bg-[#E8A33D] text-black font-semibold" : "bg-white/5 text-gray-300 hover:text-white"
            }`}
          >
            Daily Khata
          </button>
          <button
            onClick={() => setActiveTab("photo_listing")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "photo_listing" ? "bg-[#E8A33D] text-black font-semibold" : "bg-white/5 text-gray-300 hover:text-white"
            }`}
          >
            Photo to Listing
          </button>
          <button
            onClick={() => setActiveTab("pricing_calculator")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === "pricing_calculator" ? "bg-[#E8A33D] text-black font-semibold" : "bg-white/5 text-gray-300 hover:text-white"
            }`}
          >
            Fair Price Guard
          </button>
        </div>
      </div>

      {/* TAB 1: CELINE KHATA (LEDGER & UDHAR) */}
      {activeTab === "khata" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Udhar (Credit) & Customer Book */}
          <div className="lg:col-span-2 bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#E8A33D]" />
                  <span>Digital Khata (Udhar & Payment Ledger)</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Offline-first ledger backed by IndexedDB and atomic write integrity
                </p>
              </div>

              <button
                onClick={() => {
                  const name = prompt("Enter customer name:");
                  const amount = prompt("Enter Udhar (credit) amount in ₹:");
                  if (name && amount) {
                    setCustomers([
                      { id: Date.now(), name, phone: "98000 00000", udhar: Number(amount), lastDate: "Just now" },
                      ...customers
                    ]);
                  }
                }}
                className="flex items-center gap-1.5 bg-[#E8A33D] hover:bg-[#F5B853] text-black text-xs font-semibold px-3 py-2 rounded-xl transition shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Khata Entry</span>
              </button>
            </div>

            {/* Customer List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400 uppercase text-[10px]">
                    <th className="pb-3">Customer / Supplier</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Last Active</th>
                    <th className="pb-3 text-right">Balance / Udhar</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3.5 font-medium text-white">{c.name}</td>
                      <td className="py-3.5 text-gray-400 font-mono">{c.phone}</td>
                      <td className="py-3.5 text-gray-400">{c.lastDate}</td>
                      <td className="py-3.5 text-right font-mono font-bold">
                        {c.udhar > 0 ? (
                          <span className="text-amber-400">₹{c.udhar.toLocaleString("en-IN")} due</span>
                        ) : (
                          <span className="text-emerald-400">All Clear</span>
                        )}
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <button
                          onClick={() => {
                            alert(`Thermal receipt generated for ${c.name}. Ready to print via Celine thermal driver.`);
                          }}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded text-gray-300 hover:text-white"
                          title="Print Thermal Receipt"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setCustomers(
                              customers.map((cust) =>
                                cust.id === c.id ? { ...cust, udhar: 0 } : cust
                              )
                            );
                            alert(`Received payment for ${c.name}! Udhar cleared.`);
                          }}
                          className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[11px] font-semibold hover:bg-emerald-500/30"
                        >
                          Settle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Thermal Receipt / Billing Card */}
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Printer className="w-4 h-4 text-[#E8A33D]" />
                <span>Instant POS Bill Preview (Offline-Ready)</span>
              </h3>

              <div className="mt-4 bg-[#0B0F17] p-4 rounded-xl border border-white/5 font-mono text-[11px] text-gray-300 space-y-2">
                <div className="text-center border-b border-dashed border-gray-700 pb-2">
                  <p className="font-bold text-white">CELINE DIGITAL KHATA</p>
                  <p className="text-[10px] text-gray-400">Devji Kaka Vankar Handloom</p>
                  <p className="text-[10px] text-gray-500">Bhujodi Village, Kutch, Gujarat</p>
                </div>

                <div className="py-2 space-y-1">
                  <div className="flex justify-between">
                    <span>1x Kala Cotton Stole</span>
                    <span className="font-bold text-white">₹3,450</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Natural Indigo Extra-Weft</span>
                    <span>100% Cotton</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-700 pt-2 space-y-1">
                  <div className="flex justify-between text-white font-bold">
                    <span>TOTAL AMOUNT:</span>
                    <span className="text-emerald-400">₹3,450</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>Method: UPI Instant</span>
                    <span>Tax: Exempted (Handicraft)</span>
                  </div>
                </div>

                <div className="text-center pt-2 text-[9px] text-gray-500">
                  *** VERIFIED SPIRIT PROVENANCE ***
                  <br />
                  Every craft arrives with its story.
                </div>
              </div>
            </div>

            <button
              onClick={() => alert("Thermal bill printed successfully!")}
              className="mt-4 w-full bg-gradient-to-r from-[#E8A33D] to-[#D9532F] text-black font-semibold text-xs py-2.5 rounded-xl transition shadow hover:opacity-95 flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print 300px Thermal Receipt</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PHOTO IN, LISTING OUT (LISTING AGENT) */}
      {activeTab === "photo_listing" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#E8A33D]" />
                <span>Agent 2: Photo In, Faithful Listing Out</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Artisans don&apos;t need SEO or copywriting skills. Upload 1 phone photo, get a studio-grade listing.
              </p>
            </div>

            {/* Photo Upload Simulation */}
            <div className="border-2 border-dashed border-amber-500/30 rounded-2xl p-6 text-center bg-black/20 hover:border-amber-500/60 transition cursor-pointer">
              <Camera className="w-10 h-10 text-[#E8A33D] mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">Tap to snap or upload handicraft photo</p>
              <p className="text-xs text-gray-400 mt-1">
                Gemini Multimodal analyzes weave density, glaze, motifs & dimensions
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-300 block mb-1">
                  Craft Category / Hint:
                </label>
                <select
                  value={photoCategory}
                  onChange={(e) => setPhotoCategory(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E8A33D]"
                >
                  <option value="shawl">Handloom Shawl / Stole (Weaving)</option>
                  <option value="vase">Blue Pottery Ceramic Vase (Pottery)</option>
                  <option value="bronze">Dhokra Bell-Metal Figurine (Metal)</option>
                  <option value="toy">Channapatna Lacquer Toy (Wood)</option>
                  <option value="painting">Madhubani Folk Painting (Painting)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-300 block mb-1">
                  Voice Note / Raw Words from Artisan:
                </label>
                <textarea
                  rows={3}
                  value={artisanNote}
                  onChange={(e) => setArtisanNote(e.target.value)}
                  placeholder="e.g. Woven from Kala cotton with natural indigo, took 3 days on pitloom"
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#E8A33D]"
                />
              </div>

              <button
                onClick={handleGenerateListing}
                disabled={isGeneratingListing}
                className="w-full bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingListing ? "Listing Agent Analyzing Photo..." : "Generate Faithful Listing"}</span>
              </button>
            </div>
          </div>

          {/* Generated Listing Preview */}
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            {generatedListing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Faithfulness Score: {generatedListing.faithfulnessScore}% (Zero Hallucination)</span>
                  </span>
                  <span className="text-xs bg-amber-500/20 text-[#E8A33D] px-2 py-0.5 rounded uppercase font-mono">
                    {generatedListing.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">{generatedListing.title}</h4>
                  <p className="text-xs text-[#E8A33D] font-medium mt-0.5">{generatedListing.craftTechnique}</p>
                </div>

                <div className="text-xs text-gray-300 leading-relaxed bg-[#0B0F17] p-3 rounded-xl border border-white/5">
                  {generatedListing.detailedDescription}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-[10px] uppercase block">Dimensions</span>
                    <strong className="text-white">{generatedListing.dimensions}</strong>
                  </div>
                  <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-[10px] uppercase block">Care Guide</span>
                    <strong className="text-white text-[11px]">{generatedListing.careInstructions}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {generatedListing.suggestedTags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex gap-3">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs py-2.5 rounded-xl transition shadow flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send to WhatsApp for 1-Tap Approval</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500 space-y-2">
                <Sparkles className="w-10 h-10 mx-auto text-gray-600" />
                <p className="text-sm">Click &quot;Generate Faithful Listing&quot; to see Agent 2 convert photo and voice notes into an e-commerce catalog.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: FAIR PRICE GUARD (PRICING AGENT) */}
      {activeTab === "pricing_calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#E8A33D]" />
                <span>Agent 3: Pricing Agent (Fair Floor Calculator)</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Guarantees artisans never sell below a dignified living wage, exposing predatory trader markups.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Raw Materials Cost (Kala cotton, natural dyes):</span>
                  <strong className="text-amber-400 font-mono">₹{rawMaterials}</strong>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={rawMaterials}
                  onChange={(e) => setRawMaterials(Number(e.target.value))}
                  className="w-full accent-[#E8A33D]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Labor Hours Spent:</span>
                  <strong className="text-amber-400 font-mono">{laborHours} hours</strong>
                </div>
                <input
                  type="range"
                  min="4"
                  max="60"
                  step="2"
                  value={laborHours}
                  onChange={(e) => setLaborHours(Number(e.target.value))}
                  className="w-full accent-[#E8A33D]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Dignified Living Wage Standard:</span>
                  <strong className="text-emerald-400 font-mono">₹{hourlyWage}/hr</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="120"
                  step="5"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full accent-[#E8A33D]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-300 block mb-1">
                  Artisan Mastery Level:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["apprentice", "senior", "master", "shilp_guru"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setMasteryLevel(lvl)}
                      className={`py-1.5 rounded-lg text-xs font-medium uppercase border transition ${
                        masteryLevel === lvl
                          ? "bg-[#E8A33D] text-black border-[#E8A33D] font-bold"
                          : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {lvl.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCalculatePrice}
                className="w-full bg-[#E8A33D] hover:bg-[#F5B853] text-black font-semibold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                <span>Calculate Fair Floor &amp; Market Benchmark</span>
              </button>
            </div>
          </div>

          {/* Pricing Results */}
          <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            {pricingResult ? (
              <div className="space-y-5">
                <h4 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center justify-between">
                  <span>Pricing Agent Assessment</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                    Artisan Retains {pricingResult.marginToArtisan}%
                  </span>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-amber-500/30">
                    <span className="text-[10px] text-gray-400 uppercase font-mono block">Absolute Floor Price</span>
                    <strong className="text-xl font-mono text-amber-400">
                      ₹{pricingResult.floorPrice.toLocaleString("en-IN")}
                    </strong>
                    <span className="text-[10px] text-gray-500 block mt-1">Never sell below this</span>
                  </div>

                  <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-emerald-500/30">
                    <span className="text-[10px] text-gray-400 uppercase font-mono block">Recommended Retail (D2C)</span>
                    <strong className="text-xl font-mono text-emerald-400">
                      ₹{pricingResult.suggestedRetailPrice.toLocaleString("en-IN")}
                    </strong>
                    <span className="text-[10px] text-gray-500 block mt-1">Direct to Buyer on Spirit</span>
                  </div>
                </div>

                {/* Exploitation Prevented Highlight */}
                <div className="bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-500/20 p-4 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-red-300">
                    <span>Trader / Middleman Retail Price:</span>
                    <span className="font-mono text-white">₹{pricingResult.traderBenchmarkPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-gray-300 text-[11px]">
                    Traditional middlemen mark this up to ₹{pricingResult.traderBenchmarkPrice.toLocaleString("en-IN")} while keeping ₹{pricingResult.economicBreakdown.middlemanExploitationPrevented.toLocaleString("en-IN")} for themselves. On Spirit, 100% of fair value stays with you.
                  </p>
                </div>

                <div className="text-xs text-gray-300 leading-relaxed bg-[#0B0F17] p-3 rounded-xl border border-white/5">
                  <strong className="text-white block mb-1">Pricing Agent Justification:</strong>
                  {pricingResult.explanation}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500 space-y-2">
                <DollarSign className="w-10 h-10 mx-auto text-gray-600" />
                <p className="text-sm">Click &quot;Calculate Fair Floor&quot; to view the living-wage breakdown and middleman comparison.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
