"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/ui/image-upload"

interface ProductFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
  isLoading?: boolean
}

export function ProductForm({ initialData, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "/placeholder.svg",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price ? initialData.price.toString() : "",
        category: initialData.category || "",
        stock: initialData.stock ? initialData.stock.toString() : "",
        description: initialData.description || "",
        image: initialData.image || "/placeholder.svg",
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="space-y-6">
       <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>
            <ImageUpload 
                value={formData.image} 
                onChange={(url) => setFormData({ ...formData, image: url })}
                disabled={isLoading}
            />
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="text-sm font-medium">Product Name</label>
            <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
            />
        </div>
        
        <div className="space-y-2">
            <label className="text-sm font-medium">Price (₹)</label>
            <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
            >
                <option value="">Select Category</option>
                <option value="watches">Watches</option>
                <option value="bags">Bags</option>
                <option value="accessories">Accessories</option>
            </select>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Stock Quantity</label>
            <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
            />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
                placeholder="Product Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
            />
        </div>
      </div>

      <div className="flex gap-3 pt-4 justify-end">
        <Button onClick={onCancel} variant="outline" type="button" disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-accent text-foreground hover:bg-accent/90" disabled={isLoading}>
          {initialData ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </div>
  )
}
