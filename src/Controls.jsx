import React from "react";
import Next from './assets/Next';
import Play from './assets/Play';
import Prev from "./assets/Prev";
import Pause from "./assets/Pause";

function Controls({
    isPlaying,
    onPlayPauseClick,
    onPrevClick,
    onNextClick
}) {
    return (
        <>
            <button
                type="button"
                title="Prev"
                aria-label="Previous"
                onClick={onPrevClick}
                className="lg:h-16 lg:w-16 md:h-16 md:w-16 h-12 w-12 glass2 text-center flex items-center justify-center btn rounded-full">
                <Prev />
            </button>


            {isPlaying ? (<button
                type="button"
                title="Pause"
                onClick={() => onPlayPauseClick(false)}
                aria-label="Pause"
                className="lg:h-20 lg:w-20 md:h-20 md:w-20 h-14 w-14 glass2 btn rounded-full flex items-center justify-center">
                <Pause />
            </button>
            ) : (
                <button
                    type="button"
                    title="Play"
                    onClick={() => onPlayPauseClick(true)}
                    aria-label="Play"
                    className="lg:h-20 lg:w-20 md:h-20 md:w-20 h-14 w-14 glass2 btn rounded-full flex items-center justify-center">
                    <Play />
                </button>
            )}


            <button
                type="button"
                title="Next"
                aria-label="Next"
                onClick={onNextClick} className="lg:h-16 lg:w-16 md:h-16 md:w-16 h-12 w-12 glass2 btn rounded-full flex items-center justify-center">
                <Next />
            </button>
        </>
    );
}
export default Controls;