import Header from '@/components/organisms/Header';
import MainSection from '@/components/organisms/MainSection';
import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/globalStyles';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyles />
			<MainSection>
				<Header />
				<Component {...pageProps} />
			</MainSection>
		</>
	);
}
