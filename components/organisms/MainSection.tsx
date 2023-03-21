import styled from 'styled-components';

const StyledMainSection = styled.main`
	width: 100%;
	height: 100dvh;
	background-image: url('/images/hero-image.jpg');
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const HeroSection = ({ children }: { children: React.ReactNode }) => {
	return <StyledMainSection>{children}</StyledMainSection>;
};
export default HeroSection;
