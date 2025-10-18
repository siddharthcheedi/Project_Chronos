import { useState, useEffect } from "react";
import { Loader2, Volume2, Sparkles, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface DemoProps {
  initialInput?: string;
  initialOutput?: string;
  initialLinks?: string[];
}

const Demo = ({ initialInput = "", initialOutput = "", initialLinks = [] }: DemoProps) => {
  const [inputText, setInputText] = useState(initialInput);
  const [outputText, setOutputText] = useState(initialOutput);
  const [displayedText, setDisplayedText] = useState("");
  const [links, setLinks] = useState<string[]>(initialLinks);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Update when props change
  useEffect(() => {
    if (initialInput) setInputText(initialInput);
    if (initialOutput) setOutputText(initialOutput);
    if (initialLinks.length > 0) setLinks(initialLinks);
  }, [initialInput, initialOutput, initialLinks]);

  // Typing animation effect
  useEffect(() => {
    if (!outputText || isTyping) return;

    setIsTyping(true);
    setDisplayedText("");
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < outputText.length) {
        setDisplayedText(outputText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 20); // 20ms per character for smooth typing

    return () => clearInterval(typingInterval);
  }, [outputText]);

  const handleReconstruct = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to reconstruct");
      return;
    }

    setIsLoading(true);
    setOutputText("");
    setDisplayedText("");
    setLinks([]);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/reconstruct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fragment: inputText }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const reconstructed = data.reconstructed || data.result || "Reconstruction complete!";
      const contextLinks = data.links || [];

      setOutputText(reconstructed);
      setLinks(contextLinks);
      
      // Save to history
      saveToHistory(inputText, reconstructed, contextLinks);
      
      toast.success("Text successfully reconstructed!");
    } catch (error) {
      console.error("Reconstruction error:", error);
      toast.error("Connection failed. Please ensure the Flask backend is running at http://127.0.0.1:5000");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = () => {
    if (!displayedText) {
      toast.error("No text to read");
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(displayedText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
      toast.success("Playing voice reconstruction");
    } else {
      toast.error("Speech synthesis not supported in your browser");
    }
  };

  const saveToHistory = (original: string, reconstructed: string, contextLinks: string[]) => {
    try {
      const stored = localStorage.getItem("chronos_reconstructions");
      const reconstructions = stored ? JSON.parse(stored) : [];
      
      const newReconstruction = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        original,
        reconstructed,
        links: contextLinks,
      };
      
      reconstructions.unshift(newReconstruction);
      
      // Keep only last 20 reconstructions
      if (reconstructions.length > 20) {
        reconstructions.pop();
      }
      
      localStorage.setItem("chronos_reconstructions", JSON.stringify(reconstructions));
    } catch (error) {
      console.error("Failed to save reconstruction:", error);
    }
  };

  const handleDownload = () => {
    if (!displayedText) {
      toast.error("No reconstruction to download");
      return;
    }

    const timestamp = new Date().toLocaleString();
    const report = `PROJECT CHRONOS - RECONSTRUCTION REPORT
Generated: ${timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ORIGINAL FRAGMENT:
${inputText}

RECONSTRUCTED TEXT:
${displayedText}

${links.length > 0 ? `CONTEXTUAL SOURCES:
${links.map((link, i) => `${i + 1}. ${link}`).join("\n")}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project Chronos: The AI Archeologist
Reconstructing the lost language of the early internet
`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Chronos_Report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Report downloaded successfully!");
  };

  return (
    <>
      <section id="demo" className="relative py-24 md:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16 space-y-4 animate-fade-in-up flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-card/80 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-secondary animate-glow-pulse" />
                <span className="text-sm font-medium text-muted-foreground">
                  AI Reconstruction Tool
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient-dual px-6 py-4 rounded-xl bg-background/60 backdrop-blur-sm">
                <span className="block text-gradient-dual text-glow-blue">
                   Reconstruct Text
                </span>  
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-6 py-3 rounded-lg bg-background/50 backdrop-blur-sm">
                Enter incomplete or slang-filled text from early internet sources
                and receive AI-powered reconstruction with contextual sources
              </p>
            </div>

            {/* Demo interface */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input */}
              <div className="card-glow p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold font-heading">Original Text</h3>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                    Input
                  </span>
                </div>
                <Textarea
                  placeholder="Enter text with slang or incomplete sentences...&#10;Example: 'yo wht r u doin 2day? lmk if ur free 4 gaming sesh'"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] resize-none bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary/50 transition-colors"
                />
                <Button
                  onClick={handleReconstruct}
                  disabled={isLoading || !inputText.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Reconstructing digital memory...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      🔍 Reconstruct Text
                    </>
                  )}
                </Button>
              </div>

              {/* Output */}
              <div className="card-glow p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold font-heading">Reconstructed Text</h3>
                  <span className="text-xs text-secondary px-2 py-1 bg-secondary/10 rounded">
                    Output
                  </span>
                </div>
                <div className="min-h-[200px] p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-border text-foreground whitespace-pre-wrap relative">
                  {isTyping && (
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-2 text-xs text-primary animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Decoding...</span>
                      </div>
                    </div>
                  )}
                  {displayedText || (
                    <span className="text-muted-foreground italic">
                      Reconstructed text will appear here...
                    </span>
                  )}
                  {isTyping && (
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                  )}
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleSpeak}
                    disabled={!displayedText || isTyping}
                    variant="outline"
                    className="border-secondary/30 hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    🔊 Play Voice
                  </Button>
                  <Button
                    onClick={handleDownload}
                    disabled={!displayedText || isTyping}
                    variant="outline"
                    className="border-primary/30 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    📄 Download
                  </Button>
                </div>

                {/* Contextual links */}
                {links.length > 0 && (
                  <div className="pt-4 border-t border-border space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Contextual Sources:
                    </h4>
                    <div className="space-y-2">
                      {links.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                        >
                          <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
                          <span className="truncate">{link}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Demo;
