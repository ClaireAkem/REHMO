"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAds } from "./ad-manager"
import { ExternalLink, X } from "lucide-react"
import { useState } from "react"

// ===== SIDEBAR AD COMPONENT =====
export function SidebarAd({ className = "" }: { className?: string }) {
  const { shouldShowAds, getRandomAd } = useAds()
  const [isVisible, setIsVisible] = useState(true)
  const ad = getRandomAd("sidebar")

  if (!shouldShowAds || !ad || !isVisible) {
    return null
  }

  return (
    <Card className={`relative overflow-hidden ${className}`}>
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
      <Badge className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs">Ad</Badge>

      {/* Ad Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image src={ad.image || "/placeholder.svg"} alt={ad.title} fill className="object-cover" />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{ad.title}</CardTitle>
        <CardDescription className="text-sm">{ad.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <Button
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          onClick={() => window.open(ad.link, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          {ad.cta}
        </Button>
      </CardContent>
    </Card>
  )
}
