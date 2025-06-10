"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// ===== PROTECTED ROUTE COMPONENT =====
interface ProtectedRouteProps {
  children: React.ReactNode
  requirePremium?: boolean
  allowBrowsing?: boolean // New prop to allow browsing without login
}

export function ProtectedRoute({
  children,
  requirePremium = false,
  allowBrowsing = true, // Default to true to allow browsing
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // If browsing is allowed and user is not logged in, show preview
      if (!user && allowBrowsing) {
        setShowPreview(true)
        return
      }

      // If browsing is not allowed and user is not logged in, redirect to auth
      if (!user && !allowBrowsing) {
        router.push("/auth")
        return
      }

      // Redirect to premium if premium required but user is not premium
      if (user && requirePremium && !user.isPremium) {
        router.push("/premium")
        return
      }

      // User is logged in and meets requirements
      setShowPreview(false)
    }
  }, [user, isLoading, requirePremium, allowBrowsing, router])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    )
  }

  // Show preview banner for non-logged in users if browsing is allowed
  if (showPreview) {
    return (
      <>
        <div className="sticky top-16 z-30 bg-orange-500 text-white py-2 px-4">
          <div className="container flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm mb-2 sm:mb-0">You're browsing in preview mode. Sign in to access all features.</p>
            <Button size="sm" variant="secondary" onClick={() => router.push("/auth")} className="text-orange-500">
              Sign In
            </Button>
          </div>
        </div>
        {children}
      </>
    )
  }

  // Don't render if premium required but not premium
  if (user && requirePremium && !user.isPremium) {
    return null
  }

  // Render normally for authenticated users
  return <>{children}</>
}
