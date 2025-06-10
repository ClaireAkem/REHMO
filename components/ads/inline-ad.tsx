"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAds } from "./ad-manager"
import { ExternalLink, X } from "lucide-react"
import { useState } from "react"

// ===== INLINE AD COMPONENT =====
export function InlineAd({ className = "" }: { className?: string }) {
  const { shouldShowAds, getRandomAd } = useAds()
  const [isVisible, setIsVisible] = useState(true)
  const ad = getRandomAd("inline")

  if (!shouldShowAds || !ad || !isVisible) {
    return null
  }

  return (
    <Card className={`relative overflow-hidden bg-muted/30 border-dashed ${className}`}>
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

      <div className="flex items-center p-4 gap-4">
        {/* Ad Image */}
        <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={ad.image || "/placeholder.svg"} alt={ad.title} fill className="object-cover" />
        </div>

        {/* Ad Content */}
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">{ad.title}</h4>
          <p className="text-muted-foreground text-xs mb-2">{ad.description}</p>
          <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => window.open(ad.link, "_blank")}>
            <ExternalLink className="h-3 w-3 mr-1" />
            {ad.cta}
          </Button>
        </div>
      </div>
    </Card>
  )
}
