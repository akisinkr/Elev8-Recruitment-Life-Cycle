"use client";

import { motion } from "framer-motion";
import { RING_CENTER, RING_RADIUS, DOT_RADIUS } from "@/lib/constants";

interface StageDotProps {
  index: number;
  total: number;
  color: string;
  shortName: string;
  isSelected: boolean;
  isAnySelected: boolean;
  onSelect: () => void;
}

function getPosition(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: RING_CENTER + RING_RADIUS * Math.cos(angle),
    y: RING_CENTER + RING_RADIUS * Math.sin(angle),
    angle,
  };
}

function getLabelPosition(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const labelRadius = RING_RADIUS + 80;
  return {
    x: RING_CENTER + labelRadius * Math.cos(angle),
    y: RING_CENTER + labelRadius * Math.sin(angle),
  };
}

export function StageDot({
  index,
  total,
  color,
  shortName,
  isSelected,
  isAnySelected,
  onSelect,
}: StageDotProps) {
  const pos = getPosition(index, total);
  const labelPos = getLabelPosition(index, total);

  return (
    <g className="cursor-pointer" onClick={onSelect}>
      {/* Invisible larger hit area for easier clicking (44px+) */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={DOT_RADIUS + 12}
        fill="transparent"
        className="pointer-events-auto"
      />

      {/* Glow effect — slower for projector */}
      {isSelected && (
        <motion.circle
          cx={pos.x}
          cy={pos.y}
          r={DOT_RADIUS + 14}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            r: [DOT_RADIUS + 10, DOT_RADIUS + 16, DOT_RADIUS + 10],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Outer ring — thicker for visibility */}
      <motion.circle
        cx={pos.x}
        cy={pos.y}
        r={DOT_RADIUS + 3}
        fill="none"
        stroke={color}
        strokeWidth={isSelected ? 3 : 2}
        opacity={isAnySelected && !isSelected ? 0.25 : 0.7}
        whileHover={{ strokeWidth: 3, opacity: 1 }}
      />

      {/* Main dot — larger fill for visibility */}
      <motion.circle
        cx={pos.x}
        cy={pos.y}
        r={DOT_RADIUS}
        fill={isSelected ? color : `${color}40`}
        stroke={color}
        strokeWidth={isSelected ? 0 : 1.5}
        opacity={isAnySelected && !isSelected ? 0.35 : 1}
        whileHover={{ scale: 1.15, fill: color }}
        transition={{ duration: 0.3 }}
      />

      {/* Stage number — larger, bolder */}
      <motion.text
        x={pos.x}
        y={pos.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="22"
        fontWeight="700"
        className="select-none pointer-events-none"
        fill={isSelected ? "#141D2B" : "#E2E8F0"}
        opacity={isAnySelected && !isSelected ? 0.35 : 1}
      >
        {index + 1}
      </motion.text>

      {/* Label — bigger, semibold for projector readability */}
      <motion.text
        x={labelPos.x}
        y={labelPos.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="18"
        fontWeight="600"
        className="select-none pointer-events-none"
        fill={isSelected ? "#E2E8F0" : "#CBD5E1"}
        opacity={isAnySelected && !isSelected ? 0.25 : isSelected ? 1 : 0.8}
      >
        {shortName}
      </motion.text>
    </g>
  );
}
