import Link from "next/link"
import { GlassyButton } from "@/components/glassy-button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 py-24 md:py-40">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-32 right-20 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-80 h-80 bg-accent/15 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-pretty">
          Elegance{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Redefined</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto mb-10 leading-relaxed text-pretty">
          Discover our curated collection of premium watches and bags, designed for those who appreciate quality and
          timeless style.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/products">
            <GlassyButton variant="primary" size="lg">
              Shop Now
            </GlassyButton>
          </Link>
          <GlassyButton variant="accent" size="lg">
            Learn More
          </GlassyButton>
        </div>
      </div>
    </section>
  )
}
