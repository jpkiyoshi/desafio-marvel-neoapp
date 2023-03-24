import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import ShoppingCart from '../atoms/ShoppingCart';

const StyledHeader = styled.header`
	position: fixed;
	top: 0;
	z-index: 10;
	height: 70px;
	width: 100%;
	background-color: var(--red);
	background-image: linear-gradient(to left, var(--red), 70%, var(--black));
	color: var(--black);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-inline: 25px;
	border-bottom: 2px solid var(--black);
`;

const Content = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1200px;
	margin-inline: auto;
`;

const CartCountWrapper = styled.div`
	position: relative;
	transition: transform 250ms ease-in;

	&:hover {
		transition: transform 150ms ease-out;
		transform: scale(1.08);
	}

	span {
		position: absolute;
		border: 2px solid var(--black);
		font-size: 0.9rem;
		display: grid;
		place-content: center;
		height: 22px;
		width: 22px;
		color: var(--black);
		background-color: var(--orange);
		border-radius: 500px;
		top: -10px;
		left: 55%;
	}
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
};

type State = {
	cart: CartItem[];
};

const Header = () => {
	const cart = useSelector((state: State) => state.cart);

	const getItemsCount = () => {
		return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
	};

	useEffect(() => {
		const cartCount = document.querySelector('#cart-count');
		cartCount?.classList.add('animate');

		setTimeout(() => {
			cartCount?.classList.remove('animate');
		}, 500);
	}, [cart]);

	return (
		<StyledHeader>
			<Content>
				<Link href='/page/1'>
					<Logo />
				</Link>
				<Link href='/shopping-cart'>
					<CartCountWrapper>
						<ShoppingCart />
						<span id='cart-count'>{getItemsCount()}</span>
					</CartCountWrapper>
				</Link>
			</Content>
		</StyledHeader>
	);
};

export default Header;
