"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useGetReviewsQuery, useAddReviewMutation, type Review } from "@/lib/redux/api/apiSlice"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { ImageUpload } from "@/components/ui/image-upload"
import { Loader } from "@/components/ui/loader"

export default function RatingsPage() {
  const { data: reviews = [], isLoading } = useGetReviewsQuery(undefined)
  const [addReview, { isLoading: isAdding }] = useAddReviewMutation()
  
  const { token } = useSelector((state: RootState) => state.auth)
  const isLoggedIn = !!token

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    imageUrl: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      alert("Please login to submit a review")
      return
    }

    if (formData.name && formData.comment) {
      try {
        await addReview({
          name: formData.name,
          email: formData.email,
          rating: formData.rating,
          comment: formData.comment,
          imageUrl: formData.imageUrl,
          // Server should handle ID and createdAt
        }).unwrap()
        
        setFormData({
          name: "",
          email: "",
          rating: 5,
          comment: "",
          imageUrl: "",
        })
      } catch (err) {
        console.error("Failed to add review", err)
        alert("Failed to add review")
      }
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
                      disabled={isAdding}
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
                      disabled={isAdding}
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
                        disabled={isAdding}
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
                    disabled={isAdding}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Add Photo (Optional)</label>
                   <ImageUpload 
                        value={formData.imageUrl} 
                        onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                        disabled={isAdding}
                    />
                </div>

                <Button
                  type="submit"
                  disabled={isAdding}
                  className="w-full rounded-lg border border-primary/30 bg-gradient-to-r from-primary/40 to-primary/20 px-6 py-3 font-semibold text-primary shadow-lg transition-all duration-300 backdrop-blur-md hover:from-primary/50 hover:to-primary/30 active:scale-95 text-lg"
                >
                  {isAdding ? <Loader size="sm" /> : "Submit Review"}
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
            {isLoading ? (
               <Loader size="lg" className="py-12" />
            ) : reviews.length === 0 ? (
              <div className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-12 text-center">
                <p className="text-lg text-foreground/60">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map((review: Review) => (
                <div key={review._id} className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-6">
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

