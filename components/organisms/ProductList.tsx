import styled from 'styled-components';
import ProductCard from '../molecules/ProductCard';

type Props = {};

const GridContainer = styled.section`
	display: grid;
	place-items: center;
	grid-template-columns: repeat(auto-fill, minmax(min(216px, 100%), 1fr));
	gap: 20px;
	max-width: 1300px;
	margin-inline: auto;
	padding-block: 50px;
`;

const ProductList = (props: Props) => {
	return (
		<GridContainer>
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
			<ProductCard />
		</GridContainer>
	);
};
export default ProductList;
