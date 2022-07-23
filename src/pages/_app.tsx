import '../styles/main.scss';
import s from '../styles/app.module.scss';
import { Header } from '../components/Header';
import { PlayerSidebar } from '../components/PlayerSidebar';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
	const [episodesList, setEpisodesList] = useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

	function play(episode) {
		setEpisodesList([episode]);
		setCurrentEpisodeIndex(0);
	}

  return (
	<PlayerContext.Provider value={{ episodesList, currentEpisodeIndex, play }}>
		<div className={s.pageWrapper}>
			<div className={s.mainContentWrapper}>
				<Header />
				<Component {...pageProps} />
			</div>
			<PlayerSidebar />
		</div>
	</PlayerContext.Provider>
  );
}

export default MyApp
