import s from './styles.module.scss';
import Image from 'next/image';
import { PlayerControls } from '../PlayerControls';
import { usePlayer } from '../../contexts/PlayerContext';
import { motion, AnimatePresence } from 'framer-motion';

//COMPONENT DEFINITION
export function PlayerSidebar() {
    const { episodesList, currentEpisodeIndex } = usePlayer();
    const episode = episodesList[currentEpisodeIndex];

    //COMPONENT RETURN
    return (
        <motion.aside className={s.sidebarContainer} initial={{x: 50}} animate={{x: 0}}>
            <div className={s.contentInfoWrapper}>
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
                <div className={s.textInfoWrapper}>
                    <h2>{`${episode?.title || 'Select a podcast to start listening'}`}</h2>
                    <p>{episode?.members}</p>
                </div>
            </div>
            <PlayerControls theme='default' />
        </motion.aside>
    );
}