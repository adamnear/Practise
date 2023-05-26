import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import Weather from './Weather';
import AppClock from './AppClock';
import tofinoImg from './Images/tofino.png';
import tranquiloImg from './Images/tranquilo.png';
import tofino from './Audio/Tofino.mp3';
import tranquilo from './Audio/Tranquilo.mp3';
import wave from './Audio/waves.wav';
import waterfall from './Audio/waterfall.wav';

export default function App() {
  const [musicSrc, setMusicSrc] = useState(tofino);
  const [musicImgSrc, setMusicImgSrc] = useState(tofinoImg);
  const [natureSrc, setNatureSrc] = useState(null);
  const [localTime, setLocalTime] = useState('');

  const handleMusicChange = (event) => {
    const audioName = event.target.value;
    switch (audioName) {
      case 'tofino':
        setMusicSrc(tofino);
        setMusicImgSrc(tofinoImg);
        break;
      case 'tranquilo':
        setMusicSrc(tranquilo);
        setMusicImgSrc(tranquiloImg);
        break;
      default:
        break;
    }
  };

  const handleNatureChange = (event) => {
    const audioName = event.target.value;
    switch (audioName) {
      case 'wave' :
        setNatureSrc(wave);
        break;
      case 'waterfall' :
        setNatureSrc(waterfall);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="section left-section">
        <img id="Img" src={musicImgSrc} alt="Img" />
      </div>
      
      <div className="section right-section">
        <select onChange={handleMusicChange}>
        <option value="">Choose a song...</option>
        <option value="tofino">Tofino</option>
        <option value="tranquilo">Tranquilo</option> 
      </select>
      <AudioPlayer audioSrc={musicSrc} imgSrc={musicImgSrc} />
      </div>
      
    
      <select onChange={handleNatureChange}>
        <option value="">Choose a nature sound...</option>
          <option value="wave">Waves</option>
          <option value="waterfall">Waterfall</option>
      </select>
      <AudioPlayer audioSrc={natureSrc} />

      <Weather />

      <AppClock localTime={localTime} setLocalTime={setLocalTime} />

    </div>
  );
}