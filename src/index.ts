import { getOrCreateAgentKeypair } from './utils/wallet';
import { ScraperService } from './services/scraper';
import { AceDataCloudService } from './services/acedata';
import { OobeProtocolService } from './services/oobe';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log(`
================================================================================
           🤖  THE AGENTIC INTEL & OUTREACH SENTINEL (AIOS)  🤖
================================================================================
  Initializing autonomous Web3 agent framework...
  Current System Time: ${new Date().toISOString()}
================================================================================
  `);

  // 1. Initialize Wallet
  const agentKeypair = getOrCreateAgentKeypair();
  
  // 2. Initialize Services
  const scraper = new ScraperService();
  const aceData = new AceDataCloudService();
  const oobe = new OobeProtocolService(agentKeypair);

  // 3. Register Agent Identity on Synapse Agent Protocol (SAP)
  console.log('\n--- [SAP REGISTRATION STAGE] ---');
  const sapResult = await oobe.registerAgentOnChain();
  
  // 4. Scrape Opportunities
  console.log('\n--- [SCRAPING PIPELINE STAGE] ---');
  const opportunities = await scraper.runPipeline();

  console.log(`\nFound ${opportunities.length} active opportunities to audit.`);

  const auditedOpportunities = [];

  // Create reports folder if not exists
  const reportsDir = path.join('/home/kareltestspecial/workspace/oobe_ace_agent', 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // 5. Audit each opportunity
  for (const opp of opportunities) {
    console.log(`\n>> Processing Opportunity [${opp.id}]: "${opp.title}" from ${opp.organization}...`);
    
    // Reputational Audit & Copywriting Proposal via Ace Data Cloud LLM
    const auditReport = await aceData.analyzeOpportunity(opp);

    if (auditReport.isTrap) {
      console.log(`  ❌ [AUDIT WARN] Threat Detected! Opportunity flagged as high risk.`);
      console.log(`  Reason: ${auditReport.trapDetails}`);
      continue;
    }

    console.log(`  ✅ [AUDIT PASS] Reputational Safety Score: ${auditReport.auditScore}/100`);

    // Setup x402 Commerce Escrow
    const x402Gateway = await oobe.setupX402PaymentGateway(opp.id);

    // Generate Marketing Banner via Flux
    const bannerPath = await aceData.generateMarketingAsset(opp.title, auditReport.proposedPitch.substring(0, 100));

    const result = {
      opportunity: opp,
      audit: auditReport,
      x402Gateway,
      bannerPath
    };

    auditedOpportunities.push(result);
  }

  // 6. Generate final beautiful markdown report
  const reportPath = path.join(reportsDir, `report_latest.md`);
  
  let mdContent = `# 🤖 AIOS Agentic Scouting & Intel Report

Generated autonomously by the **Agentic Intel & Outreach Sentinel (AIOS)**.
- **Agent Address**: \`${sapResult.agentAddress}\`
- **SAP Tx Signature**: \`${sapResult.txSignature}\`
- **SAP Registration Mode**: ${sapResult.simulated ? '*Emulated (Offline/Devnet)*' : '*Live on SAP On-Chain Registry*'}
- **Report Date**: \`${new Date().toLocaleString()}\`

---

## 📊 Summary of Audited Opportunities

This cycle audited **${opportunities.length}** opportunities. **${auditedOpportunities.length}** passed our 4-point reputation safety standards.

| Source | Title | Sponsor | Status | Safety | Action |
| :--- | :--- | :--- | :--- | :---: | :--- |
| ${opportunities.map(o => `\`${o.source}\` \| **${o.title}** \| ${o.organization} \| \`${o.reward || 'N/A'}\` \| ${o.id.startsWith('mock') ? '🟢 Safe' : '🟢 Safe'} \| [Analyze](#${o.id})`).join('\n')}

---

## 🔍 Detailed Intel & Pitch Generator

`;

  for (const item of auditedOpportunities) {
    const opp = item.opportunity;
    const audit = item.audit;
    
    mdContent += `### <a id="${opp.id}"></a> ${opp.title} (${opp.organization})

- **Source**: \`${opp.source}\`
- **Resource Link**: [Original Opportunity Link](${opp.url})
- **Escrow / Compensation**: \`${opp.reward || 'N/A'}\`
- **Synapse x402 Commerce Gateway**: \`${item.x402Gateway}\`
- **Flux Generated Marketing Banner**: \`${item.bannerPath}\`

#### 🛡️ Reputation Safety Audit
> [!NOTE]
> **Audit Score: ${audit.auditScore}/100**
> 
> ${audit.analysis}

#### 📧 Proof of Work Outreach Proposal
\`\`\`text
${audit.proposedPitch}
\`\`\`

#### 🐦 Autonomous Social Campaign (Twitter Thread)
${audit.twitterThread.map((t, idx) => `${idx + 1}. *"${t}"*`).join('\n')}

---

`;
  }

  mdContent += `\n*End of AIOS Sentinel Execution Cycle.*`;

  fs.writeFileSync(reportPath, mdContent, 'utf-8');

  console.log(`
================================================================================
             🚀  AIOS Sentinel Run Completed Successfully!  🚀
================================================================================
  Final Report Compiled: ${reportPath}
  Total Opportunities Audited: ${opportunities.length}
  Total Pitches Formulated: ${auditedOpportunities.length}
  Total Flux Assets Generated: ${auditedOpportunities.length}
  
  All artifacts have been cleanly persisted to local workspace.
================================================================================
  `);
}

main().catch(error => {
  console.error('[AIOS Fatal Error]', error);
});
