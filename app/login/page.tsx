"use client"

import type React from "react"
import Link from "next/link"
import { GlassyButton } from "@/components/glassy-button"
import { Mail, Lock } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLoginMutation } from "@/lib/redux/api/apiSlice"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/lib/redux/slices/authSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      if (email && password.length >= 6) {
        const userData = await login({ email, password }).unwrap()
        dispatch(setCredentials({ user: userData.user, token: userData.token }))
        dispatch(setCredentials({ user: userData.user, token: userData.token }))
        if (userData.user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/")
        }
      } else {
        setError("Email and password (min 6 chars) required")
      }
    } catch (err: any) {
      setError(err?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-background px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-foreground/60 mb-8">Sign in to your MAYA RANG account</p>

          {error && <div className="mb-4 p-3 bg-red-100/50 text-red-700 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleCredentialsLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-primary/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-primary/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
            </div>

            <GlassyButton type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
              Sign In
            </GlassyButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground/60 text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-primary/20">
            <Link href="/" className="text-primary text-sm font-semibold hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
