"use client";

import { RecruitmentStage } from "@/types/stage";
import { ArrowRight, BarChart3 } from "lucide-react";

export function AIEffectivenessSection({ stage }: { stage: RecruitmentStage }) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Measuring AI effectiveness: compare before/after metrics across key dimensions.
        Data sourced from industry benchmarks and case studies.
      </p>

      {stage.aiEffectiveness.map((metric, i) => {
        const improvement = metric.unit === "%"
          ? metric.after - metric.before
          : Math.round(((metric.before - metric.after) / metric.before) * 100);
        const isPositive = metric.unit === "%"
          ? metric.after > metric.before
          : metric.after < metric.before;

        return (
          <div
            key={i}
            className="rounded-lg bg-card border border-border/50 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{metric.metric}</span>
              </div>
              <span
                className={`text-xs font-bold ${
                  isPositive ? "text-green-400" : "text-destructive"
                }`}
              >
                {isPositive ? "+" : ""}{improvement}{metric.unit === "%" ? "pp" : "%"} improvement
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Before */}
              <div className="flex-1 rounded-lg bg-destructive/10 p-2.5 text-center">
                <div className="text-xs text-muted-foreground mb-0.5">Before AI</div>
                <div className="text-lg font-bold text-destructive">
                  {metric.before}
                  <span className="text-xs ml-0.5">{metric.unit}</span>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />

              {/* After */}
              <div className="flex-1 rounded-lg bg-green-500/10 p-2.5 text-center">
                <div className="text-xs text-muted-foreground mb-0.5">With AI</div>
                <div className="text-lg font-bold text-green-400">
                  {metric.after}
                  <span className="text-xs ml-0.5">{metric.unit}</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-muted-foreground/60 text-right">
              Source: {metric.source}
            </div>
          </div>
        );
      })}
    </div>
  );
}
