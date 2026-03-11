"use client";

import { Activity } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">
              Coupang Recruitment Life Cycle
            </h1>
            <p className="text-xs text-muted-foreground">
              Innovation Through Technology & AI
            </p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground hidden sm:block">
          Interactive Dashboard
        </div>
      </div>
    </header>
  );
}
