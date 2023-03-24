import { MouseEventHandler } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	font-family: 'Bebas Neue', cursive;
	letter-spacing: 1px;
	background-color: var(--red);
	background-image: linear-gradient(to left, var(--red), 80%, var(--black));
	background-size: 200% 200%;
	border: 5px solid var(--black);
	color: var(--white);
	padding: 15px 32px;
	text-decoration: none;
	font-size: 1.5rem;
	font-weight: 700;
	cursor: pointer;
	transition: background-position 200ms ease-in-out;
	width: fit-content;

	&:hover {
		background-position: 100% 0%;
	}
`;

function Button({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
	return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
export default Button;
