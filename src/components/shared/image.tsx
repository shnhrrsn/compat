import Android from '@/public/images/android.svg'
import Asterisk from '@/public/images/asterisk.svg'
import Check from '@/public/images/check.svg'
import Chrome from '@/public/images/chrome.svg'
import Deno from '@/public/images/deno.svg'
import Edge from '@/public/images/edge.svg'
import Experimental from '@/public/images/experimental.svg'
import Firefox from '@/public/images/firefox.svg'
import Flag from '@/public/images/flag.svg'
import Github from '@/public/images/github.svg'
import IE from '@/public/images/ie.svg'
import Logo from '@/public/images/logo.svg'
import MobileChrome from '@/public/images/mobilechrome.svg'
import MobileFirefox from '@/public/images/mobilefirefox.svg'
import MobileOpera from '@/public/images/mobileopera.svg'
import MobileSafari from '@/public/images/mobilesafari.svg'
import Nodejs from '@/public/images/nodejs.svg'
import Opera from '@/public/images/opera.svg'
import Plus from '@/public/images/plus.svg'
import Prefix from '@/public/images/prefix.svg'
import Safari from '@/public/images/safari.svg'
import SamsungInternet from '@/public/images/samsung-internet.svg'
import Times from '@/public/images/times.svg'
import Warning from '@/public/images/warning.svg'

const ImageSrc = {
	'android': Android,
	'asterisk': Asterisk,
	'check': Check,
	'chrome': Chrome,
	'deno': Deno,
	'edge': Edge,
	'experimental': Experimental,
	'firefox': Firefox,
	'flag': Flag,
	'github': Github,
	'ie': IE,
	'logo': Logo,
	'mobilechrome': MobileChrome,
	'mobilefirefox': MobileFirefox,
	'mobileopera': MobileOpera,
	'mobilesafari': MobileSafari,
	'nodejs': Nodejs,
	'opera': Opera,
	'plus': Plus,
	'prefix': Prefix,
	'safari': Safari,
	'samsung-internet': SamsungInternet,
	'times': Times,
	'warning': Warning,
}

export type ImageSrc = keyof typeof ImageSrc

export default function Image({ src, className }: { src: ImageSrc; className?: string }) {
	const Src = ImageSrc[src]
	return <Src className={className} viewBox={src === 'logo' ? undefined : '0 0 32 32'} />
}

export function isValidImageSrc(src: string): src is keyof typeof ImageSrc {
	return src in ImageSrc
}
