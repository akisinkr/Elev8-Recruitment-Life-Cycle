"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { RecruitmentStage } from "@/types/stage";

interface DetailPanelProps {
  stage: RecruitmentStage;
  onClose: () => void;
}

/* ── Accordion Section ── */
function AccordionItem({
  title,
  stat,
  statColor,
  isOpen,
  onToggle,
  stageColor,
  children,
}: {
  title: string;
  stat: string;
  statColor?: string;
  isOpen: boolean;
  onToggle: () => void;
  stageColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between min-h-[56px] px-6 transition-colors duration-150 group"
        style={{
          backgroundColor: isOpen ? `${stageColor}0A` : "transparent",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Active indicator — 3px for projector visibility */}
          <div
            className="w-[3px] h-6 rounded-full transition-all duration-300"
            style={{
              backgroundColor: isOpen ? stageColor : "transparent",
            }}
          />
          <span className="text-[20px] font-semibold tracking-wide text-[#E2E8F0]">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-[16px] font-medium tracking-[0.01em]"
            style={{ color: statColor || "#94A3B8" }}
          >
            {stat}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <ChevronRight className="w-5 h-5 text-[#78879B]" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, delay: 0.05 },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="px-6 pb-5 pl-12"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Section: Process ── */
function ProcessContent({ stage }: { stage: RecruitmentStage }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {stage.subSteps.map((step, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold"
              style={{
                backgroundColor: `${stage.color}25`,
                color: stage.color,
              }}
            >
              {i + 1}
            </div>
            <span className="text-[16px] font-medium tracking-[0.01em] text-[#CBD5E1]">{step.title}</span>
          </div>
          {i < stage.subSteps.length - 1 && (
            <span className="text-[#78879B] text-[14px]">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Section: Metrics ── */
function MetricsContent({ stage }: { stage: RecruitmentStage }) {
  return (
    <div className="space-y-4">
      {stage.kpis.map((kpi, i) => {
        const ratio = Math.min((kpi.value / kpi.target) * 100, 100);
        const isGood =
          kpi.trend === "up"
            ? kpi.value >= kpi.target
            : kpi.value <= kpi.target;
        const barColor = isGood ? "#80BC27" : ratio > 70 ? "#FAC000" : "#E94B22";

        return (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[16px] font-medium tracking-[0.01em] text-[#CBD5E1] w-36 flex-shrink-0 truncate">
              {kpi.label}
            </span>
            <div className="flex-1 h-[4px] rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${ratio}%`, backgroundColor: barColor }}
              />
            </div>
            <span className="text-[16px] font-bold text-[#E2E8F0] w-20 text-right">
              {kpi.value}
              {kpi.unit === "%" ? "%" : ` ${kpi.unit}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Section: Actions ── */
function ActionsContent({ stage }: { stage: RecruitmentStage }) {
  return (
    <div className="space-y-3">
      {stage.tasks.slice(0, 5).map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#78879B] flex-shrink-0" />
          <span className="text-[16px] font-medium tracking-[0.01em] text-[#CBD5E1] flex-1 truncate">
            {item.title}
          </span>
          <span className="text-[15px] text-[#94A3B8] tracking-[0.01em] flex-shrink-0">
            {item.owner}
          </span>
        </div>
      ))}
      {stage.tools.filter((t) => t.category === "current").length > 0 && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06] flex-wrap">
          <span className="text-[13px] text-[#78879B] uppercase tracking-[0.08em] font-semibold">Tools</span>
          {stage.tools
            .filter((t) => t.category === "current")
            .map((tool, i) => (
              <span
                key={i}
                className="text-[15px] font-medium px-3 py-1 rounded-full tracking-[0.01em]"
                style={{
                  backgroundColor: `${stage.color}15`,
                  color: stage.color,
                }}
              >
                {tool.name}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}

/* ── Section: AI Ops ── */
function AIContent({ stage }: { stage: RecruitmentStage }) {
  return (
    <div className="space-y-3.5">
      {stage.aiOpportunities.slice(0, 3).map((ai, i) => (
        <div key={i} className="flex items-start gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
            style={{ backgroundColor: stage.color }}
          />
          <div className="flex-1 min-w-0">
            <span className="text-[16px] font-medium tracking-[0.01em] text-[#E2E8F0]">{ai.title}</span>
            <span className="text-[15px] text-[#94A3B8] tracking-[0.01em] ml-2">
              {ai.estimatedImpact}
            </span>
          </div>
        </div>
      ))}
      {stage.aiEffectiveness.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-5">
            {stage.aiEffectiveness.slice(0, 2).map((eff, i) => {
              const improvement =
                eff.unit === "%"
                  ? eff.after - eff.before
                  : Math.round(((eff.before - eff.after) / eff.before) * 100);
              return (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-[24px] font-bold text-[#80BC27]">
                    {Math.abs(improvement)}%
                  </span>
                  <span className="text-[14px] font-medium text-[#94A3B8] tracking-[0.02em]">
                    {eff.metric}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Panel ── */
export function DetailPanel({ stage, onClose }: DetailPanelProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const kpisOnTrack = stage.kpis.filter((k) =>
    k.trend === "up" ? k.value >= k.target : k.value <= k.target
  ).length;
  const activeAI = stage.aiOpportunities.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="w-full lg:w-[460px] xl:w-[480px] h-full flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#141D2B",
        borderLeft: `1px solid ${stage.color}25`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="text-[22px] font-bold"
            style={{ color: stage.color }}
          >
            {stage.number}.
          </span>
          <h2 className="text-[22px] font-semibold text-[#E2E8F0] truncate">
            {stage.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Team badges */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.06]">
        {stage.responsibleTeam.slice(0, 4).map((team) => (
          <span
            key={team}
            className="text-[14px] font-medium text-[#CBD5E1] tracking-[0.02em] px-3 py-1.5 rounded-full bg-white/[0.06]"
          >
            {team}
          </span>
        ))}
      </div>

      {/* Accordion sections */}
      <div className="flex-1 overflow-y-auto">
        <AccordionItem
          title="Process"
          stat={`${stage.subSteps.length} steps`}
          isOpen={openSection === "process"}
          onToggle={() => toggle("process")}
          stageColor={stage.color}
        >
          <ProcessContent stage={stage} />
        </AccordionItem>

        <AccordionItem
          title="Metrics"
          stat={`${kpisOnTrack}/${stage.kpis.length} on track`}
          statColor={
            kpisOnTrack === stage.kpis.length
              ? "#80BC27"
              : kpisOnTrack >= stage.kpis.length / 2
                ? "#FAC000"
                : "#E94B22"
          }
          isOpen={openSection === "metrics"}
          onToggle={() => toggle("metrics")}
          stageColor={stage.color}
        >
          <MetricsContent stage={stage} />
        </AccordionItem>

        <AccordionItem
          title="Actions"
          stat={`${stage.tasks.length} tasks`}
          isOpen={openSection === "actions"}
          onToggle={() => toggle("actions")}
          stageColor={stage.color}
        >
          <ActionsContent stage={stage} />
        </AccordionItem>

        <AccordionItem
          title="AI Ops"
          stat={`${activeAI} active`}
          statColor={stage.color}
          isOpen={openSection === "ai"}
          onToggle={() => toggle("ai")}
          stageColor={stage.color}
        >
          <AIContent stage={stage} />
        </AccordionItem>
      </div>
    </motion.div>
  );
}
