import s from './styles.module.scss';
import Image from 'next/image';
import CoverPlaceholder from '../../../public/podcast-cover-placeholder-L.png';
import { PlayerControls } from '../PlayerControls';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';

//COMPONENT DEFINITION
export function PlayerSidebar() {
    const { episodesList, currentEpisodeIndex } = useContext(PlayerContext);
    const episode = episodesList[currentEpisodeIndex];

    //COMPONENT RETURN
    return (
        <aside className={s.sidebarContainer}>
            <div className={s.contentInfoWrapper}>
                <div className={s.coverWrapper}>
                    <Image src={CoverPlaceholder} alt='Podcast cover'/>
                </div>
                <div className={s.textInfoWrapper}>
                    <h2>{episode?.title}</h2>
                    <p>{episode?.members}</p>
                </div>
            </div>
            <PlayerControls />
        </aside>
    );
}