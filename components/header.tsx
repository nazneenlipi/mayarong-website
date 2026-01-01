"use client"

import Link from "next/link"
import Image from "next/image"
import { GlassyButton } from "@/components/glassy-button"
import { ShoppingBag, User, LogOut, ChevronDown, LayoutDashboard, Package, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { useSelector, useDispatch } from "react-redux"
import { logout } from "@/lib/redux/slices/authSlice"
import type { RootState } from "@/lib/redux/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  
  const cartItems = useSelector((state: RootState) => state.cart.items) || []
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const handleLogout = () => {
    dispatch(logout())
    router.push("/")
  }

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
          {!user ? (
            <Link href="/login">
              <GlassyButton variant="accent" size="md">
                <User className="w-4 h-4" />
                Login
              </GlassyButton>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <GlassyButton variant="primary" size="md" className="flex items-center gap-2 px-4">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline-block max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </GlassyButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === 'admin' && (
                  <>
                    <DropdownMenuItem onClick={() => router.push('/admin')} className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/admin/products')} className="cursor-pointer">
                      <Package className="w-4 h-4 mr-2" />
                      Manage Products
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => router.push('/admin/orders')} className="cursor-pointer">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Manage Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {!user.role || user.role !== 'admin' ? (
                   <>
                    <DropdownMenuItem onClick={() => router.push('/orders')} className="cursor-pointer">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                   </>
                ) : null}
                <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <div className="relative">
            <Link href="/cart">
              <button className="p-2 hover:bg-primary/10 rounded-lg transition">
                <ShoppingBag className="w-5 h-5 text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
