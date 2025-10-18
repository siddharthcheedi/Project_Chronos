import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-hologram.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />
      
      {/* Hero image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Holographic ancient scroll with digital circuits"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-card/50 backdrop-blur-[2px]">
            <Sparkles className="w-4 h-4 text-primary animate-glow-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Digital Archaeology
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight text-center">
            <span className="block text-gradient-dual text-glow-blue">
              Project Chronos
            </span>
            <span className="block text-foreground mt-2">
              The AI Archeologist
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto font-light px-6 py-4 rounded-xl bg-background/30 backdrop-blur-[2px]">
            Reconstructing the lost language of the early internet
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-6 py-3 rounded-lg bg-background/25 backdrop-blur-[2px]">
            Transform incomplete or slang-filled internet texts into clear, coherent content
            with AI-powered analysis and contextual web sources
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              to="/reconstruct"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:scale-105"
            >
              Start Reconstructing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
