import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} from '../../redux/cart.slice';
import formatMoney from '@/utils/formatMoney';
import { FormEvent, useState } from 'react';

const Container = styled.section`
	font-family: 'Roboto', sans-serif;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 50px;
	align-content: center;
	justify-items: center;
	color: var(--white);
	margin-top: 30px;
	padding: 25px;
	width: 80%;
	margin-bottom: 50px;

	@media (min-width: 380px) {
		margin-inline: auto;
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: var(--white);
	margin-top: 100px;
`;

const Title = styled.h1`
	font-family: 'Bebas Neue', cursive;
	margin-inline: auto;
	width: fit-content;
	margin-top: 20px;
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: clamp(2rem, 1.3800000000000001rem + 1.7919999999999998vw, 3.5rem);
`;

const SubTitle = styled.p`
	font-family: 'Roboto', sans-serif;
`;

const CartItemsWrapper = styled.section`
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-inline: auto;
	background-color: #ffffff0f;
	padding: 20px;
	border: 1px solid var(--orange);
	min-width: 300px;

	& > *:not(:last-child) {
		border-bottom: 1px solid var(--white);
	}
`;

const ImageContainer = styled.div<{ isRare?: boolean }>`
	position: relative;
	border: 2px solid ${({ isRare }) => (isRare ? 'var(--orange)' : 'var(--red)')};
	box-shadow: ${({ isRare }) => (isRare ? '0 0 10px #ffcc00;' : '')};
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
	width: 100%;
	gap: 20px;
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
			font-size: 1rem;
		}
	}

	p {
		font-size: 0.8rem;
		font-weight: bold;

		@media (min-width: 800px) {
			max-width: 80ch;
			font-size: 1rem;
		}
	}
`;

const CartItemActions = styled.div`
	display: flex;
	justify-content: space-between;

	& > div {
		display: flex;
		align-items: center;
		gap: 5px;
	}
`;

const Button = styled.button`
	background-color: var(--red);
	cursor: pointer;
	display: grid;
	place-content: center;
	width: 25px;
	height: 25px;
	padding-inline: 5px;
	border: 3px solid var(--black);
	color: var(--white);

	&:hover {
		opacity: 0.8;
	}
`;

const RemoveButton = styled.button`
	border: none;
	cursor: pointer;
	font-weight: 700;
	background-color: transparent;
	color: var(--orange);
	font-size: 0.9rem;

	&:hover {
		opacity: 0.8;
	}
`;

const PreviousPrice = styled.span`
	text-decoration: line-through;
	font-size: 1rem;
	margin-left: 10px;
	opacity: 0.8;
`;

const CouponForm = styled.form`
	display: flex;
	margin-inline: auto;
	gap: 8px;
	flex-direction: column;
	align-items: stretch;

	@media (min-width: 650px) {
		flex-direction: row;
		align-items: center;
	}

	h4 {
		white-space: nowrap;
	}

	input {
		font-family: inherit;
		padding: 5px 0 5px 5px;
		font-weight: bold;
		border: 1px solid var(--orange);
		background-color: var(--black);
		color: var(--white);
	}

	button {
		color: var(--black);
		font-weight: bold;
		cursor: pointer;
		background-color: var(--orange);
		border: none;
		padding: 7px;

		&:hover {
			filter: brightness(90%);
		}
	}
`;

const RareItem = styled.span`
	position: absolute;
	top: -1px;
	left: -14px;
	transform: rotate(-30deg);
	background-color: var(--red);
	color: var(--white);
	font-size: 0.6rem;
	padding: 3px;
	font-weight: bold;
`;

type CartItem = {
	id: number;
	price: number;
	quantity: number;
	title: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	isRare: boolean;
};

type State = {
	cart: CartItem[];
};

const Cart = () => {
	const cart = useSelector((state: State) => state.cart);
	const dispatch = useDispatch();
	const [coupon, setCoupon] = useState('');

	const getTotalPrice = () => {
		return cart.reduce(
			(accumulator, item) => accumulator + item.quantity * item.price,
			0
		);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;

		if ('coupon' in form.elements) {
			setCoupon((form.elements['coupon'] as HTMLInputElement).value);
		}
	};

	return (
		<>
			<TitleWrapper>
				<Title>Carrinho</Title>
				<SubTitle>Revise e finalize suas compras</SubTitle>
			</TitleWrapper>
			<Container>
				{cart.length === 0 ? (
					<p style={{ marginInline: 'auto' }}>
						Seu carrinho não possui nenhum quadrinho.
					</p>
				) : (
					<CartItemsWrapper>
						{cart.map(item => (
							<CartItem key={item.id}>
								<ImageContainer isRare={item.isRare}>
									<Image
										src={`${item.thumbnail.path}/portrait_small.${item.thumbnail.extension}`}
										alt={item.title}
										width={50}
										height={75}
										style={{ objectFit: 'cover' }}
									/>

									{item.isRare ? <RareItem>RARO!</RareItem> : ''}
								</ImageContainer>

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
				<CouponForm onSubmit={handleSubmit}>
					<label htmlFor='coupon'>Aplique um cupom de desconto:</label>
					<input type='text' id='coupon' />
					<button type='submit'>Aplicar</button>
				</CouponForm>
				<p style={{ marginInline: 'auto' }}>
					TOTAL:{' '}
					<span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
						{coupon === 'MARVEL20' ? (
							<>
								{formatMoney(getTotalPrice() * 0.8)}
								<PreviousPrice>
									{' '}
									{formatMoney(getTotalPrice())} -{' '}
								</PreviousPrice>
							</>
						) : (
							formatMoney(getTotalPrice())
						)}
					</span>
				</p>
			</Container>
		</>
	);
};
export default Cart;
