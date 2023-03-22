import styled from 'styled-components';

const StyledMainSection = styled.main`
	background-image: url('/images/hero-image.jpg');
	background-size: auto;
	background-position: center;
	background-repeat: repeat;
`;

const HeroSection = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<StyledMainSection>{children}</StyledMainSection>
		</div>
	);
};
export default HeroSection;
