"use client"

import type React from "react"
import { forwardRef } from "react"

interface GlassyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  children: React.ReactNode
  isLoading?: boolean
}

const variantClasses = {
  primary:
    "border-primary/30 bg-gradient-to-r from-primary/40 to-primary/20 text-primary hover:from-primary/50 hover:to-primary/30",
  secondary:
    "border-secondary/30 bg-gradient-to-r from-secondary/40 to-secondary/20 text-secondary hover:from-secondary/50 hover:to-secondary/30",
  accent:
    "border-accent/30 bg-gradient-to-r from-accent/40 to-accent/20 text-foreground hover:from-accent/50 hover:to-accent/30",
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

export const GlassyButton = forwardRef<HTMLButtonElement, GlassyButtonProps>(
  (
    { variant = "primary", size = "md", icon, children, isLoading = false, className = "", disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          rounded-lg border font-semibold shadow-lg transition-all duration-300 
          backdrop-blur-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span>
            Loading...
          </>
        ) : (
          <>
            {icon && icon}
            {children}
          </>
        )}
      </button>
    )
  },
)

GlassyButton.displayName = "GlassyButton"
