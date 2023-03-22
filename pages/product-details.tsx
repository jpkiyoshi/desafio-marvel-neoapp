import Image from 'next/image';
import styled from 'styled-components';

type Props = {};

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

const ProductDetails = (props: Props) => {
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
				<Title>TÍTULO AQUI</Title>
				<div>
					<SubHeading>Características</SubHeading>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
					<p>Caracterísic: valor</p>
				</div>
				<div>
					<SubHeading>Descrição</SubHeading>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
						minus, quis asperiores qui cupiditate quia quaerat laudantium
						harum aut tenetur voluptatibus rerum voluptatem nulla deleniti
						ipsum impedit delectus quibusdam obcaecati voluptas omnis
						distinctio? Cupiditate nam voluptatibus hic ducimus, mollitia sint
						deleniti ad in fugiat maiores eum delectus. Doloribus, iure optio.
					</p>
				</div>
				<div>
					<button>COMPRAR ESSA COMIC</button>
				</div>
			</Content>
		</Container>
	);
};
export default ProductDetails;
