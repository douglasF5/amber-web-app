import s from '../styles/home.module.scss';
import { FeaturedContent } from "../components/FeaturedContent";
import { ListItem } from "../components/ListItem";

export default function Home() {
  return (
      <main>
        <h1 className="pageTitle">Amber podcasts</h1>
        <FeaturedContent />
        <section className={s.sectionContainer}>
          <div className={s.contentContainer}>
            <h2>All episodes · <span>16</span></h2>
            <div className={s.contentListWrapper}>
              <ListItem
                data="hey"
                isExpanded={false}
                isPlaying={false}
                handlePlay={() => console.log('hey there!')}
                handleExpand={() => console.log('hey there!')}
              />
              <ListItem
                data="hey"
                isExpanded={false}
                isPlaying={false}
                handlePlay={() => console.log('hey there!')}
                handleExpand={() => console.log('hey there!')}
              />
              <ListItem
                data="hey"
                isExpanded={true}
                isPlaying={false}
                handlePlay={() => console.log('hey there!')}
                handleExpand={() => console.log('hey there!')}
              />
              <ListItem
                data="hey"
                isExpanded={false}
                isPlaying={true}
                handlePlay={() => console.log('hey there!')}
                handleExpand={() => console.log('hey there!')}
              />
            </div>
          </div>
        </section>
      </main>
  )
}
