// import { GeoLocation } from "@/lib/location"

// const TEMP_UNIT = "celsius" | "fahrenheit" = "fahrenheit"


// export type WeatherData = {
//   temperature: number
//   feelsLike: number
//   weatherCode: number
//   timezone: string
// }

// const FALLBACK: WeatherData = {
//   temperature: 25,
//   feelsLike: 25,
//   weatherCode: 0,
//   timezone: "Asia/Dhaka",
// }


// export async function getTemperature( latitude: number, longitude: number ):Promise<WeatherData> {

//   const url = new URL("https://api.open-meteo.com/v1/forecast")

//   url.searchParams.set("latitude", location.latitude.toFixed(2))
//   url.searchParams.set("longitude", location.longitude.toFixed(2))
//   url.searchParams.set("current", "temperature_2m, weather_code")
//   url.searchParams.set("temperature_unit", TEMP_UNIT)
//   url.searchParams.set("timezone", location.latitude.toFixed(2))

  


//   try {
//     const response = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code&timezone=auto`,
//       {
//         cache: "no-store",
//       }
//     )


//     if (!response.ok) {
//       console.error(
//         "Weather API failed:",
//         response.status,
//         response.statusText
//       )

//       return FALLBACK
//     }


//     const data = await response.json()


//     return {
//       temperature: data.current?.temperature_2m ?? FALLBACK.temperature,

//       feelsLike: data.current?.apparent_temperature ?? FALLBACK.feelsLike,

//       weatherCode: data.current?.weather_code ?? FALLBACK.weatherCode,

//       timezone: data.timezone ?? FALLBACK.timezone,
//     }

//   } catch (error) {
//     console.error("Weather fetch error:", error)

//     return FALLBACK
//   }
// }

export interface WeatherData {
  temperature: number
  weatherCode: number
}

const TEMP_UNIT = "fahrenheit" // or "celsius"

export async function getTemperature(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  const url = new URL("https://api.open-meteo.com/v1/forecast")

  url.searchParams.set("latitude", latitude.toFixed(2))
  url.searchParams.set("longitude", longitude.toFixed(2))
  url.searchParams.set("current", "temperature_2m,weather_code")
  url.searchParams.set("temperature_unit", TEMP_UNIT)
  url.searchParams.set("timezone", "auto")

  try {
    const response = await fetch(url.toString(), {
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch weather data")
    }

    const data = await response.json()

    const temperature = data.current?.temperature_2m
    const weatherCode = data.current?.weather_code

    if (typeof temperature !== "number" || typeof weatherCode !== "number") {
      return null
    }

    return {
      temperature,
      weatherCode,
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error)
    return null
  }
}