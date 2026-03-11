"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Sparkles, ArrowUpRight } from "lucide-react";
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

/* ── Coupang Brand Colors ── */
const COUPANG = {
  blue: "#0073E9",
  red: "#E94B22",
  yellow: "#FAC000",
  green: "#80BC27",
  lightBlue: "#3DACDC",
  dark: "#212B36",
};

/* ── Hero Intro ── */
function HeroIntro({ onEnter }: { onEnter: () => void }) {
  const [rocketLanded, setRocketLanded] = useState(false);

  useEffect(() => {
    // Rocket takes ~3.5s to rise, then text appears
    const timer = setTimeout(() => setRocketLanded(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-background overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <StarField />

      {/* Rocket rising from very bottom to upper area — slow & dramatic */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        initial={{ bottom: "-180px" }}
        animate={{ bottom: "calc(50% + 80px)" }}
        transition={{ duration: 3.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Exhaust trail — long flame behind rocket */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-full w-[3px]"
          style={{
            background: `linear-gradient(to bottom, ${COUPANG.blue}80, ${COUPANG.lightBlue}40, transparent)`,
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: [0, 300, 600, 200], opacity: [0, 0.8, 0.6, 0] }}
          transition={{ duration: 3.2, ease: "easeOut" }}
        />

        {/* Wider exhaust glow */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-full w-8 blur-md"
          style={{
            background: `linear-gradient(to bottom, ${COUPANG.blue}40, ${COUPANG.lightBlue}20, transparent)`,
          }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: [0, 200, 400, 100], opacity: [0, 0.5, 0.3, 0] }}
          transition={{ duration: 3.2, ease: "easeOut" }}
        />

        {/* Particle sparks from exhaust */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-full rounded-full"
            style={{
              left: `calc(50% + ${(i % 2 === 0 ? 1 : -1) * (8 + i * 4)}px)`,
              width: 3,
              height: 3,
              background: i % 3 === 0 ? COUPANG.yellow : COUPANG.lightBlue,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, 80 + i * 30, 200 + i * 20],
              opacity: [0, 0.8, 0],
              x: [(i % 2 === 0 ? 1 : -1) * 5, (i % 2 === 0 ? 1 : -1) * 20],
            }}
            transition={{
              duration: 1.5,
              delay: 0.8 + i * 0.3,
              repeat: 2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Orbital rings that appear around rocket as it rises */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{
            opacity: { delay: 1.5, duration: 1 },
            scale: { delay: 1.5, duration: 1 },
            rotate: { delay: 1.5, duration: 20, repeat: Infinity, ease: "linear" },
          }}
        >
          <div
            className="w-44 h-44 rounded-full"
            style={{ border: `1px solid ${COUPANG.blue}30` }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotate: -360 }}
          transition={{
            opacity: { delay: 2, duration: 1 },
            scale: { delay: 2, duration: 1 },
            rotate: { delay: 2, duration: 30, repeat: Infinity, ease: "linear" },
          }}
        >
          <div
            className="w-60 h-60 rounded-full border-dashed"
            style={{ border: `1px dashed ${COUPANG.blue}18` }}
          />
        </motion.div>

        {/* The Rocket */}
        <motion.div
          className="relative z-10 w-36 h-36 rounded-2xl flex items-center justify-center backdrop-blur-sm"
          style={{
            background: `linear-gradient(135deg, ${COUPANG.blue}25, ${COUPANG.blue}08)`,
            border: `1.5px solid ${COUPANG.blue}30`,
            boxShadow: `0 0 40px ${COUPANG.blue}15`,
          }}
          animate={
            rocketLanded
              ? { boxShadow: `0 0 60px ${COUPANG.blue}25` }
              : undefined
          }
          transition={{ duration: 1 }}
        >
          <Rocket
            className="w-16 h-16 -rotate-45"
            style={{ color: COUPANG.blue }}
          />
          {/* Yellow accent dot at rocket tip — the "destination" */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{
              backgroundColor: COUPANG.yellow,
              boxShadow: `0 0 8px ${COUPANG.yellow}80`,
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              boxShadow: [
                `0 0 6px ${COUPANG.yellow}60`,
                `0 0 12px ${COUPANG.yellow}90`,
                `0 0 6px ${COUPANG.yellow}60`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Text content — fades in AFTER rocket reaches center */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 flex items-start justify-center z-20 pointer-events-none pt-16">
        <div className="text-center px-6 max-w-2xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={rocketLanded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0 }}
          >
            <span
              className="text-[16px] font-semibold tracking-[6px] uppercase"
              style={{ color: "#E2E8F0" }}
            >
              coupang
            </span>
          </motion.div>

          <motion.h1
            className="text-[44px] sm:text-[52px] font-bold tracking-tight mb-5 mt-6 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={rocketLanded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#E2E8F0]">Recruitment </span>
            <span style={{ color: "#3D9BF0" }}>Life Cycle</span>
          </motion.h1>

          <motion.p
            className="text-[18px] font-medium mb-3 max-w-md mx-auto"
            style={{ color: "#CBD5E1" }}
            initial={{ y: 15, opacity: 0 }}
            animate={rocketLanded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Innovation Through Technology & AI
          </motion.p>

          <motion.p
            className="text-[16px] font-normal mb-10 max-w-sm mx-auto"
            style={{ color: "#94A3B8" }}
            initial={{ y: 15, opacity: 0 }}
            animate={rocketLanded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Elevating how we attract, assess, and onboard world-class talent
          </motion.p>

          {/* Thin blue divider line */}
          <motion.div
            className="w-[120px] h-[1px] mx-auto mb-10"
            style={{ background: `${COUPANG.blue}50` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={rocketLanded ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          />

          <motion.button
            onClick={onEnter}
            className="pointer-events-auto group inline-flex items-center gap-3 px-10 py-4 rounded-lg font-semibold text-[18px] text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: COUPANG.blue,
            }}
            initial={{ y: 15, opacity: 0 }}
            animate={rocketLanded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            whileHover={{
              boxShadow: `0 0 40px ${COUPANG.blue}50`,
            }}
          >
            <Sparkles className="w-5 h-5" />
            Explore the Life Cycle
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>

          <motion.p
            className="text-[14px] font-medium mt-14 tracking-[4px] uppercase"
            style={{ color: "#78879B" }}
            initial={{ opacity: 0 }}
            animate={rocketLanded ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            Talent Acquisition Innovation
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Dashboard ── */
export default function DashboardPage() {
  const [showIntro, setShowIntro] = useState(true);
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

      <AnimatePresence>
        {showIntro && <HeroIntro onEnter={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
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
              coupang recruitment life cycle
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
      )}
    </div>
  );
}
