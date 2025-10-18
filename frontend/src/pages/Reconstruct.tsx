import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import Demo from "@/components/Demo";
import RecentReconstructions, { Reconstruction } from "@/components/RecentReconstructions";

const Reconstruct = () => {
  const [selectedReconstruction, setSelectedReconstruction] = useState<Reconstruction | null>(null);

  const handleSelectReconstruction = (reconstruction: Reconstruction) => {
    setSelectedReconstruction(reconstruction);
  };

  return (
    <div className="relative min-h-screen bg-background transition-colors duration-500">
      <ThemeToggle />
      <Navigation />
      <RecentReconstructions onSelect={handleSelectReconstruction} />
      
      <div className="relative z-10 pt-20">
        <Demo 
          initialInput={selectedReconstruction?.original}
          initialOutput={selectedReconstruction?.reconstructed}
          initialLinks={selectedReconstruction?.links}
        />
      </div>
    </div>
  );
};

export default Reconstruct;
