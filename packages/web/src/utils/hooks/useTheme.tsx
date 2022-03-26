import React from 'react'

export const Themes = ['auto', 'dark', 'light'] as const
export type Theme = typeof Themes[number]
export const htmlAttribute = 'data-color-scheme'
const storageKey = 'color-scheme'

export const initialTheme = (() => {
	const theme = getTheme()

	if (global.document && global.document.documentElement.getAttribute(htmlAttribute) !== theme) {
		global.document.documentElement.setAttribute(htmlAttribute, theme)
	}

	return theme
})()

function getTheme() {
	const theme = (global.window?.localStorage.getItem(storageKey) ??
		global.document?.documentElement?.getAttribute(htmlAttribute)) as Theme
	return !theme || !Themes.includes(theme) ? 'auto' : theme
}

function themeReducer(previousTheme: Theme, theme: Theme) {
	if (!Themes.includes(theme)) {
		return getTheme()
	}

	window.localStorage.setItem(storageKey, theme)
	document.documentElement.setAttribute(htmlAttribute, theme)
	return theme
}

export const ThemeContext = React.createContext({
	theme: initialTheme,
	setTheme: (theme: Theme) => {
		themeReducer(getTheme(), theme)
	},
})

export function ThemeProvider({ children }: { children: any }) {
	const [theme, $setTheme] = React.useReducer(themeReducer, initialTheme)

	return (
		<ThemeContext.Provider value={{ theme, setTheme: $setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default function useTheme(): [Theme, (theme: Theme) => void] {
	const { theme, setTheme } = React.useContext(ThemeContext)
	return [theme, setTheme]
}
