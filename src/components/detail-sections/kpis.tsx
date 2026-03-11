"use client";

import { RecruitmentStage } from "@/types/stage";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-green-400" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-destructive" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
}

export function KPIsSection({ stage }: { stage: RecruitmentStage }) {
  return (
    <div className="space-y-4">
      {stage.kpis.map((kpi) => {
        const percentage = Math.min(100, (kpi.value / kpi.target) * 100);
        const isOnTrack = percentage >= 80;

        return (
          <div key={kpi.label} className="rounded-lg bg-secondary/30 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{kpi.label}</span>
              <div className="flex items-center gap-1.5">
                <TrendIcon trend={kpi.trend} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold text-foreground">
                  {kpi.value}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  {kpi.unit}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Target: {kpi.target} {kpi.unit}
              </span>
            </div>
            <Progress
              value={percentage}
              className="h-1.5"
              style={{
                // @ts-expect-error CSS custom property
                "--progress-color": isOnTrack ? "oklch(0.7 0.15 170)" : "oklch(0.73 0.12 83)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
