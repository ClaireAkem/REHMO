import Link from "next/link"
import { ChefHat, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

// ===== FOOTER COMPONENT =====
export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ===== BRAND SECTION ===== */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                REHMO
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover, cook, and share authentic African recipes from around the continent.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* ===== EXPLORE SECTION ===== */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/meal-plan"
                  className="text-muted-foreground hover:text-orange-500 transition-colors text-sm"
                >
                  Meal Plans
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Cooking Tips
                </Link>
              </li> */}
              {/* <li>
                <Link href="/recipes" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Ingredients Guide
                </Link>
              </li>
              <li>
                <Link href="" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Seasonal Recipes
                </Link>
              </li> */}
            </ul>
          </div>

          {/* ===== COMPANY SECTION ===== */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Press
                </Link>
              </li> */}
              {/* <li>
                <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Partners
                </Link>
              </li> */}
            </ul>
          </div>

          {/* ===== LEGAL SECTION ===== */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-orange-500 transition-colors text-sm">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* ===== BOTTOM SECTION ===== */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} REHMO. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">Made with ❤️ for African food lovers everywhere</p>
        </div>
      </div>
    </footer>
  )
}
