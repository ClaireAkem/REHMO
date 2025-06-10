"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { ChefHat, Menu, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// ===== HEADER COMPONENT =====
export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // ===== NAVIGATION LINKS =====
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/meal-plan", label: "Meal Plans" },
    { href: "/recipes", label: "Recipes" },
    { href: "/favorites", label: "My Favorites" },
    { href: "/about", label: "About" },
    { href: "/notifications", label: "Notifications" },
    { href: "/settings", label: "Settings" },
  ]

  // ===== HANDLE LOGOUT =====
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* ===== LOGO SECTION ===== */}
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            REHMO
          </span>
        </Link>

        {/* ===== DESKTOP NAVIGATION ===== */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                pathname === link.href ? "text-orange-500" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ===== RIGHT SIDE ACTIONS ===== */}
        <div className="flex items-center gap-2">
          {/* Go Premium Button */}
          {user && !user.isPremium && (
            <Button
              size="sm"
              className="hidden sm:flex bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              onClick={() => router.push("/premium")}
            >
              Go Premium
            </Button>
          )}

          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Menu or Auth Buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user.name}
                  {user.isPremium && (
                    <span className="ml-2 text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded">Premium</span>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" onClick={() => router.push("/auth")}>
              Sign In
            </Button>
          )
        }

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Navigate through REHMO</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                      pathname === link.href ? "text-orange-500" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user && !user.isPremium && (
                  <Button
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    onClick={() => router.push("/premium")}
                  >
                    Go Premium
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
