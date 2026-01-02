"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, updateQuantity, clearCart } from "@/lib/redux/slices/cartSlice"
import type { RootState } from "@/lib/redux/store"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader } from "@/components/ui/loader"

export default function CartPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { items: cartItems } = useSelector((state: RootState) => state.cart) || { items: [] }
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <Loader />
          </div>
      )
  }

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-primary mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-lg border border-primary/20">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-primary/10 rounded-full">
                  <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">!</span>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h2>
              <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Browse our products to find something you love.
              </p>
              <Link href="/products">
                <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-6 rounded-full text-lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-xl border border-primary/20 shadow-sm hover:shadow-md transition"
                  >
                    <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="font-bold text-lg text-foreground mb-1">{item.name}</h3>
                      <p className="text-primary font-bold text-xl mb-4">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                      <div className="flex items-center justify-center sm:justify-start gap-4">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))
                            }
                            className="p-2 hover:bg-gray-100 transition"
                          >
                            <Minus className="w-4 h-4 text-foreground/60" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="p-2 hover:bg-gray-100 transition"
                          >
                            <Plus className="w-4 h-4 text-foreground/60" />
                          </button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <p className="text-sm text-foreground/60 mb-1">Subtotal</p>
                      <p className="font-bold text-lg">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => dispatch(clearCart())}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-xl border border-primary/20 shadow-sm sticky top-24">
                  <h3 className="text-xl font-bold text-primary mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flexjustify-between flex items-center justify-between text-foreground/70">
                      <span>Subtotal</span>
                      <span className="font-medium">₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center justify-between text-foreground/70">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 my-4 pt-4 flex items-center justify-between">
                      <span className="font-bold text-lg text-foreground">Total</span>
                      <span className="font-bold text-2xl text-primary">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full">
                    <Button className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>

                  <div className="mt-8 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition duration-300">
                    {/* Payment methods icons placeholder */}
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
