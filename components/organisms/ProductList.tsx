import styled from 'styled-components';
import ProductCard from '../molecules/ProductCard';

type Price = {
	price: number;
	type: 'printPrice';
};

type Prices = Price[];

type Thumbnail = {
	extension: string;
	path: string;
};

type Product = {
	id: string;
	title: string;
	prices: Prices;
	thumbnail: Thumbnail;
};

type Products = Product[];

const GridContainer = styled.section`
	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(min(216px, 100%), 1fr));
	gap: 20px;
	max-width: 1300px;
	margin-inline: auto;
	padding-block: 50px;
`;

const ProductList = ({ products }: { products: Products }) => {
	return (
		<GridContainer>
			{products.map(product => (
				<ProductCard
					key={product.id}
					title={product.title}
					price={product.prices[0].price}
					thumbnail={`${product.thumbnail.path}/portrait_incredible.${product.thumbnail.extension}`}
				/>
			))}
		</GridContainer>
	);
};
export default ProductList;
