import Image from 'next/image';
import styled from 'styled-components';
import AddToCart from '../atoms/AddToCart';

type Props = {
	title: string;
	price: number;
	thumbnail: string;
};

const Card = styled.article`
	width: 216px;
	border: 3px solid var(--orange);
`;

const Content = styled.div`
	font-family: 'Roboto', sans-serif;
	background-color: var(--black);
	color: var(--white);
	display: flex;
	flex-direction: column;
	padding: 15px;
	gap: 20px;
`;

const Title = styled.h2`
	font-size: 0.8rem;
	font-weight: bold;
`;

const Pricing = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: bold;
	font-size: 1.1rem;
`;

const ProductCard = ({ title, price, thumbnail }: Props) => {
	return (
		<Card>
			<Image
				src={thumbnail}
				alt=''
				height={324}
				width={216}
				style={{ objectFit: 'cover' }}
			/>
			<Content>
				<Title>{title}</Title>
				<Pricing>
					<p>
						{price}{' '}
						<span style={{ fontSize: '0.7rem', fontWeight: 'normal' }}>
							USD
						</span>
					</p>
					<div>
						<AddToCart />
					</div>
				</Pricing>
			</Content>
		</Card>
	);
};
export default ProductCard;
