"use client"

import { GeoLocation } from "@/lib/location"
import { cn } from "@/lib/utils"
import { WeatherData } from "@/lib/weather"
import { ArrowDownIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr"
import { motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import LiveLocator from "./widgets/LiveLocator"
import ToggleSwitch, { Day_Night_Mode } from "./widgets/ToggleSwitch"
import TokenUsageCard from "./widgets/tokenCard"

export const MEDIA: Record<Day_Night_Mode, { poster: string; video: string }> =
  {
    day: {
      poster: "/assets/03.png",
      video: "/assets/hero-background-video.mp4",
    },
    night: {
      poster: "/assets/04.png",
      video: "/assets/hero-night-video.mp4",
    },
  } as const

interface HeroProps {
  location: GeoLocation
  weather: WeatherData
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const switchVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const tokenCardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const scrollIndicatorVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.9,
      ease: "easeOut",
    },
  },
}

export default function Hero({
  location,
  weather,
}: HeroProps): React.ReactElement {
  const [mode, setMode] = useState<Day_Night_Mode>("day")
  const [isVideoPlayed, setIsVideoPlayed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsVideoPlayed(false)
    if (videoRef.current) {
      videoRef.current.load()
      void videoRef.current.play()
    }
  }, [mode])

  const { poster, video } = MEDIA[mode]

  return (
    <section className="relative isolate h-svh w-full overflow-hidden bg-overlay-ink text-overlay-cream">
      {/* image & video with parallax effect */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute h-full w-full object-cover"
          onCanPlay={() => setIsVideoPlayed(true)}
        />
        <Image
          src={poster}
          alt="Hero"
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-700 ease-in-out",
            isVideoPlayed ? "opacity-0" : "opacity-100"
          )}
        />
      </motion.div>

      {/* overlay with subtle gradient animation */}
      <motion.div
        className="absolute inset-0 z-10 bg-[linear-gradient(108deg,rgba(15,15,12,0.78)_0%,rgba(15,15,12,0.58)_22%,rgba(15,15,12,0.32)_46%,rgba(15,15,12,0.18)_68%,rgba(15,15,12,0)_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div
        className="absolute inset-x-0 top-0 z-20 h-10 bg-[linear-gradient(to_bottom,rgba(15,15,12,0.65)_0%,rgba(15,15,12,0.35)_40%,rgba(15,15,12,0.12)_75%,transparent_100%)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Foreground content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="h-12 shrink-0 md:h-16" />

        <div className="flex flex-1 items-center">
          {/* Left Content with staggered animation */}
          <motion.div
            className="w-full max-w-92.5 px-4 md:px-6 xl:px-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="max-w-40" variants={itemVariants}>
              <motion.h1
                className="caption-uppercase font-normal text-overlay-cream/70"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                Full-stack AI First Engineer
              </motion.h1>

              <motion.h2
                className="mt-4 text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1.04] tracking-[-0.03em]"
                variants={itemVariants}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  Modern Software
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  built to think,
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  shipped end to end
                </motion.span>
              </motion.h2>

              <motion.p
                className="mt-3 text-base leading-[1.6] text-overlay-cream/80 md:w-25"
                variants={itemVariants}
              >
                I'm Fouzia Oreen, a full-stack engineer designing and shipping
                AI-native products from the inference layer to the last
                interaction.
              </motion.p>

              <motion.div
                className="mt-5 flex flex-wrap gap-1.5"
                variants={itemVariants}
              >
                <Button
                  asChild
                  className="group relative h-2.5 overflow-hidden px-2"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link href="#work">
                    <motion.span
                      className="relative z-10 flex items-center gap-1"
                      animate={{
                        x: isHovered ? 4 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      View Selected Work
                      <motion.span
                        className="relative h-[15px] w-[15px] overflow-hidden"
                        transition={{ duration: 0.3 }}
                      >
                        <span className="absolute inset-0 flex flex-col transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-[-15px]">
                          <ArrowUpRightIcon
                            weight="bold"
                            className="size-[15px] shrink-0"
                          />
                          <ArrowUpRightIcon
                            weight="bold"
                            className="size-[15px] shrink-0"
                          />
                        </span>
                      </motion.span>
                    </motion.span>
                    <motion.span
                      className="absolute inset-0 bg-primary-active"
                      initial={{ x: "-100%" }}
                      animate={{ x: isHovered ? 0 : "-100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="glass"
                  size="sm"
                  className="h-2.5 px-2"
                >
                  <Link href="#contact">Get In Touch</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Day/Night Switch with animation */}
          <motion.div
            className="absolute top-[25%] right-md z-20 flex -translate-1/2 md:right-4 lg:right-6 xl:right-10"
            variants={switchVariants}
            initial="initial"
            animate="animate"
          >
            <ToggleSwitch value={mode} onChange={setMode} />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute right-4 z-20 hidden items-end lg:right-6 lg:bottom-8.5 lg:flex xl:right-10 2xl:bottom-9"
            variants={tokenCardVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="pointer-events-auto"
              transition={{ duration: 0.2 }}
            >
              <TokenUsageCard />
            </motion.div>
          </motion.div>
        </div>

        {/* Button Stripe */}
        <motion.div
          className="shrink-0 pb-4 lg:py-4"
          variants={scrollIndicatorVariants}
          initial="initial"
          animate="animate"
        >
          <div className="mx-auto mt-2 flex w-full flex-col items-start justify-between gap-2 px-4 md:px-6 xl:mt-0 xl:flex-row xl:items-center xl:px-10">
            <p className="relative inline-flex cursor-default items-center justify-center gap-1 rounded-full border border-overlay-cream/20 bg-ink/40 px-1 py-0.5 font-mono text-[11px] tracking-[0.04em] text-overlay-cream/85 backdrop-blur-md">
              <span className="relative inline-flex size-0.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70 opacity-75" />
                <span className="relative inline-flex size-0.5 rounded-full bg-green-500" />
              </span>
              <span>Available for new work · Q3 2026</span>
            </p>

            <div className="flex items-center gap-0.5 text-overlay-cream/65 md:gap-2">
              <motion.span
                className="hidden items-center gap-0.5 md:flex md:gap-2"
                variants={scrollIndicatorVariants}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  animate={{
                    y: [0, 6, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDownIcon size={14} weight="bold" />
                </motion.div>
                <span className="caption-uppercase">Scroll</span>
                <span className="h-px w-1 bg-overlay-cream/35 md:w-4" />
              </motion.span>

              {/* Live Locator with pulse effect */}
              <motion.div transition={{ duration: 0.2 }}>
                <LiveLocator location={location} weather={weather} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
