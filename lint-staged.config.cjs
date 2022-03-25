const extensions = ['ts', 'tsx', 'js', 'cjs', 'json', 'yaml', 'yml', 'css', 'markdown', 'md'].join(
	',',
)

module.exports = {
	[`**/*.{${extensions}}`]: 'prettier --write',
	[`**/.{${extensions}}`]: 'prettier --write',
	[`*.{${extensions}}`]: 'prettier --write',
	[`.{${extensions}}`]: 'prettier --write',
}
