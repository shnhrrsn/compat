/**
 * @param {Object} options
 * @param {('desktop' | 'mobile' | 'tablet')[]} options.devices
 * @param {'browser_version' | 'ios_version'} options.type
 * @param {'ww'} [options.region]
 */
export default function buildURL(options) {
	const date = new Date()
	date.setUTCHours(0, 0, 0, 0)
	date.setUTCMonth(date.getUTCMonth() - 1, 1)

	const monthYear = date.toISOString().substring(0, 7)
	const url = new URL('https://gs.statcounter.com/chart.php')

	url.searchParams.set('csv', '1')
	url.searchParams.set('statType_hidden', options.type)
	url.searchParams.set('device_hidden', options.devices.join('+'))
	url.searchParams.set('region_hidden', options.region ?? 'ww')
	url.searchParams.set('granularity', 'monthly')
	url.searchParams.set('fromMonthYear', monthYear)
	url.searchParams.set('toMonthYear', monthYear)

	if (options.devices.length) {
		url.searchParams.set('multi-device', 'true')
	}

	return url
}
