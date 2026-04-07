import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Download, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ShareSection = () => {
  const [copied, setCopied] = useState(false);
  const inviteUrl = typeof window !== "undefined" ? window.location.href : "";
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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Wedding Invitation", text: "You're invited to our wedding!", url: inviteUrl });
      } catch { /* user cancelled */ }
    } else {
      copyLink();
    }
  };

  const downloadPDF = async () => {
    const invitation = document.getElementById("invitation");
    if (!invitation) return;
    try {
      toast.info("Generating PDF...");
      const canvas = await html2canvas(invitation, { scale: 2, backgroundColor: null, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("wedding-invitation.pdf");
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <section className="py-20 px-4">
      <div
        ref={ref}
        className={`max-w-md mx-auto text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <h2 className="font-display text-3xl sm:text-4xl gold-text-gradient mb-2">Share the Joy</h2>
        <p className="font-body text-muted-foreground mb-8 text-sm tracking-widest uppercase">
          Spread the love with friends &amp; family
        </p>

        {/* QR Code */}
        <div className="inline-block p-6 bg-card rounded-xl border border-primary/15 shadow-lg mb-8"
          style={{ boxShadow: "0 15px 40px -10px hsl(43 72% 52% / 0.1)" }}>
          <QRCodeSVG
            value={inviteUrl}
            size={180}
            bgColor="transparent"
            fgColor="hsl(43, 72%, 42%)"
            level="M"
          />
          <p className="font-body text-xs text-muted-foreground mt-3 tracking-wide">Scan to view invitation</p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            onClick={copyLink}
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 font-display tracking-wider text-sm py-5"
          >
            {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            onClick={shareInvite}
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 font-display tracking-wider text-sm py-5"
          >
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button
            onClick={downloadPDF}
            className="gold-gradient text-primary-foreground font-display tracking-wider text-sm py-5 hover:opacity-90 transition-opacity"
          >
            <Download size={16} className="mr-2" />
            Save PDF
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShareSection;
