import s from './styles.module.scss';
import Image from 'next/image';
import CoverPlaceholder from '../../../public/podcast-cover-placeholder-L.png';
import { PlayerControls } from '../PlayerControls';

//COMPONENT DEFINITION
export function PlayerSidebar() {

    //COMPONENT RETURN
    return (
        <aside className={s.sidebarContainer}>
            <div className={s.contentInfoWrapper}>
                <div className={s.coverWrapper}>
                    <Image src={CoverPlaceholder} alt='Podcast cover'/>
                </div>
                <div className={s.textInfoWrapper}>
                    <h2>Como codar tranquilo</h2>
                    <p>Tiago e Maria</p>
                </div>
            </div>
            <PlayerControls />
        </aside>
    );
}