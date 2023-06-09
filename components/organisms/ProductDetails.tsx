import Image from 'next/image';
import styled from 'styled-components';
import AddToCartIcon from '../atoms/AddToCartIcon';
import Button from '../atoms/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart.slice';

type Creator = {
	name: string;
	resourceURI: string;
};

type Props = {
	id: number;
	title: string;
	creators: Creator[];
	pageCount: number;
	description: string;
	price: number;
	thumbnail: {
		path: string;
		extension: string;
	};
};

const Container = styled.section`
	display: grid;
	height: 100dvh;
	align-content: center;
	justify-items: center;
	grid-template-columns: 1fr;
	color: var(--white);
	gap: 20px;
	margin-top: 300px;
	width: 80%;
	margin-inline: auto;

	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
		margin-top: 50px;
	}
`;

const ImageContainer = styled.div`
	position: relative;
	width: 300px;
	height: 500px;
	transition: transform 250ms ease-in;
	border: 3px solid var(--orange);

	&:hover {
		transition: transform 150ms ease-out;
		transform: scale(1.1);
	}
`;

const Content = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	gap: 20px;
	line-height: 1.5;
`;

const Title = styled.h1`
	position: relative;
	display: inline-block;
	padding-bottom: 10px;
	font-family: 'Bebas Neue', cursive;
	font-size: 2.5rem;
	line-height: 1;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 50%;
		width: 50%;
		border-bottom: 2px solid white;
	}
`;

const SubHeading = styled.h2`
	font-size: 1.1rem;
	margin-bottom: 10px;
`;

const StyledParagraph = styled.p`
	font-weight: bold;
`;

const ProductDetails = ({
	id,
	title,
	creators,
	pageCount,
	description,
	price,
	thumbnail,
}: Props) => {
	const dispatch = useDispatch();

	return (
		<Container>
			<ImageContainer>
				<Image
					src={`${thumbnail.path}/detail.${thumbnail.extension}`}
					alt={title}
					fill
					style={{ objectFit: 'cover' }}
				/>
			</ImageContainer>
			<Content>
				<Title>{title}</Title>
				<div>
					<SubHeading>Características</SubHeading>
					<StyledParagraph>
						Criadores:{' '}
						{creators.map((creator, index) => (
							<span
								key={creator.resourceURI}
								style={{ fontWeight: 'normal' }}
							>
								{' '}
								{creator.name}
								{index !== creators.length - 1 ? ', ' : ''}
							</span>
						))}
					</StyledParagraph>
					<StyledParagraph>
						Número de páginas:{' '}
						<span style={{ fontWeight: 'normal' }}>{pageCount}</span>
					</StyledParagraph>
					<StyledParagraph>
						Preço: <span style={{ fontWeight: 'normal' }}>{price} USD</span>
					</StyledParagraph>
				</div>
				<div>
					<SubHeading>Descrição</SubHeading>
					<p>{description}</p>
				</div>
				<Button
					onClick={() => {
						dispatch(addToCart({ title, price, thumbnail, id }));
					}}
				>
					<p>Adicionar ao carrinho</p>
					<AddToCartIcon />
				</Button>
			</Content>
		</Container>
	);
};
export default ProductDetails;
