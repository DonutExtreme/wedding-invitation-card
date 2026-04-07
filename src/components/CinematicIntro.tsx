import { useState, useEffect } from "react";

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [phase, setPhase] = useState<"glow" | "opening" | "reveal" | "done">("glow");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 1200);
    const t2 = setTimeout(() => setPhase("reveal"), 3800);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(30 10% 8%), hsl(30 15% 5%))" }}>
      
      {/* Central glow */}
      <div className={`absolute w-64 h-64 rounded-full transition-all duration-[2000ms] ${
        phase === "glow" ? "opacity-40 scale-100" : phase === "opening" ? "opacity-80 scale-150" : "opacity-0 scale-[3]"
      }`}
        style={{ background: "radial-gradient(circle, hsl(43 72% 52% / 0.6), transparent 70%)" }}
      />

      {/* Particle sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className={`absolute w-1 h-1 rounded-full transition-all duration-[3000ms] ${
          phase !== "glow" ? "opacity-100" : "opacity-0"
        }`}
          style={{
            background: "hsl(43 72% 70%)",
            left: `${20 + Math.random() * 60}%`,
            top: `${10 + Math.random() * 80}%`,
            transitionDelay: `${Math.random() * 2}s`,
            transform: phase === "reveal" ? `translateY(-${50 + Math.random() * 100}px) scale(0)` : "none",
            boxShadow: "0 0 6px hsl(43 72% 52% / 0.8)",
          }}
        />
      ))}

      {/* Gate panels */}
      <div className="absolute inset-0 flex">
        {/* Left gate */}
        <div className={`w-1/2 h-full flex items-center justify-end transition-none ${
          phase === "opening" || phase === "reveal" ? "gate-left" : ""
        }`}
          style={{
            background: "linear-gradient(90deg, hsl(30 10% 6%), hsl(30 12% 10%))",
            borderRight: "3px solid hsl(43 72% 40%)",
            transformOrigin: "left center",
          }}>
          <div className="pr-4 flex flex-col items-center gap-2 opacity-80">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-8 h-8 border border-primary/30 rounded-full" 
                style={{ width: `${20 + i * 8}px`, height: `${20 + i * 8}px` }} />
            ))}
          </div>
        </div>
        {/* Right gate */}
        <div className={`w-1/2 h-full flex items-center justify-start transition-none ${
          phase === "opening" || phase === "reveal" ? "gate-right" : ""
        }`}
          style={{
            background: "linear-gradient(270deg, hsl(30 10% 6%), hsl(30 12% 10%))",
            borderLeft: "3px solid hsl(43 72% 40%)",
            transformOrigin: "right center",
          }}>
          <div className="pl-4 flex flex-col items-center gap-2 opacity-80">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-8 h-8 border border-primary/30 rounded-full"
                style={{ width: `${20 + i * 8}px`, height: `${20 + i * 8}px` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Center text during opening */}
      <div className={`absolute z-10 text-center transition-opacity duration-1000 ${
        phase === "opening" ? "opacity-100" : phase === "reveal" ? "opacity-0" : "opacity-0"
      }`}>
        <p className="font-script text-3xl sm:text-5xl text-primary tracking-wider">
          You're Invited
        </p>
      </div>

      {/* Skip button */}
      <button
        onClick={() => { setPhase("done"); onComplete(); }}
        className="absolute bottom-8 right-8 z-20 font-body text-sm text-muted-foreground/60 hover:text-primary transition-colors tracking-widest uppercase"
      >
        Skip
      </button>
    </div>
  );
};

export default CinematicIntro;
