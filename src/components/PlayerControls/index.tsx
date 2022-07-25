import s from './styles.module.scss';
import { Shuffle, PlayPrevious, Play, PlayNext, Repeat, Pause } from '../Icons';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import { usePlayer } from '../../contexts/PlayerContext';

import 'rc-slider/assets/index.css';

//COMPONENT DEFINITION
export function PlayerControls() {
    const i = {
        size: 24,
        color: 'var(--c-amber-accent-primary)'
    };

    const audioRef = useRef<HTMLAudioElement>(null);

    const {
		episodesList,
		currentEpisodeIndex,
		isPlaying,
        hasPrevious,
        hasNext,
        isShuffleOn,
		togglePlay,
		setPlayingState, 
        playNext,
        playPrevious,
        toggleShuffle
	} = usePlayer();
    const episode = episodesList[currentEpisodeIndex];
    
    const [sliderValue, setSliderValue] = useState(0);

    function handleSliderProgress(value) {
        setSliderValue(value);
    }

	useEffect(() => {
		if(!audioRef.current) {
			return;
		}

		if(isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}

	}, [isPlaying]);

    //COMPONENT RETURN
    return (
        <div
            className={`${s.playerControlsWrapper} ${
                !episode ? s.disabledControls : ""
            }`}>
            {
				episode && (
					<audio
						src={episode.url}
						autoPlay
						ref={audioRef}
						onPlay={() => setPlayingState(true)}
						onPause={() => setPlayingState(false)}
					/>
				)
			}
            <div className={s.playerProgress}>
                <span>00:00</span>
                <Slider
                    trackStyle={{
                        backgroundColor: "var(--c-amber-accent-primary)",
                    }}
                    railStyle={{
                        backgroundColor:
                            "var(--c-amber-over-accent-container-secondary)",
                    }}
                    handleStyle={{
                        backgroundColor: "var(--c-amber-accent-primary)",
                        borderWidth: 0,
                        opacity: "100%",
                        width: 12,
                        height: 12,
                        marginTop: -4,
                        outline: "none",
                        boxShadow: "0px 0px 0px 0px transparent",
                    }}
                    value={episode ? sliderValue : null}
                    // onChange={setSliderValue}
                />
                <span>00:00</span>
            </div>
            <div className={s.controlsWrapper}>
                <button
                    type="button"
                    className={`${s.toggleButton} ${isShuffleOn ? s.selectedButton : ''}`}
                    disabled={!episode}
                    onClick={toggleShuffle}
                >
                    <Shuffle width={i.size} height={i.size} color={i.color} />
                </button>
                <button
                    type="button"
                    className={s.nextPreviousButton}
                    disabled={!episode || !hasPrevious}
                    onClick={playPrevious}
                >
                    <PlayPrevious
                        width={i.size}
                        height={i.size}
                        color={i.color}
                    />
                </button>
                <button
                    type="button"
                    className={s.playPauseButton}
                    disabled={!episode}
					onClick={togglePlay}
                >
                    {isPlaying ? (
                        <Pause width={i.size} height={i.size} color={i.color} />
                    ) : (
                        <Play width={i.size} height={i.size} color={i.color} />
                    )}
                </button>
                <button
                    type="button"
                    className={s.nextPreviousButton}
                    disabled={!episode || !hasNext}
                    onClick={playNext}
                >
                    <PlayNext width={i.size} height={i.size} color={i.color} />
                </button>
                <button
                    type="button"
                    className={s.toggleButton}
                    disabled={!episode}>
                    <Repeat width={i.size} height={i.size} color={i.color} />
                </button>
            </div>
        </div>
    );
}