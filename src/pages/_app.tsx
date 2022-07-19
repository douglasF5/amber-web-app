import '../styles/main.scss';
import s from '../styles/app.module.scss';
import { Header } from '../components/Header';
import { PlayerSidebar } from '../components/PlayerSidebar';

function MyApp({ Component, pageProps }) {
  return (
	<div className={s.pageWrapper}>
		<div className={s.mainContentWrapper}>
			<Header />
			<Component {...pageProps} />
		</div>
		<PlayerSidebar />
	</div>
  );
}

export default MyApp
