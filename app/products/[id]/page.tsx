"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { GlassyButton } from "@/components/glassy-button"
import Image from "next/image"
import { Heart, Share2, ShoppingCart, Star } from "lucide-react"
import { useState } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Elegant Leather Watch",
    category: "watches",
    price: 15999,
    image: "/elegant-leather-watch-premium.jpg",
    rating: 4.8,
    reviews: 124,
    badge: "New",
    description: "A timeless piece with premium leather strap and precise movement.",
    details: "Leather strap, Water resistant, Japanese movement, 2-year warranty",
    colors: ["Black", "Brown", "Tan"],
  },
  {
    id: 2,
    name: "Classic Brown Shoulder Bag",
    category: "bags",
    price: 8999,
    image: "/brown-leather-shoulder-bag.jpg",
    rating: 4.6,
    reviews: 89,
    badge: "Popular",
    description: "Spacious and stylish shoulder bag perfect for everyday use.",
    details: "Genuine leather, Adjustable strap, Interior pockets, Durable hardware",
    colors: ["Brown", "Black", "Tan"],
  },
  {
    id: 3,
    name: "Digital Smart Watch",
    category: "watches",
    price: 18999,
    image: "/smart-watch-digital-premium.jpg",
    rating: 4.9,
    reviews: 156,
    badge: "Best Seller",
    description: "Advanced smartwatch with fitness tracking and notifications.",
    details: "AMOLED display, Heart rate monitor, 7-day battery, iOS/Android compatible",
    colors: ["Black", "Silver", "Gold"],
  },
  {
    id: 4,
    name: "Elegant Crossbody Bag",
    category: "bags",
    price: 12999,
    image: "/crossbody-bag-elegant-design.jpg",
    rating: 4.7,
    reviews: 98,
    description: "Lightweight crossbody bag with elegant design and functional pockets.",
    details: "Synthetic leather, Adjustable strap, RFID protection, Lightweight",
    colors: ["Black", "Red", "Navy"],
  },
  {
    id: 5,
    name: "Chronograph Steel Watch",
    category: "watches",
    price: 22999,
    image: "/chronograph-watch-steel-luxury.jpg",
    rating: 4.9,
    reviews: 167,
    badge: "Luxury",
    description: "Premium chronograph with steel case and professional specifications.",
    details: "Stainless steel, Chronograph function, Sapphire crystal, 5-year warranty",
    colors: ["Silver", "Black", "Gold"],
  },
  {
    id: 6,
    name: "Premium Tote Bag",
    category: "bags",
    price: 11999,
    image: "/premium-tote-bag-leather.jpg",
    rating: 4.8,
    reviews: 112,
    description: "Spacious tote bag suitable for work and travel.",
    details: "Premium leather, Double handles, Laptop compartment, Interior organization",
    colors: ["Black", "Brown", "Cream"],
  },
]

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = Number(params.id)
  const product = ALL_PRODUCTS.find((p) => p.id === productId)
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "Black")
  const [quantity, setQuantity] = useState(1)

  const relatedProducts = ALL_PRODUCTS.filter((p) => p.id !== productId).slice(0, 3)

  const handleAddToCart = () => {
    if (!session) {
      router.push("/login")
      return
    }
    // Add to cart logic here
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-2xl text-foreground/60">Product not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-semibold">
                    {product.badge}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">{product.rating}</span>
                <span className="text-sm text-foreground/60">({product.reviews} reviews)</span>
              </div>

              <p className="text-foreground/70 mb-6">{product.description}</p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-foreground/70">{product.details}</p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">Available Colors</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition ${
                        selectedColor === color
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 text-foreground hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</span>
                <button className="p-3 hover:bg-primary/10 rounded-lg transition">
                  <Heart className="w-6 h-6 text-primary" />
                </button>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-primary/20 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-primary">
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-primary">
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <GlassyButton
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="flex-1 py-6 text-lg"
                  icon={<ShoppingCart className="w-5 h-5" />}
                >
                  Add to Cart
                </GlassyButton>
                <button className="px-6 py-4 border border-primary/30 rounded-lg hover:bg-primary/5 transition">
                  <Share2 className="w-5 h-5 text-primary" />
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-primary/20">
                <p className="text-sm text-foreground/60">
                  Free shipping on orders above ₹499 | Easy returns within 30 days
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-primary mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
