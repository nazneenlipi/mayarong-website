import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Check if Cloudinary credentials are set
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
         console.error("Missing Cloudinary Environment Variables")
         return new NextResponse("Server Configuration Error: Missing Cloudinary Credentials", { status: 500 })
    }

    const uploadOptions: any = {}
    if (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
        uploadOptions.upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error)
            reject(error)
          } else {
            resolve(result)
          }
        }
      ).end(buffer)
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("[UPLOAD_ERROR_DETAILS]", error)
    return new NextResponse(error.message || "Internal Upload Error", { status: 500 })
  }
}
