import '../styles/main.scss';
import s from '../styles/app.module.scss';
import { Header } from '../components/Header';
import { PlayerSidebar } from '../components/PlayerSidebar';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import { PlayerFloating } from '../components/PlayerFloating';
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect, useRef } from 'react';

function MyApp({ Component, pageProps }) {
	const [playerType, setPlayerType] = useState(null);
	const dragConstraints = useRef();
	const breakPoint = useMediaQuery({
		query: '(max-width: 1450px)'
	});

	useEffect(() => {
		setPlayerType(
				breakPoint
				? <PlayerFloating dragContraints={dragConstraints} />
				: <PlayerSidebar />
		);
	}, [breakPoint]);


	return (
		<PlayerContextProvider>
			<div className={s.pageWrapper} ref={dragConstraints}>
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
