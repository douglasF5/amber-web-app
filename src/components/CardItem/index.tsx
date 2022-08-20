import s from './styles.module.scss';
import { Episode } from '../../pages';
import Image from 'next/image';
import { Play } from '../Icons';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

//TYPE ANNOTATION
type CardItemProps = {
    data: Episode;
    handlePlay: () => void;
    handleHighlightListItem: () => void;
};

//COMPONENT DEFINITION
export function CardItem({
    data,
    handlePlay,
    handleHighlightListItem
}: CardItemProps) {

    //HELPER VARIABLES AND FUNCTIONS
    const i = {
        size: 24,
        color: 'var(--c-amber-on-accent-container-primary)'
    };

    //COMPONENT RETURN
    return (
        <article className={s.cardWrapper} onClick={handleHighlightListItem}>
            <div className={s.cardCover}>
                <Image src={data.thumbnail} objectPosition='left' alt={data.title} layout='fill' objectFit='cover' />
            </div>
            <div className={s.textContentWrapper}>
                <h1 className={s.cardTitle}>{data.title}</h1>
                <div className={s.timeInfoWrapper}>
                    <time dateTime={convertDurationToTimeString(data.duration, 'long')}>{data.durationAsString}</time> · <time>{data.publishedAt}</time>
                </div>
            </div>
            <button
                type='button'
                className={s.playButton}
                onClick={handlePlay}
            >
                <Play width={i.size} height={i.size} color={i.color} />
            </button>
        </article>
    );
}

export function ShimmerCardItem() {
    return (
        <>
            <div className={s.shimmerBox}></div>
            <div className={s.shimmerBox}></div>
        </>
    );
}