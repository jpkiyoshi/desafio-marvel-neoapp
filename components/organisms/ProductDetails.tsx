import Image from 'next/image';
import styled from 'styled-components';

type Creator = {
	name: string;
	resourceURI: string;
};

type Props = {
	title: string;
	creators: Creator[];
	pageCount: number;
	description: string;
	price: number;
};

const Container = styled.section`
	display: grid;
	height: 100dvh;
	align-content: center;
	justify-items: center;
	grid-template-columns: 1fr 1fr;
	background-color: var(--white);
	margin-top: 80px;
	padding: 25px;
	width: 80%;
	margin-inline: auto;
`;

const ImageContainer = styled.div`
	position: relative;
	width: 300px;
`;

const Content = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	gap: 50px;

	h1 {
		font-family: 'Comic Neue', cursive;
	}
`;

const Title = styled.h1`
	font-size: 2.5rem;
	font-style: italic;
`;

const SubHeading = styled.h2`
	font-size: 1.1rem;
	margin-bottom: 10px;
`;

const ProductDetails = ({ title, creators, pageCount, description, price }: Props) => {
	return (
		<Container>
			<ImageContainer>
				<Image
					src='/images/dummy-image-details.jpg'
					alt=''
					fill
					style={{ objectFit: 'contain' }}
				/>
			</ImageContainer>
			<Content>
				<Title>{title}</Title>
				<div>
					<SubHeading>Características</SubHeading>
					<p>
						Criadores:{' '}
						{creators.map((creator, index) => (
							<span key={creator.resourceURI}>
								{' '}
								{creator.name}
								{index !== creators.length - 1 ? ', ' : ''}
							</span>
						))}
					</p>
					<p>Número de páginas: {pageCount}</p>
				</div>
				<div>
					<SubHeading>Descrição</SubHeading>
					<p>{description}</p>
				</div>
				<div>
					<p>{price}</p>
					<button>COMPRAR ESSA COMIC</button>
				</div>
			</Content>
		</Container>
	);
};
export default ProductDetails;
