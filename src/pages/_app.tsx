import '../styles/main.scss';
import s from '../styles/app.module.scss';
import { Header } from '../components/Header';
import { PlayerSidebar } from '../components/PlayerSidebar';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import { PlayerFloating } from '../components/PlayerFloating';

function MyApp({ Component, pageProps }) {
	return (
		<PlayerContextProvider>
			<div className={s.pageWrapper}>
				<div className={s.mainContentWrapper}>
					<Header />
					<Component {...pageProps} />
				</div>
				<PlayerFloating />
				{/* <PlayerSidebar /> */}
			</div>
		</PlayerContextProvider>
  	);
}

export default MyApp
