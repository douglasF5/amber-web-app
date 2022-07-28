import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US';
import s from './styles.module.scss';
import Image from 'next/image';

//COMPONENT DEFINITION
export function Header() {
    const currentDate = new Date();
    const longDate = format(currentDate, 'EEE, dd MMM', {
        locale: enUS,
    });
    const shortDate = format(currentDate, 'yyyy/MM/dd', {
        locale: enUS,
    });

    //COMPONENT RETURN
    return (
        <header className={s.sectionContainer}>
            <div className={s.contentContainer}>
                <div>
                    <Image src='/logo.svg' alt="Amber" width={121} height={25}/>
                    <span>You listen to the best, always</span>
                </div>
                <time dateTime={shortDate}>{longDate}</time>
            </div>
        </header>
    );
}