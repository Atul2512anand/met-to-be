"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroPaths() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.path
          d="M-140 820C340 760 520 520 705 150"
          stroke="#C4643E"
          strokeOpacity="0.22"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.path
          d="M1580 820C1100 760 920 520 735 150"
          stroke="#231C16"
          strokeOpacity="0.14"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
        />
        <circle cx="720" cy="138" r="6" fill="#C4643E" className="pulse-dot" />
      </svg>
    </div>
  );
}
