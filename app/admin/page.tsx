"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Package, Users, TrendingUp, LogOut, Plus, Edit2, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Elegant Leather Watch",
    category: "watches",
    price: 15999,
    image: "/elegant-leather-watch-premium.jpg",
    stock: 25,
    status: "Active",
  },
  {
    id: 2,
    name: "Classic Brown Shoulder Bag",
    category: "bags",
    price: 8999,
    image: "/brown-leather-shoulder-bag.jpg",
    stock: 15,
    status: "Active",
  },
  {
    id: 3,
    name: "Digital Smart Watch",
    category: "watches",
    price: 18999,
    image: "/smart-watch-digital-premium.jpg",
    stock: 8,
    status: "Low Stock",
  },
]

const DUMMY_STATS = [
  { label: "Total Orders", value: "1,234", icon: BarChart3, color: "bg-primary" },
  { label: "Total Products", value: "48", icon: Package, color: "bg-accent" },
  { label: "Total Customers", value: "892", icon: Users, color: "bg-primary" },
  { label: "Revenue", value: "₹12.5L", icon: TrendingUp, color: "bg-accent" },
]

const RECENT_ORDERS = [
  { id: 1, customer: "Amr Khan", product: "Elegant Watch", amount: "₹15,999", status: "Completed" },
  { id: 2, customer: "Sara Ali", product: "Leather Bag", amount: "₹8,999", status: "Pending" },
  { id: 3, customer: "Zainab Ahmed", product: "Smart Watch", amount: "₹18,999", status: "Completed" },
  { id: 4, customer: "Hassan Mohammed", product: "Tote Bag", amount: "₹11,999", status: "Processing" },
]

export default function AdminPage() {
  const [products, setProducts] = useState(DUMMY_PRODUCTS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", price: "", category: "", stock: "" })

  const handleAddProduct = () => {
    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : p,
        ),
      )
      setEditingId(null)
    } else {
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: "/diverse-products-still-life.png",
        status: "Active",
      }
      setProducts([...products, newProduct])
    }
    setFormData({ name: "", price: "", category: "", stock: "" })
    setShowAddModal(false)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleEditProduct = (product: any) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
    })
    setEditingId(product.id)
    setShowAddModal(true)
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
            <Button className="bg-white text-primary hover:bg-white/90 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {DUMMY_STATS.map((stat, index) => {
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

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow border border-primary/20 mb-8">
          <div className="p-6 border-b border-primary/20 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary">Products</h2>
            <Button
              onClick={() => {
                setEditingId(null)
                setFormData({ name: "", price: "", category: "", stock: "" })
                setShowAddModal(true)
              }}
              className="bg-accent text-foreground hover:bg-accent/90 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20 bg-background">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-primary/20 hover:bg-background transition">
                    <td className="px-6 py-4 text-sm text-foreground font-semibold">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground capitalize">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{product.stock} units</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <Button
                        onClick={() => handleEditProduct(product)}
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteProduct(product.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow border border-primary/20">
          <div className="p-6 border-b border-primary/20">
            <h2 className="text-2xl font-bold text-primary">Recent Orders</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20 bg-background">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-primary/20 hover:bg-background transition">
                    <td className="px-6 py-4 text-sm text-foreground font-semibold">
                      #{order.id.toString().padStart(4, "0")}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{order.product}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">{order.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Completed" ? "bg-green-100 text-green-700" : order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-primary mb-6">{editingId ? "Edit Product" : "Add New Product"}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2"
              >
                <option value="">Select Category</option>
                <option value="watches">Watches</option>
                <option value="bags">Bags</option>
              </select>
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full border border-primary/20 rounded-lg px-4 py-2"
              />
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowAddModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddProduct} className="flex-1 bg-accent text-foreground hover:bg-accent/90">
                  {editingId ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
