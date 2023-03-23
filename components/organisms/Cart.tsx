import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} from '../../redux/cart.slice';
import formatMoney from '@/utils/formatMoney';

const Container = styled.section`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 50px;
	height: 100dvh;
	align-content: center;
	justify-items: center;
	background-color: var(--orange);
	margin-top: 80px;
	padding: 25px;
	width: 80%;
	margin-inline: auto;
`;

const Title = styled.h1`
	font-family: 'Comic Neue', cursive;
	font-style: italic;
	margin-inline: auto;
	font-size: 1.8rem;
	font-size: clamp(1.8rem, 1.3800000000000001rem + 1.7919999999999998vw, 2.5rem);
`;

const CartItemsWrapper = styled.section`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-inline: auto;

	& > *:not(:last-child) {
		border-bottom: 1px solid hsla(0, 0%, 0%, 0.2);
	}
`;

const CartItem = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	padding-bottom: 20px;
`;

const CartItemContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
`;

const CartItemHeading = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;

	h2 {
		font-size: 0.8rem;
		max-width: 17ch;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		@media (min-width: 800px) {
			max-width: 80ch;
		}
	}

	p {
		font-size: 0.8rem;
	}
`;

const CartItemActions = styled.div`
	display: flex;
	justify-content: space-between;

	& > div {
		display: flex;
		gap: 5px;
	}
`;

const Button = styled.button`
	background-color: var(--red);
	cursor: pointer;
	display: grid;
	place-content: center;
	width: 20px;
	height: 20px;
	padding-inline: 5px;
	border: 3px solid var(--black);
	color: var(--white);
`;

const RemoveButton = styled.button`
	border: none;
	cursor: pointer;
	font-weight: 700;
	background-color: transparent;
	color: var(--red);
	font-size: 0.7rem;
`;

const TotalPrice = styled.p``;

const Cart = () => {
	const cart = useSelector(state => state.cart);
	const dispatch = useDispatch();

	const getTotalPrice = () => {
		return cart.reduce(
			(accumulator, item) => accumulator + item.quantity * item.price,
			0
		);
	};

	return (
		<Container>
			<Title>Carrinho</Title>
			{cart.length === 0 ? (
				<div>Seu carrinho não possui nenhum quadrinho.</div>
			) : (
				<CartItemsWrapper>
					{cart.map(item => (
						<CartItem key={item.id}>
							<Image
								src={`${item.thumbnail.path}/portrait_small.${item.thumbnail.extension}`}
								alt={item.title}
								width={50}
								height={75}
								style={{ objectFit: 'cover' }}
							/>
							<CartItemContent>
								<CartItemHeading>
									<h2>{item.title}</h2>
									<p>{formatMoney(item.quantity * item.price)}</p>
								</CartItemHeading>
								<CartItemActions>
									<div>
										<Button
											onClick={() =>
												dispatch(decrementQuantity(item.id))
											}
										>
											-
										</Button>
										<p>{item.quantity}</p>
										<Button
											onClick={() =>
												dispatch(incrementQuantity(item.id))
											}
										>
											+
										</Button>
									</div>
									<div>
										<RemoveButton
											onClick={() =>
												dispatch(removeFromCart(item.id))
											}
										>
											Remover
										</RemoveButton>
									</div>
								</CartItemActions>
							</CartItemContent>
						</CartItem>
					))}
				</CartItemsWrapper>
			)}
			<TotalPrice style={{ marginInline: 'auto' }}>
				TOTAL:{' '}
				<span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
					{formatMoney(getTotalPrice())}
				</span>
			</TotalPrice>
		</Container>
	);
};
export default Cart;
