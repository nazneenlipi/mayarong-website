"use client"

import type React from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"
import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}
