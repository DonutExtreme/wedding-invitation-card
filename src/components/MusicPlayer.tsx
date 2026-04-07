import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Use a royalty-free ambient track URL placeholder
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3;
    audio.src = "https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08e0.mp3";
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (muted) {
      audioRef.current.play().catch(() => {});
      setMuted(false);
    } else {
      audioRef.current.pause();
      setMuted(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-40 p-3 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 shadow-lg"
      aria-label={muted ? "Unmute music" : "Mute music"}
    >
      {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
};

export default MusicPlayer;
