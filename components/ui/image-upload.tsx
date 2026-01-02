"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Trash, Upload, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const file = e.target.files[0]
    setIsLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {
        const response = await fetch("http://localhost:5000/api/v1/upload", {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: "Upload failed" }))
            throw new Error(errorData.message || "Upload failed")
        }

        const data = await response.json()
        // Backend returns 'url' field, not 'secure_url'
        const url_res = data.url || data.secure_url
        if (!url_res) {
             throw new Error("Invalid response from server")
        }
        onChange(url_res)
    } catch (error: any) {
        console.error("Upload error details:", error)
        alert(`Upload Failed: ${error.message || "Unknown error"}`)
    } finally {
        setIsLoading(false)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }
  }

  const triggerUpload = () => {
    fileInputRef.current?.click()
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="space-y-4 w-full">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onUpload} 
        className="hidden" 
        accept="image/*"
        disabled={disabled || isLoading}
      />
      
      <div className="flex items-center gap-4">
        {value && (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-gray-100 border">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onChange("")}
                variant="destructive"
                size="icon"
                disabled={disabled || isLoading}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={value}
            />
          </div>
        )}
        {!value && (
            <div className={`w-[200px] h-[200px] rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 text-gray-500 ${isLoading ? 'animate-pulse' : ''}`}>
                {isLoading ? (
                    <Loader2 className="h-10 w-10 mb-2 animate-spin text-primary" />
                ) : (
                    <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                )}
                <span className="text-sm">{isLoading ? "Uploading..." : "No Image"}</span>
            </div>
        )}
      </div>
      
      <Button 
        type="button" 
        disabled={disabled || isLoading} 
        variant="outline" 
        onClick={triggerUpload}
        className="flex items-center gap-2"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {isLoading ? "Uploading..." : "Upload Image"}
      </Button>

      <p className="text-xs text-muted-foreground">
        *Supported formats: JPG, PNG, WEBP.
      </p>
    </div>
  )
}
