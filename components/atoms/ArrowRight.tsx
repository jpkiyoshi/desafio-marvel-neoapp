import Image from 'next/image';

type Props = {};
const ArrowRight = (props: Props) => {
	return (
		<Image
			src='/images/nav-arrow-right.svg'
			alt='arrow right for navigation'
			width='30'
			height='30'
		/>
	);
};
export default ArrowRight;
