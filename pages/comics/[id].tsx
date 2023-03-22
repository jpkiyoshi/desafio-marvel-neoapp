import { GetStaticPaths } from 'next';
import { GetStaticProps } from 'next';
import ProductDetails from '@/components/organisms/ProductDetails';

const Comic = ({ data }: any) => {
	const {
		data: { results },
	} = data;

	const comic = results[0];

	return (
		<>
			<ProductDetails
				title={comic.title}
				pageCount={comic.pageCount}
				description={comic.description}
				price={comic.prices[0].price}
				creators={comic.creators.items}
				imageURL={`${comic.thumbnail.path}/detail.${comic.thumbnail.extension}`}
			/>
		</>
	);
};

export default Comic;

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch(
		`http://gateway.marvel.com/v1/public/comics?ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=f3c107943b00a0293c39eb2c158a731a`
	);

	const data = await res.json();

	const ids = data.data.results.map((comic: { id: number }) => comic.id);

	const paths = ids.map((id: number) => ({
		params: { id: `${id}` },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const res = await fetch(
		`http://gateway.marvel.com/v1/public/comics/${params?.id}?ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=f3c107943b00a0293c39eb2c158a731a`
	);
	const data = await res.json();

	return {
		props: {
			data,
		},
	};
};
