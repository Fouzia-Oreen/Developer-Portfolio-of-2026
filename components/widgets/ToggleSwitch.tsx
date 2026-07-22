"use client"

import { motion } from "framer-motion"
import { Moon, Sun } from "@phosphor-icons/react"


export type Day_Night_Mode = "day" | "night"

interface ToggleSwitchProps {
  value: Day_Night_Mode
  onChange: (value: Day_Night_Mode) => void
}

export default function ToggleSwitch({
  value,
  onChange,
}: ToggleSwitchProps) {
  const isNight = value === "night"

  return (
    <button
      type="button"
      aria-label="Toggle appearance"
      onClick={() => onChange(isNight ? "day" : "night")}
      className="group relative flex h-5 flex-col items-center rounded-full border border-white/10 bg-black/20 p-[6px] backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:bg-black/30"
    >
      {/* Background */}

      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isNight ? "rgba(12,12,12,.55)" : "rgba(247,247,244,.18)",
        }}
        transition={{
          duration: 0.35,
        }}
      />

      {/* Switch */}
      <motion.div
        animate={{
          y: isNight ? 40 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 28,
        }}
        className="relative z-10 flex size-md flex-col items-center justify-center rounded-full bg-white/10 shadow-[0_12px_30px_-10px_rgba(245,78,0,.55)]"
      >
        <motion.div
          animate={{
            rotate: isNight ? -180 : 0,
            scale: isNight ? 0.9 : 1,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          {isNight ? (
            <Moon weight="fill" size={14} className="rotate-180 text-overlay-cream" />
          ) : (
            <Sun weight="fill" size={14} className="text-overlay-cream" />
          )}
        </motion.div>
      </motion.div>
    </button>
  )
}
