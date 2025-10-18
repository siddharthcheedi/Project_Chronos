import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import HowItWorks from "@/components/HowItWorks";

const HowItWorksPage = () => {
  return (
    <div className="relative min-h-screen bg-background transition-colors duration-500">
      <ThemeToggle />
      <Navigation />
      
      <div className="relative z-10 pt-20">
        <HowItWorks />
      </div>
    </div>
  );
};

export default HowItWorksPage;
