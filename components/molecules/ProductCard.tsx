import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart.slice';
import styled from 'styled-components';
import AddToCartIcon from '../atoms/AddToCartIcon';

type Props = {
	title: string;
	price: number;
	thumbnail: {
		path: string;
		extension: string;
	};
	id: string;
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

const Button = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

const ProductCard = ({ title, price, thumbnail, id }: Props) => {
	const dispatch = useDispatch();

	return (
		<Card>
			<Link href={`/comics/${id}`}>
				<Image
					src={`${thumbnail.path}/portrait_incredible.${thumbnail.extension}`}
					alt={title}
					height={324}
					width={216}
					style={{ objectFit: 'cover' }}
				/>
			</Link>

			<Content>
				<Title>{title}</Title>
				<Pricing>
					<p>
						<span style={{ fontSize: '0.7rem', fontWeight: 'normal' }}>
							US$
						</span>{' '}
						{price}
					</p>
					<Button
						onClick={() => {
							dispatch(addToCart({ title, price, thumbnail, id }));
						}}
					>
						<AddToCartIcon />
					</Button>
				</Pricing>
			</Content>
		</Card>
	);
};
export default ProductCard;
