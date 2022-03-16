import Android from '@/public/images/android.svg'
import Chrome from '@/public/images/chrome.svg'
import Deno from '@/public/images/deno.svg'
import Edge from '@/public/images/edge.svg'
import Firefox from '@/public/images/firefox.svg'
import Github from '@/public/images/github.svg'
import IE from '@/public/images/ie.svg'
import Logo from '@/public/images/logo.svg'
import Nodejs from '@/public/images/nodejs.svg'
import Opera from '@/public/images/opera.svg'
import Safari from '@/public/images/safari.svg'
import SamsungInternet from '@/public/images/samsung-internet.svg'

const ImageSrc = {
	'android': Android,
	'deno': Deno,
	'firefox': Firefox,
	'ie': IE,
	'nodejs': Nodejs,
	'safari': Safari,
	'chrome': Chrome,
	'edge': Edge,
	'github': Github,
	'logo': Logo,
	'opera': Opera,
	'samsung-internet': SamsungInternet,
}

export default function Image({
	src,
	className,
}: {
	src: keyof typeof ImageSrc
	className?: string
}) {
	const Icon = ImageSrc[src]
	return <Icon className={className} viewBox={src === 'logo' ? undefined : '0 0 32 32'} />
}

export function isValidImageSrc(src: string): src is keyof typeof ImageSrc {
	return src in ImageSrc
}
