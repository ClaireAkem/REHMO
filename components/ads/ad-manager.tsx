"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { useAuth } from "@/components/auth-provider"

// ===== AD TYPES =====
interface Ad {
  id: string
  type: "banner" | "sidebar" | "popup" | "inline"
  title: string
  description: string
  image: string
  link: string
  cta: string
  category: string
}

interface AdContextType {
  ads: Ad[]
  shouldShowAds: boolean
  getAdsByType: (type: string) => Ad[]
  getRandomAd: (type?: string) => Ad | null
}

// ===== AD CONTEXT =====
const AdContext = createContext<AdContextType | undefined>(undefined)

// ===== SAMPLE ADS DATA =====
const sampleAds: Ad[] = [
  // Banner Ads
  {
    id: "banner-1",
    type: "banner",
    title: "Premium Kitchen Knives",
    description: "Professional chef knives for authentic African cooking",
    image: "/placeholder.svg?height=200&width=600&text=Kitchen+Knives",
    link: "#",
    cta: "Shop Now",
    category: "kitchen",
  },
  {
    id: "banner-2",
    type: "banner",
    title: "African Spice Collection",
    description: "Authentic spices imported directly from Africa",
    image: "/placeholder.svg?height=200&width=600&text=African+Spices",
    link: "#",
    cta: "Order Today",
    category: "ingredients",
  },
  {
    id: "banner-3",
    type: "banner",
    title: "Cooking Classes Online",
    description: "Learn traditional African cooking techniques",
    image: "/placeholder.svg?height=200&width=600&text=Cooking+Classes",
    link: "#",
    cta: "Enroll Now",
    category: "education",
  },

  // Sidebar Ads
  {
    id: "sidebar-1",
    type: "sidebar",
    title: "Traditional Cookware",
    description: "Authentic African cooking pots and utensils",
    image: "/placeholder.svg?height=300&width=250&text=Cookware",
    link: "#",
    cta: "Browse Collection",
    category: "kitchen",
  },
  {
    id: "sidebar-2",
    type: "sidebar",
    title: "Organic Ingredients",
    description: "Fresh, organic African ingredients delivered",
    image: "/placeholder.svg?height=300&width=250&text=Organic+Food",
    link: "#",
    cta: "Shop Fresh",
    category: "ingredients",
  },
  {
    id: "sidebar-3",
    type: "sidebar",
    title: "Recipe Books",
    description: "Comprehensive African cookbook collection",
    image: "/placeholder.svg?height=300&width=250&text=Recipe+Books",
    link: "#",
    cta: "Buy Books",
    category: "education",
  },

  // Inline Ads
  {
    id: "inline-1",
    type: "inline",
    title: "Meal Prep Containers",
    description: "Perfect for storing your African meal preps",
    image: "/placeholder.svg?height=150&width=400&text=Meal+Prep",
    link: "#",
    cta: "Get Yours",
    category: "kitchen",
  },
  {
    id: "inline-2",
    type: "inline",
    title: "African Tea Collection",
    description: "Premium teas from across the African continent",
    image: "/placeholder.svg?height=150&width=400&text=African+Tea",
    link: "#",
    cta: "Try Now",
    category: "beverages",
  },
  {
    id: "inline-3",
    type: "inline",
    title: "Cooking Masterclass",
    description: "Master the art of African cuisine with expert chefs",
    image: "/placeholder.svg?height=150&width=400&text=Masterclass",
    link: "#",
    cta: "Join Class",
    category: "education",
  },

  // Popup Ads
  {
    id: "popup-1",
    type: "popup",
    title: "Limited Time Offer!",
    description: "50% off on all African spice sets this week only",
    image: "/placeholder.svg?height=200&width=400&text=Special+Offer",
    link: "#",
    cta: "Claim Offer",
    category: "promotion",
  },
]

// ===== AD PROVIDER =====
export function AdProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [ads] = useState<Ad[]>(sampleAds)

  // Check if user should see ads (non-premium users only)
  const shouldShowAds = !user?.isPremium

  // Get ads by type
  const getAdsByType = (type: string) => {
    return ads.filter((ad) => ad.type === type)
  }

  // Get random ad
  const getRandomAd = (type?: string) => {
    const filteredAds = type ? getAdsByType(type) : ads
    if (filteredAds.length === 0) return null
    return filteredAds[Math.floor(Math.random() * filteredAds.length)]
  }

  return (
    <AdContext.Provider
      value={{
        ads,
        shouldShowAds,
        getAdsByType,
        getRandomAd,
      }}
    >
      {children}
    </AdContext.Provider>
  )
}

// ===== CUSTOM HOOK TO USE ADS =====
export function useAds() {
  const context = useContext(AdContext)
  if (context === undefined) {
    throw new Error("useAds must be used within an AdProvider")
  }
  return context
}
