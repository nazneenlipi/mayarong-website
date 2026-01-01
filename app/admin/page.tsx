"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Package, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { 
  useGetProductsQuery, 
  useGetAllOrdersQuery,
  useGetAllUsersQuery,
} from "@/lib/redux/api/apiSlice"

import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { useEffect } from "react"
import { Loader } from "@/components/ui/loader"

export default function AdminPage() {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
        router.push("/")
    }
  }, [user, router])

  // Return null or a loader while checking to prevent flash of content
  if (!user || user.role !== 'admin') {
      return null
  }

  const { data: products = [], isLoading: isLoadingProducts } = useGetProductsQuery()
  const { data: orders = [], isLoading: isLoadingOrders } = useGetAllOrdersQuery(undefined)
  const { data: users = [], isLoading: isLoadingUsers } = useGetAllUsersQuery(undefined)

  // Calculate Stats
  const totalRevenue = orders.reduce((acc: number, order: any) => acc + (order.total || 0), 0)
  
  const stats = [
    { label: "Total Orders", value: orders.length.toString(), icon: BarChart3, color: "bg-primary" },
    { label: "Total Products", value: products.length.toString(), icon: Package, color: "bg-accent" },
    { label: "Total Customers", value: users.length.toString(), icon: Users, color: "bg-primary" },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: TrendingUp, color: "bg-accent" },
  ]
  
  // Recent 5 orders
  const recentOrders = [...orders].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  if (isLoadingProducts || isLoadingOrders || isLoadingUsers) {
    return <div className="min-h-screen flex items-center justify-center"><Loader size="lg" /></div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-primary text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-white/80">MAYA RANG Store Management</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                View Store
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link href="/admin/products" className="bg-white rounded-lg shadow border border-primary/20 p-8 hover:shadow-lg transition flex items-center justify-between group">
                <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Manage Products</h3>
                    <p className="text-foreground/60">Add, edit, or delete store products</p>
                </div>
                <div className="bg-accent/10 p-4 rounded-full group-hover:bg-accent/20 transition">
                    <Package className="w-8 h-8 text-accent" />
                </div>
            </Link>

            <Link href="/admin/orders" className="bg-white rounded-lg shadow border border-primary/20 p-8 hover:shadow-lg transition flex items-center justify-between group">
                <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Manage Orders</h3>
                    <p className="text-foreground/60">View orders and update status</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition">
                    <BarChart3 className="w-8 h-8 text-primary" />
                </div>
            </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow border border-primary/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


