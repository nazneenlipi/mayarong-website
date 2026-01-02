"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Heart } from "lucide-react"
import { GlassyButton } from "@/components/glassy-button"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: {
    _id: string
    name: string
    price: number
    image: string
    images?: string[]
    rating: number
    reviews: number
    badge?: string
  }
  onAddToCart?: (product: any) => void
}

import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import { useToast } from "@/components/ui/use-toast"
import type { RootState } from "@/lib/redux/store"

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(false)
  const { toast } = useToast()

  const mainImage = product.images && product.images.length > 0 ? product.images[0] : product.image

  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: mainImage,
      quantity: 1
    }))
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to cart`,
    })
  }

  return (
    <Link href={`/products/${product._id}`}>
      <div className="group cursor-pointer">
        <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100 h-64">
          <Image
            src={mainImage || "/placeholder.svg"}
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
