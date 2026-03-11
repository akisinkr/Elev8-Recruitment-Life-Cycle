import { stages } from "./stages";

export interface Phase {
  id: string;
  number: number;
  name: string;
  stageIds: string[];
  color: string;
}

export const phases: Phase[] = [
  {
    id: "prepare",
    number: 1,
    name: "Prepare",
    stageIds: ["workforce-planning", "intake-job-design", "sourcing-outreach"],
    color: "#0073E9",  // Coupang Blue
  },
  {
    id: "assess",
    number: 2,
    name: "Assess",
    stageIds: ["screening", "interview-assessment"],
    color: "#3DACDC",  // Coupang Light Blue
  },
  {
    id: "close",
    number: 3,
    name: "Close",
    stageIds: ["offer-negotiation", "onboarding"],
    color: "#80BC27",  // Coupang Green
  },
];

export function getStagesForPhase(phaseId: string) {
  const phase = phases.find((p) => p.id === phaseId);
  if (!phase) return [];
  return phase.stageIds.map((id) => stages.find((s) => s.id === id)!);
}
