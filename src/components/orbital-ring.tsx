"use client";

import { motion } from "framer-motion";
import { RING_SIZE, RING_CENTER, RING_RADIUS } from "@/lib/constants";
import { StageDot } from "./stage-dot";
import { RecruitmentStage } from "@/types/stage";

interface OrbitalRingProps {
  stages: RecruitmentStage[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrbitalRing({ stages, selectedId, onSelect }: OrbitalRingProps) {
  return (
    <div className="relative w-full max-w-[720px] mx-auto aspect-square">
      <svg
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        className="w-full h-full"
      >
        {/* Outer decorative ring — thicker for projector */}
        <circle
          cx={RING_CENTER}
          cy={RING_CENTER}
          r={RING_RADIUS + 40}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth={0.8}
          opacity={0.08}
        />

        {/* Main ring — thicker stroke for screen-share */}
        <motion.circle
          cx={RING_CENTER}
          cy={RING_CENTER}
          r={RING_RADIUS}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth={2.5}
          strokeDasharray="8 5"
          opacity={0.15}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />

        {/* Inner decorative ring */}
        <circle
          cx={RING_CENTER}
          cy={RING_CENTER}
          r={RING_RADIUS - 40}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth={0.8}
          opacity={0.06}
        />

        {/* Stage dots */}
        {stages.map((stage, i) => (
          <StageDot
            key={stage.id}
            index={i}
            total={stages.length}
            color={stage.color}
            shortName={stage.shortName}
            isSelected={selectedId === stage.id}
            isAnySelected={selectedId !== null}
            onSelect={() => onSelect(stage.id)}
          />
        ))}
      </svg>

      {/* Center content — larger text for execs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-center"
          animate={{
            opacity: selectedId ? 0.3 : 1,
            scale: selectedId ? 0.9 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-[48px] font-bold text-[#3D9BF0] mb-1">7</div>
          <div className="text-[18px] text-[#CBD5E1] font-semibold">Stages</div>
          <div className="text-[14px] text-[#94A3B8] mt-2">Click a stage to explore</div>
        </motion.div>
      </div>
    </div>
  );
}
