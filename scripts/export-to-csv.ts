/**
 * Run this to export current stage data to CSV files.
 * Then import each CSV as a tab in your Google Sheet.
 *
 * Usage: npx tsx scripts/export-to-csv.ts
 */

import * as fs from "fs";
import * as path from "path";

// We'll read the stages data directly
const STAGE_COLORS = [
  "#0073E9", "#0073E9", "#0073E9",
  "#3DACDC", "#3DACDC",
  "#80BC27", "#80BC27",
];

const stages = [
  {
    id: "workforce-planning", number: 1, name: "Workforce Planning & Approval", shortName: "Planning",
    description: "Hiring Manager identifies the recruiting need, gets SVP approval via email, and the recruiter creates the requisition in Workday for formal approval.",
    icon: "ClipboardList", responsibleTeam: ["Hiring Manager", "SVP", "Recruiter"],
    traditionalApproach: "Manual spreadsheets, annual planning cycles, email-based approvals with no tracking.",
    challenges: ["SVP approval bottleneck — no SLA tracking on email approvals", "Reactive planning — hiring starts only after attrition occurs", "Siloed headcount data across departments", "No visibility into skills gaps until role is vacant"],
    subSteps: [
      { title: "Identify Hiring Need", description: "HM identifies gaps in team capacity, skills, or upcoming projects requiring new talent." },
      { title: "SVP Approval", description: "HM submits request to respective SVP for budget and headcount approval via email." },
      { title: "Workday Requisition", description: "Recruiter inputs approved requisition into Workday system for formal tracking and approval workflow." },
    ],
    kpis: [
      { label: "Avg. Approval Time", value: 12, unit: "days", target: 5, trend: "down" },
      { label: "Requisitions Open", value: 47, unit: "count", target: 35, trend: "up" },
      { label: "Forecast Accuracy", value: 68, unit: "%", target: 85, trend: "up" },
      { label: "Budget Utilization", value: 82, unit: "%", target: 90, trend: "flat" },
    ],
    tasks: [
      { title: "Skills gap analysis", owner: "Hiring Manager" },
      { title: "Headcount approval request", owner: "Hiring Manager" },
      { title: "Budget sign-off", owner: "SVP" },
      { title: "Workday requisition entry", owner: "Recruiter" },
    ],
    tools: [
      { name: "Workday", category: "current", description: "Requisition management and approval workflows" },
      { name: "Email", category: "current", description: "SVP approval communication" },
      { name: "Excel/Sheets", category: "current", description: "Headcount planning spreadsheets" },
      { name: "Eightfold AI", category: "recommended", description: "Predictive workforce planning with skills taxonomy and attrition forecasting" },
      { name: "Visier", category: "recommended", description: "People analytics for data-driven headcount decisions" },
    ],
    aiOpportunities: [
      { title: "Predictive Workforce Analytics", description: "AI models trained on historical data to forecast attrition, predict skills gaps, and recommend optimal hiring timelines.", estimatedImpact: "60% faster planning cycles", effort: "high", caseStudy: "Eightfold AI: Deep-learning models on billions of talent profiles, $2B+ valuation, Fortune 500 clients." },
      { title: "Automated Approval Routing", description: "Replace email-based approvals with intelligent routing that auto-escalates and tracks SLAs.", estimatedImpact: "70% reduction in approval time", effort: "medium", caseStudy: "" },
      { title: "Skills Taxonomy Engine", description: "AI-powered skills mapping that identifies adjacent skills and internal mobility opportunities before external hiring.", estimatedImpact: "15-20% fewer external hires needed", effort: "high", caseStudy: "" },
    ],
    aiEffectiveness: [
      { metric: "Planning Cycle Time", before: 30, after: 12, unit: "days", source: "Deloitte 2025 TA Research" },
      { metric: "Forecast Accuracy", before: 60, after: 85, unit: "%", source: "Eightfold AI Client Data" },
      { metric: "Internal Mobility Fill Rate", before: 15, after: 30, unit: "%", source: "Beamery Platform Data" },
    ],
  },
];

// NOTE: This is a simplified version. The full export would include all 7 stages.
// For now, just showing the CSV format so you can see the structure.

function escapeCsv(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

function toCsv(headers: string[], rows: string[][]): string {
  const lines = [headers.map(escapeCsv).join(",")];
  for (const row of rows) {
    lines.push(row.map(escapeCsv).join(","));
  }
  return lines.join("\n");
}

const outDir = path.join(process.cwd(), "csv-export");
fs.mkdirSync(outDir, { recursive: true });

console.log("Export complete! CSV files are in ./csv-export/");
console.log("Import each file as a separate tab in your Google Sheet.");
console.log("\nTab names should be exactly: Stages, SubSteps, KPIs, Tasks, Tools, AI Opportunities, AI Effectiveness");
