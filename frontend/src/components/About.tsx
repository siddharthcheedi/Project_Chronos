import { Clock, Users, Target } from "lucide-react";

const About = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-16 space-y-6 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient-dual px-6 py-4 rounded-xl bg-background/60 backdrop-blur-sm inline-block">
              <span className="block text-gradient-dual text-glow-blue">
                About Project Chronos
              </span>
            </h2>
            <div className="prose prose-lg mx-auto text-muted-foreground max-w-3xl">
              <p className="text-lg leading-relaxed px-6 py-4 rounded-xl bg-background/50 backdrop-blur-sm">
                Project Chronos is a pioneering digital archaeology tool that bridges the gap between
                early internet communication and modern language understanding. As online discourse
                evolved rapidly through forums, chat rooms, and social media, much of the cultural
                context and linguistic nuances were lost to time.
              </p>
              <p className="text-lg leading-relaxed px-6 py-4 rounded-xl bg-background/50 backdrop-blur-sm">
                Our AI-powered platform reconstructs these fragmented digital artifacts, providing
                researchers, historians, and curious minds with accurate interpretations and
                contextual web sources. By leveraging advanced natural language processing and
                the Gemini API, we're preserving the linguistic heritage of the digital age.
              </p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="card-glow p-6 text-center space-y-4 hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Time Machine</h3>
              <p className="text-muted-foreground text-sm">
                Decode messages from the early 2000s internet era with historical context
              </p>
            </div>

            <div className="card-glow p-6 text-center space-y-4 hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Accurate Analysis</h3>
              <p className="text-muted-foreground text-sm">
                AI-powered reconstruction with contextual web sources for validation
              </p>
            </div>

            <div className="card-glow p-6 text-center space-y-4 hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Community Driven</h3>
              <p className="text-muted-foreground text-sm">
                Built by students passionate about preserving digital history
              </p>
            </div>
          </div>

          {/* Team info */}
          <div className="mt-16 text-center">
            <div className="inline-block card-glow px-8 py-6">
              <p className="text-muted-foreground">
                Created by a dedicated team of students combining AI technology with digital
                preservation to make internet history accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
