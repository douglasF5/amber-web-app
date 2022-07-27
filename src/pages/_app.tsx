import '../styles/main.scss';
import s from '../styles/app.module.scss';
import { Header } from '../components/Header';
import { PlayerSidebar } from '../components/PlayerSidebar';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import { PlayerFloating } from '../components/PlayerFloating';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
	const [playerType, setPlayerType] = useState(null);
	const breakPoint = useMediaQuery({
		query: '(max-width: 1450px)'
	});

	useEffect(() => {
		setPlayerType(
				breakPoint
				? <PlayerFloating />
				: <PlayerSidebar />
		);
	}, [breakPoint]);


	return (
		<PlayerContextProvider>
			<div className={s.pageWrapper}>
				<div className={s.mainContentWrapper}>
					<Header />
					<Component {...pageProps} />
				</div>
				{playerType}
			</div>
		</PlayerContextProvider>
  	);
}

export default MyApp
