"use client"

import Link from "next/link"
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@/lib/redux/api/apiSlice"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"

export default function AdminOrdersPage() {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)
  
  useEffect(() => {
    if (!user || user.role !== 'admin') {
        router.push("/")
    }
  }, [user, router])

  const { data: orders = [], isLoading } = useGetAllOrdersQuery(undefined)
  const [updateOrderStatus] = useUpdateOrderStatusMutation()

  const handleStatusUpdate = async (id: string | number, status: string) => {
      if (!id) return
      try {
          await updateOrderStatus({ id, status }).unwrap()
      } catch (err) {
          console.error("Failed to update status", err)
          alert("Failed to update status")
      }
  }

  if (isLoading || !user || user.role !== 'admin') {
      return <div className="min-h-screen flex items-center justify-center"><Loader size="lg" /></div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
            <Link href="/admin" className="text-sm text-primary hover:underline mb-2 block">← Back to Dashboard</Link>
            <h1 className="text-3xl font-bold text-primary">Order Management</h1>
        </div>

        <div className="bg-white rounded-lg shadow border border-primary/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20 bg-background">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-primary/20 hover:bg-background transition">
                    <td className="px-6 py-4 text-sm text-foreground font-semibold">
                      #{order.id?.toString().padStart(4, "0") || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.customer || order.user?.name || "Guest"}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">₹{(order.total || 0).toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{new Date(order.date || order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Completed" || order.status === "Delivered" ? "bg-green-100 text-green-700" : order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                        {order.status !== "Delivered" && (
                            <div className="flex gap-2">
                                {order.status === "Pending" && (
                                    <Button size="sm" onClick={() => handleStatusUpdate(order.id, "Processing")}>Process</Button>
                                )}
                                {order.status === "Processing" && (
                                    <Button size="sm" onClick={() => handleStatusUpdate(order.id, "Delivered")}>Complete</Button>
                                )}
                            </div>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
