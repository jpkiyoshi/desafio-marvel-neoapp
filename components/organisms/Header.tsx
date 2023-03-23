import Link from 'next/link';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Logo from '../atoms/Logo';
import ShoppingCart from '../atoms/ShoppingCart';

type Props = {};

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

const Header = (props: Props) => {
	const cart = useSelector(state => state.cart);

	const getItemsCount = () => {
		return cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
	};

	return (
		<StyledHeader>
			<Content>
				<Link href='/'>
					<Logo />
				</Link>
				<Link href='/shopping-cart'>
					<ShoppingCart />
					<p>({getItemsCount()})</p>
				</Link>
			</Content>
		</StyledHeader>
	);
};
export default Header;
