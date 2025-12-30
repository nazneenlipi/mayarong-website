"use client"

import { X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem: (id: number) => void
}

export function CartSidebar({ isOpen, onClose, items, onRemoveItem }: CartSidebarProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/20">
          <h2 className="text-2xl font-bold text-primary">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[calc(100vh-300px)]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 mb-4">Your cart is empty</p>
              <Button onClick={onClose} className="bg-primary text-white">
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
                <button onClick={() => onRemoveItem(item.id)} className="p-2 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-primary/20 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">₹{total.toLocaleString("en-IN")}</span>
            </div>
            <Button className="w-full bg-accent text-foreground hover:bg-accent/90 font-semibold py-3">Checkout</Button>
            <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
