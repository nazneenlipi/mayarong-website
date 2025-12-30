"use client"

import { X, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CheckoutSidebarProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem: (id: number) => void
}

export function CheckoutSidebar({ isOpen, onClose, items, onRemoveItem }: CheckoutSidebarProps) {
  const [paymentStep, setPaymentStep] = useState<"cart" | "payment">("cart")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50
  const finalTotal = total + shipping

  const handleCheckout = () => {
    if (customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address) {
      setPaymentStep("payment")
    } else {
      alert("Please fill all fields")
    }
  }

  const handlePurchase = async () => {
    const message = `
Purchase Order from MAYA RANG:

Customer Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}

Items:
${items.map((item) => `- ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString("en-IN")}`).join("\n")}

Subtotal: ₹${total.toLocaleString("en-IN")}
Shipping: ₹${shipping}
Total: ₹${finalTotal.toLocaleString("en-IN")}
    `.trim()

    const phoneNumber = "8801XXXXXXXXX"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    onClose()
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/20">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            {paymentStep === "cart" ? "Cart" : "Payment"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Cart View */}
        {paymentStep === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                  <p className="text-foreground/60 mb-4">Your cart is empty</p>
                  <Button
                    onClick={onClose}
                    className="rounded-lg border border-primary/30 bg-gradient-to-r from-primary/40 to-primary/20 px-6 py-3 font-semibold text-primary shadow-lg transition-all duration-300 backdrop-blur-md hover:from-primary/50 hover:to-primary/30 active:scale-95"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-primary/10 pb-4">
                    <Image
                      src={item.image || "/placeholder.svg?height=80&width=80&query=product"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <p className="text-sm text-foreground/60">Qty: {item.quantity}</p>
                      <p className="text-primary font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="p-2 hover:bg-red-50 rounded-lg transition">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="border-t border-primary/20 p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>₹{shipping}</span>
                  </div>
                </div>
                <div className="border-t border-primary/20 pt-3 flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full rounded-lg border border-primary/30 bg-gradient-to-r from-primary/40 to-primary/20 px-6 py-3 font-semibold text-primary shadow-lg transition-all duration-300 backdrop-blur-md hover:from-primary/50 hover:to-primary/30 active:scale-95 text-lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </>
        )}

        {/* Payment View */}
        {paymentStep === "payment" && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Customer Information</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                />
                <textarea
                  placeholder="Delivery Address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  disabled
                />
              </div>

              <div className="space-y-3 bg-primary/5 p-4 rounded-lg">
                <h3 className="font-semibold">Order Summary</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <div className="border-t border-primary/20 pt-3 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-primary/20 p-6 space-y-3">
              <Button
                onClick={handlePurchase}
                className="w-full rounded-lg border border-primary/30 bg-gradient-to-r from-primary/40 to-primary/20 px-6 py-3 font-semibold text-primary shadow-lg transition-all duration-300 backdrop-blur-md hover:from-primary/50 hover:to-primary/30 active:scale-95 text-lg"
              >
                Confirm & Send to WhatsApp
              </Button>
              <Button variant="outline" onClick={() => setPaymentStep("cart")} className="w-full border-primary/20">
                Back to Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
