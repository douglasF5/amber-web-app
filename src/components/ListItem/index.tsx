import s from './styles.module.scss';
import { Episode } from '../../pages';
import { Play, ChevronUpMini, AudioBars } from '../Icons';
import Image from 'next/image';

//TYPES AND INTERFACES
type ListItemProps = {
    data: Episode;
    isCollapsed: boolean;
    isPlaying: boolean;
    handlePlay: () => void;
    handleExpand: () => void;
}

//COMPONENT DEFINITION
export function ListItem({
    data,
    isCollapsed,
    isPlaying,
    handlePlay,
    handleExpand
}: ListItemProps) {

    //HELPER VARIABLES AND FUNCTIONS
    const i = {
        size: 20,
        color: isCollapsed
            ? 'var(--c-amber-accent-primary)'
            : 'var(--c-amber-on-accent-container-primary)'
    };
    const isPlayingClass = isPlaying ? s.isPlayingClass : '';
    const isCollapsedClass = isCollapsed ? s.isCollapsedClass : '';

    //COMPONENT RETURN
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
                            <Image src={data.thumbnail} layout='fill' objectFit='cover' objectPosition='left' alt={data.title}/>
                        </div>
                        <h3>{data.title}</h3>
                        <span className={`${isPlayingClass} ${isCollapsedClass}`}>{data.publishedAt} · {data.members}</span>
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
                    <button type='button' className={`${s.seeLessButton} ${isPlayingClass}`} onClick={handleExpand}>
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