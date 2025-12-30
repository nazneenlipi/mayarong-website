import Link from "next/link";
import { GlassyButton } from "@/components/glassy-button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background py-24 md:py-40">
      {/* Background Decorative Elements - Glassy look */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left Circle - Mobile-friendly, expands on Desktop */}
        <div className="absolute top-[-10%] left-[-10%] md:top-[-20%] md:left-[-10%] w-[300px] h-[300px] md:w-[60rem] md:h-[60rem] bg-primary/30 rounded-full blur-[80px] md:blur-[150px] animate-pulse"></div>

        {/* Bottom Right Circle - Increased Opacity for Large Screens */}
        <div className="absolute bottom-[-5%] right-[-5%] md:bottom-[-20%] md:right-[-10%] w-[250px] h-[250px] md:w-[50rem] md:h-[50rem] bg-secondary/30 rounded-full blur-[70px] md:blur-[130px]"></div>

        {/* Extra Accent Circle for Desktop - Only visible on md and up */}
        <div className="hidden md:block absolute top-[20%] right-[15%] w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[120px] animate-bounce-slow"></div>

        {/* Center Gradient Fade */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_90%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge Style Element */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Luxury Collection 2025
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter leading-[1.1]">
          Elegance{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">
              Redefined
            </span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 -rotate-1 -z-10 rounded-lg"></span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Discover our curated collection of premium watches and bags, crafted
          for those who value{" "}
          <span className="text-foreground border-b border-primary/30 px-1">
            quality and timeless style
          </span>
          .
        </p>

        <div className="flex gap-6 justify-center flex-wrap items-center">
          <Link href="/products">
            <button className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_var(--primary)] active:scale-95 overflow-hidden">
              <span className="relative z-10">Shop Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </Link>

          <button className="px-8 py-4 bg-background/30 backdrop-blur-xl border border-red-100 text-foreground rounded-2xl font-bold transition-all hover:bg-white/5 hover:border-white/20 shadow-xl active:scale-95 ">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
