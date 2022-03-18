import classNames from 'classnames'
import { FzfResultItem } from 'fzf'
import Link from 'next/link'
import { IndexItem } from './search'
import styles from './search.module.css'

export default function Results({ results }: { results: FzfResultItem<IndexItem>[] }) {
	return (
		<div className={styles.results}>
			{results.length === 0 ? (
				<NoResults />
			) : (
				results.map(result => (
					<Link href={result.item.href} key={result.item.href}>
						<a className={styles.result} tabIndex={-1}>
							<span className={styles.resultTitle}>
								<ResultTitle
									title={result.item.title}
									positions={result.positions}
								/>
							</span>
							<span className={styles.resultHref}>
								{result.item.href.substring(1).replace(/\//g, ' / ')}
							</span>
						</a>
					</Link>
				))
			)}
		</div>
	)
}

function NoResults() {
	return (
		<span className={classNames(styles.result, styles.noResults)}>
			<strong>No Results</strong>
		</span>
	)
}

function ResultTitle({ title, positions }: { title: string; positions?: Set<number> }) {
	if (!positions || positions.size === 0) {
		return <>{title}</>
	}

	const chars = title.split('')
	const nodes = chars.map((char, i) => {
		if (positions.has(i)) {
			return (
				<span key={i} className={styles.resultTitleMatch}>
					{char}
				</span>
			)
		} else {
			return char
		}
	})

	return <>{nodes}</>
}
