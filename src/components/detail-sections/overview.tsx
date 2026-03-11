"use client";

import { RecruitmentStage } from "@/types/stage";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertTriangle } from "lucide-react";

export function OverviewSection({ stage }: { stage: RecruitmentStage }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {stage.description}
      </p>

      {/* Sub-steps flow */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Process Flow
        </h4>
        <div className="space-y-3">
          {stage.subSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-primary">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{step.title}</span>
                  {i < stage.subSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traditional approach */}
      <div className="rounded-lg bg-secondary/30 p-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          Traditional Approach
        </h4>
        <p className="text-xs text-muted-foreground">{stage.traditionalApproach}</p>
      </div>

      {/* Challenges */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Key Challenges
        </h4>
        <div className="space-y-2">
          {stage.challenges.map((challenge, i) => (
            <div key={i} className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{challenge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Responsible teams */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Responsible Teams
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {stage.responsibleTeam.map((team) => (
            <Badge key={team} variant="secondary" className="text-xs">
              {team}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
