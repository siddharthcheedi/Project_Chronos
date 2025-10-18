import { Link, useLocation } from "react-router-dom";
import { Sparkles, Home, Cpu, Info, BookOpen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-secondary animate-glow-pulse" />
            <span className="text-xl font-heading font-bold text-gradient-dual">
              Project Chronos
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/")
                  ? "bg-card-hover text-secondary"
                  : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              to="/reconstruct"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/reconstruct")
                  ? "bg-card-hover text-secondary"
                  : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span className="hidden sm:inline">Reconstruct</span>
            </Link>
            
            <Link
              to="/how-it-works"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/how-it-works")
                  ? "bg-card-hover text-secondary"
                  : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">How It Works</span>
            </Link>
            
            <Link
              to="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/about")
                  ? "bg-card-hover text-secondary"
                  : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
              }`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
