import s from './styles.module.scss';
import { Shuffle, PlayPrevious, Play, PlayNext, Repeat } from '../Icons';

export function PlayerControls() {
    const i = {
        size: 24,
        color: 'var(--c-amber-accent-primary)'
    };

    return (
        <div className={s.playerControlsWrapper}>
            <div className={s.playerProgress}>
                <span>00:00</span>
                <input type="range" />
                <span>00:00</span>
            </div>
            <div className={s.controlsWrapper}>
                <button type='button' className={s.toggleButton}>
                    <Shuffle width={i.size} height={i.size} color={i.color}/>
                </button>
                <button type='button' className={s.nextPreviousButton}>
                    <PlayPrevious width={i.size} height={i.size} color={i.color}/>
                </button>
                <button type='button' className={s.playPauseButton}>
                    <Play width={i.size} height={i.size} color={i.color}/>
                </button>
                <button type='button' className={s.nextPreviousButton}>
                    <PlayNext width={i.size} height={i.size} color={i.color}/>
                </button>
                <button type='button' className={s.toggleButton}>
                    <Repeat width={i.size} height={i.size} color={i.color}/>
                </button>
            </div>
        </div>
    );
}