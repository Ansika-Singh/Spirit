"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  Shield,
  TrendingUp,
  AlertTriangle,
  Users,
  Target,
  Sparkles,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Building
} from "lucide-react";
import { CRAFT_CLUSTERS } from "@/data/seedData";

export default function CoopDashboard() {
  // Chart 1: Price Gap & Middleman Margin vs Direct Artisan Payout
  const priceGapData = [
    { craft: "Kutch Weaving", directPayout: 3450, traderRetail: 7800, middlemanCut: 4350 },
    { craft: "Blue Pottery", directPayout: 1850, traderRetail: 4200, middlemanCut: 2350 },
    { craft: "Bastar Dhokra", directPayout: 4200, traderRetail: 9500, middlemanCut: 5300 },
    { craft: "Channapatna", directPayout: 980, traderRetail: 2200, middlemanCut: 1220 },
    { craft: "Madhubani Art", directPayout: 5200, traderRetail: 12500, middlemanCut: 7300 }
  ];

  // Chart 2: Anonymized National Demand Trends over Quarters
  const demandTrendData = [
    { quarter: "Q1 2025", handloom: 64, pottery: 52, metal: 48, wood: 42, painting: 70 },
    { quarter: "Q2 2025", handloom: 72, pottery: 58, metal: 55, wood: 49, painting: 78 },
    { quarter: "Q3 2025", handloom: 80, pottery: 65, metal: 63, wood: 54, painting: 85 },
    { quarter: "Q4 2025", handloom: 95, pottery: 82, metal: 78, wood: 68, painting: 98 },
    { quarter: "Q1 2026", handloom: 110, pottery: 94, metal: 88, wood: 76, painting: 115 },
    { quarter: "Q2 2026", handloom: 128, pottery: 108, metal: 99, wood: 85, painting: 134 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#141923] via-[#1A2232] to-[#141923] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E8A33D] uppercase tracking-wider">
            <Building className="w-4 h-4" />
            <span>Co-operative &amp; Handloom Export Board Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Cluster Intelligence &amp; Fair-Wage Observatory
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
            Real-time aggregate demand analytics, price gap alerts, and cluster intervention roadmaps. Designed strictly to protect privacy — zero personal tracking of individual buyers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-400 self-start md:self-auto">
          <Shield className="w-4 h-4 flex-shrink-0" />
          <span>Differential Privacy: 100% Anonymized Data</span>
        </div>
      </div>

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141923] border border-white/10 p-5 rounded-2xl space-y-1 shadow">
          <span className="text-[11px] text-gray-400 uppercase font-mono block">Registered Artisans</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">6,040</span>
            <span className="text-xs text-emerald-400 font-semibold">+18% YoY</span>
          </div>
          <p className="text-[11px] text-gray-400">Across 5 Primary Craft Clusters</p>
        </div>

        <div className="bg-[#141923] border border-white/10 p-5 rounded-2xl space-y-1 shadow">
          <span className="text-[11px] text-gray-400 uppercase font-mono block">Middleman Extraction Prevented</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-400">₹3.82 Cr</span>
            <span className="text-xs text-emerald-400 font-semibold">Direct</span>
          </div>
          <p className="text-[11px] text-gray-400">Diverted directly to makers</p>
        </div>

        <div className="bg-[#141923] border border-white/10 p-5 rounded-2xl space-y-1 shadow">
          <span className="text-[11px] text-gray-400 uppercase font-mono block">Avg. Artisan Income Increase</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-400">+192%</span>
            <span className="text-xs text-amber-400 font-semibold">Fair Wage</span>
          </div>
          <p className="text-[11px] text-gray-400">Over conventional trader rates</p>
        </div>

        <div className="bg-[#141923] border border-white/10 p-5 rounded-2xl space-y-1 shadow">
          <span className="text-[11px] text-gray-400 uppercase font-mono block">Youth Retention Index</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">84.2</span>
            <span className="text-xs text-emerald-400 font-semibold">+34 pts</span>
          </div>
          <p className="text-[11px] text-gray-400">Generations staying in craft</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Direct Payout vs Middleman Cut */}
        <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-serif font-bold text-white text-base">
                Price Gap Analysis: Artisan Share vs Trader Extraction (₹)
              </h3>
              <p className="text-xs text-gray-400">
                Reveals the excessive margin traditional brokers extract from consumers
              </p>
            </div>
            <span className="text-[11px] font-mono bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
              Middleman Gap
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceGapData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="craft" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0B0F17", borderColor: "#374151", borderRadius: "8px", fontSize: "12px" }}
                  formatter={(val: any) => [`₹${val.toLocaleString("en-IN")}`, ""]}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                <Bar dataKey="directPayout" name="Artisan Direct Payout (Spirit)" fill="#4FA88F" radius={[4, 4, 0, 0]} />
                <Bar dataKey="middlemanCut" name="Broker / Middleman Markup" fill="#E05555" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: National Demand Trends */}
        <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-serif font-bold text-white text-base">
                Anonymized Craft Category Demand Trends (Index)
              </h3>
              <p className="text-xs text-gray-400">
                Aggregated search, inquiry, and bulk procurement volumes across India
              </p>
            </div>
            <span className="text-[11px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              Demand Index
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="quarter" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0B0F17", borderColor: "#374151", borderRadius: "8px", fontSize: "12px" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                <Line type="monotone" dataKey="handloom" name="Handloom Weaving" stroke="#E8A33D" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="pottery" name="Blue Pottery" stroke="#5599FF" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="metal" name="Dhokra Metal" stroke="#FF5C7A" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="painting" name="Folk Painting" stroke="#00FFB3" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cluster Health & Policy Intervention Roadmaps */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-white text-xl">
          Regional Cluster Health &amp; Urgent AI Intervention Alerts
        </h3>
        <p className="text-xs text-gray-400">
          The Co-op Agent evaluates cluster raw-material price volatility, kiln shortages, and export compliance gaps to advise boards on subsidies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CRAFT_CLUSTERS.map((cluster, idx) => (
            <div
              key={idx}
              className="bg-[#141923] border border-white/10 rounded-2xl p-5 shadow space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#E8A33D] font-mono uppercase font-semibold">
                    {cluster.state}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold">
                    {cluster.status}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-white text-base">
                  {cluster.name}
                </h4>

                <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                  {cluster.mainCraft}
                </p>

                <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Active Artisans</span>
                    <strong className="text-white font-mono">{cluster.activeArtisans}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Direct Margin Lift</span>
                    <strong className="text-emerald-400 font-mono">{cluster.avgDirectMarginIncrease}</strong>
                  </div>
                </div>

                {/* Urgent Need Box */}
                <div className="mt-3 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-xs space-y-0.5">
                  <span className="text-[10px] text-amber-400 uppercase font-mono font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Board Intervention Recommended:</span>
                  </span>
                  <p className="text-gray-200 text-[11px]">{cluster.urgentNeed}</p>
                </div>
              </div>

              <button
                onClick={() => alert(`Triggered Co-op subsidy package for ${cluster.name}!`)}
                className="w-full mt-3 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-2 rounded-xl border border-white/10 transition text-center"
              >
                Allocate Cluster Grant
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
