import styled from 'styled-components';

const StyledMainSection = styled.main`
	height: 100dvh;
	background-image: url('/images/hero-image.jpg');
	background-size: cover;
	background-position: center;
`;

const HeroSection = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<StyledMainSection>{children}</StyledMainSection>
		</div>
	);
};
export default HeroSection;
