import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import ProductList from '@/components/organisms/ProductList';

type Comic = {
	id: number;
	title: string;
	thumbnail: {
		path: string;
		extension: string;
	};
};

type ComicsData = {
	results: Comic[];
	total: number;
};

const ComicsPage = ({ comicsData }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { results: comics, total: totalComics } = comicsData;
	const currentPage = 1;
	const totalPageCount = Math.ceil(totalComics / 10);
	const prevPage = currentPage - 1 <= 0 ? null : currentPage - 1;
	const nextPage = currentPage + 1 > totalPageCount ? null : currentPage + 1;

	return (
		<>
			<h1>Comics Page</h1>
			<ProductList products={comics} />
			<nav>
				{prevPage && <Link href={`/page/${prevPage}`}>Previous</Link>}
				{nextPage && <Link href={`/page/${nextPage}`}>Next</Link>}
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
	{ comicsData: ComicsData },
	{ page: string }
> = async ({ params }) => {
	const { page } = params!;
	const offset = (parseInt(page) - 1) * 10;

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
		},
		revalidate: 3600,
	};
};
