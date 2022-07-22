import s from '../styles/home.module.scss';
import { FeaturedContent } from "../components/FeaturedContent";
import { ListItem } from "../components/ListItem";
import { useState } from 'react';

type f = {
	id: number;
	title: string;
}

const fData: f[] = [
	{
		id: 1,
		title: 'hey'
	},
	{
		id: 2,
		title: 'hey'
	},
	{
		id: 3,
		title: 'hey'
	},
	{
		id: 4,
		title: 'hey'
	},
]

export default function Home() {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);

	function handleExpand() {
		setIsCollapsed(!isCollapsed);
	}

	function handlePlay() {
		setIsPlaying(!isPlaying);
	}
	
	return (
		<main>
		<h1 className="pageTitle">Amber podcasts</h1>
		<FeaturedContent />
		<section className={s.sectionContainer}>
			<div className={s.contentContainer}>
			<h2>All episodes · <span>16</span></h2>
			<div className={s.contentListWrapper}>
				{fData.map((i) => (
					<ListItem
						key={i.id}
						data="hey"
						isCollapsed={isCollapsed}
						isPlaying={isPlaying}
						handlePlay={handlePlay}
						handleExpand={handleExpand}
					/>
				))}
			</div>
			</div>
		</section>
		</main>
	)
}
