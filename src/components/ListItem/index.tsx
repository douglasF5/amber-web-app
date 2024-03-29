import s from './styles.module.scss';
import { Episode } from '../../pages';
import { Play, ChevronUpMini, AudioBars } from '../Icons';
import Image from 'next/image';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

//TYPES AND INTERFACES
type ListItemProps = {
    data: Episode;
    isCollapsed: boolean;
    isPlaying: boolean;
    id: string;
    shouldBlink: boolean;
    handlePlay: () => void;
    handleExpand: () => void;
};

//COMPONENT DEFINITION
export function ListItem({
    data,
    isCollapsed,
    isPlaying,
    shouldBlink,
    id,
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
    const shouldItemBlinkClass = shouldBlink ? s.canBlink : '';

    const listItemVariants = {
        collapsed: {
            margin: '0px 0'
        },
        expanded: {
            margin: '32px 0'
        },
    };
    const listItemAnimationControls = useAnimationControls();

    function onHandleExpand() {
        handleExpand();

        if (isCollapsed) {
            listItemAnimationControls.start('expanded');
        } else {
            listItemAnimationControls.start('collapsed');
        }
    }

    //COMPONENT RETURN
    return (
        <motion.article
            animate={listItemAnimationControls}
            variants={listItemVariants}
            className={`${s.outerWrapper} ${isCollapsedClass}`}
            id={id}
        >
            <div className={`${s.contentContainer} ${isPlayingClass} ${isCollapsedClass} ${shouldItemBlinkClass}`}>
                <header className={isCollapsedClass}>
                    <div className={`${s.clickableArea} ${isCollapsedClass}`}>
                        <button
                            type='button'
                            className={s.expandButton}
                            onClick={onHandleExpand}
                        >
                            <span>Expand item</span>
                        </button>
                        <div className={s.cardCover}>
                            <Image src={data.thumbnail} layout='fill' objectFit='cover' objectPosition='left' alt={data.title} />
                        </div>
                        <h3>{data.title}</h3>
                        <span className={`${isPlayingClass} ${isCollapsedClass}`}>{data.publishedAt} · {data.members}</span>
                        <time
                            className={isPlayingClass}
                            dateTime={convertDurationToTimeString(data.duration, 'long')}
                        >
                            {data.durationAsString}
                        </time>
                    </div>
                    {
                        isPlaying
                            ? <div className={s.audioBarsWrapper}><AudioBars width={i.size} height={i.size} color='var(--c-amber-accent-primary)' /></div>
                            : (
                                <button
                                    type='button'
                                    className={isCollapsedClass ? s.playButtonSecondary : s.playButtonPrimary}
                                    onClick={handlePlay}
                                >
                                    <Play width={i.size} height={i.size} color={i.color} />
                                </button>
                            )
                    }
                </header>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={s.bodyWrapper}
                    >
                        <p>{data.description}</p>
                        <button type='button' className={`${s.seeLessButton} ${isPlayingClass}`} onClick={onHandleExpand}>
                            See less
                            <ChevronUpMini
                                height={10}
                                width={10}
                                color={isPlaying ? 'var(--c-amber-accent-primary)' : 'var(--c-on-surface-primary)'}
                            />
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.article>
    );
}

export function ShimmerListItem() {
    const componentStructure = <div className={s.shimmerItem}>
        <div className={s.imagePlaceholder} />
        <div className={s.contentPlaceholder}>
            <div className={s.contentLinePlaceholder} />
            <div className={s.contentLinePlaceholder} />
        </div>
    </div>;

    return (
        <>
            {componentStructure}
            {componentStructure}
            {componentStructure}
            {componentStructure}
            {componentStructure}
            {componentStructure}
        </>
    );
}