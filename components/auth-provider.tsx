"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient" // Import Supabase client
import type { Session, User as SupabaseUser } from "@supabase/supabase-js" // Import Supabase types

// ===== AUTH TYPES =====
interface User {
  id: string
  email: string
  name: string
  isPremium: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => Promise<void> // Changed to async
  upgradeToPremium: () => void
  isLoading: boolean
  session: Session | null // Expose session for potential use
}

// ===== AUTH CONTEXT =====
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ===== LOAD USER FROM SUPABASE SESSION & LISTEN FOR CHANGES =====
  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession()
      if (mounted) {
        if (error) {
          console.error("Error getting initial session:", error)
          setIsLoading(false)
          return
        }
        setSession(currentSession)
        if (currentSession?.user) {
          const supabaseUser = currentSession.user
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email || "",
            name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "User",
            isPremium: false, // Default for new session, upgradeToPremium handles local changes
          })
        } else {
          setUser(null)
        }
        setIsLoading(false)
      }
    }

    getInitialSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (mounted) {
          setSession(newSession)
          if (newSession?.user) {
            const supabaseUser = newSession.user
            setUser(prevUser => ({
              id: supabaseUser.id,
              email: supabaseUser.email || "",
              name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "User",
              // Preserve isPremium if it's the same user and was locally set
              isPremium: prevUser?.id === supabaseUser.id ? prevUser.isPremium : false,
            }))
          } else {
            setUser(null)
          }
          // Initial loading is handled by getInitialSession's setIsLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      authListener?.subscription.unsubscribe() // Corrected: access subscription property
    }
  }, [])

  // ===== LOGIN FUNCTION =====
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setIsLoading(false)
    if (error) {
      console.error("Login error:", error.message)
      return false
    }
    // onAuthStateChange will handle setting the user state
    return true
  }

  // ===== SIGNUP FUNCTION =====
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // Store full name in user_metadata
        },
      },
    })
    setIsLoading(false)
    if (error) {
      console.error("Signup error:", error.message)
      return false
    }
    // If signup is successful, Supabase will send a confirmation email (if enabled).
    // The user will be in a pending state until confirmed.
    // onAuthStateChange might pick up the user if auto-confirmation is on, or after manual verification.
    return true // Indicates the initial signup step was successful
  }

  // ===== LOGOUT FUNCTION =====
  const logout = async (): Promise<void> => {
    setIsLoading(true)
    const { error } = await supabase.auth.signOut()
    setIsLoading(false)
    if (error) {
      console.error("Logout error:", error.message)
    }
    // onAuthStateChange will handle setting user to null
  }

  // ===== UPGRADE TO PREMIUM =====
  // This function currently only affects local React state.
  // To make 'isPremium' persistent, you would need to update a 'profiles' table in Supabase.
  const upgradeToPremium = () => {
    if (user) {
      const updatedUser = { ...user, isPremium: true }
      setUser(updatedUser)
      // Example: await supabase.from('profiles').update({ is_premium: true }).eq('id', user.id)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        upgradeToPremium,
        isLoading,
        session, // Provide session state through context
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ===== CUSTOM HOOK TO USE AUTH =====
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
