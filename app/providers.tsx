"use client"

import type React from "react"
import { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import { store } from "@/lib/redux/store"
import { SessionProvider } from "next-auth/react"
import { initializeAuth } from "@/lib/redux/slices/authSlice"

function StoreInitializer() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])
  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <StoreInitializer />
        {children}
      </Provider>
    </SessionProvider>
  )
}
