import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import ProductList from '@/components/organisms/ProductList';
import styled from 'styled-components';
import ArrowRight from '@/components/atoms/ArrowRight';
import ArrowLeft from '@/components/atoms/ArrowLeft';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Price = {
	price: number;
	type: 'printPrice';
};

type Prices = Price[];

type Comic = {
	id: string;
	title: string;
	prices: Prices;
	thumbnail: {
		path: string;
		extension: string;
	};
};

type ComicsData = {
	results: Comic[];
	total: number;
};

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: var(--white);
`;

const Title = styled.h1`
	font-family: 'Roboto', sans-serif;
	margin-inline: auto;
	width: fit-content;
	margin-top: 20px;
	font-size: 1.8rem;
	font-size: clamp(1.8rem, 1.3800000000000001rem + 1.7919999999999998vw, 2.5rem);
	text-transform: uppercase;
`;

const SubTitle = styled.p`
	font-family: 'Roboto', sans-serif;
`;

const PageActions = styled.nav`
	height: 20px;
	font-family: 'Roboto', sans-serif;
	color: var(--white);
	font-weight: bold;
	display: flex;
	flex-direction: column;
	width: fit-content;
	margin-inline: auto;
	font-size: 1.1rem;
	align-items: center;
	gap: 10px;

	@media (min-width: 800px) {
		flex-direction: row;
		align-items: flex-start;
	}

	div {
		display: flex;
	}

	p {
		display: flex;
		min-width: 10ch;
		font-size: 1rem;
		align-items: center;
		justify-content: center;
	}

	form {
		display: flex;
		align-items: baseline;

		gap: 5px;
		padding-bottom: 40px;

		input {
			font-family: inherit;
			padding: 5px 0 5px 5px;
			font-weight: bold;
		}

		button {
			color: var(--black);
			font-weight: bold;
			cursor: pointer;
			background-color: var(--orange);
			border: none;
			padding: 7px;
		}
	}
`;

const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	gap: 5px;
	color: var(--white);
	background-color: var(--orange);
	width: 100%;
	justify-content: center;
`;

const ComicsPage = ({
	comicsData,
	pageNumber,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { results: comics, total: totalComics } = comicsData;
	const currentPage = parseInt(pageNumber);
	const totalPageCount = Math.ceil(totalComics / 10);

	const prevPage = currentPage - 1 <= 0 ? null : currentPage - 1;
	const nextPage = currentPage + 1 > totalPageCount ? null : currentPage + 1;

	const [pageNumberUrl, setPageNumberUrl] = useState('');
	const router = useRouter();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push(`/page/${pageNumberUrl}`);
		setPageNumberUrl('');
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPageNumberUrl(e.target.value);
	};

	return (
		<>
			<TitleWrapper>
				<Title>Quadrinhos</Title>
				<SubTitle>Explore mundos fantásticos com nossos quadrinhos!</SubTitle>
			</TitleWrapper>
			<ProductList products={comics} />
			<PageActions>
				<div>
					{prevPage && (
						<StyledLink
							onClick={() => setPageNumberUrl('')}
							href={`/page/${prevPage}`}
						>
							<ArrowLeft />
						</StyledLink>
					)}
					<p>
						{' '}
						{currentPage} de {totalPageCount}
					</p>
					{nextPage && (
						<StyledLink
							onClick={() => setPageNumberUrl('')}
							href={`/page/${nextPage}`}
						>
							<ArrowRight />
						</StyledLink>
					)}
				</div>
				<form onSubmit={handleSubmit}>
					Ir para a página
					<input
						type='number'
						min='1'
						max={totalPageCount}
						value={pageNumberUrl}
						onChange={handleInputChange}
					/>
					<button type='submit'>Ir</button>
				</form>
			</PageActions>
		</>
	);
};

export default ComicsPage;

export const getStaticPaths = async () => {
	const comicsResponse = await fetch(
		`http://gateway.marvel.com/v1/public/comics?format=comic&ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=f3c107943b00a0293c39eb2c158a731a`
	);
	const comicsData = await comicsResponse.json();
	const totalComics = comicsData.data.total;
	const totalPageCount = Math.ceil(totalComics / 10);

	const paths = [...Array(totalPageCount)].map((_, index) => ({
		params: { page: `${index + 1}` },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<
	{ comicsData: ComicsData; pageNumber: string },
	{ page: string }
> = async ({ params }) => {
	const { page } = params!;
	const pageNumber = page || '1';
	const offset = (Number(pageNumber) - 1) * 10;

	const comicsResponse = await fetch(
		`http://gateway.marvel.com/v1/public/comics?orderBy=title&format=comic&limit=10&offset=${offset}&ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=f3c107943b00a0293c39eb2c158a731a`
	);
	const comicsData = await comicsResponse.json();
	const comics = comicsData.data.results;
	const totalComics = comicsData.data.total;

	return {
		props: {
			comicsData: {
				results: comics,
				total: totalComics,
			},
			pageNumber,
		},
		revalidate: 3600,
	};
};
