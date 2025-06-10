"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

// ===== FAVORITES CONTEXT =====
interface FavoritesContextType {
  favorites: string[]
  addToFavorites: (recipeId: string) => void
  removeFromFavorites: (recipeId: string) => void
  isFavorite: (recipeId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

// ===== FAVORITES PROVIDER =====
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState<string[]>([])

  // ===== LOAD FAVORITES FROM STORAGE =====
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`rehmo_favorites_${user.id}`)
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } else {
      setFavorites([])
    }
  }, [user])

  // ===== SAVE FAVORITES TO STORAGE =====
  const saveFavorites = (newFavorites: string[]) => {
    if (user) {
      localStorage.setItem(`rehmo_favorites_${user.id}`, JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    }
  }

  // ===== ADD TO FAVORITES =====
  const addToFavorites = (recipeId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save recipes to your favorites.",
        variant: "destructive",
      })
      return
    }

    if (!favorites.includes(recipeId)) {
      const newFavorites = [...favorites, recipeId]
      saveFavorites(newFavorites)
      toast({
        title: "Added to Favorites",
        description: "Recipe has been saved to your favorites.",
      })
    }
  }

  // ===== REMOVE FROM FAVORITES =====
  const removeFromFavorites = (recipeId: string) => {
    const newFavorites = favorites.filter((id) => id !== recipeId)
    saveFavorites(newFavorites)
    toast({
      title: "Removed from Favorites",
      description: "Recipe has been removed from your favorites.",
    })
  }

  // ===== CHECK IF RECIPE IS FAVORITE =====
  const isFavorite = (recipeId: string) => {
    return favorites.includes(recipeId)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

// ===== CUSTOM HOOK TO USE FAVORITES =====
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
