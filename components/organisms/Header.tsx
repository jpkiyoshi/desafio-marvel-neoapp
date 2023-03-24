import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Logo from '../atoms/Logo';
import ShoppingCart from '../atoms/ShoppingCart';

const pulse = keyframes`
0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
  }
  70% {
    transform: scale(1.2);
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }`;

const StyledHeader = styled.header`
	height: 70px;
	width: 100%;
	background-color: var(--orange);
	color: var(--black);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-inline: 25px;
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

	span {
		position: absolute;
		border: 2px solid var(--black);
		font-size: 0.8rem;
		display: grid;
		place-content: center;
		height: 20px;
		width: 20px;
		color: var(--white);
		background-color: var(--red);
		border-radius: 500px;
		top: -5px;
		left: 55%;
		transform: translateX(-50%);
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
