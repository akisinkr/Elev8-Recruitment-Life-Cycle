"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrbitalRing } from "@/components/orbital-ring";
import { DetailPanel } from "@/components/detail-panel";
import { stages as staticStages } from "@/data/stages";
import { RecruitmentStage } from "@/types/stage";

/* ── Starfield ── */
function StarField() {
  const [stars, setStars] = useState<
    { x: number; y: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Dashboard ── */
export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stages, setStages] = useState<RecruitmentStage[]>(staticStages);

  // Fetch from Google Sheets (falls back to static data)
  useEffect(() => {
    fetch("/api/stages")
      .then((r) => r.json())
      .then((data) => {
        if (data.stages?.length > 0) setStages(data.stages);
      })
      .catch(() => {}); // silently use static fallback
  }, []);

  const selectedStage = stages.find((s) => s.id === selectedId) ?? null;

  return (
    <div className="min-h-screen bg-background relative">
      <StarField />

      <motion.div
        className="relative z-10 min-h-screen flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left: Orbital Ring */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <motion.p
            className="text-[14px] tracking-[4px] uppercase font-medium mb-8"
            style={{ color: "#94A3B8" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            coupang recruiting intelligence
          </motion.p>

          <div className="w-full max-w-[680px]">
            <OrbitalRing
              stages={stages}
              selectedId={selectedId}
              onSelect={(id) =>
                setSelectedId(selectedId === id ? null : id)
              }
            />
          </div>
        </div>

        {/* Right: Detail Panel */}
        <AnimatePresence>
          {selectedStage && (
            <DetailPanel
              key={selectedStage.id}
              stage={selectedStage}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
