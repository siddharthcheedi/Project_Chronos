import { useState, useEffect } from "react";
import { Clock, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Reconstruction {
  id: string;
  timestamp: number;
  original: string;
  reconstructed: string;
  links?: string[];
}

interface RecentReconstructionsProps {
  onSelect: (reconstruction: Reconstruction) => void;
}

const RecentReconstructions = ({ onSelect }: RecentReconstructionsProps) => {
  const [reconstructions, setReconstructions] = useState<Reconstruction[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadReconstructions();
  }, []);

  const loadReconstructions = () => {
    try {
      const stored = localStorage.getItem("chronos_reconstructions");
      if (stored) {
        setReconstructions(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load reconstructions:", error);
    }
  };

  const clearReconstructions = () => {
    localStorage.removeItem("chronos_reconstructions");
    setReconstructions([]);
  };

  const removeReconstruction = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = reconstructions.filter((r) => r.id !== id);
    localStorage.setItem("chronos_reconstructions", JSON.stringify(updated));
    setReconstructions(updated);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (reconstructions.length === 0) return null;

  return (
    <>
      {/* Toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="fixed bottom-10 right-6 z-50 rounded-full border-secondary/30 bg-card/80 backdrop-blur-xl hover:bg-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--secondary)/0.3)] gap-2"
      >
        <Clock className="h-4 w-4 text-secondary" />
        <span className="hidden sm:inline">Recent</span>
        <span className="text-xs bg-secondary/20 px-2 py-0.5 rounded-full">
          {reconstructions.length}
        </span>
      </Button>

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-card/95 backdrop-blur-2xl border-r border-border shadow-2xl z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary animate-glow-pulse" />
              <h3 className="font-heading font-semibold text-lg">
                Recent Reconstructions
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* List */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {reconstructions.map((reconstruction) => (
                <div
                  key={reconstruction.id}
                  onClick={() => {
                    onSelect(reconstruction);
                    setIsOpen(false);
                  }}
                  className="group card-glow p-3 cursor-pointer hover-lift transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(reconstruction.timestamp)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => removeReconstruction(reconstruction.id, e)}
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2 mb-1">
                    {reconstruction.original}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <span>View reconstruction</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              onClick={clearReconstructions}
              className="w-full text-sm border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              Clear All History
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-md z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default RecentReconstructions;
