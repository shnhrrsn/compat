import classNames from 'classnames'
import styles from './themePicker.module.css'

export function ThemePicker<T extends string>({
	themes,
	theme: activeTheme,
	setTheme,
}: {
	themes: ReadonlyArray<T>
	theme: T
	setTheme: (value: T) => void
}) {
	return (
		<div className={styles.themes}>
			{themes.map(theme => (
				<button
					key={theme}
					className={classNames(styles.theme, theme === activeTheme && styles.active)}
					onClick={() => setTheme(theme)}
				>
					<span className={styles.title}>{theme}</span>
				</button>
			))}
		</div>
	)
}
