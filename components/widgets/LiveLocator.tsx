"use client"

import { GeoLocation } from "@/lib/location"
import { WeatherData } from "@/lib/weather"
import {
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunIcon,
  SunIcon,
} from "@phosphor-icons/react/dist/ssr"
import type { ComponentType, ReactElement } from "react"
import { useEffect, useMemo, useState } from "react"

type TemperatureUnit = "fahrenheit" | "celsius"

const TEMP_UNIT: TemperatureUnit = "fahrenheit"
const TEMP_SYMBOL = TEMP_UNIT === "fahrenheit" ? "°F" : "°C"

interface LiveLocatorProps {
  location: GeoLocation
  weather: WeatherData
}

type IconComponent = ComponentType<{
  size?: number
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
  className?: string
}>

type WeatherInfo = {
  Icon: IconComponent
  label: string
}

function weatherFor(weatherCode: number): WeatherInfo {
  switch (true) {
    case weatherCode === 0:
      return { Icon: SunIcon, label: "Clear" }

    case weatherCode <= 2:
      return { Icon: CloudSunIcon, label: "Partly Cloudy" }

    case weatherCode === 3:
      return { Icon: CloudIcon, label: "Overcast" }

    case weatherCode <= 48:
      return { Icon: CloudFogIcon, label: "Fog" }

    case weatherCode <= 57:
      return { Icon: CloudRainIcon, label: "Drizzle" }

    case weatherCode <= 67:
      return { Icon: CloudRainIcon, label: "Rain" }

    case weatherCode <= 77:
      return { Icon: CloudSnowIcon, label: "Snow" }

    case weatherCode <= 57:
      return { Icon: CloudRainIcon, label: "Showers" }

    case weatherCode <= 99:
      return { Icon: CloudLightningIcon, label: "Thunderstorm" }

    default:
      return { Icon: CloudIcon, label: "Cloudy" }
  }
}

export default function LiveLocator({
  location,
  weather,
}: LiveLocatorProps): ReactElement {
  const { Icon, label } = weatherFor(weather.weatherCode)

  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    const interval = setInterval(() => {
      setNow(new Date())
    }, 30_000)

    return () => clearInterval(interval)
  }, [])

  const time = useMemo(() => {
    if (!now) return "--:--"

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(now)
  }, [now])

  return (
    <div className="inline-flex items-center gap-sm md:gap-md lg:gap-1.5 font-mono caption-uppercase text-[11px] tracking-[0.12em]">
      <span className="uppercase ">{location.city}, {location.country_code}</span>
      {time && (
        <>
          <span className="text-overlay-creme/25 hidden md:flex">&middot;</span>
          <span className="uppercase ">{time}</span>
        </>
      )}
      <div className="flex items-center md:gap-1 gap-0.5 caption-uppercase">
        <div className="flex size-1.75 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur">
          <Icon size={15} weight="bold" className="text-overlay-cream" />
        </div>
        <span className="uppercase">{label}</span>
        <span className="normal case tracking-[0.04em] tabular-nums">
          {Math.round(weather.temperature)}
          {TEMP_SYMBOL}
        </span>
      </div>
    </div>
  )
}
