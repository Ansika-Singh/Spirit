"use client";

import React, { useState, useEffect } from "react";
import { Globe2, Layers, CheckCircle, Copy, ArrowRight, ShieldCheck, Database } from "lucide-react";

export default function OndcViewer() {
  const [catalogJson, setCatalogJson] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/ondc/catalog")
      .then((res) => res.json())
      .then((data) => setCatalogJson(data))
      .catch((err) => console.error("ONDC fetch error:", err));
  }, []);

  const handleCopy = () => {
    if (catalogJson) {
      navigator.clipboard.writeText(JSON.stringify(catalogJson, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ONDC Header */}
      <div className="bg-gradient-to-r from-[#141923] via-[#1A2232] to-[#141923] border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Globe2 className="w-4 h-4" />
            <span>Open Network for Digital Commerce (ONDC / Beckn Protocol)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Decentralized Artisan Commerce Gateway
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
            Artisans on Spirit aren&apos;t locked into a walled garden. Spirit acts as a verified BPP (Buyer/Provider Platform) adapter, broadcasting artisanal crafts with provenance tags to the national ONDC network.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-blue-500/30 transition"
        >
          {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "JSON Copied!" : "Copy Beckn JSON"}</span>
        </button>
      </div>

      {/* Network Protocol Flow Diagram */}
      <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-4">
        <h3 className="font-serif font-bold text-white text-base">
          ONDC Protocol Interoperability Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-[#E8A33D] flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-white">Artisan Voice / Celine OS</h4>
            <p className="text-gray-400 text-[11px]">
              Artisan speaks into Celine / Khata, Listing Agent creates catalog with verified GI tags.
            </p>
          </div>

          <div className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-white">Spirit BPP Gateway</h4>
            <p className="text-gray-400 text-[11px]">
              Transforms local listings into standard Beckn 1.2.0 JSON schemas with provenance hash.
            </p>
          </div>

          <div className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-white">National ONDC Registry</h4>
            <p className="text-gray-400 text-[11px]">
              Open discovery across buyer apps (Paytm, Mystore, Pincode, Magicpin, Tata Neu).
            </p>
          </div>

          <div className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              4
            </div>
            <h4 className="font-bold text-white">Direct Escrow Settlement</h4>
            <p className="text-gray-400 text-[11px]">
              Buyer pays on any app; funds settle directly to artisan UPI without broker deduction.
            </p>
          </div>
        </div>
      </div>

      {/* Live ONDC Feed Box */}
      <div className="bg-[#141923] border border-white/10 rounded-2xl p-6 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <h4 className="font-mono text-xs font-bold text-white">
              Live Beckn Specification Payload: /api/ondc/catalog
            </h4>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            HTTP 200 OK • Beckn Core v1.2.0
          </span>
        </div>

        <div className="bg-[#0B0F17] p-4 rounded-xl border border-white/5 overflow-x-auto max-h-96">
          <pre className="text-emerald-400 font-mono text-[11px] leading-relaxed">
            {catalogJson ? JSON.stringify(catalogJson, null, 2) : "Fetching ONDC protocol catalog..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
