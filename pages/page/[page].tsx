import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import ProductList from '@/components/organisms/ProductList';

type Price = {
	price: number;
	type: 'printPrice';
};

type Prices = Price[];

type Comic = {
	id: string;
	title: string;
	prices: Prices;
	thumbnail: {
		path: string;
		extension: string;
	};
};

type ComicsData = {
	results: Comic[];
	total: number;
};

const ComicsPage = ({
	comicsData,
	pageNumber,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { results: comics, total: totalComics } = comicsData;
	const currentPage = parseInt(pageNumber);
	const totalPageCount = Math.ceil(totalComics / 10);

	const prevPage = currentPage - 1 <= 0 ? null : currentPage - 1;
	const nextPage = currentPage + 1 > totalPageCount ? null : currentPage + 1;

	return (
		<>
			<h1>Comics Page</h1>
			<ProductList products={comics} />
			<nav>
				{prevPage && <Link href={`/page/${prevPage}`}>Anterior</Link>}
				{totalPageCount}
				{nextPage && <Link href={`/page/${nextPage}`}>Seguinte</Link>}
			</nav>
		</>
	);
};

export default ComicsPage;

export const getStaticPaths = async () => {
	const comicsResponse = await fetch(
		`http://gateway.marvel.com/v1/public/comics?format=comic&ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=f3c107943b00a0293c39eb2c158a731a`
	);
	const comicsData = await comicsResponse.json();
	const totalComics = comicsData.data.total;
	const totalPageCount = Math.ceil(totalComics / 10);

	const paths = [...Array(totalPageCount)].map((_, index) => ({
		params: { page: `${index + 1}` },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<
	{ comicsData: ComicsData; pageNumber: string },
	{ page: string }
> = async ({ params }) => {
	const { page } = params!;
	const pageNumber = page || '1';
	const offset = (parseInt(pageNumber) - 1) * 10;

	const comicsResponse = await fetch(
		`http://gateway.marvel.com/v1/public/comics?format=comic&limit=10&offset=${offset}&ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=f3c107943b00a0293c39eb2c158a731a`
	);
	const comicsData = await comicsResponse.json();
	const comics = comicsData.data.results;
	const totalComics = comicsData.data.total;

	return {
		props: {
			comicsData: {
				results: comics,
				total: totalComics,
			},
			pageNumber,
		},
		revalidate: 3600,
	};
};
