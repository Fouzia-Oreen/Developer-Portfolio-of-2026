"use client"

import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react/ssr"
import { AnimatePresence, motion, Variants } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

import { NAV_LINKS } from "@/lib/content"
import { Button } from "./ui/button"

// Animation variants
const headerVariants: Variants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const logoVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
}

const navItemVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.2 + i * 0.08,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -2,
    transition: { duration: 0.2 },
  },
}

const buttonVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
}

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const mobileNavItemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hover: {
    x: 4,
    transition: { duration: 0.2 },
  },
}

const mobileCTAVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.3,
      ease: "easeOut",
    },
  },
}

const pulseDotVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let lastScroll = 0

    const onScroll = () => {
      const current = window.scrollY

      setIsScrolled(current > 20)

      if (current <= 20) {
        setIsCompact(false)
      } else {
        if (current > lastScroll) {
          setIsCompact(true)
        } else {
          setIsCompact(false)
        }
      }

      lastScroll = current
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          isCompact ? "px-2 pt-2" : "px-0 pt-0",
        ].join(" ")}
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className={[
            "mx-auto flex h-6 items-center justify-between",
            isCompact
              ? "max-w-6xl rounded-lg bg-black/40 px-2 shadow-[0_10px_50px_rgba(0,0,0,.15)] backdrop-blur-2xl md:px-6"
              : "max-w-full px-6 xl:px-10",
            isScrolled && !isCompact ? "bg-black/5 backdrop-blur-lg" : "",
          ].join(" ")}
          layout
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-overlay-cream"
            >
              Fouzia <span className="text-primary">.</span>
            </Link>
          </motion.div>

          <nav className="hidden items-center gap-4 lg:flex">
            {NAV_LINKS.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-overlay-cream/75 transition duration-200 hover:text-primary"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="hidden lg:flex"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Button
              variant="glass"
              className="group relative h-2.5 overflow-hidden px-2"
            >
              <motion.span
                className="absolute inset-0 bg-overlay-cream/5"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? 0 : "-100%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative mr-0.5 inline-flex size-0.5">
                <motion.span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70 opacity-75"
                  variants={pulseDotVariants}
                  animate="animate"
                />
                <motion.span
                  className="relative inline-flex size-0.5 rounded-full bg-green-500"
                  variants={pulseDotVariants}
                  animate="animate"
                />
              </span>
              <motion.span
                whileHover={{ letterSpacing: "0.02em" }}
                transition={{ duration: 0.2 }}
              >
                Let's Talk
              </motion.span>
            </Button>
          </motion.div>

          <motion.button
            onClick={() => setMenuOpen(true)}
            className="flex size-2.5 cursor-pointer items-center justify-center rounded-full border border-overlay-cream/10 bg-overlay-cream/10 text-overlay-cream backdrop-blur lg:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ListIcon size={18} />
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={[
              "fixed inset-0 z-60",
              "transition-all duration-300",
              menuOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            ].join(" ")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.aside
              className={[
                "absolute inset-y-0 right-0 z-50",
                "flex h-full w-full flex-col",
                "overflow-x-hidden overflow-y-auto",
                "bg-[#11110f]/60",
                "backdrop-blur-2xl",
                "transition-transform duration-300",
                "lg:hidden",
              ].join(" ")}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Header */}
              <motion.div
                className="flex items-center justify-between px-4 py-3 text-overlay-cream"
                variants={mobileNavItemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/"
                    className="text-lg font-semibold tracking-tight text-overlay-cream"
                  >
                    Fouzia <span className="text-primary">.</span>
                  </Link>
                </motion.div>

                <motion.button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex size-2.5 cursor-pointer items-center justify-center rounded-full border border-overlay-cream/10 bg-transparent backdrop-blur"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <XIcon size={18} color="white" />
                </motion.button>
              </motion.div>

              {/* Navigation */}
              <nav className="mt-2 flex flex-col px-4 md:mt-4">
                {NAV_LINKS.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={mobileNavItemVariants}
                    whileHover="hover"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group/button flex items-center justify-between border-b border-overlay-cream/10 py-2.75 text-lg text-overlay-cream transition-colors duration-400 hover:text-primary-active"
                    >
                      {item.label}
                      <motion.span
                        className="relative h-[15px] w-[15px] overflow-hidden"
                        whileHover={{ rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="absolute inset-0 flex flex-col transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover/button:translate-y-[-15px]">
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
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                className="grid w-full gap-1.5 px-2 py-3 md:grid-cols-2 md:gap-2 md:p-4"
                variants={mobileCTAVariants}
              >
                <Button
                  asChild
                  className="group relative h-2.5 min-w-0 overflow-hidden"
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
                  className="h-2.5 min-w-0"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <Link
                      href="#contact"
                      className="flex w-full items-center justify-center"
                    >
                      <motion.span
                        whileHover={{ letterSpacing: "0.02em" }}
                        transition={{ duration: 0.2 }}
                      >
                        Let's Talk
                      </motion.span>
                    </Link>
                  </motion.div>
                </Button>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
