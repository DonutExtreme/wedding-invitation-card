import { useState } from "react";
import { Pencil, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { InvitationDetails } from "@/types/invitation";

interface EditPanelProps {
  details: InvitationDetails;
  onSave: (details: InvitationDetails) => void;
}

const EditPanel = ({ details, onSave }: EditPanelProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<InvitationDetails>(details);

  const handleOpen = () => {
    setForm(details);
    setOpen(true);
  };

  const handleSave = () => {
    onSave(form);
    setOpen(false);
    toast.success("Invitation details updated!");
  };

  const update = (key: keyof InvitationDetails, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Floating edit button */}
      <button
        onClick={handleOpen}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
        aria-label="Edit invitation"
      >
        <Pencil size={18} />
      </button>

      {/* Slide-out panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-card border-l border-primary/15 h-full overflow-y-auto p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl gold-text-gradient">Edit Invitation</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              {([
                { key: "brideFirst" as const, label: "Bride's Name" },
                { key: "groomFirst" as const, label: "Groom's Name" },
                { key: "date" as const, label: "Date" },
                { key: "time" as const, label: "Time" },
                { key: "venue" as const, label: "Venue" },
                { key: "message" as const, label: "Invitation Message" },
              ]).map(({ key, label }) => (
                <div key={key}>
                  <label className="font-body text-sm text-muted-foreground tracking-wide block mb-1.5">{label}</label>
                  {key === "message" ? (
                    <textarea
                      value={form[key]}
                      onChange={(e) => update(key, e.target.value)}
                      rows={3}
                      className="flex w-full rounded-md border border-primary/20 bg-card/50 px-3 py-2 text-sm font-body focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                    />
                  ) : (
                    <Input
                      value={form[key]}
                      onChange={(e) => update(key, e.target.value)}
                      className="bg-card/50 border-primary/20 focus:border-primary font-body"
                    />
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={handleSave}
              className="w-full mt-8 gold-gradient text-primary-foreground font-display tracking-wider py-5 hover:opacity-90 transition-opacity"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPanel;
