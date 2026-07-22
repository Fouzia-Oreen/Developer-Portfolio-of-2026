export type GeoLocation = {
  city: string
  country_code: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

const FALLBACK: GeoLocation = {
  city: "Dhaka",
  country_code: "bd",
  country: "Bangladesh",
  latitude: 23.7931,
  longitude: 90.4048,
  timezone: "Asia/Dhaka",
}

export async function getUserLocation(): Promise<GeoLocation> {
  try {
    const response = await fetch("https://ipwho.is/", {
      next: {
        revalidate: 3600,
      },
    })

    if (!response.ok) {
      throw new Error("Location API failed")
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error("Invalid location response")
    }

    return {
      city: (data.city ?? FALLBACK.city).toLowerCase(),

      country_code: (
        data.country_code ?? FALLBACK.country_code
      ).toLowerCase(),

      country: data.country ?? FALLBACK.country,

      latitude:
        typeof data.latitude === "number"
          ? data.latitude
          : FALLBACK.latitude,

      longitude:
        typeof data.longitude === "number"
          ? data.longitude
          : FALLBACK.longitude,

      timezone:
        data.timezone?.id ?? FALLBACK.timezone,
    }

  } catch (error) {
    console.error("Location error:", error)

    return FALLBACK
  }
}