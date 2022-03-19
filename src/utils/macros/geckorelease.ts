// Ported from https://github.com/mdn/yari/blob/d4ad46660c38441797ab9abac98c4bec4c25d235/kumascript/macros/geckoRelease.ejs

export function transform(ref: string) {
	// Appending a "+" to the version number you specify means that version and all later versions.
	const geckoRelease: string[] = []
	let arg = ref.trim()
	let plus = ''
	let extraMessage = ''

	if (arg.endsWith('+')) {
		arg = arg.substring(0, arg.length - 1)
		plus = '+'
	}

	switch (arg) {
		case '1.8':
			geckoRelease.push('Firefox 1.5', 'Thunderbird 1.5', 'SeaMonkey 1.0')
			break
		case '1.8.1':
			geckoRelease.push('Firefox 2', 'Thunderbird 2', 'SeaMonkey 1.1')
			break
		case '1.9':
			geckoRelease.push('Firefox 3')
			break
		case '1.9.1':
			geckoRelease.push('Firefox 3.5', 'Thunderbird 3.0', 'SeaMonkey 2.0')
			break
		case '1.9.1.4':
			geckoRelease.push('Firefox 3.5.4')
			break
		case '1.9.2':
			geckoRelease.push('Firefox 3.6', 'Thunderbird 3.1', 'Fennec 1.0')
			break
		case '1.9.2.4':
			geckoRelease.push('Firefox 3.6.4')
			break
		case '1.9.2.5':
			geckoRelease.push('Firefox 3.6.5')
			break
		case '1.9.2.9':
			geckoRelease.push('Firefox 3.6.9')
			break
		case '1.9.3':
			geckoRelease.push('Firefox 4')
			extraMessage = ' <- update this template reference to Gecko 2!'
			break
		case '2.0b2':
			geckoRelease.push('Firefox 4.0b2')
			break
		case '2.0b4':
			geckoRelease.push('Firefox 4.0b4')
			break
		case '2':
		case '2.0':
			geckoRelease.push('Firefox 4', 'Thunderbird 3.3', 'SeaMonkey 2.1')
			break
		case '2.1':
			geckoRelease.push('Firefox 4 Mobile')
			break
		default:
			if (Number(arg) >= 5) {
				geckoRelease.push(
					'Firefox ' + arg,
					'Thunderbird ' + arg,
					'SeaMonkey 2.' + (Number(arg) - 3).toString(),
				)
				switch (arg) {
					case '18':
						geckoRelease.push('Firefox OS 1.0.1', 'Firefox OS 1.1')
						break
					case '26':
						geckoRelease.push('Firefox OS 1.2')
						break
					case '28':
						geckoRelease.push('Firefox OS 1.3')
						break
					case '30':
						geckoRelease.push('Firefox OS 1.4')
						break
					case '32':
						geckoRelease.push('Firefox OS 2.0')
						break
				}
			}
			break
	}

	if (geckoRelease.length > 0) {
		return `(${geckoRelease.join(`${plus} / `)}${plus})${extraMessage}`
	}

	return ''
}
