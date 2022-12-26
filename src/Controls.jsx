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
                className="prev"
                aria-label="Previous"
                onClick={onPrevClick}
                class="h-16 w-16 glass2 text-center flex items-center justify-center btn rounded-full">
                <Prev />
            </button>


            {isPlaying ? (<button
                type="button"
                onClick={() => onPlayPauseClick(false)}
                aria-label="Pause"
                class="h-20 w-20 glass2 btn rounded-full flex items-center justify-center">
                <Pause />
            </button>
            ) : (
                <button
                    type="button"
                    onClick={() => onPlayPauseClick(true)}
                    aria-label="Play"
                    class="h-20 w-20 glass2 btn rounded-full flex items-center justify-center">
                    <Play />
                </button>
            )}


            <button
                type="button"
                aria-label="Next"
                onClick={onNextClick} class="h-16 w-16 glass2 btn rounded-full flex items-center justify-center">
                <Next />
            </button>
        </>
    );
}
export default Controls;