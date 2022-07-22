import s from '../styles/home.module.scss';
import { format, parseISO } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { GetStaticProps } from 'next';
import { CardItem } from "../components/CardItem";
import { ListItem } from "../components/ListItem";
import { useState } from 'react';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

//TYPES AND INTERFACES
export type Episode = {
	id: string;
	title: string;
	members: string;
	thumbnail: string;
	description: string;
	publishedAt: string;
	duration: number;
	durationAsString: string;
	url: string;
}

type HomeProps = {
	allEpisodes: Episode[];
	featuredEpisodes: Episode[];
}

//COMPONENT DEFINITION
export default function Home({ allEpisodes, featuredEpisodes }: HomeProps) {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);

	function handleExpand() {
		setIsCollapsed(!isCollapsed);
	}

	function handlePlay() {
		setIsPlaying(!isPlaying);
	}
	
	//COMPONENT RETURN
	return (
		<main>
			<h1 className="pageTitle">Amber podcasts</h1>
			<section className={s.sectionContainer}>
				<div className={s.featuredContentContainer}>
					<h2>Featured</h2>
					<div className={s.featuredListWrapper}>
						{featuredEpisodes.map((ep) => (
							<CardItem
								key={ep.id}
								data={ep}
							/>
						))}
					</div>
				</div>
			</section>
			<section className={s.sectionContainer}>
				<div className={s.allEpisodesContentContainer}>
					<h2>All episodes · <span>16</span></h2>
					<div className={s.allEpisodesListWrapper}>
						{allEpisodes.map((ep) => (
							<ListItem
								key={ep.id}
								data={ep}
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

//GETTING DATA
export const getStaticProps: GetStaticProps = async () => {
	const { data } = await api.get('episodes', {
		params: {
			_limit: 12,
			_sort: 'published_at',
			_order: 'desc'
		}
	});

	const allEpisodes = data.map((episode) => {
		return {
			id: episode.id,
			title: episode.title,
			thumbnail: episode.thumbnail,
			members: episode.members,
			description: episode.description,
			publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: enUS}),
			duration: Number(episode.file.duration),
			durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
			url: episode.file.url
		};
	});

	const featuredEpisodes = [allEpisodes[0], allEpisodes[1]];

	return {
		props: {
			allEpisodes,
			featuredEpisodes
		},
		revalidate: 60 * 60 * 8
	}
}
