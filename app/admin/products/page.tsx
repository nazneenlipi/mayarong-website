"use client"

import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, X } from "lucide-react"
import { useState, useEffect } from "react"
import { 
  useGetProductsQuery, 
  useCreateProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation,
  type Product
} from "@/lib/redux/api/apiSlice"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ProductForm } from "@/components/admin/product-form"
import Image from "next/image"
import { Loader } from "@/components/ui/loader"

export default function AdminProductsPage() {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.auth)
  
  useEffect(() => {
    if (!user || user.role !== 'admin') {
        router.push("/")
    }
  }, [user, router])

  const { data: products = [], isLoading: isGlobalLoading } = useGetProductsQuery()
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleSaveProduct = async (formData: any) => {
    try {
      if (editingProduct) {
        await updateProduct({ 
          id: editingProduct.id, 
          ...formData, 
          price: Number(formData.price), 
          stock: Number(formData.stock) 
        }).unwrap()
        setEditingProduct(null)
      } else {
        await createProduct({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          // image is already in formData from ProductForm
          status: "Active",
        }).unwrap()
      }
      setShowAddModal(false)
    } catch (error: any) {
      console.error("Failed to save product:", error)
      const message = error?.data?.message || "Failed to save product"
      alert(message)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id.toString()).unwrap()
      } catch (error) {
        console.error("Failed to delete product:", error)
        alert("Failed to delete product")
      }
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowAddModal(true)
  }

  const handleCloseModal = () => {
      setShowAddModal(false)
      setEditingProduct(null)
  }

  if (isGlobalLoading || !user || user.role !== 'admin') {
    return <div className="min-h-screen flex items-center justify-center"><Loader size="lg" /></div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
            <div>
                <Link href="/admin" className="text-sm text-primary hover:underline mb-2 block">← Back to Dashboard</Link>
                <h1 className="text-3xl font-bold text-primary">Product Management</h1>
            </div>
            <Button
              onClick={() => {
                setEditingProduct(null)
                setShowAddModal(true)
              }}
              className="bg-accent text-foreground hover:bg-accent/90 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
        </div>

        <div className="bg-white rounded-lg shadow border border-primary/20">
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
                    <td className="px-6 py-4 text-sm text-foreground font-semibold flex items-center gap-3">
                        {product.image && (
                            <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                        )}
                        {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground capitalize">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{product.stock} units</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {product.status || 'Active'}
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
      </div>

       {/* Add/Edit Product Modal */}
       {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-auto relative my-8">
            <Button 
                onClick={handleCloseModal}
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
                <X className="w-5 h-5"/>
            </Button>
            
            <h3 className="text-2xl font-bold text-primary mb-6">
                {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            
            <ProductForm 
                initialData={editingProduct} 
                onSubmit={handleSaveProduct} 
                onCancel={handleCloseModal}
                isLoading={isCreating || isUpdating}
            />
          </div>
        </div>
      )}
    </div>
  )
}
