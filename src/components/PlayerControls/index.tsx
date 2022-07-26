import s from './styles.module.scss';
import { Shuffle, PlayPrevious, Play, PlayNext, Autoplay, Pause } from '../Icons';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

import 'rc-slider/assets/index.css';

//COMPONENT DEFINITION
export function PlayerControls() {
    const i = {
        size: 24,
        color: 'var(--c-amber-accent-primary)'
    };

    const {
		episodesList,
		currentEpisodeIndex,
		isPlaying,
        hasPrevious,
        hasNext,
        isShuffleOn,
        isAutoPlayOn,
		togglePlay,
		setPlayingState, 
        playNext,
        playPrevious,
        toggleShuffle,
        toggleAutoPlay,
        clearPlayerState
	} = usePlayer();

    const audioRef = useRef<HTMLAudioElement>(null);
    const episode = episodesList[currentEpisodeIndex];
    const [progress, setProgress] = useState(0);

    function setUpProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));

            if(audioRef.current.currentTime === episode.duration){
                handleAudioEnded();
            }
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleAudioEnded() {
        console.log('Audio ended.');

        if(isAutoPlayOn) {
            playNext();
        } else {
            setPlayingState(false);
            audioRef.current.currentTime = 0;
            setProgress(0);
        }
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
                        onLoadedMetadata={setUpProgressListener}
					/>
				)
			}
            <div className={s.playerProgress}>
                <span>{convertDurationToTimeString(progress)}</span>
                <Slider
                    max={episode?.duration ?? 0}
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
                    className={s.slider}
                    value={progress}
                    onChange={handleSeek}
                />
                <span>{episode?.durationAsString ?? '00:00:00'}</span>
            </div>
            <div className={s.controlsWrapper}>
                <Tippy content={`Shuffle ${isShuffleOn ? 'on' : 'off'}`} distance={8} arrow={false} placement='bottom'>
                    <button
                        type="button"
                        className={`${s.toggleButton} ${isShuffleOn ? s.selectedButton : ''}`}
                        disabled={!episode}
                        onClick={toggleShuffle}
                    >
                        <Shuffle width={i.size} height={i.size} color={i.color} />
                    </button>
                </Tippy>
                <Tippy content='Play previous' distance={8} arrow={false} placement='bottom'>
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
                </Tippy>
                <Tippy content={`${isPlaying ? 'Pause' : 'Play'}`} distance={8} arrow={false} placement='bottom'>
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
                </Tippy>
                <Tippy content='Play next' distance={8} arrow={false} placement='bottom'>
                    <button
                        type="button"
                        className={s.nextPreviousButton}
                        disabled={!episode || !hasNext}
                        onClick={playNext}
                    >
                        <PlayNext width={i.size} height={i.size} color={i.color} />
                    </button>
                </Tippy>
                <Tippy content={`Auto play ${isAutoPlayOn ? 'on' : 'off'}`} distance={8} arrow={false} placement='bottom'>
                    <button
                        type="button"
                        className={`${s.toggleButton} ${isAutoPlayOn ? s.selectedButton : ''}`}
                        disabled={!episode}
                        onClick={toggleAutoPlay}
                    >
                        <Autoplay width={i.size} height={i.size} color={i.color} />
                    </button>
                </Tippy>
            </div>
        </div>
    );
}