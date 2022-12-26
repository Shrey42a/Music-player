import React, { useState, useEffect, useRef } from 'react'
import Controls from './Controls';
import Footer from './Footer';
import Navbar from './Navbar';

function App({ tracks }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, artist, image, audioSrc, album, track } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

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

      <div onContextMenu="return false;" class="bg1 space-y-2 lg:px-0 md:px-2 h-screen w-full flex flex-col justify-center items-center">
        <Navbar />
        <div onContextMenu="return false;" class="glass shadow-md shadow-zinc-700 h-4/5 mt-1 w-full md:w-4/5 lg:p-2 md:h-4/5 lg:h-4/5 lg:w-1/2">
          <div onContextMenu="return false;" class="h-2/3 w-full flex md:flex-row lg:flex-row flex-col lg:p-2">
            <div onContextMenu="return false;" class="lg:w-1/2 md:w-1/2 p-2 md:h-full w-full h-2/3 lg:h-full">
              <img src={image} class="h-full rounded-2xl w-full shadow-lg transition ease-in-out hover:scale-110 shadow-zinc-900" />
            </div>
            <div onContextMenu="return false;" class="ml-2 lg:ml-0 md:ml-0 lg:w-1/2 items-start flex lg:pt-2 md:pt-2 flex-col lg:space-y-4 md:w-1/2 md:h-full w-full h-1/3 lg:h-full">
              <h1 class="text-xl lg:text-2xl md:text-3xl font-semibold text-zinc-800">Title: {title}</h1>
              <h1 class="text-xl lg:text-2xl md:text-3xl font-semibold text-zinc-800">Artist: {artist}</h1>
              <h1 class="text-xl lg:text-2xl md:text-3xl font-semibold text-zinc-800">Album: {album}</h1>
              <h1 class="text-xl lg:text-2xl md:text-3xl font-semibold text-zinc-800">Track: {track}</h1>
            </div>
          </div>
          <div onContextMenu="return false;" class="h-1/3 w-full py-2 pt-8">
            <div onContextMenu="return false;" class=" flex items-center justify-center space-x-4 h-2/3 w-full">
              <Controls
                isPlaying={isPlaying}
                onPrevClick={toPrevTrack}
                onNextClick={toNextTrack}
                onPlayPauseClick={setIsPlaying} />
            </div>
            <div onContextMenu="return false;" class=" h-1/3 w-full pt-2 flex justify-center items-center">
              <input
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                type="range"
                class="w-4/5 h-full mt-2"
                onChange={(e) => onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
