"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { useCreateOrderMutation } from "@/lib/redux/api/apiSlice"
import { clearCart } from "@/lib/redux/slices/cartSlice"
import type { RootState } from "@/lib/redux/store"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Loader2, CreditCard } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { items: cartItems } = useSelector((state: RootState) => state.cart)
  const { user, token } = useSelector((state: RootState) => state.auth)
  
  const [createOrder, { isLoading, isSuccess, error }] = useCreateOrderMutation()

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Bangladesh",
  })

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0 && !isSuccess) {
      router.push("/cart")
    }
  }, [cartItems, isSuccess, router])

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
        // Simple auth check
        alert("Please login to place an order")
        router.push("/login")
        return
    }

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        shippingAddress: formData,
        totalAmount: totalPrice
      }

      await createOrder(orderData).unwrap()
      dispatch(clearCart())
    } catch (err) {
      console.error("Failed to create order:", err)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-background py-16 flex items-center justify-center">
          <div className="max-w-md w-full mx-4 bg-white p-8 rounded-2xl shadow-xl border border-primary/20 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Order Confirmed!</h1>
            <p className="text-foreground/70 mb-8">
              Thank you for your purchase. Your order has been placed successfully and is being processed.
            </p>
            <div className="space-y-4">
              <Link href="/orders">
                <Button className="w-full bg-primary text-white hover:bg-primary/90 py-6 text-lg">
                  View My Orders
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="w-full py-6 text-lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cart" className="inline-flex items-center text-primary font-medium hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl border border-primary/20 shadow-sm">
                <h2 className="text-2xl font-bold text-primary mb-6">Shipping Details</h2>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                      placeholder="e.g. 123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                        placeholder="e.g. Dhaka"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">State / Zone</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                        placeholder="e.g. Dhaka"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-primary/20 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                        placeholder="e.g. 1200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        required
                        readOnly
                        value={formData.country}
                        className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </form>
              </div>

               <div className="bg-white p-8 rounded-xl border border-primary/20 shadow-sm opacity-50 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 z-10 backdrop-blur-[1px]">
                     <span className="text-sm font-semibold text-primary bg-white px-4 py-2 rounded-full border border-primary/20 shadow-sm">Pay on Delivery Only</span>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6"/>
                    Payment Method
                </h2>
                <div className="space-y-4">
                     <div className="p-4 border border-primary rounded-lg bg-primary/5 flex items-center justify-between">
                        <span className="font-semibold text-primary">Cash On Delivery</span>
                         <div className="w-4 h-4 rounded-full border-4 border-primary"></div>
                     </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-xl border border-primary/20 shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-primary mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <span className="text-foreground/80 max-w-[200px]">
                        {item.name} <span className="text-foreground/50">x{item.quantity}</span>
                      </span>
                      <span className="font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  
                  <div className="border-t border-dashed border-gray-200 my-4 pt-4"></div>
                  
                  <div className="flex justify-between flex items-center justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-foreground/70">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 my-4 pt-4 flex items-center justify-between">
                    <span className="font-bold text-lg text-foreground">Total</span>
                    <span className="font-bold text-2xl text-primary">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Button 
                    type="submit" 
                    form="checkout-form" 
                    disabled={isLoading || cartItems.length === 0}
                    className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                  ) : (
                      "Place Order"
                  )}
                </Button>
                
                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                        Failed to place order. Please try again.
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
