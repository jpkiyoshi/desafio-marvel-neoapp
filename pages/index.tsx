import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Header from '@/components/organisms/Header';
import MainSection from '@/components/organisms/MainSection';
import ProductList from '@/components/organisms/ProductList';

export default function Home() {
	// const {
	// 	data: {
	// 		data: { results },
	// 	},
	// } = data;

	return (
		<>
			<Head>
				<title>Desafio Marvel NeoApp</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* <main>
				<ul>
					{results.map(result => (
						<li key={result.id}>
							<h3>
								{result.title} - {result.prices[0].price}
							</h3>
							<br />
						</li>
					))}
				</ul>
			</main> */}
			<>
				<Header />
				<MainSection>
					<ProductList />
				</MainSection>
			</>
		</>
	);
}

// export const getStaticProps: GetStaticProps = async ({ params }) => {
// 	const res = await fetch(
// 		`http://gateway.marvel.com/v1/public/comics?ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=f3c107943b00a0293c39eb2c158a731a`
// 	);
// 	const data = await res.json();

// 	return {
// 		props: {
// 			data,
// 		},
// 		revalidate: 10,
// 	};
// };
