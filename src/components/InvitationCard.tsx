import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, CalendarDays, Heart } from "lucide-react";
import ornamentBorder from "@/assets/ornament-border.png";

interface InvitationDetails {
  brideFirst: string;
  groomFirst: string;
  date: string;
  time: string;
  venue: string;
  message: string;
}

const defaultDetails: InvitationDetails = {
  brideFirst: "Isabella",
  groomFirst: "Alexander",
  date: "Saturday, December 20th, 2025",
  time: "Four O'Clock in the Afternoon",
  venue: "The Grand Palace Ballroom, Beverly Hills",
  message: "Together with their families, request the pleasure of your company at the celebration of their marriage",
};

const AnimatedText = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Divider = () => (
  <div className="flex items-center justify-center gap-3 my-6">
    <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-primary/40" />
    <Heart size={14} className="text-primary fill-primary/30" />
    <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-primary/40" />
  </div>
);

const InvitationCard = () => {
  const details = defaultDetails;

  return (
    <section id="invitation" className="relative min-h-screen flex items-center justify-center py-12 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(43 72% 52% / 0.3), transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-lg mx-auto">
        {/* Ornament frame */}
        <img src={ornamentBorder} alt="" className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none" />

        <div className="relative bg-card/60 backdrop-blur-sm border border-primary/15 rounded-lg p-8 sm:p-12 shadow-2xl"
          style={{ boxShadow: "0 25px 60px -15px hsl(43 72% 52% / 0.15)" }}>
          
          <AnimatedText className="text-center">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">Together with their families</p>
          </AnimatedText>

          <AnimatedText delay={200} className="text-center mt-6">
            <h1 className="font-script text-5xl sm:text-7xl gold-text-gradient leading-tight">
              {details.brideFirst}
            </h1>
          </AnimatedText>

          <AnimatedText delay={400} className="text-center my-2">
            <span className="font-display text-xl text-primary/60 italic">&amp;</span>
          </AnimatedText>

          <AnimatedText delay={600} className="text-center">
            <h1 className="font-script text-5xl sm:text-7xl gold-text-gradient leading-tight">
              {details.groomFirst}
            </h1>
          </AnimatedText>

          <AnimatedText delay={800}>
            <Divider />
          </AnimatedText>

          <AnimatedText delay={900} className="text-center">
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {details.message}
            </p>
          </AnimatedText>

          <AnimatedText delay={1100}>
            <Divider />
          </AnimatedText>

          <AnimatedText delay={1200} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <CalendarDays size={16} className="text-primary" />
              <span className="font-display text-lg tracking-wide">{details.date}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Clock size={16} className="text-primary" />
              <span className="font-body text-base">{details.time}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-foreground">
              <MapPin size={16} className="text-primary" />
              <span className="font-body text-base">{details.venue}</span>
            </div>
          </AnimatedText>

          <AnimatedText delay={1400}>
            <Divider />
          </AnimatedText>

          <AnimatedText delay={1500} className="text-center">
            <p className="font-body text-sm text-muted-foreground italic tracking-wide">
              Dinner &amp; Dancing to Follow
            </p>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};

export default InvitationCard;
