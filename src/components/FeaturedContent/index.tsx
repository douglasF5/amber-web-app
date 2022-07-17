import s from './styles.module.scss';

export function FeaturedContent() {
    return (
        <section className={s.sectionContainer}>
            <div className={s.contentContainer}>
                <h2>Featured</h2>
                <div>
                    <article>Card 1</article>
                    <article>Card 2</article>
                </div>
            </div>
        </section>
    );
}