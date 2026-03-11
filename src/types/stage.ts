export interface KPI {
  label: string;
  value: number;
  unit: string;
  target: number;
  trend: "up" | "down" | "flat";
}

export interface SubStep {
  title: string;
  description: string;
}

export interface Task {
  title: string;
  owner: string;
}

export interface Tool {
  name: string;
  category: "current" | "recommended";
  description: string;
}

export interface AIOpportunity {
  title: string;
  description: string;
  estimatedImpact: string;
  effort: "low" | "medium" | "high";
  caseStudy?: string;
}

export interface AIEffectiveness {
  metric: string;
  before: number;
  after: number;
  unit: string;
  source: string;
}

export interface RecruitmentStage {
  id: string;
  number: number;
  name: string;
  shortName: string;
  description: string;
  color: string;
  icon: string;
  responsibleTeam: string[];
  subSteps: SubStep[];
  kpis: KPI[];
  tasks: Task[];
  tools: Tool[];
  aiOpportunities: AIOpportunity[];
  aiEffectiveness: AIEffectiveness[];
  traditionalApproach: string;
  challenges: string[];
}
