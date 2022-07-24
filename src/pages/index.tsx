import { api } from '../services/api';
import { GetStaticProps } from 'next';
import { PlayerContext } from '../contexts/PlayerContext';
import { useContext, useState } from 'react';
import { format, parseISO } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import s from '../styles/home.module.scss';
import { CardItem } from "../components/CardItem";
import { ListItem } from "../components/ListItem";

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
	isPlaying: boolean,
	isCollapsed: boolean,
}

type HomeProps = {
	allEpisodes: Episode[];
	featuredEpisodes: Episode[];
}

//COMPONENT DEFINITION
export default function Home({ allEpisodes, featuredEpisodes }: HomeProps) {
	const { play } = useContext(PlayerContext);

	const [listedEpisodes, setListedEpisodes] = useState(allEpisodes);
	const [hasEpExpanded, setHasEpExpanded] = useState(false);

	function handleExpand(episodeId) {
		const mappedEpisodes = listedEpisodes.map(ep => {
			if(ep.id === episodeId) {
				const expandedItem = {
					...ep,
					isCollapsed: !ep.isCollapsed
				};

				if(!expandedItem.isCollapsed) {
					setHasEpExpanded(true);
				} else {
					setHasEpExpanded(false);
				}

				return expandedItem;
			} else {
				return {
					...ep,
					isCollapsed: true
				}
			}
		});

		setListedEpisodes(mappedEpisodes);
	}

	function handlePlay(episode) {
		play(episode);

		const mappedEpisodes = listedEpisodes.map(ep => {
			if(ep.id === episode.id) {
				return {
					...ep,
					isPlaying: true
				}
			} else {
				return {
					...ep,
					isPlaying: false
				}
			}
		});

		setListedEpisodes(mappedEpisodes);
	}
	
	//COMPONENT RETURN
	return (
		<main>
			<h1 className="pageTitle">Amber podcasts</h1>
			<section className={s.sectionContainer}>
				<div className={s.featuredContentContainer}>
					<h2>Featured episodes</h2>
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
					<div className={`${s.allEpisodesListWrapper} ${hasEpExpanded ? s.hasEpExpandedClass : ''}`}>
						{listedEpisodes.map((ep) => (
							<ListItem
								key={ep.id}
								data={ep}
								isCollapsed={ep.isCollapsed}
								isPlaying={ep.isPlaying}
								handlePlay={() => handlePlay(ep)}
								handleExpand={() => handleExpand(ep.id)}
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
			url: episode.file.url,
			isPlaying: false,
			isCollapsed: true,
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
