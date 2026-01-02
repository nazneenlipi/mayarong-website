"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ITEMS_PER_PAGE } from "@/lib/constants/products"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useGetProductsQuery } from "@/lib/redux/api/apiSlice"
import { Loader } from "@/components/ui/loader"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState(50000)
  const [currentPage, setCurrentPage] = useState(1)

  const { data: products = [], isLoading, error } = useGetProductsQuery()

  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory === "all" || p.category === selectedCategory
    const priceMatch = p.price <= priceRange
    return categoryMatch && priceMatch
  })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error loading products</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-primary mb-2">All Products</h1>
          <p className="text-foreground/60 mb-8">Showing {filteredProducts.length} products</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg p-6 border border-primary/20 sticky top-24">
                <h3 className="font-bold text-lg text-primary mb-4">Filters</h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Category</h4>
                  <div className="space-y-2">
                    {["all", "watches", "bags"].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={selectedCategory === cat}
                          onChange={(e) => {
                            setSelectedCategory(e.target.value)
                            setCurrentPage(1)
                          }}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm capitalize">{cat === "all" ? "All" : cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={priceRange}
                    onChange={(e) => {
                      setPriceRange(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="w-full accent-primary"
                  />
                  <p className="text-sm text-foreground/60 mt-2">Up to ₹{priceRange.toLocaleString("en-IN")}</p>
                </div>

                <Button className="w-full bg-primary text-white">Apply Filters</Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-foreground/60 text-lg">No products found matching your filters</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? "bg-primary text-white" : ""}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
