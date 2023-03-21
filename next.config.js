/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'x.annihil.us',
				port: '',
				pathname: '/u/prod/marvel/**',
			},
		],
	},
};

module.exports = nextConfig;
