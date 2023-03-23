import { MouseEventHandler } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	font-family: 'Comic Neue', cursive;
	background-color: var(--red);
	border: 5px solid var(--black);
	color: var(--white);
	padding: 15px 32px;
	text-decoration: none;
	font-size: 1.5rem;
	font-weight: 700;
	cursor: pointer;
	transition: background-color 0.3s ease, color 0.3s ease;
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
