module.exports = {
	arrowParens: 'avoid',
	bracketSpacing: true,
	printWidth: 100,
	quoteProps: 'consistent',
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: false,
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs', '**/*.cjs', '**/*.css'],
			options: {
				tabWidth: 4,
				useTabs: true,
			},
		},
	],
}
