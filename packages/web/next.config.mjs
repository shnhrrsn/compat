/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,
	webpack(config, ...{ webpack }) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.tsx$/,
			loader: '@svgr/webpack',
			options: {
				svgoConfig: {
					plugins: [
						{
							name: 'removeViewBox',
							active: false,
						},
					],
				},
			},
		})

		return config
	},
}

export default nextConfig
