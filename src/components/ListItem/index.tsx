import s from './styles.module.scss';
import { Episode } from '../../pages';
import { Play, ChevronUpMini, AudioBars } from '../Icons';
import Image from 'next/image';

type ListItemProps = {
    data: Episode;
    isCollapsed: boolean;
    isPlaying: boolean;
    handlePlay: () => void;
    handleExpand: () => void;
}

export function ListItem({
    data,
    isCollapsed,
    isPlaying,
    handlePlay,
    handleExpand
}: ListItemProps) {
    const i = {
        size: 20,
        color: isCollapsed
            ? 'var(--c-amber-accent-primary)'
            : 'var(--c-amber-on-accent-container-primary)'
    };

    const isPlayingClass = isPlaying ? s.isPlayingClass : '';
    const isCollapsedClass = isCollapsed ? s.isCollapsedClass : '';

    return (
        <article className={`${s.outerWrapper} ${isCollapsedClass}`}>
            <div className={`${s.contentContainer} ${isPlayingClass} ${isCollapsedClass}`}>
                <header className={isCollapsedClass}>
                    <div className={`${s.clickableArea} ${isCollapsedClass}`}>
                        <button
                            type='button'
                            className={s.expandButton}
                            onClick={handleExpand}
                        >
                            <span>Expand item</span>
                        </button>
                        <div className={s.cardCover}>
                            <Image src='/podcast-cover-placeholder-M.png' width={48} height={48} alt='Cover'/>
                        </div>
                        <h3>{data.title}</h3>
                        <span className={`${isPlayingClass} ${isCollapsedClass}`}>8 Jan 21 · {data.members}</span>
                        <time className={isPlayingClass}>{data.durationAsString}</time>
                    </div>
                    {
                        isPlaying
                        ? <div className={s.audioBarsWrapper}><AudioBars width={i.size} height={i.size} color='var(--c-amber-accent-primary)'/></div>
                        : (
                            <button
                                type='button'
                                className={isCollapsedClass ? s.playButtonSecondary : s.playButtonPrimary}
                                onClick={handlePlay}
                            >
                                <Play width={i.size} height={i.size} color={i.color}/>
                            </button>
                        )
                    }
                    
                </header>
                <div className={s.bodyWrapper}>
                    <p>{data.description}</p>
                    <button type='button' className={`${s.seeLessButton} ${isPlayingClass}`}>
                        See less
                        <ChevronUpMini
                            height={10}
                            width={10}
                            color={isPlaying ? 'var(--c-amber-accent-primary)' : 'var(--c-on-surface-primary)'}
                        />
                    </button>
                </div>
            </div>
        </article>
    );
}