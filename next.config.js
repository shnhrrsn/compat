/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	poweredByHeader: false,
	webpack(config, ...{ webpack }) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.tsx$/,
			use: ['@svgr/webpack'],
		})
		return config
	},
}

module.exports = nextConfig
