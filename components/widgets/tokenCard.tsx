"use client"

import { TOKEN_USAGE } from "@/lib/content"
import { ArrowUpRightIcon, XIcon } from "@phosphor-icons/react"
import { GaugeIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { useState } from "react"

function formatTokens(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return `${n}`
}

const TOTAL_TOKENS = TOKEN_USAGE.reduce((acc, row) => acc + row.tokens, 0)
const OPACITY_VALUES = [1, 0.72, 0.5, 0.34, 0.24]
const ROWS = TOKEN_USAGE.toSorted((a, b) => b.tokens - a.tokens).map(
  (row, index) => ({
    ...row,
    share: row.tokens / TOTAL_TOKENS,
    opacity: OPACITY_VALUES[index],
  })
)

export default function TokenUsageCard(): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <button
        type="button"
        className="focus-visible inline-flex h-2.5 w-20 min-w-0 items-center gap-2 overflow-hidden rounded-md border border-overlay-cream/15 bg-overlay-ink/55 p-0.5 px-2 caption-uppercase text-overlay-cream/80 shadow-sm backdrop-blur-xl transition-colors hover:text-overlay-cream"
        onClick={() => setCollapsed(false)}
      >
        <GaugeIcon
          size={18}
          weight="duotone"
          className="text-overlay-cream/60"
        />

        <span>Token Usage</span>
        <span className="text-overlay-creme/25">&middot;</span>
        <span className="font-mono tracking-[0.04em] text-overlay-cream/60">
          {formatTokens(TOTAL_TOKENS)}
        </span>
      </button>
    )
  }

  return (
    <aside
      aria-label="AI Model Usage"
      className="w-20 overflow-hidden rounded-xl border border-overlay-cream/15 bg-overlay-ink/55 p-1.5 text-overlay-cream shadow-sm backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 whitespace-nowrap">
        <button
          type="button"
          className="focus-visible inline-flex min-w-0 items-center gap-2 caption-uppercase text-overlay-cream/80 transition-colors hover:text-overlay-cream"
        >
          <GaugeIcon
            size={13}
            weight="duotone"
            className="text-overlay-cream/60"
          />
          <span>Token Usage</span>
          <span className="text-overlay-cream/60">28 Days</span>
        </button>

        <button
          className="flex size-2 items-center justify-center rounded-full text-overlay-cream/50 transition-colors hover:bg-overlay-cream/10 hover:text-overlay-cream"
          onClick={() => setCollapsed(true)}
        >
          <XIcon size={13} weight="bold" />
        </button>
      </div>

      {/* Stats */}
      <div className="mt-1 border-t border-overlay-cream/10 pt-2.5">
        <div className="flex items-baseline gap-1">
          <p className="text-3xl leading-none font-medium tracking-tight">
            {formatTokens(TOTAL_TOKENS)}
          </p>
          <span className="text-xs text-overlay-cream/60">tokens</span>
        </div>
        {/* Progress */}
        <div className="mt-1 flex h-[6px] gap-[2px]">
          {ROWS.map((row) => (
            <div
              key={row.model}
              style={{
                width: `${row.share * 100}%`,
                opacity: row.opacity,
              }}
              className="min-w-xxs bg-overlay-cream"
            />
          ))}
        </div>
      </div>

      {/* Usage List */}
      <ol className="mt-1.5 space-y-sm">
        {ROWS.map((row) => (
          <li
            key={row.model}
            className="flex items-center justify-between gap-2 text-[11px]"
          >
            <div className="flex min-w-0 items-baseline gap-1">
              <span
                style={{ opacity: row.opacity }}
                className="size-[5px] rounded-full bg-overlay-cream"
              />
              <span className="truncate" style={{ opacity: row.opacity }}>
                {row.model}
              </span>
              <span className="font-mono text-[10px] tracking-[0.04em] text-overlay-cream/40">
                {" "}
                {row.provider}{" "}
              </span>
            </div>
            <span className="font-mono text-xs text-overlay-cream/80 tabular-nums">
              {formatTokens(row.tokens)}
            </span>
          </li>
        ))}
      </ol>

      {/* Footer */}
      <div className="mt-1.5 flex items-center justify-between border-t border-overlay-cream/10 pt-2">
        <span className="font-mono text-[11px] font-medium tracking-[0.04em] text-primary">
          Updated 9h ago
        </span>
        <Link
          href="#"
          className="group inline-flex items-center gap-0.5 text-xs text-overlay-cream/80 transition-colors hover:text-overlay-cream"
        >
          See breakdown
          <ArrowUpRightIcon
            weight="bold"
            className="size-sm transition-transform duration-300 group-hover:translate-x-xxs group-hover:-translate-y-xxs"
          />
        </Link>
      </div>
    </aside>
  )
}
