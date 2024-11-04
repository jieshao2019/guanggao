import { useEffect, useRef } from 'react';
import { useSettings } from './useSettings';

interface GameSounds {
  bgm: HTMLAudioElement;
  shoot: HTMLAudioElement;
  hit: HTMLAudioElement;
  powerUp: HTMLAudioElement;
  gameOver: HTMLAudioElement;
  victory: HTMLAudioElement;
}

export function useGameSound() {
  const { settings } = useSettings();
  const soundsRef = useRef<GameSounds>();

  useEffect(() => {
    // Initialize sounds
    soundsRef.current = {
      bgm: new Audio('/sounds/bgm.mp3'),
      shoot: new Audio('/sounds/shoot.mp3'),
      hit: new Audio('/sounds/hit.mp3'),
      powerUp: new Audio('/sounds/power-up.mp3'),
      gameOver: new Audio('/sounds/game-over.mp3'),
      victory: new Audio('/sounds/victory.mp3'),
    };

    // Configure BGM
    if (soundsRef.current.bgm) {
      soundsRef.current.bgm.loop = true;
      soundsRef.current.bgm.volume = 0.3;
    }

    // Cleanup
    return () => {
      if (soundsRef.current) {
        Object.values(soundsRef.current).forEach(sound => {
          sound.pause();
          sound.currentTime = 0;
        });
      }
    };
  }, []);

  // Update sound state based on settings
  useEffect(() => {
    if (!soundsRef.current) return;

    Object.values(soundsRef.current).forEach(sound => {
      sound.muted = !settings?.soundEnabled;
    });

    if (settings?.soundEnabled) {
      soundsRef.current.bgm.play().catch(() => {
        // Autoplay might be blocked
      });
    } else {
      soundsRef.current.bgm.pause();
    }
  }, [settings?.soundEnabled]);

  const playSound = (type: keyof GameSounds) => {
    if (!soundsRef.current || !settings?.soundEnabled) return;

    const sound = soundsRef.current[type];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Handle playback error
      });
    }
  };

  const stopSound = (type: keyof GameSounds) => {
    if (!soundsRef.current) return;

    const sound = soundsRef.current[type];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  };

  const stopAllSounds = () => {
    if (!soundsRef.current) return;

    Object.values(soundsRef.current).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  };

  return {
    playSound,
    stopSound,
    stopAllSounds,
  };
}