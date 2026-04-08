import { useState, useCallback } from "react";
import CinematicIntro from "@/components/CinematicIntro";
import MusicPlayer from "@/components/MusicPlayer";
import InvitationCard from "@/components/InvitationCard";
import RSVPForm from "@/components/RSVPForm";
import ShareSection from "@/components/ShareSection";
import EditPanel, { InvitationDetails } from "@/components/EditPanel";
import { Heart } from "lucide-react";

const defaultDetails: InvitationDetails = {
  brideFirst: "Isabella",
  groomFirst: "Alexander",
  date: "Saturday, December 20th, 2025",
  time: "Four O'Clock in the Afternoon",
  venue: "The Grand Palace Ballroom, Beverly Hills",
  message: "Together with their families, request the pleasure of your company at the celebration of their marriage",
};

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [details, setDetails] = useState<InvitationDetails>(defaultDetails);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}

      <MusicPlayer />
      <EditPanel details={details} onSave={setDetails} />

      <div className={`transition-opacity duration-1000 ${introComplete ? "opacity-100" : "opacity-0"}`}>
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(43 72% 52%) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <InvitationCard details={details} />

        <div className="w-20 h-px mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <RSVPForm />

        <div className="w-20 h-px mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <ShareSection />

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
