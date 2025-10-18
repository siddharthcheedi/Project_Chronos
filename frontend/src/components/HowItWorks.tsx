import { Upload, Cpu, Globe } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Input",
    description:
      "Submit your incomplete or slang-filled text from old forums, chats, or social media posts",
    color: "text-primary",
    glow: "border-glow-blue",
  },
  {
    icon: Cpu,
    title: "AI Reconstruction",
    description:
      "Our advanced AI analyzes patterns, context, and language evolution to reconstruct the original meaning",
    color: "text-secondary",
    glow: "border-glow-gold",
  },
  {
    icon: Globe,
    title: "Web Context",
    description:
      "Get contextual web sources and references that validate and enrich the reconstructed content",
    color: "text-accent",
    glow: "border-glow-blue",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 md:py-32 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 space-y-4 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground px-6 py-4 rounded-xl bg-background/60 backdrop-blur-sm inline-block">
              <span className="block text-gradient-dual text-glow-blue">
                How It Works
              </span>   
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-6 py-3 rounded-lg bg-background/50 backdrop-blur-sm">
              A simple three-step process to uncover the true meaning behind fragmented internet history
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`card-glow p-8 h-full space-y-6 hover-lift ${step.glow}`}>
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-heading font-bold text-white text-lg shadow-[0_0_30px_hsl(var(--primary)/0.5)]">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`${step.color} transition-transform duration-300 group-hover:scale-110`}>
                    <step.icon className="w-12 h-12" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-heading font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
