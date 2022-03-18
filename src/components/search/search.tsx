import useRouteChangeStart from '@/utils/hooks/useRouteChangeStart'
import classNames from 'classnames'
import { FzfResultItem } from 'fzf'
import { useEffect, useState } from 'react'
import Results from './results'
import styles from './search.module.css'

export type IndexItem = { href: string; title: string }
let $worker: Worker | undefined
export default function Search({
	autoFocus,
	className,
	floating,
}: {
	autoFocus?: boolean
	floating?: boolean
	className?: string
}) {
	const [term, setTerm] = useState('')
	const [results, setResults] = useState(undefined as undefined | FzfResultItem<IndexItem>[])

	useEffect(() => {
		if (term.trim().length === 0) {
			setResults(undefined)
			return
		}

		if (!$worker) {
			// @ts-ignore
			$worker = new Worker(new URL('../../workers/search.ts', import.meta.url))
		}

		$worker.onmessage = ({ data }) => {
			if (data.term !== term) {
				return
			}

			setResults(data.results)
		}

		$worker.postMessage({ term, limit: 15 })
	}, [term])

	// Dismiss results when page changes
	useRouteChangeStart(() => {
		setTerm('')
		;(document.querySelector(':focus') as any)?.blur()
	})

	return (
		<div className={classNames(styles.container, floating ? styles.floating : className)}>
			<div className={styles.search}>
				<input
					type="text"
					autoFocus={autoFocus}
					placeholder="Search&hellip;"
					className={styles.input}
					spellCheck={false}
					autoCapitalize="off"
					autoCorrect="off"
					value={term}
					onChange={e => setTerm(e.target.value)}
				/>
			</div>
			{results && <Results results={results} />}
		</div>
	)
}
