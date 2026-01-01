"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Heart } from "lucide-react"
import { GlassyButton } from "@/components/glassy-button"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    rating: number
    reviews: number
    badge?: string
  }
  onAddToCart?: (product: any) => void
}

import { useDispatch } from "react-redux"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import { useToast } from "@/components/ui/use-toast" // Assuming toast exists, otherwise simple alert or skip

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    // Optional: Check login if required, but cart usually works without login
    // if (!session) { router.push("/login"); return } 
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }))
    
    // Fallback if toast not available or use simple confirm log
    // console.log("Added to cart")
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100 h-64">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          {product.badge && (
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
              {product.badge}
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-4 left-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-primary text-primary" : "text-primary"}`} />
          </button>
        </div>

        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-foreground/60">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</span>
          <GlassyButton onClick={handleAddToCart} variant="accent" size="sm" className="py-2 px-4 text-sm">
            Add to Cart
          </GlassyButton>
        </div>
      </div>
    </Link>
  )
}
