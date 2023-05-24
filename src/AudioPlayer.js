import React, { useState, useRef } from 'react';

export default function AudioPlayer({ audioSrc, imgSrc }) {
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleToggle = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioSrc}
        onPlay={handlePlay}
        onPause={handlePause}
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
      <button onClick={handleToggle}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  
  );
}
