import s from './styles.module.scss';
import Image from 'next/image';
import { PlayerControls } from '../PlayerControls';
import { usePlayer } from '../../contexts/PlayerContext';
import { ChevronUp } from '../Icons';
import { motion, useAnimationControls, MotionConfig, useDragControls } from 'framer-motion';
import { RefObject } from 'react';

type PlayerFloatingProps = {
    dragContraints: RefObject<HTMLElement>;
}


//ANIMTAION VARIANTS
const container = {
    expanded: {
        height: 'auto'
    },
    collapsed: {
        height: 83
    }
}

const playerControls = {
    expanded: {
        y: 0
    },
    collapsed: {
        y: '40%'
    }
}

const title = {
    expanded: {
        y: 0,
        alignItems: 'flex-start'
    },
    collapsed: {
        y: '50%',
        alignItems: 'center'
    }
}

//COMPONENT DEFINITION
export function PlayerFloating({ dragContraints }: PlayerFloatingProps) {
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
    };

    const playerStateClass = isPlayerCollapsed ? s.isCollapsedClass : '';

    const controls = useAnimationControls();

    function expandPlayer() {

        if(isPlayerCollapsed) {
            controls.start('expanded');
        } else {
            controls.start('collapsed');
        }

        toggleIsPlayerCollapsed();
    }

    const dragControls = useDragControls();
    function startDrag(event) {
        dragControls.start(event);
    }

    //COMPONENT RETURN
    return (
        <MotionConfig transition={{ duration: 0.2, type: "tween" }}>
            <motion.aside
                variants={container}
                animate={controls}
                drag='x'
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={dragContraints}
                dragMomentum={false}
                className={s.floatingContainer}
            >
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
                <motion.div
                    variants={title}
                    animate={controls}
                    className={s.contentInfoWrapper}
                    onPointerDown={startDrag}
                >
                    <h2 className={`${playerStateClass}`}>
                        {`${episode?.title || 'Select a podcast to start listening'}`}
                    </h2>
                    <button
                        type="button"
                        className={`${s.toggleFloatingState} ${s.inverted}`}
                        onClick={expandPlayer}
                    >
                        <ChevronUp width={i.size} height={i.size} color={i.color} style={{
                            transform: `${isPlayerCollapsed ? 'rotate(0)' : 'rotate(180deg)'}`
                        }} />
                    </button>
                </motion.div>
                <motion.div
                    variants={playerControls}
                    animate={controls}

                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >
                    <PlayerControls theme='inverted'/>
                </motion.div>
            </motion.aside>
        </MotionConfig>
    );
}