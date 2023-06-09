import Head from 'next/head';
import { GetServerSideProps } from 'next';

export default function Home() {
	return (
		<>
			<Head>
				<title>Desafio Marvel NeoApp</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>Página inicial</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async context => {
	context.res.writeHead(302, { Location: '/page/1' });
	context.res.end();
	return { props: {} };
};
