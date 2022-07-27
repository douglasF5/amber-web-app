import s from './styles.module.scss';
import Image from 'next/image';
import { PlayerControls } from '../PlayerControls';
import { usePlayer } from '../../contexts/PlayerContext';
import { ChevronUp } from '../Icons';

//COMPONENT DEFINITION
export function PlayerFloating() {
    const { episodesList, currentEpisodeIndex } = usePlayer();
    const episode = episodesList[currentEpisodeIndex];

    const i = {
        size: 20,
        color: 'var(--c-amber-on-accent-container-primary)'
    };

    //COMPONENT RETURN
    return (
        <aside className={s.floatingContainer}>
            <div className={s.coverWrapper}>
                <Image
                    src={`${episode?.thumbnail || '/podcast-cover-placeholder-L.png'}`}
                    alt={`${episode?.title || 'Podcast cover'}`}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='left'
                    priority={true}
                />
            </div>
            <div className={s.contentInfoWrapper}>
                <div>
                    <h2>{`${episode?.title || 'Select a podcast to start listening'}`}</h2>
                </div>
                <button
                        type="button"
                        className={`${s.toggleFloatingState}`}
                        // onClick={}
                    >
                        <ChevronUp width={i.size} height={i.size} color={i.color} />
                </button>
            </div>
            <PlayerControls theme='inverted'/>
        </aside>
    );
}