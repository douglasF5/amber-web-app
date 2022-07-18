import s from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/logo.svg';

export function Header() {
    const currentDate = new Date();
    const shortDate = new Intl.DateTimeFormat("en-US").format(currentDate);
    const longDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        weekday: "short",
    }).format(currentDate);

    return (
        <header className={s.sectionContainer}>
            <div className={s.contentContainer}>
                <div>
                    <Image src={logo} alt="Amber"/>
                    <span>You listen to the best, always</span>
                </div>
                <time dateTime={shortDate}>{longDate}</time>
            </div>
        </header>
    );
}