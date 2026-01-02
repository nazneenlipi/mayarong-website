"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Trash, Upload, Loader2, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  // Changed to array of strings for multiple images
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

export function ImageUpload({ value = [], onChange, disabled }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    // Check if adding these files exceeds limit
    if (value.length + e.target.files.length > 5) {
        alert("You can only upload a maximum of 5 images.")
        return
    }

    setIsLoading(true)
    const files = Array.from(e.target.files)
    const newUrls: string[] = []

    try {
        // Upload files one by one (or Promise.all could be used)
        for (const file of files) {
            const formData = new FormData()
            formData.append("file", file)

            const response = await fetch("http://localhost:5000/api/v1/upload", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: "Upload failed" }))
                throw new Error(errorData.message || "Upload failed")
            }

            const data = await response.json()
            const url_res = data.url || data.secure_url
            if (!url_res) {
                 throw new Error("Invalid response from server")
            }
            newUrls.push(url_res)
        }
        
        onChange([...value, ...newUrls])

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

  const onRemove = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove))
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
        multiple // Allow multiple selection
        disabled={disabled || isLoading || value.length >= 5}
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100 border group">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                className="h-6 w-6"
                disabled={disabled || isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt={`Image ${index + 1}`}
              src={url}
            />
          </div>
        ))}
        
        {value.length < 5 && (
            <div 
                onClick={triggerUpload}
                className={`aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100 transition ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
            >
                {isLoading ? (
                    <Loader2 className="h-8 w-8 mb-2 animate-spin text-primary" />
                ) : (
                    <Upload className="h-8 w-8 mb-2 opacity-50" />
                )}
                <span className="text-xs font-medium text-center px-2">
                    {isLoading ? "Uploading..." : "Upload Image"}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1">
                    ({value.length}/5)
                </span>
            </div>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground">
        *Supported formats: JPG, PNG, WEBP. Max 5 images.
      </p>
    </div>
  )
}
