import s from './styles.module.scss';
import Image from 'next/image';
import { Play } from '../Icons';

//COMPONENT DEFINITION
export function CardItem() {
    const i = {
        size: 24,
        color: 'var(--c-amber-on-accent-container-primary)'
    };

    //COMPONENT RETURN
    return (
        <article className={s.cardWrapper}>
            <div className={s.cardCover}>
                <Image  src="/podcast-cover-placeholder-M.png" alt="Podcast" width={96} height={96}/>
            </div>
            <div className={s.textContentWrapper}>
                <h1 className={s.cardTitle}>Faladev #30 | A importância da contribuição em Open Source</h1>
                <div>
                    <time>1:35:18</time> · <time>8 Jan 21</time>
                </div>
            </div>
            <div className={s.playIndicator}>
                <Play width={i.size} height={i.size} color={i.color}/>
            </div>
        </article>
    );
}