import s from './styles.module.scss';
import Image from 'next/image';
import { PlayerControls } from '../PlayerControls';
import { usePlayer } from '../../contexts/PlayerContext';
import { ChevronUp } from '../Icons';
import { AnimatePresence, motion } from 'framer-motion';

//COMPONENT DEFINITION
export function PlayerFloating() {
    const {
        episodesList,
        currentEpisodeIndex,
        isPlayerCollapsed,
        toggleIsPlayerCollapsed
    } = usePlayer();
    const episode = episodesList[currentEpisodeIndex];

    const i = {
        size: 20,
        color: 'var(--c-amber-on-accent-container-primary)',
        flipped: isPlayerCollapsed ? s.flipped : ''
    };

    //COMPONENT RETURN
    return (
        <motion.aside
            // animate={{height}}
            className={s.floatingContainer}
        >
            {
                isPlayerCollapsed
                &&  <div className={s.coverWrapper}>
                        <Image
                            src={`${episode?.thumbnail || '/podcast-cover-placeholder-L.png'}`}
                            alt={`${episode?.title || 'Podcast cover'}`}
                            layout='fill'
                            objectFit='cover'
                            objectPosition='left'
                            priority={true}
                        />
                    </div>
            }
            
            <div className={s.contentInfoWrapper}>
                <div>
                    <h2>{`${episode?.title || 'Select a podcast to start listening'}`}</h2>
                </div>
                <button
                        type="button"
                        className={`${s.toggleFloatingState} ${s.inverted}`}
                        onClick={toggleIsPlayerCollapsed}
                    >
                        <ChevronUp width={i.size} height={i.size} color={i.color} className={i.flipped} />
                </button>
            </div>
            <AnimatePresence>
                <motion.div
                    key={String(isPlayerCollapsed)}

                    animate={{
                        translateY: isPlayerCollapsed && '80%'
                    }}

                    exit={{
                        translateY: 0
                    }}

                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >
                    <PlayerControls theme='inverted'/>
                </motion.div>
            </AnimatePresence>
        </motion.aside>
    );
}