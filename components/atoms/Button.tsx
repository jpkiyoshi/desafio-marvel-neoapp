import styled from 'styled-components';

type Props = {};

const StyledButton = styled.button`
	font-family: 'Comic Neue', cursive;
	background-color: var(--red);
	border: 5px solid var(--black);
	color: var(--white);
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 2rem;
	font-weight: 700;
	cursor: pointer;
	transition: background-color 0.3s ease, color 0.3s ease;
	max-width: 15ch;
	/* -webkit-text-stroke: 2px black; */

	&:hover {
		background-color: var(--orange);
		color: var(--black);
	}
`;

function Button({ children }: { children: React.ReactNode }) {
	return <StyledButton>{children}</StyledButton>;
}
export default Button;
