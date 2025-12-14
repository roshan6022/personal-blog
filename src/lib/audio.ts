"use client";

import { useRef } from "react";

export function useClickSound(src = "/audio/click.mp3", volume = 0.4) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = volume;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return play;
}
