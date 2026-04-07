import { useState, useCallback } from "react";
import CinematicIntro from "@/components/CinematicIntro";
import MusicPlayer from "@/components/MusicPlayer";
import InvitationCard from "@/components/InvitationCard";
import RSVPForm from "@/components/RSVPForm";
import ShareSection from "@/components/ShareSection";
import { Heart } from "lucide-react";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Cinematic Intro */}
      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Music Player - always accessible */}
      <MusicPlayer />

      {/* Main content */}
      <div className={`transition-opacity duration-1000 ${introComplete ? "opacity-100" : "opacity-0"}`}>
        {/* Subtle background pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(43 72% 52%) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <InvitationCard />

        <div className="w-20 h-px mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <RSVPForm />

        <div className="w-20 h-px mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <ShareSection />

        {/* Footer */}
        <footer className="py-12 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground/50">
            <span className="font-body text-xs tracking-[0.2em] uppercase">Made with</span>
            <Heart size={12} className="text-primary fill-primary/50" />
            <span className="font-body text-xs tracking-[0.2em] uppercase">for our special day</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
