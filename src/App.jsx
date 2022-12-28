import React, { useState, useEffect, useRef } from 'react'
import Controls from './Controls';
import Footer from './Footer';
import Navbar from './Navbar';

function App({ tracks }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume1, setVolume1] = useState(1);

  const { title, artist, image, audioSrc, album, track } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  function setVolume(value) {
    clearInterval(intervalRef.current);
    audioRef.current.volume = value / 100;
    setVolume1(audioRef.current.volume);
  }


  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>

      <div className="bg1 space-y-2 lg:px-0 px-2 md:px-2 h-screen w-full flex flex-col justify-center items-center">
        <Navbar />
        <div className="glass shadow-md shadow-zinc-700 h-4/5 mt-1 w-full md:w-4/5 lg:p-2 md:h-4/5 lg:h-4/5 lg:w-1/2">
          <div className="h-2/3 w-full justify-center items-center flex md:flex-row lg:flex-row flex-col lg:p-2">
            <div className="lg:w-1/2 bx rounded-2xl overflow-hidden md:w-1/2 p-2 md:h-full mt-2 lg:mt-0 w-3/4 h-2/3 lg:h-full">
              <img src={image} className="h-full rounded-2xl w-full transition ease-in-out hover:scale-110" />
            </div>
            <div className="ml-2 lg:ml-2 md:ml-0 mt-4 lg:mt-0 lg:w-1/2 items-start items-center lg:items-start md:items-start flex lg:pt-2 md:pt-2 flex-col lg:space-y-4 md:w-1/2 md:h-full w-full h-1/3 lg:h-full">
              <h1 className="text-xl flex lg:text-2xl md:text-3xl font-semibold text-zinc-800"><span className='lg:block hidden'>Title:</span> {title}</h1>
              <h1 className="text-md flex lg:text-2xl md:text-3xl font-semibold text-zinc-800"><span className='lg:block hidden'>Artist:</span> {artist}</h1>
              <h1 className="text-md flex lg:text-2xl md:text-3xl font-semibold text-zinc-800"><span className='lg:block hidden'>Album:</span> {album}</h1>
              <h1 className="text-md flex lg:text-2xl md:text-3xl font-semibold text-zinc-800"><span className='lg:block hidden'>Track:</span> {track}</h1>
            </div>
          </div>
          <div className="h-1/3 flex flex-col w-full py-2 lg:pt-8">
            <div className="flex-col flex lg:pt-0 md:pt-0 pt-3 md:items-center items-center lg:items-center justify-center h-2/3 w-full">
              <Controls
                isPlaying={isPlaying}
                onPrevClick={toPrevTrack}
                onNextClick={toNextTrack}
                onPlayPauseClick={setIsPlaying} />
              <input
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                type="range"
                className="w-4/5 h-full mt-5"
                onChange={(e) => onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd} />
            </div>
          </div>
        </div>
        <input type="range" min="1" max="100" step={0.02} value={volume1} className="volume_slider" onChange={(e) => setVolume(e.target.value)} />
        <Footer />
      </div>
    </>
  )
}

export default App
