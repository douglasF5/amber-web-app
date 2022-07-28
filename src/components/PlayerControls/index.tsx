import s from './styles.module.scss';
import { Shuffle, PlayPrevious, Play, PlayNext, Autoplay, Pause } from '../Icons';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';

import 'rc-slider/assets/index.css';

type PlayerControlProps = {
    theme: 'default' | 'inverted';
}

//COMPONENT DEFINITION
export function PlayerControls({ theme }: PlayerControlProps) {
    const i = {
        size: 24,
        color: theme === 'default' ? 'var(--c-amber-accent-container-primary)' : 'var(--c-amber-on-accent-container-primary)'
    };
    const b = {
        bgColor: theme === 'inverted' ? s.inverted : ''
    }
    const sliderStyles = {
        trackColor: theme === 'default' ? 'var(--c-amber-accent-primary)' : 'var(--c-amber-on-accent-container-primary)',
        railColor: theme === 'default' ? 'var(--c-amber-over-accent-container-secondary)' : 'var(--c-amber-over-accent-container-primary-secondary)',
        handleColor: theme === 'default' ? 'var(--c-amber-accent-primary)' : 'var(--c-amber-on-accent-container-primary)'
    }

    const {
		episodesList,
		currentEpisodeIndex,
		isPlaying,
        hasPrevious,
        hasNext,
        isShuffleOn,
        isAutoPlayOn,
        progress,
		togglePlay,
        playNext,
        playPrevious,
        toggleShuffle,
        toggleAutoPlay,
        handleSeek
	} = usePlayer();

    const episode = episodesList[currentEpisodeIndex];

    //COMPONENT RETURN
    return (
        <div
            className={`${s.playerControlsWrapper} ${
                !episode ? s.disabledControls : ""
            }`}>
            <div className={s.playerProgress} data-theme={theme}>
                <span>{convertDurationToTimeString(progress)}</span>
                <Slider
                    max={episode?.duration ?? 0}
                    trackStyle={{
                        backgroundColor: sliderStyles.trackColor,
                    }}
                    railStyle={{
                        backgroundColor: sliderStyles.railColor,
                    }}
                    handleStyle={{
                        backgroundColor: sliderStyles.handleColor,
                        borderWidth: 0,
                        opacity: "100%",
                        width: 12,
                        height: 12,
                        marginTop: -4,
                        outline: "none",
                        boxShadow: "0px 0px 0px 0px transparent",
                    }}
                    className={`${s.slider} ${theme === 'inverted' ? 'inverted' : ''}`}
                    value={progress}
                    onChange={handleSeek}
                />
                <span>{episode?.durationAsString ?? '00:00:00'}</span>
            </div>
            <div className={s.controlsWrapper}>
                <Tippy content={`Shuffle ${isShuffleOn ? 'on' : 'off'}`} distance={8} arrow={false} placement='bottom'>
                    <button
                        type="button"
                        className={`${s.toggleButton} ${isShuffleOn ? s.selectedButton : ''} ${b.bgColor}`}
                        disabled={!episode}
                        onClick={toggleShuffle}
                    >
                        <Shuffle width={i.size} height={i.size} color={i.color} />
                    </button>
                </Tippy>
                <Tippy content='Play previous' distance={8} arrow={false} placement='bottom'>
                    <button
                        type="button"
                        className={`${s.nextPreviousButton} ${b.bgColor}`}
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
                        className={`${s.playPauseButton} ${b.bgColor}`}
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
                        className={`${s.nextPreviousButton} ${b.bgColor}`}
                        disabled={!episode || !hasNext}
                        onClick={playNext}
                    >
                        <PlayNext width={i.size} height={i.size} color={i.color} />
                    </button>
                </Tippy>
                <Tippy content={`Auto play ${isAutoPlayOn ? 'on' : 'off'}`} distance={8} arrow={false} placement='bottom'>
                    <button
                        type="button"
                        className={`${s.toggleButton} ${isAutoPlayOn ? s.selectedButton : ''} ${b.bgColor}`}
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