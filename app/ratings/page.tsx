"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { addReview } from "@/lib/redux/slices/reviewsSlice"
import { Button } from "@/components/ui/button"
import { Star, Upload, Trash2 } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function RatingsPage() {
  const dispatch = useDispatch()
  const reviews = useSelector((state: RootState) => state.reviews.reviews)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    imageUrl: "",
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const preview = reader.result as string
        setImagePreview(preview)
        setFormData({ ...formData, imageUrl: preview })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      alert("Please login to submit a review")
      return
    }

    if (formData.name && formData.comment) {
      dispatch(
        addReview({
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          rating: formData.rating,
          comment: formData.comment,
          imageUrl: formData.imageUrl,
          createdAt: new Date().toISOString(),
        }),
      )
      setFormData({
        name: "",
        email: "",
        rating: 5,
        comment: "",
        imageUrl: "",
      })
      setImagePreview(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-primary/5 to-secondary/5 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Customer <span className="text-primary">Ratings & Reviews</span>
            </h1>
            <p className="text-lg text-foreground/60">Share your experience with MAYA RANG products</p>
          </div>

          {/* Add Review Form */}
          {isLoggedIn ? (
            <div className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-8 mb-12">
              <h2 className="text-2xl font-bold text-primary mb-6">Share Your Review</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= formData.rating ? "fill-primary text-primary" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Your Review *</label>
                  <textarea
                    required
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
                    placeholder="Share your detailed review..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Add Photo (Optional)</label>
                  <div className="flex items-center gap-4">
                    <label className="rounded-lg border border-accent/30 bg-gradient-to-r from-accent/40 to-accent/20 px-6 py-3 font-semibold text-foreground shadow-lg transition-all duration-300 backdrop-blur-md hover:from-accent/50 hover:to-accent/30 active:scale-95 cursor-pointer inline-flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Image
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    {imagePreview && (
                      <div className="relative w-24 h-24">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null)
                            setFormData({ ...formData, imageUrl: "" })
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg border border-primary/30 bg-gradient-to-r from-primary/40 to-primary/20 px-6 py-3 font-semibold text-primary shadow-lg transition-all duration-300 backdrop-blur-md hover:from-primary/50 hover:to-primary/30 active:scale-95 text-lg"
                >
                  Submit Review
                </Button>
              </form>
            </div>
          ) : (
            <div className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-8 mb-12 text-center">
              <p className="text-lg mb-4">Please login to submit a review</p>
              <Button className="rounded-lg border border-primary/30 bg-gradient-to-r from-primary/40 to-primary/20 px-6 py-3 font-semibold text-primary shadow-lg transition-all duration-300 backdrop-blur-md hover:from-primary/50 hover:to-primary/30 active:scale-95">
                Login to Review
              </Button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Customer Reviews ({reviews.length})</h2>
            </div>
            {reviews.length === 0 ? (
              <div className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-12 text-center">
                <p className="text-lg text-foreground/60">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-lg">{review.name}</p>
                      <p className="text-sm text-foreground/60">{review.email}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {review.imageUrl && (
                    <div className="mb-4 relative w-full max-w-xs h-48">
                      <Image
                        src={review.imageUrl || "/placeholder.svg"}
                        alt="Review"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <p className="text-foreground/80 mb-3">{review.comment}</p>
                  <p className="text-xs text-foreground/50">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
