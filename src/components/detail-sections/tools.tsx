"use client";

import { RecruitmentStage } from "@/types/stage";
import { Badge } from "@/components/ui/badge";
import { Wrench, Sparkles } from "lucide-react";

export function ToolsSection({ stage }: { stage: RecruitmentStage }) {
  const current = stage.tools.filter((t) => t.category === "current");
  const recommended = stage.tools.filter((t) => t.category === "recommended");

  return (
    <div className="space-y-6">
      {/* Current tools */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="w-3.5 h-3.5 text-muted-foreground" />
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Current Tools
          </h4>
        </div>
        <div className="space-y-2">
          {current.map((tool) => (
            <div
              key={tool.name}
              className="rounded-lg bg-secondary/20 p-3 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-muted-foreground">
                  {tool.name.charAt(0)}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium">{tool.name}</span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended tools */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">
            AI-Recommended Tools
          </h4>
        </div>
        <div className="space-y-2">
          {recommended.map((tool) => (
            <div
              key={tool.name}
              className="rounded-lg border border-primary/20 bg-primary/5 p-3 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{tool.name}</span>
                  <Badge className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0">
                    AI
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
