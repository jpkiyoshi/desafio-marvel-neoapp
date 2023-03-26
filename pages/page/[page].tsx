/* eslint-disable react/no-unescaped-entities */
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
	margin-top: 100px;
`;

const Title = styled.h1`
	font-family: 'Bebas Neue', cursive;
	letter-spacing: 2px;
	margin-inline: auto;
	width: fit-content;
	margin-top: 20px;
	font-size: clamp(2rem, 1.3800000000000001rem + 1.7919999999999998vw, 3.5rem);
	text-transform: uppercase;
`;

const SubTitle = styled.p`
	font-family: 'Roboto', sans-serif;
`;

const PageActions = styled.nav`
	position: relative;
	height: 20px;
	font-family: 'Roboto', sans-serif;
	color: var(--white);
	font-weight: bold;
	display: flex;
	flex-direction: column;
	width: fit-content;
	font-size: 1.1rem;
	align-items: center;
	gap: 10px;
	margin-inline: auto;

	div {
		display: flex;
	}

	p {
		display: flex;
		min-width: 15ch;
		font-size: 1rem;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
	}

	form {
		display: flex;
		align-items: baseline;

		gap: 5px;
		padding-bottom: 40px;

		@media (min-width: 800px) {
			position: absolute;
			left: 220px;
		}

		h4 {
			white-space: nowrap;
		}

		input {
			font-family: inherit;
			padding: 5px 0 5px 5px;
			font-weight: bold;
			border: 1px solid var(--orange);
			background-color: var(--black);
			color: var(--white);
		}

		button {
			color: var(--black);
			font-weight: bold;
			cursor: pointer;
			background-color: var(--orange);
			border: none;
			padding: 7px;

			&:hover {
				filter: brightness(90%);
			}
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

	&:hover {
		filter: brightness(90%);
	}
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
				<SubTitle>Explore mundos fantásticos com nossas HQ's!</SubTitle>
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
					<h4>Ir para a página</h4>
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
	const res = await fetch(
		`http://gateway.marvel.com/v1/public/comics?format=comic&ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=cfc29b20f1501cf633b27057de8fe8a1`
	);
	const comicsData = await res.json();
	const totalComics = comicsData.data?.total;
	const totalPageCount = Math.ceil(totalComics / 10);

	const paths = [...Array(totalPageCount)].map((_, index) => ({
		params: { page: `${index + 1}` },
	}));

	return {
		paths,
		fallback: true,
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
		`http://gateway.marvel.com/v1/public/comics?orderBy=title&format=comic&limit=10&offset=${offset}&ts=1&apikey=${process.env.NEXT_PUBLIC_API_KEY}&hash=cfc29b20f1501cf633b27057de8fe8a1`
	);
	const comicsData = await comicsResponse.json();
	const comics = comicsData.data?.results;
	const totalComics = comicsData.data?.total;

	const randomIndex = Math.floor(Math.random() * comics.length);
	comics[randomIndex] = { ...comics[randomIndex], isRare: true };

	return {
		props: {
			comicsData: {
				results: comics,
				total: totalComics,
			},
			pageNumber,
		},
		revalidate: 60,
	};
};
