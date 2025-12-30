"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GlassyButton } from "@/components/glassy-button"
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "8801XXXXXXXXX"
    const message = `Hello MAYA RANG, I'm interested in your products. ${formData.message || "Please contact me with more information."}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleWhatsAppClick()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-primary/5 to-secondary/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-foreground/60">We'd love to hear from you. Send us a message!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none"
                    placeholder="Your message"
                  />
                </div>

                <GlassyButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<MessageCircle className="w-5 h-5" />}
                >
                  Send via WhatsApp
                </GlassyButton>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-foreground/60">+880 1XXXXXXXXX</p>
                    <p className="text-sm text-foreground/50 mt-1">Available 9 AM to 9 PM</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-foreground/60">contact@mayarang.com</p>
                    <p className="text-sm text-foreground/50 mt-1">We'll reply within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/30 backdrop-blur-md p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-foreground/60">Dhaka, Bangladesh</p>
                    <p className="text-sm text-foreground/50 mt-1">Online store serving Bangladesh</p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/8801XXXXXXXXX?text=Hello%20MAYA%20RANG%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <GlassyButton
                  variant="accent"
                  size="lg"
                  className="w-full"
                  icon={<MessageCircle className="w-5 h-5" />}
                >
                  Chat on WhatsApp
                </GlassyButton>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
