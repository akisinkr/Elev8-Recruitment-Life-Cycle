"use client";

import { RecruitmentStage } from "@/types/stage";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export function TeamTasksSection({ stage }: { stage: RecruitmentStage }) {
  return (
    <div className="space-y-6">
      {/* Tasks */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Key Tasks
        </h4>
        <div className="space-y-2.5">
          {stage.tasks.map((task, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg bg-secondary/20 p-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm">{task.title}</span>
                <Badge variant="outline" className="ml-2 text-[10px] px-1.5 py-0">
                  {task.owner}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team summary */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Responsible Teams
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {stage.responsibleTeam.map((team) => (
            <div
              key={team}
              className="rounded-lg bg-secondary/30 p-2.5 text-center"
            >
              <span className="text-xs font-medium">{team}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
