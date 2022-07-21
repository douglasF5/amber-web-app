import s from './styles.module.scss';
import { Play } from '../Icons';
import Image from 'next/image';

type ListItemProps = {
    data: string;
    isExpanded: boolean;
    isPlaying: boolean;
    handlePlay: () => void;
    handleExpand: () => void;
}

export function ListItem({
    data,
    isExpanded,
    isPlaying,
    handlePlay,
    handleExpand,
    ...rest
}: ListItemProps) {
    const i = {
        size: 20,
        color: isExpanded
            ? 'var(--c-amber-on-accent-container-primary)'
            : 'var(--c-amber-accent-primary)'
    };

    const isPlayingClass = isPlaying ? s.isPlayingClass : '';
    const isExpandedClass = isExpanded ? s.isExpandedClass : '';

    return (
        <article className={`${s.outerWrapper} ${isExpandedClass}`}>
            <div className={`${s.contentContainer} ${isPlayingClass}`}>
                <header>
                    <div className={s.clickableArea}>
                        <button
                            type='button'
                            className={s.expandButton}
                            onClick={handleExpand}
                        >
                            <span>Expand item</span>
                        </button>
                        <div className={s.cardCover}>
                        </div>
                        <h3>Faladev #28 | Por trás de barreiras e soluções propostas por micro-serviços</h3>
                        <span className={isPlayingClass}>8 Jan 21 · Dego Fernandes, Dani Leão, Wesley Williams e Lucas Santos</span>
                        <time className={isPlayingClass}>1:35:18</time>
                    </div>
                    <button type='button' className={isExpanded ? s.playButtonPrimary : s.playButtonSecondary}>
                        <Play width={i.size} height={i.size} color={i.color}/>
                    </button>
                </header>
                <div className={s.bodyWrapper}>
                    <p>Nesse episódio do Faladev, Diego Fernandes se reúne com João Pedro Schmitz, Bruno Lemos e Diego Haz, para discutir sobre a importância da contribuição open source e quais desafios circulam na comunidade. 

A gente passa a maior parte do tempo escrevendo código. Agora chegou o momento de falar sobre isso. Toda semana reunimos profissionais da tecnologia para discutir sobre tudo que circula na órbita da programação. O Faladev é um podcast original Rocketseat.</p>
                    <button>See less</button>
                </div>
            </div>
        </article>
    );
}