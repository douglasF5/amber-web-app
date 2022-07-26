import s from './styles.module.scss';
import Image from 'next/image';
import { PlayerControls } from '../PlayerControls';
import { usePlayer } from '../../contexts/PlayerContext';

//COMPONENT DEFINITION
export function PlayerSidebar() {
    const { episodesList, currentEpisodeIndex } = usePlayer();
    const episode = episodesList[currentEpisodeIndex];

    //COMPONENT RETURN
    return (
        <aside className={s.sidebarContainer}>
            <div className={s.contentInfoWrapper}>
                <div className={s.coverWrapper}>
                    <Image
                        src={`${episode?.thumbnail || '/podcast-cover-placeholder-L.png'}`}
                        alt={`${episode?.title || 'Podcast cover'}`}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='left'
                        priority
                    />
                </div>
                <div className={s.textInfoWrapper}>
                    <div>
                        <h2>{`${episode?.title || 'Select a podcast to start listening'}`}</h2>
                    </div>
                    <p>{episode?.members}</p>
                </div>
            </div>
            <PlayerControls />
        </aside>
    );
}