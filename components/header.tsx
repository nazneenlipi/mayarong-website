"use client"

import Link from "next/link"
import Image from "next/image"
import { GlassyButton } from "@/components/glassy-button"
import { ShoppingBag, User, LogOut } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("maya_rang_user") !== null
    }
    return false
  })
  const [cartCount, setCartCount] = useState(0)

  const handleLogout = () => {
    localStorage.removeItem("maya_rang_user")
    setIsLoggedIn(false)
  }

  const userName = typeof window !== "undefined" ? localStorage.getItem("maya_rang_user") : null

  return (
    <header className="bg-white/40 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="MAYA RANG" width={40} height={40} className="rounded" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary">MAYA RANG</span>
            <span className="text-xs text-secondary font-semibold">Premium Collection</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-foreground hover:text-primary transition font-medium">
            Watches
          </Link>
          <Link href="/products" className="text-foreground hover:text-primary transition font-medium">
            Bags
          </Link>
          <Link href="/ratings" className="text-foreground hover:text-primary transition font-medium">
            Ratings
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition font-medium">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link href="/login">
              <GlassyButton variant="accent" size="md">
                <User className="w-4 h-4" />
                Login
              </GlassyButton>
            </Link>
          ) : (
            <>
              <span className="text-sm text-foreground/70">{userName}</span>
              <GlassyButton variant="primary" size="md" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Logout
              </GlassyButton>
            </>
          )}
          <div className="relative">
            <button className="p-2 hover:bg-primary/10 rounded-lg transition">
              <ShoppingBag className="w-5 h-5 text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
