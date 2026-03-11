"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, ArrowUpRight } from "lucide-react";

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

export default function HomePage() {
  const [rocketLanded, setRocketLanded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setRocketLanded(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  function handleLaunchClick() {
    setShowPassword(true);
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-end bg-background overflow-hidden">
      <StarField />

      {/* Rocket rising from very bottom to upper area — slow & dramatic */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        initial={{ bottom: "-180px" }}
        animate={{ bottom: "calc(50% + 80px)" }}
        transition={{ duration: 3.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Exhaust trail */}
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

        {/* Particle sparks */}
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

        {/* Orbital rings around rocket */}
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

      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 flex items-start justify-center z-20 pointer-events-none pt-8 font-sans">
        <div className="text-center px-6 max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={rocketLanded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0 }}
          >
            <span
              className="text-[13px] font-medium tracking-[0.35em] uppercase"
              style={{ color: "#94A3B8" }}
            >
              coupang
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-[44px] sm:text-[52px] font-bold tracking-[-0.02em] mb-4 mt-5 leading-[1.1]"
            initial={{ y: 20, opacity: 0 }}
            animate={rocketLanded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#E2E8F0]">Recruiting </span>
            <span style={{ color: "#3D9BF0" }}>Intelligence</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-[18px] font-medium mb-10 tracking-[0.01em]"
            style={{ color: "#94A3B8" }}
            initial={{ y: 15, opacity: 0 }}
            animate={rocketLanded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Recruitment Life Cycle Innovation
          </motion.p>

          {/* Button or Password Input */}
          <AnimatePresence mode="wait">
            {!showPassword ? (
              <motion.button
                key="launch-btn"
                onClick={handleLaunchClick}
                className="pointer-events-auto font-sans group inline-flex items-center gap-3 px-12 py-4 rounded-lg font-semibold text-[17px] text-white tracking-[0.02em] transition-all hover:scale-105 active:scale-95"
                style={{
                  background: COUPANG.blue,
                }}
                initial={{ y: 15, opacity: 0 }}
                animate={rocketLanded ? { y: 0, opacity: 1 } : {}}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{
                  boxShadow: `0 0 40px ${COUPANG.blue}50`,
                }}
              >
                Launch
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            ) : (
              <motion.div
                key="password-form"
                className="pointer-events-auto flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <form
                  onSubmit={handlePasswordSubmit}
                  className="flex items-center gap-3"
                >
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    className="w-[220px] h-14 px-5 text-center text-[16px] font-medium rounded-lg bg-white/[0.08] border border-white/[0.15] text-[#E2E8F0] placeholder-[#64748B] outline-none focus:border-[#3D9BF0] focus:ring-1 focus:ring-[#3D9BF0] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading || !password}
                    className="h-14 px-10 rounded-lg font-semibold text-[17px] text-white tracking-[0.02em] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    style={{ background: COUPANG.blue }}
                  >
                    {loading ? "..." : "Launch"}
                  </button>
                </form>
                {error && (
                  <p className="text-[14px] text-[#E94B22] mt-3">
                    {error}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tagline */}
          <motion.p
            className="text-[12px] font-medium mt-8 tracking-[0.25em] uppercase"
            style={{ color: "#64748B" }}
            initial={{ opacity: 0 }}
            animate={rocketLanded ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            by Recruiting Innovation
          </motion.p>
        </div>
      </div>
    </div>
  );
}
