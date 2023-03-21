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
	return (
		<StyledHeader>
			<Content>
				<Logo />
				<ShoppingCart />
			</Content>
		</StyledHeader>
	);
};
export default Header;
