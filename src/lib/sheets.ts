import { RecruitmentStage, KPI, SubStep, Task, Tool, AIOpportunity, AIEffectiveness } from "@/types/stage";
import { STAGE_COLORS } from "@/lib/constants";

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;

/**
 * Google Sheets structure (7 tabs):
 *
 * Tab: "Stages"
 * Columns: id | number | name | shortName | description | icon | responsibleTeam | traditionalApproach | challenges
 * (responsibleTeam = comma-separated, challenges = pipe-separated)
 *
 * Tab: "SubSteps"
 * Columns: stageId | title | description
 *
 * Tab: "KPIs"
 * Columns: stageId | label | value | unit | target | trend
 *
 * Tab: "Tasks"
 * Columns: stageId | title | owner
 *
 * Tab: "Tools"
 * Columns: stageId | name | category | description
 *
 * Tab: "AI Opportunities"
 * Columns: stageId | title | description | estimatedImpact | effort | caseStudy
 *
 * Tab: "AI Effectiveness"
 * Columns: stageId | metric | before | after | unit | source
 */

async function fetchTab(tabName: string): Promise<string[][]> {
  if (!SHEET_ID || !API_KEY) return [];

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(tabName)}?key=${API_KEY}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // cache for 60 seconds
    if (!res.ok) {
      console.warn(`Failed to fetch tab "${tabName}": ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data.values || [];
  } catch (err) {
    console.warn(`Error fetching tab "${tabName}":`, err);
    return [];
  }
}

function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header] = (row[i] || "").trim();
    });
    return obj;
  });
}

export async function fetchStagesFromSheets(): Promise<RecruitmentStage[] | null> {
  if (!SHEET_ID || !API_KEY) return null;

  const [stagesRaw, subStepsRaw, kpisRaw, tasksRaw, toolsRaw, aiOpsRaw, aiEffRaw] =
    await Promise.all([
      fetchTab("Stages"),
      fetchTab("SubSteps"),
      fetchTab("KPIs"),
      fetchTab("Tasks"),
      fetchTab("Tools"),
      fetchTab("AI Opportunities"),
      fetchTab("AI Effectiveness"),
    ]);

  const stageRows = rowsToObjects(stagesRaw);
  if (stageRows.length === 0) return null;

  const subSteps = rowsToObjects(subStepsRaw);
  const kpis = rowsToObjects(kpisRaw);
  const tasks = rowsToObjects(tasksRaw);
  const tools = rowsToObjects(toolsRaw);
  const aiOps = rowsToObjects(aiOpsRaw);
  const aiEff = rowsToObjects(aiEffRaw);

  return stageRows.map((row, i) => ({
    id: row.id || `stage-${i}`,
    number: parseInt(row.number) || i + 1,
    name: row.name || "",
    shortName: row.shortName || row.name || "",
    description: row.description || "",
    color: STAGE_COLORS[i] || STAGE_COLORS[0],
    icon: row.icon || "Circle",
    responsibleTeam: (row.responsibleTeam || "").split(",").map((s) => s.trim()).filter(Boolean),
    traditionalApproach: row.traditionalApproach || "",
    challenges: (row.challenges || "").split("|").map((s) => s.trim()).filter(Boolean),

    subSteps: subSteps
      .filter((s) => s.stageId === row.id)
      .map((s): SubStep => ({ title: s.title, description: s.description })),

    kpis: kpis
      .filter((k) => k.stageId === row.id)
      .map((k): KPI => ({
        label: k.label,
        value: parseFloat(k.value) || 0,
        unit: k.unit,
        target: parseFloat(k.target) || 0,
        trend: (k.trend as "up" | "down" | "flat") || "flat",
      })),

    tasks: tasks
      .filter((t) => t.stageId === row.id)
      .map((t): Task => ({ title: t.title, owner: t.owner })),

    tools: tools
      .filter((t) => t.stageId === row.id)
      .map((t): Tool => ({
        name: t.name,
        category: (t.category as "current" | "recommended") || "current",
        description: t.description,
      })),

    aiOpportunities: aiOps
      .filter((a) => a.stageId === row.id)
      .map((a): AIOpportunity => ({
        title: a.title,
        description: a.description,
        estimatedImpact: a.estimatedImpact,
        effort: (a.effort as "low" | "medium" | "high") || "medium",
        caseStudy: a.caseStudy || undefined,
      })),

    aiEffectiveness: aiEff
      .filter((e) => e.stageId === row.id)
      .map((e): AIEffectiveness => ({
        metric: e.metric,
        before: parseFloat(e.before) || 0,
        after: parseFloat(e.after) || 0,
        unit: e.unit,
        source: e.source,
      })),
  }));
}
