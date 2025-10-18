import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import About from "@/components/About";

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-background transition-colors duration-500">
      <ThemeToggle />
      <Navigation />
      
      <div className="relative z-10 pt-20">
        <About />
      </div>
    </div>
  );
};

export default AboutPage;
