"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAds } from "./ad-manager"
import { ExternalLink, X } from "lucide-react"

// ===== POPUP AD COMPONENT =====
export function PopupAd() {
  const { shouldShowAds, getRandomAd } = useAds()
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const ad = getRandomAd("popup")

  useEffect(() => {
    if (shouldShowAds && ad && !hasShown) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasShown(true)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [shouldShowAds, ad, hasShown])

  if (!shouldShowAds || !ad) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Badge className="bg-orange-500 text-white text-xs">Special Offer</Badge>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogTitle className="text-xl font-bold">{ad.title}</DialogTitle>
          <DialogDescription>{ad.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Ad Image */}
          <div className="relative h-48 w-full rounded-lg overflow-hidden">
            <Image src={ad.image || "/placeholder.svg"} alt={ad.title} fill className="object-cover" />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              onClick={() => {
                window.open(ad.link, "_blank")
                setIsOpen(false)
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {ad.cta}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
