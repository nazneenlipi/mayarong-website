"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { GlassyButton } from "@/components/glassy-button"
import Image from "next/image"
import { Heart, Share2, ShoppingCart, Star, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useGetProductQuery, useGetProductsQuery } from "@/lib/redux/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import type { RootState } from "@/lib/redux/store"
import { Loader } from "@/components/ui/loader"
import { useToast } from "@/components/ui/use-toast"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = params.id as string
  const { data: product, isLoading: isLoadingProduct, error } = useGetProductQuery(productId)
  const { data: allProducts = [] } = useGetProductsQuery()
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  // Default to first color if available, or "Black"
  const [selectedColor, setSelectedColor] = useState("Black")
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()
  
  // State for image gallery
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Reset selected image index when product changes
  useEffect(() => {
    setSelectedImageIndex(0)
  }, [productId])

  const relatedProducts = allProducts.filter((p) => p._id !== productId).slice(0, 3)
  
  if (isLoadingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  if (error || !product) {
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

  const images = product.images && product.images.length > 0 ? product.images : [product.image || "/placeholder.svg"]
  const displayImage = images[selectedImageIndex] || images[0]

  const handleAddToCart = () => {
    if (!product) return

    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      // Use the displaying image for the cart
      image: displayImage,
      quantity: quantity
    }))
    
    toast({
      title: "Added to Cart",
      description: `${product.name} (x${quantity}) added to your cart.`,
    })
  }

  // Effect to set initial color if needed, or rely on conditional rendering below
  const colors = product.colors || ["Standard"]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Image Gallery Section */}
            <div className="flex flex-col gap-4">
               <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="cursor-pointer w-full h-full relative">
                            <Image 
                                src={displayImage} 
                                alt={product.name} 
                                fill 
                                className="object-cover transition duration-300 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white/80 px-3 py-1 rounded-full text-xs font-medium">Click to Zoom</span>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none text-white">
                        <DialogTitle className="sr-only">Product Image Zoom</DialogTitle>
                        <div className="relative w-full h-[80vh]">
                             <Image 
                                src={displayImage} 
                                alt={product.name} 
                                fill 
                                className="object-contain" 
                            />
                            <DialogClose className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
                                <X className="w-5 h-5" />
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>

                {product.badge && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-semibold pointer-events-none">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                       {images.map((img: string, idx: number) => (
                           <div 
                                key={idx} 
                                onClick={() => setSelectedImageIndex(idx)}
                                className={`cursor-pointer relative aspect-square rounded-md overflow-hidden border-2 transaction ${selectedImageIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'}`}
                           >
                                <Image 
                                    src={img} 
                                    alt={`${product.name} ${idx + 1}`} 
                                    fill 
                                    className="object-cover" 
                                />
                           </div>
                       ))}
                  </div>
              )}
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
                  {(product.colors || ["Standard"]).map((color) => (
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
                
                <a 
                   href={`https://api.whatsapp.com/send?phone=8801606208313&text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Is it available?`)}`}
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="px-6 py-4 border border-green-500/30 bg-green-50/50 rounded-lg hover:bg-green-100/50 transition flex items-center justify-center text-green-600"
                >
                   <WhatsAppIcon className="w-6 h-6" />
                </a>
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
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
