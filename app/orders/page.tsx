"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useGetMyOrdersQuery, type Order } from "@/lib/redux/api/apiSlice"
import { Loader } from "@/components/ui/loader"

const ITEMS_PER_PAGE = 5

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: orders = [], isLoading } = useGetMyOrdersQuery(undefined)

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-primary mb-8">My Orders</h1>

          {isLoading ? (
            <Loader size="lg" className="py-12" />
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 mb-4">No orders yet</p>
              <a
                href="/products"
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {paginatedOrders.map((order: Order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg border border-primary/20 p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-lg text-primary">{order.id}</p>
                        <p className="text-sm text-foreground/60">
                          {order.date} • {order.items} item(s)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">₹{(order.total || 0).toLocaleString("en-IN")}</p>
                        <span
                          className={`text-sm font-medium px-3 py-1 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
