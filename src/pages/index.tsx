import { api } from '../services/api';
import { GetStaticProps } from 'next';
import { usePlayer } from '../contexts/PlayerContext';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import s from '../styles/home.module.scss';
import { CardItem, ShimmerCardItem } from "../components/CardItem";
import { ListItem, ShimmerListItem } from "../components/ListItem";
import { Link } from 'react-scroll';

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
	isPlaying: boolean;
	isCollapsed: boolean;
};

type HomeProps = {
	allEpisodes: Episode[];
	featuredEpisodes: Episode[];
};

//COMPONENT DEFINITION
export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [episodes, setEpisodes] = useState({} as HomeProps);
	const { currentEpisodeIndex, playList } = usePlayer();
	const [epExpanded, setEpExpanded] = useState('');
	const [highlightListItem, setHighlightListItem] = useState('');

	function handleExpand(episodeId: string) {
		setEpExpanded(prevValue => prevValue === episodeId ? '' : episodeId);
	}

	function handleHighlightListItem(episodeId: string) {
		setHighlightListItem(prevValue => prevValue === episodeId ? '' : episodeId);
		setTimeout(() => {
			setHighlightListItem('');
		}, 1000);
	}

	//GETTING DATA
	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await api.get('episodes');

				const allEpisodes = data.episodes.map((episode) => {
					return {
						id: episode.id,
						title: episode.title,
						thumbnail: episode.thumbnail,
						members: episode.members,
						description: episode.description,
						publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: enUS }),
						duration: Number(episode.file.duration),
						durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
						url: episode.file.url,
						isPlaying: false,
						isCollapsed: true,
					};
				});

				const featuredEpisodes = [allEpisodes[0], allEpisodes[1]];
				setEpisodes({ allEpisodes, featuredEpisodes });
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		};

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//COMPONENT RETURN
	return (
		<main>
			<h1 className="pageTitle">Amber podcasts</h1>
			<section className={s.sectionContainer}>
				<div className={s.featuredContentContainer}>
					<h2>Featured episodes</h2>
					<div className={s.featuredListWrapper}>
						{!isLoading ? (
							episodes.featuredEpisodes && episodes.featuredEpisodes.map((ep, i) => (
								<Link
									key={ep.id}
									to={ep.id}
									smooth={true}
									offset={-70}
									duration={400}
								>
									<CardItem
										key={ep.id}
										data={ep}
										handlePlay={() => playList(episodes.allEpisodes, i)}
										handleHighlightListItem={() => handleHighlightListItem(ep.id)}
									/>
								</Link>
							))
						) : <ShimmerCardItem />}
					</div>
				</div>
			</section>
			<section className={s.allEpisodesSectionContainer}>
				<div className={s.allEpisodesContentContainer}>
					<h2>All episodes · <span>{episodes.allEpisodes && episodes.allEpisodes.length}</span></h2>
					<div className={`${s.allEpisodesListWrapper} ${epExpanded ? s.hasEpExpandedClass : ''}`}>
						{!isLoading ? (
							episodes.allEpisodes && episodes.allEpisodes.map((ep, i) => (
								<ListItem
									id={ep.id}
									key={ep.id}
									data={ep}
									isCollapsed={epExpanded !== ep.id}
									isPlaying={currentEpisodeIndex === i}
									handlePlay={() => playList(episodes.allEpisodes, i)}
									handleExpand={() => handleExpand(ep.id)}
									shouldBlink={highlightListItem === ep.id}
								/>
							))
						) : <ShimmerListItem />}
					</div>
				</div>
			</section>
		</main>
	);
}

//GETTING DATA
// export const getStaticProps: GetStaticProps = async () => {
// 	const {data} = await api.get('episodes');
// 	console.log(data);

	// {
	// 	params: {
	// 		_limit: 12,
	// 		_sort: 'published_at',
	// 		_order: 'desc'
	// 	}
	// }

	// const allEpisodes = data.map((episode) => {
	// 	return {
	// 		id: episode.id,
	// 		title: episode.title,
	// 		thumbnail: episode.thumbnail,
	// 		members: episode.members,
	// 		description: episode.description,
	// 		publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: enUS}),
	// 		duration: Number(episode.file.duration),
	// 		durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
	// 		url: episode.file.url,
	// 		isPlaying: false,
	// 		isCollapsed: true,
	// 	};
	// });

	// const featuredEpisodes = [allEpisodes[0], allEpisodes[1]];

	// return {
	// 	props: {
	// 		allEpisodes,
	// 		featuredEpisodes
	// 	},
	// 	revalidate: 60 * 60 * 8
	// }
// }
