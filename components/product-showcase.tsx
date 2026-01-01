"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useGetProductsQuery } from "@/lib/redux/api/apiSlice"

export function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { data: products = [], isLoading, error } = useGetProductsQuery()

  if (isLoading) {
    return <div className="py-16 text-center">Loading products...</div>
  }

  if (error) {
    return <div className="py-16 text-center text-red-500">Error loading products</div>
  }

  const filteredProducts =
    selectedCategory === "all"
      ? products.slice(0, 6)
      : products.filter((p) => p.category === selectedCategory).slice(0, 6)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-4 text-center">Featured Collection</h2>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          Handpicked items from our exclusive collection
        </p>

        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-primary text-white" : ""}
          >
            All Products
          </Button>
          <Button
            variant={selectedCategory === "watches" ? "default" : "outline"}
            onClick={() => setSelectedCategory("watches")}
            className={selectedCategory === "watches" ? "bg-primary text-white" : ""}
          >
            Watches
          </Button>
          <Button
            variant={selectedCategory === "bags" ? "default" : "outline"}
            onClick={() => setSelectedCategory("bags")}
            className={selectedCategory === "bags" ? "bg-primary text-white" : ""}
          >
            Bags
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/products"
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold inline-block"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  )
}
