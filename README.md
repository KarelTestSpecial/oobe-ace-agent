# 🤖 AIOS: Agentic Intel & Outreach Sentinel

An autonomous, Solana-native data intelligence agent designed to discover, audit, and secure high-value Web3 freelance opportunities in real-time. Engineered specifically for the **OOBE Protocol × Ace Data Cloud** developer bounty.

AIOS runs a continuous autonomous intelligence loop, integrating decentralized protocol registries with advanced LLM auditing to filter honeypots, traps, and ghost bounties while generating optimized Proof of Work outreach campaigns.

---

## 🏗️ Architectural Overview

AIOS coordinates four decoupled subsystems to perform autonomous scouting:

```
[Web3 Sources] ──> [Resilient Scraper] ──> [DeepSeek-R1 Auditor] ──> [SAP & x402 Escrow]
 (Superteam Earn)     (Nitter Fallback)      (Trap & Reputation)       (Synapse Gateway)
 (Solana Jobs)
```

1. **Autonomous Discovery Scrapers:** Lightweight Next.js hydration parsing and Luma event extraction.
2. **Resilient Timeline Parsing:** Sequential fallback Nitter RSS mirror rotation.
3. **Reputational Safety Auditor:** Multi-layered reputational evaluation via Ace Data Cloud DeepSeek-R1 models.
4. **Decentralized Commerce Gateway:** Mock integration with Synapse Agent Protocol (SAP) and x402guard payment settlement.

---

## 🛡️ Resilient Timeline Scraping: Nitter Fallback & Mirror Rotation

A core feature of the AIOS scraper pipeline is its ability to monitor Twitter/X timelines (like `@SuperteamUK` or `@OOBEonSol`) for fresh flash-bounties without running heavy browser automation (like Puppeteer) or hitting mandatory login walls.

### The Mirror Failover Mechanism
Because public Nitter instances suffer from frequent rate-limiting (`429 Too Many Requests`) or dynamic IP blocking by X, AIOS uses a **sequential fallback mirror array**.

```typescript
const hosts = [
  'https://nitter.net',
  'https://nitter.mint.lgbt',
  'https://nitter.poast.org',
  'https://nitter.no-logs.com'
];
```

* **Best-Effort Scraping:** AIOS sequentially fetches the target profile's RSS feed (`/username/rss`) from the pool.
* **Resilient Failover:** If an instance returns an error or times out, the system catches the error, logs a warning, and immediately rotates to the next mirror.
* **Uptime Preservation:** The execution halts as soon as any mirror successfully delivers the XML feed, saving bandwidth and preventing rate-limiting on other mirrors.

### 🚀 Production-Grade Scaling Path
While Nitter mirror rotation is excellent for development and low-priority scouting (keeping execution costs at exactly **$0.00**), a commercial high-availability production deployment would transition to the following architecture:
1. **Paid Micro-Payment APIs (Recommended):** Integrating a professional proxy-backed scraper API (such as **SocialData.tools** or **Apify** via RapidAPI) to query timelines with guaranteed 99.9% uptime for fractions of a cent ($0.001 per request).
2. **Self-Hosted Private Nitter Endpoints:** Set up a private Nitter server configured with dynamically rotating "burner" X tokens inside `nitter.conf` to avoid public rate-limiting entirely.

---

## 🧠 AI-Powered Reputation Auditing

Before generating outreach proposals, AIOS runs a strict **4-Point Safety Audit** powered by **Ace Data Cloud DeepSeek-R1** models to filter high-risk listings:

* **Escrow Integrity:** Verifies if bounty payouts are backed by on-chain smart contracts or trusted multi-sigs.
* **Maintainer Reputation:** Analyzes historical pull-request merges and activity frequency.
* **Bounty Age & Decay:** Flags stale listings and "ghost bounties" (>5 open PRs with zero maintainer interaction over 30 days).
* **AI Honeypot Detection:** Guards against malicious bait repositories designed to hijack EVM/Solana wallets.

*Example Output:*
> ⚠️ **Honeypot Detected:** `SecureBananaLabs/bug-bounty#7` ($350) automatically flagged and blacklisted due to 398 open PRs, 0 merged, and suspicious third-party auto-approvals.

---

## 🛠️ Tech Stack & Setup

* **Runtime:** Node.js v22+ (TypeScript / ES Modules)
* **Package Manager:** `pnpm` (Optimized for Chromebook disk-space and CPU)
* **Integrations:**
  * `@oobe-protocol-labs/synapse-sap-sdk` (On-chain agent registration)
  * `@oobe-protocol-labs/synapse-client-sdk` (x402 billing commerce)
  * `@solana/web3.js` (Web3 wallet signatures)

### Installation
Clone the repository and install dependencies using `pnpm`:
```bash
pnpm install
```

### Local Dev Run
Compile and run the agent simulation:
```bash
pnpm build
pnpm dev
```

The agent will output a detailed intelligence report (`reports/report_latest.md`) listing all audited opportunities and custom outreach pitches.

---

## ⚖️ License

MIT License. Designed and developed by **Karel Decherf** (KarelTestSpecial).
