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
	grid-template-columns: 1fr 1fr;
	background-color: var(--orange);
	margin-top: 80px;
	padding: 25px;
	width: 80%;
	margin-inline: auto;
`;

const ImageContainer = styled.div`
	position: relative;
	width: 300px;
	height: 500px;
`;

const Content = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	gap: 20px;
	line-height: 1.5;

	h1 {
		font-family: 'Comic Neue', cursive;
	}
`;

const Title = styled.h1`
	font-size: 2.5rem;
	font-style: italic;
	line-height: 1;
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
					style={{ objectFit: 'contain' }}
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
