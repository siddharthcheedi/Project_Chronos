import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-background transition-colors duration-500">
      <ThemeToggle />
      <Navigation />
      
      <div className="relative z-0 pt-20">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
