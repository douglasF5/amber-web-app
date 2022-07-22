import s from './styles.module.scss';
import { Play, ChevronUpMini, AudioBars } from '../Icons';
import Image from 'next/image';

type ListItemProps = {
    data: string;
    isCollapsed: boolean;
    isPlaying: boolean;
    handlePlay: () => void;
    handleExpand: () => void;
}

export function ListItem({
    data,
    isCollapsed,
    isPlaying,
    handlePlay,
    handleExpand,
    ...rest
}: ListItemProps) {
    const i = {
        size: 20,
        color: isCollapsed
            ? 'var(--c-amber-accent-primary)'
            : 'var(--c-amber-on-accent-container-primary)'
    };

    const isPlayingClass = isPlaying ? s.isPlayingClass : '';
    const isCollapsedClass = isCollapsed ? s.isCollapsedClass : '';

    return (
        <article className={`${s.outerWrapper} ${isCollapsedClass}`}>
            <div className={`${s.contentContainer} ${isPlayingClass} ${isCollapsedClass}`}>
                <header className={isCollapsedClass}>
                    <div className={`${s.clickableArea} ${isCollapsedClass}`}>
                        <button
                            type='button'
                            className={s.expandButton}
                            onClick={handleExpand}
                        >
                            <span>Expand item</span>
                        </button>
                        <div className={s.cardCover}>
                            <Image src='/podcast-cover-placeholder-M.png' width={48} height={48} alt='Cover'/>
                        </div>
                        <h3>Faladev #28 | Por trás de barreiras e soluções propostas por micro-serviços</h3>
                        <span className={`${isPlayingClass} ${isCollapsedClass}`}>8 Jan 21 · Dego Fernandes, Dani Leão, Wesley Williams e Lucas Santos</span>
                        <time className={isPlayingClass}>1:35:18</time>
                    </div>
                    {
                        isPlaying
                        ? <div className={s.audioBarsWrapper}><AudioBars width={i.size} height={i.size} color='var(--c-amber-accent-primary)'/></div>
                        : (
                            <button
                                type='button'
                                className={isCollapsedClass ? s.playButtonSecondary : s.playButtonPrimary}
                                onClick={handlePlay}
                            >
                                <Play width={i.size} height={i.size} color={i.color}/>
                            </button>
                        )
                    }
                    
                </header>
                <div className={s.bodyWrapper}>
                    <p>Nesse episódio do Faladev, Diego Fernandes se reúne com João Pedro Schmitz, Bruno Lemos e Diego Haz, para discutir sobre a importância da contribuição open source e quais desafios circulam na comunidade. 

A gente passa a maior parte do tempo escrevendo código. Agora chegou o momento de falar sobre isso. Toda semana reunimos profissionais da tecnologia para discutir sobre tudo que circula na órbita da programação. O Faladev é um podcast original Rocketseat.</p>
                    <button type='button' className={`${s.seeLessButton} ${isPlayingClass}`}>
                        See less
                        <ChevronUpMini
                            height={10}
                            width={10}
                            color={isPlaying ? 'var(--c-amber-accent-primary)' : 'var(--c-on-surface-primary)'}
                        />
                    </button>
                </div>
            </div>
        </article>
    );
}