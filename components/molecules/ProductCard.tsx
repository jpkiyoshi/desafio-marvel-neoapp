import Image from 'next/image';
import styled from 'styled-components';
import AddToCart from '../atoms/AddToCart';

type Props = {};

const Card = styled.article`
	width: 216px;
	border: 3px solid var(--white);
`;

const Content = styled.div`
	font-family: 'Roboto', sans-serif;
	background-color: var(--red);
	color: var(--white);
	display: flex;
	flex-direction: column;
	padding: 20px;
	gap: 20px;
`;

const Title = styled.h2`
	font-size: 0.9rem;
	font-weight: bold;
`;

const Pricing = styled.div`
	display: flex;
	justify-content: space-between;
	font-weight: bold;
	font-size: 1.3rem;
`;

const ProductCard = (props: Props) => {
	return (
		<Card>
			<Image
				src='http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/portrait_incredible.jpg'
				alt=''
				height={324}
				width={216}
				style={{ objectFit: 'contain' }}
			/>
			<Content>
				<Title>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Title>
				<Pricing>
					<p>
						300{' '}
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
