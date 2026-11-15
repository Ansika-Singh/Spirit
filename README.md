# Spirit 🪡🏺
### *An Agentic Marketplace for India’s Artisans*
> **"Every craft with its maker, its story and a fair price."**

Built for **Gav Hackathon** by **Team Dreamers**:
- **Ansika Singh** ([@Ansika-Singh](https://github.com/Ansika-Singh) / [@Ansika2004](https://github.com/Ansika2004))
- **Bishnu Kumar Sardar** ([@bishnu24ise-prog](https://github.com/bishnu24ise-prog))

---

## 🌟 The Vision

India's traditional craft clusters—weavers, potters, metalworkers, and wood artisans—face deep systemic challenges:
1. **Middlemen dictate prices**: Traders extract up to 70–80% of final retail margins while maker identities vanish.
2. **High digital barrier**: Online selling requires photography, SEO copywriting, catalog management, and tech literacy.
3. **Lost provenance & story**: Heritage techniques, generational folklore, and cultural context are stripped away.
4. **Intimidating bulk orders**: Commercial buyers and boutiques pressure artisans without transparent market pricing or production lead time calculators.

**Spirit** dismantles this dynamic with a multi-agent AI system where **five specialized agents do the heavy lifting while the artisan remains in absolute control** via voice and WhatsApp.

---

## 🤖 The 5 Autonomous AI Agents

```
    [Artisan Voice / Indic Audio] 
                │
                ▼
   ┌───────────────────────────┐
   │ 1. Story Agent            │ ➔ Extracts generational lore, technique & provenance
   └─────────────┬─────────────┘
                 │
   ┌─────────────▼─────────────┐
   │ 2. Listing Agent          │ ➔ Converts raw camera photos into studio-grade listings
   └─────────────┬─────────────┘
                 │
   ┌─────────────▼─────────────┐
   │ 3. Pricing Agent          │ ➔ Calculates fair floor price + dynamic market range
   └─────────────┬─────────────┘
                 │
   ┌─────────────▼─────────────┐
   │ 4. Bulk-Deal Agent        │ ➔ Generates lead times, volume tiers & B2B quotes
   └─────────────┬─────────────┘
                 │
   ┌─────────────▼─────────────┐
   │ 5. Buyer Concierge        │ ➔ Semantic matchmaking & Craft Trail discovery
   └───────────────────────────┘
                 │
                 ▼
    [Artisan Approval Gate] ➔ Nothing commits until artisan approves via WhatsApp/Voice!
```

1. **Story Agent (Voice → Maker Story)**: Conducts interactive voice interviews in native Indic languages (Hindi, Bengali, Tamil, etc. powered by Sarvam AI & Gemini Flash Live) to capture the cultural narrative, techniques, and maker journey.
2. **Listing Agent (Photo → Faithful Listing)**: Analyzes raw smartphone photos of handicrafts using multimodal vision models, generating rich descriptions, specifications, care guides, and SEO tags without exaggeration.
3. **Pricing Agent (Costs + Market → Fair Price)**: Takes raw material costs, hours spent, master artisan skill tier, and benchmarks against live market comps to guarantee fair compensation above cost floor.
4. **Bulk-Deal Agent (B2B Request → Quote Draft)**: Formulates realistic bulk delivery schedules, batch capacity modeling, and wholesale quote drafts.
5. **Buyer Concierge (Need → Maker Match)**: Conversational assistant for retail & B2B buyers to discover authentic crafts by region, heritage, or aesthetic need, complete with verifiable **Provenance Cards** and **Craft Points**.

---

## 🏛️ Ecosystem & Integrations

- **Artisan Mobile Experience (Celine / Khata Subsystem)**:
  - Resilient offline-first PWA for daily transactions, Udhar (credit) ledger, and stock tracking.
  - Hands-free Indic voice input and zero-barrier catalog management.
  - WhatsApp Business Approval Gate for order confirmation and pricing approvals.
- **Buyer Marketplace & Discovery Portal**:
  - Interactive artisan showcases, 3D/AR craft visualizer, and authentic provenance ledger cards.
  - Craft Trails discovery engine and gamified Craft Points rewards.
  - Direct UPI checkout & ONDC protocol adapter architecture.
- **Co-op & Handloom Board Analytics Engine**:
  - Anonymized aggregate demand trends, cluster fair-wage health scorecards, and regional skill gap alerts without intrusive individual tracking.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons, Framer Motion
- **AI Core**: Google Gemini 3.5 Flash / 3.1 Pro / Gemini Flash Live, Sarvam Indic Voice API, Google Search Grounding
- **Artisan Subsystem**: Celine Digital Khata & CRM (Offline-first, IndexedDB, Service Worker)
- **Database & Storage**: MongoDB Atlas / Firestore, Atomic Write Engine
- **Protocols & Integrations**: WhatsApp Cloud API, UPI Intent flow, ONDC open network specs

---

## 👥 Contributors

- **Ansika Singh** - System Architecture, Full-Stack Marketplace & AI Agents
- **Bishnu Kumar Sardar** - Multi-Agent Workflows, Backend Services & Data Pipelines
