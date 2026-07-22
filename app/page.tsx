import Hero from "@/components/Hero";
import { getUserLocation } from "@/lib/location";
import { getTemperature } from "@/lib/weather";
import type { GeoLocation } from "@/lib/location"
import type { WeatherData } from "@/lib/weather"

interface HeroProps {
  location: GeoLocation
  weather: WeatherData
}

export default async function HomePage() {
  const location = await getUserLocation()
  const weather = await getTemperature(
    location.latitude,
    location.longitude
  )

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-overlay-cream">
      <Hero location={location} weather={weather}/>
      <div className="h-screen"> new to code</div>
    </main>
  )
}
