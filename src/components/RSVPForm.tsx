import { useState, useRef, useEffect } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const RSVPForm = () => {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (attending === null) { toast.error("Please select your attendance"); return; }
    setSubmitted(true);
    toast.success("Thank you for your RSVP!");
  };

  return (
    <section id="rsvp" className="py-20 px-4">
      <div
        ref={ref}
        className={`max-w-md mx-auto transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <h2 className="font-display text-3xl sm:text-4xl text-center gold-text-gradient mb-2">
          Répondez S'il Vous Plaît
        </h2>
        <p className="font-body text-center text-muted-foreground mb-8 text-sm tracking-widest uppercase">
          Kindly respond by November 20th, 2025
        </p>

        {submitted ? (
          <div className="text-center py-12 space-y-4 float-up">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="text-primary" size={28} />
            </div>
            <p className="font-display text-xl text-foreground">Thank You, {name}!</p>
            <p className="font-body text-muted-foreground">
              {attending ? "We can't wait to celebrate with you!" : "We'll miss you, but thank you for letting us know."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-body text-sm text-muted-foreground tracking-wide block mb-2">Your Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="bg-card/50 border-primary/20 focus:border-primary font-body"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground tracking-wide block mb-3">Will you attend?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`py-3 px-4 rounded-lg border font-display text-sm tracking-wide transition-all duration-300 ${
                    attending === true
                      ? "bg-primary/15 border-primary text-primary shadow-md"
                      : "border-border hover:border-primary/40 text-muted-foreground"
                  }`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`py-3 px-4 rounded-lg border font-display text-sm tracking-wide transition-all duration-300 ${
                    attending === false
                      ? "bg-primary/15 border-primary text-primary shadow-md"
                      : "border-border hover:border-primary/40 text-muted-foreground"
                  }`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gold-gradient text-primary-foreground font-display tracking-wider py-6 text-base hover:opacity-90 transition-opacity"
            >
              <Send size={16} className="mr-2" />
              Send RSVP
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RSVPForm;
