"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GlassyButton } from "@/components/glassy-button"
import { Mail, Phone, MapPin } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-primary/5 to-secondary/5 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Touch</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                We are always here to help. Reach out to us through any of the channels below for immediate assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="group rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl p-8 hover:bg-white/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Call Us</h3>
                <p className="text-foreground/60 mb-6">Mon-Sat from 9am to 9pm</p>
                <a href="tel:+8801XXXXXXXXX" className="text-primary font-semibold text-lg hover:underline block">
                    +880 1XXXXXXXXX
                </a>
            </div>

            {/* Email */}
            <div className="group rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl p-8 hover:bg-white/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Email Us</h3>
                <p className="text-foreground/60 mb-6">We'll respond within 24 hours</p>
                <a href="mailto:contact@mayarang.com" className="text-primary font-semibold text-lg hover:underline block">
                    contact@mayarang.com
                </a>
            </div>

            {/* WhatsApp */}
             <div className="group rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl p-8 hover:bg-white/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <WhatsAppIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">WhatsApp</h3>
                <p className="text-foreground/60 mb-6">Instant support via chat</p>
                 <a
                    href="https://api.whatsapp.com/send?phone=8801606208313&text=Hello%20MAYA%20RANG%2C%20I%20need%20assistance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <GlassyButton variant="primary" icon={<WhatsAppIcon className="w-4 h-4" />}>
                        Chat Now
                    </GlassyButton>
                  </a>
            </div>
          </div>

          <div className="mt-16 text-center">
             <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary/10 text-secondary font-medium">
                <MapPin className="w-5 h-5" />
                <span>Dhaka, Bangladesh</span>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
