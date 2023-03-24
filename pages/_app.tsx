import { Provider } from 'react-redux';
import Header from '@/components/organisms/Header';
import type { AppProps } from 'next/app';
import store from '../redux/store';
import GlobalStyles from '../styles/globalStyles';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyles />
			<Provider store={store}>
				<Header />
				<Component {...pageProps} />
			</Provider>
		</>
	);
}
