"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAds } from "./ad-manager"
import { ExternalLink, X } from "lucide-react"
import { useState } from "react"

// ===== BANNER AD COMPONENT =====
export function BannerAd({ className = "" }: { className?: string }) {
  const { shouldShowAds, getRandomAd } = useAds()
  const [isVisible, setIsVisible] = useState(true)
  const ad = getRandomAd("banner")

  if (!shouldShowAds || !ad || !isVisible) {
    return null
  }

  return (
    <Card
      className={`relative overflow-hidden bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 ${className}`}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 h-6 w-6 text-muted-foreground hover:text-foreground"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Ad badge */}
      <Badge className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs">Sponsored</Badge>

      <div className="flex flex-col md:flex-row items-center p-4 gap-4">
        {/* Ad Image */}
        <div className="relative h-24 w-full md:w-32 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={ad.image || "/placeholder.svg"} alt={ad.title} fill className="object-cover" />
        </div>

        {/* Ad Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-bold text-lg mb-1">{ad.title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{ad.description}</p>
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => window.open(ad.link, "_blank")}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            {ad.cta}
          </Button>
        </div>
      </div>
    </Card>
  )
}
