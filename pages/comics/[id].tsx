import { GetServerSideProps, GetStaticPaths } from 'next';
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
				id={comic.id}
				title={comic.title}
				pageCount={comic.pageCount}
				description={comic.description}
				price={comic.prices[0].price}
				creators={comic.creators.items}
				thumbnail={comic.thumbnail}
			/>
		</>
	);
};

export default Comic;

// export const getStaticPaths: GetStaticPaths = async () => {
// 	const res = await fetch(
// 		`http://gateway.marvel.com/v1/public/comics?ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=cfc29b20f1501cf633b27057de8fe8a1`
// 	);

// 	const data = await res.json();

// 	const ids = data?.data.results.map((comic: { id: number }) => comic.id);

// 	const paths = ids.map((id: number) => ({
// 		params: { id: `${id}` },
// 	}));

// 	return {
// 		paths,
// 		fallback: true,
// 	};
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const res = await fetch(
		`http://gateway.marvel.com/v1/public/comics/${params?.id}?ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=cfc29b20f1501cf633b27057de8fe8a1`
	);
	const data = await res.json();

	return {
		props: {
			data,
		},
	};
};
