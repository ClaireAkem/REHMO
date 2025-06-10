"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { useAds } from "./ad-manager"
import { useRouter } from "next/navigation"
import { Crown, Zap } from "lucide-react"

// ===== AD-FREE PROMOTION COMPONENT =====
export function AdFreePromotion({ className = "" }: { className?: string }) {
  const { user } = useAuth()
  const { shouldShowAds } = useAds()
  const router = useRouter()

  // Only show to non-premium users
  if (!shouldShowAds) {
    return null
  }

  return (
    <Card
      className={`bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800 ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg">Tired of Ads?</CardTitle>
        </div>
        <CardDescription>
          Upgrade to Premium for an ad-free experience plus exclusive recipes and features!
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            onClick={() => router.push("/premium")}
          >
            <Zap className="h-4 w-4 mr-2" />
            Go Premium
          </Button>
          <Button variant="outline" size="sm" className="text-xs" onClick={() => router.push("/premium")}>
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
