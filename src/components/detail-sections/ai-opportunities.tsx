"use client";

import { RecruitmentStage } from "@/types/stage";
import { Badge } from "@/components/ui/badge";
import { Zap, Lightbulb, BookOpen } from "lucide-react";

const effortColors = {
  low: "bg-green-500/10 text-green-400 border-0",
  medium: "bg-yellow-500/10 text-yellow-400 border-0",
  high: "bg-red-500/10 text-red-400 border-0",
};

export function AIOpportunitiesSection({ stage }: { stage: RecruitmentStage }) {
  return (
    <div className="space-y-3">
      {stage.aiOpportunities.map((opp, i) => (
        <div
          key={i}
          className="rounded-lg border border-primary/10 bg-card p-4 space-y-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm font-semibold">{opp.title}</span>
            </div>
            <Badge className={`text-[10px] px-1.5 py-0 ${effortColors[opp.effort]}`}>
              {opp.effort} effort
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed pl-6">
            {opp.description}
          </p>

          <div className="flex items-center gap-2 pl-6">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              {opp.estimatedImpact}
            </span>
          </div>

          {opp.caseStudy && (
            <div className="pl-6 pt-1">
              <div className="flex items-start gap-1.5 rounded bg-secondary/30 p-2">
                <BookOpen className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-[11px] text-muted-foreground leading-relaxed">
                  {opp.caseStudy}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
