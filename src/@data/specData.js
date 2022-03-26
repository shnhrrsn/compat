/** @type {Readonly<Record<string, { name: string; status: string; url: string }>>} */
const specData = Object.freeze({
	'Accelerometer': {
		name: 'Accelerometer',
		url: 'https://www.w3.org/TR/accelerometer/',
		status: 'CR',
	},
	'Alarm API': {
		name: 'Web Alarms API',
		url: 'https://www.w3.org/2012/sysapps/web-alarms/',
		status: 'Obsolete',
	},
	'AmbientLight': {
		name: 'Ambient Light Sensor',
		url: 'https://w3c.github.io/ambient-light/',
		status: 'CR',
	},
	'ARIA': {
		name: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1',
		url: 'https://www.w3.org/TR/wai-aria-1.1/',
		status: 'REC',
	},
	'ARIA 1.2': {
		name: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2',
		url: 'https://www.w3.org/TR/wai-aria-1.2/',
		status: 'WD',
	},
	'ARIA Authoring Practices 1.1': {
		name: 'WAI-ARIA Authoring Practices 1.1',
		url: 'https://www.w3.org/TR/wai-aria-practices-1.1/',
		status: 'NOTE',
	},
	'ARIA Authoring Practices 1.2': {
		name: 'WAI-ARIA Authoring Practices 1.2',
		url: 'https://www.w3.org/TR/wai-aria-practices-1.2/',
		status: 'WD',
	},
	'ARIA in HTML': {
		name: 'ARIA in HTML',
		url: 'https://w3c.github.io/html-aria/',
		status: 'WD',
	},
	'Async Function': {
		name: 'ECMAScript Async Functions',
		url: 'https://tc39.es/ecmascript-asyncawait/',
		status: 'Draft',
	},
	'Async Iteration': {
		name: 'ECMAScript Async Iteration Functions',
		url: 'https://tc39.es/proposal-async-iteration/',
		status: 'Draft',
	},
	'Audio Output': {
		name: 'Audio Output Devices API',
		url: 'https://w3c.github.io/mediacapture-output/',
		status: 'CR',
	},
	'Background Fetch': {
		name: 'Background Fetch',
		url: 'https://wicg.github.io/background-fetch/',
		status: 'Draft',
	},
	'Background Sync': {
		name: 'Web Background Synchronization',
		url: 'https://wicg.github.io/background-sync/spec/',
		status: 'Living',
	},
	'Background Tasks': {
		name: 'Cooperative Scheduling of Background Tasks',
		url: 'https://www.w3.org/TR/requestidlecallback/',
		status: 'PR',
	},
	'Badging API': {
		name: 'Badging API',
		url: 'https://w3c.github.io/badging/',
		status: 'Draft',
	},
	'Barcode Detection API': {
		name: 'Accelerated Shape Detection in Images',
		url: 'https://wicg.github.io/shape-detection-api/',
		status: 'Draft',
	},
	'Battery API': {
		name: 'Battery Status API',
		url: 'https://w3c.github.io/battery/',
		status: 'CR',
	},
	'Beacon': {
		name: 'Beacon',
		url: 'https://w3c.github.io/beacon/',
		status: 'CR',
	},
	'Clipboard API': {
		name: 'Clipboard API and events',
		url: 'https://w3c.github.io/clipboard-apis/',
		status: 'WD',
	},
	'Compat': {
		name: 'Compatibility Standard',
		url: 'https://compat.spec.whatwg.org/',
		status: 'Living',
	},
	'Compositing': {
		name: 'Compositing and Blending Level 1',
		url: 'https://drafts.fxtf.org/compositing-1/',
		status: 'CR',
	},
	'Console API': {
		name: 'Console API',
		url: 'https://console.spec.whatwg.org/',
		status: 'Living',
	},
	'Compression Streams': {
		name: 'Compression Streams',
		url: 'https://wicg.github.io/compression/',
		status: 'Draft',
	},
	'Contacts': {
		name: 'Contacts Manager API',
		url: 'https://www.w3.org/2012/sysapps/contacts-manager-api/',
		status: 'Obsolete',
	},
	'Contact Picker API': {
		name: 'Contact Picker API',
		url: 'https://wicg.github.io/contact-api/spec/',
		status: 'Draft',
	},
	'Content Index API': {
		name: 'Content Index API',
		url: 'https://wicg.github.io/content-index/spec/',
		status: 'ED',
	},
	'Cookie Prefixes': {
		name: 'Cookie Prefixes',
		url: 'https://datatracker.ietf.org/doc/html/draft-west-cookie-prefixes-05',
		status: 'Draft',
	},
	'Cookie Store API': {
		name: 'Cookie Store API',
		url: 'https://wicg.github.io/cookie-store/',
		status: 'Draft',
	},
	'Credential Management': {
		name: 'Credential Management Level 1',
		url: 'https://w3c.github.io/webappsec-credential-management/',
		status: 'WD',
	},
	'CSP 1.0': {
		name: 'Content Security Policy 1.0',
		url: 'https://www.w3.org/TR/CSP1/',
		status: 'Obsolete',
	},
	'CSP 1.1': {
		name: 'Content Security Policy Level 2',
		url: 'https://www.w3.org/TR/CSP2/',
		status: 'REC',
	},
	'CSP 3.0': {
		name: 'Content Security Policy Level 3',
		url: 'https://w3c.github.io/webappsec-csp/',
		status: 'WD',
	},
	'CSP Embedded': {
		name: 'Content Security Policy: Embedded Enforcement',
		url: 'https://w3c.github.io/webappsec-cspee/',
		status: 'WD',
	},
	'CSS1': {
		name: 'CSS Level&nbsp;1',
		url: 'https://www.w3.org/TR/CSS1/',
		status: 'REC',
	},
	'CSS2.1': {
		name: 'CSS Level&nbsp;2 (Revision&nbsp;1)',
		url: 'https://www.w3.org/TR/CSS2/',
		status: 'REC',
	},
	'CSS2.2': {
		name: 'CSS Level&nbsp;2 (Revision&nbsp;2)',
		url: 'https://www.w3.org/TR/CSS22/',
		status: 'WD',
	},
	'CSS3 Animations': {
		name: 'CSS Animations Level 1',
		url: 'https://drafts.csswg.org/css-animations-1/',
		status: 'WD',
	},
	'CSS3 Animations 2': {
		name: 'CSS Animations Level 2',
		url: 'https://drafts.csswg.org/css-animations-2/',
		status: 'WD',
	},
	'CSS3 Backgrounds': {
		name: 'CSS Backgrounds and Borders Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-backgrounds-3/',
		status: 'CR',
	},
	'CSS3 Basic UI': {
		name: 'CSS Basic User Interface Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-ui-3/',
		status: 'REC',
	},
	'CSS3 Basic UI 4': {
		name: 'CSS Basic User Interface Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-ui-4/',
		status: 'ED',
	},
	'CSS3 Box': {
		name: 'CSS Box Model',
		url: 'https://drafts.csswg.org/css-box-3/',
		status: 'CR',
	},
	'CSS3 Box Alignment': {
		name: 'CSS Box Alignment Module Level 3',
		url: 'https://drafts.csswg.org/css-align-3/',
		status: 'WD',
	},
	'CSS3 Cascade': {
		name: 'CSS Cascading and Inheritance Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-cascade-3/',
		status: 'REC',
	},
	'CSS3 Colors': {
		name: 'CSS Color Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-color-3/',
		status: 'REC',
	},
	'CSS3 Conditional': {
		name: 'CSS Conditional Rules Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-conditional-3/',
		status: 'CR',
	},
	'CSS3 Content': {
		name: 'CSS Generated Content Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-content-3/',
		status: 'WD',
	},
	'CSS3 Counter Styles': {
		name: 'CSS Counter Styles Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-counter-styles-3/',
		status: 'CR',
	},
	'CSS3 Device': {
		name: 'CSS Device Adaptation',
		url: 'https://drafts.csswg.org/css-device-adapt/',
		status: 'WD',
	},
	'CSS3 Display': {
		name: 'CSS Display Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-display/',
		status: 'CR',
	},
	'CSS Easing 1': {
		name: 'CSS Easing Functions Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-easing-1/',
		status: 'CR',
	},
	'CSS3 Environment Variables': {
		name: 'CSS Environment Variables Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-env-1/',
		status: 'ED',
	},
	'CSS3 Font Loading': {
		name: 'CSS Font Loading Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-font-loading/',
		status: 'WD',
	},
	'CSS3 Fonts': {
		name: 'CSS Fonts Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-fonts-3/',
		status: 'REC',
	},
	'CSS3 Fragmentation': {
		name: 'CSS Fragmentation Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-break-3/',
		status: 'CR',
	},
	'CSS3 GCPM': {
		name: 'CSS Generated Content for Paged Media Module',
		url: 'https://drafts.csswg.org/css-gcpm-3/',
		status: 'WD',
	},
	'CSS3 Images': {
		name: 'CSS Images Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-images-3/',
		status: 'CR',
	},
	'CSS3 Inline': {
		name: 'CSS Inline Layout',
		url: 'https://drafts.csswg.org/css-inline/',
		status: 'WD',
	},
	'CSS3 Lists': {
		name: 'CSS Lists Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-lists-3/',
		status: 'WD',
	},
	'CSS3 Media Queries': {
		name: 'Media Queries',
		url: 'https://drafts.csswg.org/mediaqueries-3/',
		status: 'REC',
	},
	'CSS3 Multicol': {
		name: 'CSS Multi-column Layout Module',
		url: 'https://drafts.csswg.org/css-multicol-1/',
		status: 'WD',
	},
	'CSS3 Overflow': {
		name: 'CSS Overflow Module Level 3',
		url: 'https://drafts.csswg.org/css-overflow-3/',
		status: 'WD',
	},
	'CSS3 Namespaces': {
		name: 'CSS Namespaces Module',
		url: 'https://drafts.csswg.org/css-namespaces-3/',
		status: 'REC',
	},
	'CSS3 Paged Media': {
		name: 'CSS Paged Media Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-page-3/',
		status: 'WD',
	},
	'CSS3 Positioning': {
		name: 'CSS Positioned Layout Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-position-3/',
		status: 'WD',
	},
	'CSS3 Regions': {
		name: 'CSS Regions Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-regions-1/',
		status: 'WD',
	},
	'CSS3 Ruby': {
		name: 'CSS Ruby Layout Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-ruby/',
		status: 'WD',
	},
	'CSS3 Selectors': {
		name: 'Selectors Level&nbsp;3',
		url: 'https://drafts.csswg.org/selectors-3/',
		status: 'REC',
	},
	'CSS3 Sizing': {
		name: 'CSS Box Sizing Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-sizing-3/',
		status: 'WD',
	},
	'CSS3 Speech': {
		name: 'CSS Speech Module',
		url: 'https://drafts.csswg.org/css-speech-1/',
		status: 'CR',
	},
	'CSS3 Style': {
		name: 'CSS Style Attributes',
		url: 'https://drafts.csswg.org/css-style-attr/',
		status: 'REC',
	},
	'CSS3 Syntax': {
		name: 'CSS Syntax Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-syntax/',
		status: 'CR',
	},
	'CSS3 Text': {
		name: 'CSS Text Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-text-3/',
		status: 'CR',
	},
	'CSS3 Text Decoration': {
		name: 'CSS Text Decoration Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-text-decor-3/',
		status: 'CR',
	},
	'CSS3 Transforms': {
		name: 'CSS Transforms Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-transforms/',
		status: 'WD',
	},
	'CSS3 Transitions': {
		name: 'CSS Transitions',
		url: 'https://drafts.csswg.org/css-transitions/',
		status: 'WD',
	},
	'CSS3 Transitions Level 2': {
		name: 'CSS Transitions Level 2',
		url: 'https://drafts.csswg.org/css-transitions-2/',
		status: 'ED',
	},
	'CSS3 Values': {
		name: 'CSS Values and Units Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-values-3/',
		status: 'CR',
	},
	'CSS3 Variables': {
		name: 'CSS Custom Properties for Cascading Variables Module Level&nbsp;1',
		url: 'https://www.w3.org/TR/css-variables-1/',
		status: 'CR',
	},
	'CSS3 Writing Modes': {
		name: 'CSS Writing Modes Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-writing-modes-3/',
		status: 'PR',
	},
	'CSS4 Backgrounds': {
		name: 'CSS Backgrounds and Borders Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-backgrounds-4/',
		status: 'ED',
	},
	'CSS4 Basic UI': {
		name: 'CSS Basic User Interface Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-ui-4/',
		status: 'WD',
	},
	'CSS4 Box': {
		name: 'CSS Box Model Module Level 4',
		url: 'https://drafts.csswg.org/css-box-4/',
		status: 'ED',
	},
	'CSS4 Cascade': {
		name: 'CSS Cascading and Inheritance Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-cascade/',
		status: 'CR',
	},
	'CSS4 Colors': {
		name: 'CSS Color Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-color/',
		status: 'WD',
	},
	'CSS4 Conditional': {
		name: 'CSS Conditional Rules Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-conditional-4/',
		status: 'ED',
	},
	'CSS4 Fonts': {
		name: 'CSS Fonts Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-fonts-4/',
		status: 'WD',
	},
	'CSS4 Fragmentation': {
		name: 'CSS Fragmentation Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-break-4/',
		status: 'WD',
	},
	'CSS4 Images': {
		name: 'CSS Images Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-images-4/',
		status: 'WD',
	},
	'CSS4 Media Queries': {
		name: 'Media Queries Level&nbsp;4',
		url: 'https://drafts.csswg.org/mediaqueries-4/',
		status: 'CR',
	},
	'CSS4 Overflow': {
		name: 'CSS Overflow Module Level 4',
		url: 'https://drafts.csswg.org/css-overflow-4/',
		status: 'WD',
	},
	'CSS4 Pseudo-Elements': {
		name: 'CSS Pseudo-Elements Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-pseudo-4/',
		status: 'WD',
	},
	'CSS4 Selectors': {
		name: 'Selectors Level&nbsp;4',
		url: 'https://drafts.csswg.org/selectors-4/',
		status: 'WD',
	},
	'CSS4 Sizing': {
		name: 'CSS Box Sizing Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-sizing-4/',
		status: 'ED',
	},
	'CSS4 Text': {
		name: 'CSS Text Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-text-4/',
		status: 'ED',
	},
	'CSS4 Text Decoration': {
		name: 'CSS Text Decoration Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-text-decor-4/',
		status: 'WD',
	},
	'CSS4 Values': {
		name: 'CSS Values and Units Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-values-4/',
		status: 'ED',
	},
	'CSS4 Writing Modes': {
		name: 'CSS Writing Modes Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-writing-modes-4/',
		status: 'CR',
	},
	'CSS5 Cascade': {
		name: 'CSS Cascading and Inheritance Level&nbsp;5',
		url: 'https://drafts.csswg.org/css-cascade-5/',
		status: 'WD',
	},
	'CSS5 Colors': {
		name: 'CSS Color Module Level&nbsp;5',
		url: 'https://drafts.csswg.org/css-color-5/',
		status: 'WD',
	},
	'CSS5 Fonts': {
		name: 'CSS Fonts Module Level&nbsp;5',
		url: 'https://drafts.csswg.org/css-fonts-5/',
		status: 'WD',
	},
	'CSS5 Media Queries': {
		name: 'Media Queries Level&nbsp;5',
		url: 'https://drafts.csswg.org/mediaqueries-5/',
		status: 'ED',
	},
	'CSS Animation Worklet': {
		name: 'CSS Animation Worklet API',
		url: 'https://wicg.github.io/animation-worklet/',
		status: 'Draft',
	},
	'CSS Containment': {
		name: 'CSS Containment Module Level 1',
		url: 'https://drafts.csswg.org/css-contain-1/',
		status: 'REC',
	},
	'CSS Containment 2': {
		name: 'CSS Containment Module Level 2',
		url: 'https://drafts.csswg.org/css-contain-2/',
		status: 'WD',
	},
	'CSS Color Adjust': {
		name: 'CSS Color Adjustment Module Level 1',
		url: 'https://drafts.csswg.org/css-color-adjust-1/',
		status: 'ED',
	},
	'CSS Exclusions': {
		name: 'CSS Exclusions Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-exclusions/',
		status: 'WD',
	},
	'CSS Flexbox': {
		name: 'CSS Flexible Box Layout Module',
		url: 'https://drafts.csswg.org/css-flexbox-1/',
		status: 'CR',
	},
	'CSS Font Rendering': {
		name: 'CSS Font Rendering Controls Module Level 1',
		url: 'https://tabatkins.github.io/specs/css-font-display/',
		status: 'Draft',
	},
	'CSS Grid': {
		name: 'CSS Grid Layout',
		url: 'https://drafts.csswg.org/css-grid/',
		status: 'CR',
	},
	'CSS Grid 2': {
		name: 'CSS Grid Layout Module Level 2',
		url: 'https://drafts.csswg.org/css-grid-2/',
		status: 'WD',
	},
	'CSS Grid 3': {
		name: 'CSS Grid Layout Module Level 3',
		url: 'https://drafts.csswg.org/css-grid-3/',
		status: 'ED',
	},
	'CSS Layout': {
		name: 'CSS Layout API Level 1',
		url: 'https://drafts.css-houdini.org/css-layout-api-1/',
		status: 'WD',
	},
	'CSS Line Grid': {
		name: 'CSS Line Grid Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-line-grid/',
		status: 'WD',
	},
	'CSS Logical Properties': {
		name: 'CSS Logical Properties and Values Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-logical/',
		status: 'ED',
	},
	'CSS Masks': {
		name: 'CSS Masking Module Level&nbsp;1',
		url: 'https://drafts.fxtf.org/css-masking-1/',
		status: 'CR',
	},
	'CSS Non-element Selectors': {
		name: 'Non-element Selectors Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/selectors-nonelement/',
		status: 'WD',
	},
	'CSS Painting API': {
		name: 'CSS Painting API Level 1',
		url: 'https://drafts.css-houdini.org/css-paint-api-1/',
		status: 'WD',
	},
	'CSS Overscroll Behavior': {
		name: 'CSS Overscroll Behavior Module Level 1',
		url: 'https://drafts.csswg.org/css-overscroll-1/',
		status: 'WD',
	},
	'CSS Properties and Values API': {
		name: 'CSS Properties and Values API Level&nbsp;1',
		url: 'https://drafts.css-houdini.org/css-properties-values-api-1/',
		status: 'WD',
	},
	'CSS Rhythmic Sizing': {
		name: 'CSS Rhythmic Sizing',
		url: 'https://drafts.csswg.org/css-rhythm/',
		status: 'WD',
	},
	'CSS Round Display': {
		name: 'CSS Round Display Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-round-display/',
		status: 'WD',
	},
	'CSS Scope': {
		name: 'CSS Scoping Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-scoping/',
		status: 'WD',
	},
	'CSS Scrollbars': {
		name: 'CSS Scrollbars Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-scrollbars-1/',
		status: 'WD',
	},
	'CSS Scroll Anchoring': {
		name: 'CSS Scroll Anchoring Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-scroll-anchoring/',
		status: 'ED',
	},
	'CSS Scroll Snap': {
		name: 'CSS Scroll Snap Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-scroll-snap-1/',
		status: 'CR',
	},
	'CSS Shadow Parts': {
		name: 'Shadow Parts',
		url: 'https://drafts.csswg.org/css-shadow-parts-1/',
		status: 'WD',
	},
	'CSS Shapes': {
		name: 'CSS Shapes Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-shapes/',
		status: 'CR',
	},
	'CSS Shapes 2': {
		name: 'CSS Shapes Module Level&nbsp;2',
		url: 'https://drafts.csswg.org/css-shapes-2/',
		status: 'ED',
	},
	'CSS Text Size Adjust': {
		name: 'CSS Mobile Text Size Adjustment Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-size-adjust/',
		status: 'ED',
	},
	'CSS Transforms 2': {
		name: 'CSS Transforms Level&nbsp;2',
		url: 'https://drafts.csswg.org/css-transforms-2/',
		status: 'ED',
	},
	'CSS Typed OM': {
		name: 'CSS Typed OM Level 1',
		url: 'https://drafts.css-houdini.org/css-typed-om-1/',
		status: 'WD',
	},
	'CSS Will Change': {
		name: 'CSS Will Change Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-will-change/',
		status: 'CR',
	},
	'CSSOM': {
		name: 'CSS Object Model (CSSOM)',
		url: 'https://drafts.csswg.org/cssom/',
		status: 'WD',
	},
	'CSSOM View': {
		name: 'CSS Object Model (CSSOM) View Module',
		url: 'https://drafts.csswg.org/cssom-view/',
		status: 'WD',
	},
	'Custom Scroll Restoration': {
		name: 'Custom Scroll Restoration - History-based API',
		url: 'https://majido.github.io/scroll-restoration-proposal/history-based-api.html',
		status: 'Draft',
	},
	'Data Store API': {
		name: 'Data Store API',
		url: 'https://airpingu.github.io/data-store-api/index.html',
		status: 'Draft',
	},
	'Device Memory': {
		name: 'Device Memory 1',
		url: 'https://w3c.github.io/device-memory/',
		status: 'ED',
	},
	'Device Orientation': {
		name: 'DeviceOrientation Event Specification',
		url: 'https://w3c.github.io/deviceorientation/',
		status: 'ED',
	},
	'DOM Parsing': {
		name: 'DOM Parsing and Serialization',
		url: 'https://w3c.github.io/DOM-Parsing/',
		status: 'WD',
	},
	'DOM WHATWG': {
		name: 'DOM',
		url: 'https://dom.spec.whatwg.org/',
		status: 'Living',
	},
	'DOM1': {
		name: 'Document Object Model (DOM) Level 1 Specification',
		url: 'https://www.w3.org/TR/REC-DOM-Level-1/',
		status: 'Obsolete',
	},
	'DOM2 Core': {
		name: 'Document Object Model (DOM) Level 2 Core Specification',
		url: 'https://www.w3.org/TR/DOM-Level-2-Core/',
		status: 'Obsolete',
	},
	'DOM2 Events': {
		name: 'Document Object Model (DOM) Level 2 Events Specification',
		url: 'https://www.w3.org/TR/DOM-Level-2-Events/events.html',
		status: 'Obsolete',
	},
	'DOM2 HTML': {
		name: 'Document Object Model (DOM) Level 2 HTML Specification',
		url: 'https://www.w3.org/TR/DOM-Level-2-HTML/',
		status: 'Obsolete',
	},
	'DOM2 Style': {
		name: 'Document Object Model (DOM) Level 2 Style Specification',
		url: 'https://www.w3.org/TR/DOM-Level-2-Style/',
		status: 'Obsolete',
	},
	'DOM2 Traversal_Range': {
		name: 'Document Object Model (DOM) Level 2 Traversal and Range Specification',
		url: 'https://www.w3.org/TR/DOM-Level-2-Traversal-Range/',
		status: 'Obsolete',
	},
	'DOM3 Core': {
		name: 'Document Object Model (DOM) Level 3 Core Specification',
		url: 'https://www.w3.org/TR/DOM-Level-3-Core/',
		status: 'Obsolete',
	},
	'DOM3 Events': {
		name: 'Document Object Model (DOM) Level 3 Events Specification',
		url: 'https://www.w3.org/TR/2014/WD-DOM-Level-3-Events-20140925/',
		status: 'Obsolete',
	},
	'DOM3 XPath': {
		name: 'Document Object Model (DOM) Level 3 XPath Specification',
		url: 'https://www.w3.org/TR/DOM-Level-3-XPath/',
		status: 'REC',
	},
	'DOM4': {
		name: 'DOM4',
		url: 'https://www.w3.org/TR/dom/',
		status: 'Obsolete',
	},
	'Element Timing API': {
		name: 'Element Timing',
		url: 'https://wicg.github.io/element-timing/',
		status: 'ED',
	},
	'Element Traversal': {
		name: 'Element Traversal Specification',
		url: 'https://www.w3.org/TR/ElementTraversal/',
		status: 'Obsolete',
	},
	'EME': {
		name: 'Encrypted Media Extensions',
		url: 'https://w3c.github.io/encrypted-media/',
		status: 'REC',
	},
	'Encoding': {
		name: 'Encoding',
		url: 'https://encoding.spec.whatwg.org/',
		status: 'Living',
	},
	'ES1': {
		name: 'ECMAScript 1st Edition (ECMA-262)',
		url: 'https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%201st%20edition,%20June%201997.pdf',
		status: 'Standard',
	},
	'ES3': {
		name: 'ECMAScript 3rd Edition (ECMA-262)',
		url: 'https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf',
		status: 'Standard',
	},
	'ES5.1': {
		name: 'ECMAScript 5.1 (ECMA-262)',
		url: 'https://www.ecma-international.org/ecma-262/5.1/',
		status: 'Standard',
	},
	'ES6': {
		name: 'ECMAScript 2015 (6th Edition, ECMA-262)',
		url: 'https://www.ecma-international.org/ecma-262/6.0/',
		status: 'Standard',
	},
	'ES2016': {
		name: 'ECMAScript 2016 (ECMA-262)',
		url: 'https://www.ecma-international.org/ecma-262/7.0/',
		status: 'Standard',
	},
	'ES2017': {
		name: 'ECMAScript 2017 (ECMA-262)',
		url: 'https://www.ecma-international.org/ecma-262/8.0/',
		status: 'Standard',
	},
	'ES2018': {
		name: 'ECMAScript 2018 (ECMA-262)',
		url: 'https://www.ecma-international.org/ecma-262/9.0/',
		status: 'Standard',
	},
	'ESDraft': {
		name: 'ECMAScript (ECMA-262)',
		url: 'https://tc39.es/ecma262/',
		status: 'Living',
	},
	'ES Int 1.0': {
		name: 'ECMAScript Internationalization API 1.0 (ECMA-402)',
		url: 'https://www.ecma-international.org/ecma-402/1.0/',
		status: 'Standard',
	},
	'ES Int 2.0': {
		name: 'ECMAScript Internationalization API 2.0 (ECMA-402)',
		url: 'https://www.ecma-international.org/ecma-402/2.0/',
		status: 'Standard',
	},
	'ES Int Draft': {
		name: 'ECMAScript Internationalization API (ECMA-402)',
		url: 'https://tc39.es/ecma402/',
		status: 'Living',
	},
	'Event Timing API': {
		name: 'Event Timing API',
		url: 'https://wicg.github.io/event-timing/',
		status: 'ED',
	},
	'EyeDropper': {
		name: 'EyeDropper',
		url: 'https://wicg.github.io/eyedropper-api/',
		status: 'Draft',
	},
	'Feature Policy': {
		name: 'Permissions Policy',
		url: 'https://w3c.github.io/webappsec-permissions-policy/',
		status: 'ED',
	},
	'Fetch': {
		name: 'Fetch',
		url: 'https://fetch.spec.whatwg.org/',
		status: 'Living',
	},
	'Fetch Metadata': {
		name: 'Fetch Metadata Request Headers',
		url: 'https://w3c.github.io/webappsec-fetch-metadata/',
		status: 'ED',
	},
	'File API': {
		name: 'File API',
		url: 'https://w3c.github.io/FileAPI/',
		status: 'WD',
	},
	'File System Access API': {
		name: 'File System Access API',
		url: 'https://wicg.github.io/file-system-access/',
		status: 'WD',
	},
	'File System API': {
		name: 'File and Directory Entries API',
		url: 'https://wicg.github.io/entries-api/',
		status: 'Draft',
	},
	'FileSystem': {
		name: 'FileSystem API',
		url: 'https://w3c.github.io/filesystem-api/',
		status: 'ED',
	},
	'Filters 1.0': {
		name: 'Filter Effects Module Level 1',
		url: 'https://drafts.fxtf.org/filter-effects/',
		status: 'WD',
	},
	'Filters 2.0': {
		name: 'Filter Effects Module Level 2',
		url: 'https://drafts.fxtf.org/filter-effects-2/',
		status: 'ED',
	},
	'Frame Timing': {
		name: 'Frame Timing',
		url: 'https://wicg.github.io/frame-timing/',
		status: 'Draft',
	},
	'Fullscreen': {
		name: 'Fullscreen API',
		url: 'https://fullscreen.spec.whatwg.org/',
		status: 'Living',
	},
	'Gamepad': {
		name: 'Gamepad',
		url: 'https://w3c.github.io/gamepad/',
		status: 'WD',
	},
	'GamepadExtensions': {
		name: 'Gamepad Extensions',
		url: 'https://w3c.github.io/gamepad/extensions.html',
		status: 'ED',
	},
	'Generic Sensor': {
		name: 'Generic Sensor API',
		url: 'https://www.w3.org/TR/generic-sensor/',
		status: 'CR',
	},
	'Geolocation': {
		name: 'Geolocation API',
		url: 'https://w3c.github.io/geolocation-api/',
		status: 'REC',
	},
	'Geometry Interfaces': {
		name: 'Geometry Interfaces Module Level 1',
		url: 'https://drafts.fxtf.org/geometry/',
		status: 'CR',
	},
	'Gyroscope': {
		name: 'Gyroscope',
		url: 'https://www.w3.org/TR/gyroscope/',
		status: 'CR',
	},
	'Highres Time': {
		name: 'High Resolution Time',
		url: 'https://www.w3.org/TR/hr-time-1/',
		status: 'REC',
	},
	'Highres Time Level 2': {
		name: 'High Resolution Time Level 2',
		url: 'https://www.w3.org/TR/hr-time-2/',
		status: 'REC',
	},
	'Highres Time Level 3': {
		name: 'High Resolution Time Level 3',
		url: 'https://w3c.github.io/hr-time/',
		status: 'ED',
	},
	'HSTS': {
		name: 'HTTP Strict Transport Security (HSTS)',
		url: 'https://datatracker.ietf.org/doc/html/rfc6797',
		status: 'RFC',
	},
	'HTML Editing': {
		name: 'HTML Editing APIs',
		url: 'https://w3c.github.io/editing/',
		status: 'ED',
	},
	'HTML Imports': {
		name: 'HTML Imports',
		url: 'https://w3c.github.io/webcomponents/spec/imports/',
		status: 'WD',
	},
	'HTML Media Capture': {
		name: 'HTML Media Capture',
		url: 'https://w3c.github.io/html-media-capture/',
		status: 'REC',
	},
	'HTML Microdata': {
		name: 'HTML Microdata',
		url: 'https://w3c.github.io/microdata/',
		status: 'WD',
	},
	'HTML4.01': {
		name: 'HTML 4.01 Specification',
		url: 'https://www.w3.org/TR/html401/',
		status: 'REC',
	},
	'HTML5 W3C': {
		name: 'HTML5',
		url: 'https://www.w3.org/TR/html52/',
		status: 'REC',
	},
	'HTML5.1': {
		name: 'HTML 5.1',
		url: 'https://www.w3.org/TR/html51/',
		status: 'REC',
	},
	'HTML5.2': {
		name: 'HTML 5.2',
		url: 'https://www.w3.org/TR/html52/',
		status: 'REC',
	},
	'HTML Sanitizer API': {
		name: 'HTML Sanitizer API',
		url: 'https://wicg.github.io/sanitizer-api/',
		status: 'WD',
	},
	'HTML WHATWG': {
		name: 'HTML Living Standard',
		url: 'https://html.spec.whatwg.org/multipage/',
		status: 'Living',
	},
	'IMSC 1.0.1': {
		name: 'TTML Profiles for Internet Media Subtitles and Captions 1.0.1 (IMSC1)',
		url: 'https://www.w3.org/TR/ttml-imsc1.0.1/',
		status: 'REC',
	},
	'IMSC 1.1': {
		name: 'TTML Profiles for Internet Media Subtitles and Captions 1.1',
		url: 'https://www.w3.org/TR/ttml-imsc1.1/',
		status: 'PR',
	},
	'IndexedDB': {
		name: 'Indexed Database API 2.0',
		url: 'https://www.w3.org/TR/IndexedDB/',
		status: 'REC',
	},
	'IndexedDB 2': {
		name: 'Indexed Database API 2.0',
		url: 'https://www.w3.org/TR/IndexedDB/',
		status: 'REC',
	},
	'IndexedDB 3': {
		name: 'Indexed Database API 3.0',
		url: 'https://w3c.github.io/IndexedDB/',
		status: 'ED',
	},
	'InputDeviceCapabilities': {
		name: 'InputDeviceCapabilities',
		url: 'https://wicg.github.io/InputDeviceCapabilities/',
		status: 'Draft',
	},
	'InputEvents2': {
		name: 'Input Events Level 2',
		url: 'https://w3c.github.io/input-events/',
		status: 'WD',
	},
	'IntersectionObserver': {
		name: 'Intersection Observer',
		url: 'https://w3c.github.io/IntersectionObserver/',
		status: 'WD',
	},
	'Intl.DateTimeFormat.formatRange': {
		name: 'Intl.DateTimeFormat.formatRange',
		url: 'https://tc39.es/proposal-intl-DateTimeFormat-formatRange/',
		status: 'Draft',
	},
	'Intl.DisplayNames': {
		name: 'Intl.DisplayNames',
		url: 'https://tc39.es/proposal-intl-displaynames/',
		status: 'Draft',
	},
	'Intl.ListFormat': {
		name: 'Intl.ListFormat',
		url: 'https://tc39.es/proposal-intl-list-format/',
		status: 'Draft',
	},
	'Keyboard Lock': {
		name: 'Keyboard Lock',
		url: 'https://wicg.github.io/keyboard-lock/',
		status: 'ED',
	},
	'Keyboard Map': {
		name: 'Keyboard Map',
		url: 'https://wicg.github.io/keyboard-map/',
		status: 'ED',
	},
	'Largest Contentful Paint': {
		name: 'Largest Contentful Paint',
		url: 'https://wicg.github.io/largest-contentful-paint/',
		status: 'ED',
	},
	'Layout Instability': {
		name: 'Layout Instability API',
		url: 'https://wicg.github.io/layout-instability/',
		status: 'ED',
	},
	'Legacy RegExp features': {
		name: 'Legacy RegExp features in JavaScript',
		url: 'https://github.com/tc39/proposal-regexp-legacy-features/',
		status: 'Draft',
	},
	'Local Font Access API': {
		name: 'Local Font Access API',
		url: 'https://wicg.github.io/local-font-access',
		status: 'Draft',
	},
	'Logical Assignment': {
		name: 'Logical Assignment Operators',
		url: 'https://tc39.es/proposal-logical-assignment/',
		status: 'Draft',
	},
	'Long Tasks': {
		name: 'Long Tasks API 1',
		url: 'https://w3c.github.io/longtasks/',
		status: 'WD',
	},
	'Magnetometer': {
		name: 'Magnetometer',
		url: 'https://www.w3.org/TR/magnetometer/',
		status: 'CR',
	},
	'Manifest': {
		name: 'Web App Manifest',
		url: 'https://w3c.github.io/manifest/',
		status: 'WD',
	},
	'ManifestAppInfo': {
		name: 'Web App Manifest - Application Information',
		url: 'https://w3c.github.io/manifest-app-info/',
		status: 'ED',
	},
	'MathML2': {
		name: 'MathML 2.0',
		url: 'https://www.w3.org/TR/MathML2/',
		status: 'REC',
	},
	'MathML3': {
		name: 'MathML 3.0',
		url: 'https://www.w3.org/TR/MathML3/',
		status: 'REC',
	},
	'MathMLCore': {
		name: 'MathML Core',
		url: 'https://mathml-refresh.github.io/mathml-core/',
		status: 'Draft',
	},
	'Media Capabilities': {
		name: 'Media Capabilities',
		url: 'https://w3c.github.io/media-capabilities/',
		status: 'Draft',
	},
	'Media Capture': {
		name: 'Media Capture and Streams',
		url: 'https://w3c.github.io/mediacapture-main/',
		status: 'CR',
	},
	'Media Capture DOM Elements': {
		name: 'Media Capture from DOM Elements',
		url: 'https://w3c.github.io/mediacapture-fromelement/',
		status: 'WD',
	},
	'Media Playback Quality': {
		name: 'Media Playback Quality',
		url: 'https://w3c.github.io/media-playback-quality/',
		status: 'ED',
	},
	'Media Session': {
		name: 'Media Session Standard',
		url: 'https://w3c.github.io/mediasession/',
		status: 'Draft',
	},
	'Media Source Extensions': {
		name: 'Media Source Extensions',
		url: 'https://w3c.github.io/media-source/',
		status: 'REC',
	},
	'MediaStream Image': {
		name: 'MediaStream Image Capture',
		url: 'https://w3c.github.io/mediacapture-image/',
		status: 'WD',
	},
	'MediaStream Recording': {
		name: 'MediaStream Recording',
		url: 'https://w3c.github.io/mediacapture-record/',
		status: 'WD',
	},
	'MediaStreamTrackHint': {
		name: 'MediaStreamTrack Content Hints',
		url: 'https://wicg.github.io/mst-content-hint',
		status: 'Draft',
	},
	'Messaging': {
		name: 'Messaging API',
		url: 'https://www.w3.org/2012/sysapps/messaging/',
		status: 'Obsolete',
	},
	'Mixed Content': {
		name: 'Mixed Content',
		url: 'https://w3c.github.io/webappsec-mixed-content/',
		status: 'CR',
	},
	'Motion Path Level 1': {
		name: 'Motion Path Module Level 1',
		url: 'https://drafts.fxtf.org/motion-1/',
		status: 'WD',
	},
	'Navigation Timing': {
		name: 'Navigation Timing',
		url: 'https://www.w3.org/TR/navigation-timing/',
		status: 'REC',
	},
	'Navigation Timing Level 2': {
		name: 'Navigation Timing Level 2',
		url: 'https://w3c.github.io/navigation-timing/',
		status: 'WD',
	},
	'Network Information': {
		name: 'Network Information API',
		url: 'https://wicg.github.io/netinfo/',
		status: 'Draft',
	},
	'OpenGL ES 2.0': {
		name: 'OpenGL ES 2.0',
		url: 'https://www.khronos.org/opengles/sdk/docs/man/xhtml/',
		status: 'Standard',
	},
	'OpenGL ES 3.0': {
		name: 'OpenGL ES 3.0',
		url: 'https://www.khronos.org/opengles/sdk/docs/man3/html/',
		status: 'Standard',
	},
	'Orientation Sensor': {
		name: 'Orientation Sensor',
		url: 'https://www.w3.org/TR/orientation-sensor/',
		status: 'CR',
	},
	'Page Lifecycle 1': {
		name: 'Page Lifecycle 1',
		url: 'https://wicg.github.io/page-lifecycle/spec.html',
		status: 'Draft',
	},
	'Paint Timing': {
		name: 'Paint Timing',
		url: 'https://w3c.github.io/paint-timing/',
		status: 'WD',
	},
	'Page Visibility API': {
		name: 'Page Visibility (Second Edition)',
		url: 'https://www.w3.org/TR/page-visibility/',
		status: 'REC',
	},
	'Payment': {
		name: 'Payment Request API',
		url: 'https://w3c.github.io/payment-request/',
		status: 'CR',
	},
	'Payment Handler': {
		name: 'Payment Handler API',
		url: 'https://w3c.github.io/payment-handler/',
		status: 'WD',
	},
	'Payment Method Identifiers': {
		name: 'Payment Method Identifiers',
		url: 'https://w3c.github.io/payment-method-id/',
		status: 'CR',
	},
	'Periodic Background Sync': {
		name: 'Web Periodic Background Synchronization',
		url: 'https://wicg.github.io/periodic-background-sync/',
		status: 'WD',
	},
	'Permissions API': {
		name: 'Permissions',
		url: 'https://w3c.github.io/permissions/',
		status: 'WD',
	},
	'Performance Timeline': {
		name: 'Performance Timeline',
		url: 'https://www.w3.org/TR/performance-timeline/',
		status: 'REC',
	},
	'Performance Timeline Level 2': {
		name: 'Performance Timeline Level 2',
		url: 'https://w3c.github.io/performance-timeline/',
		status: 'CR',
	},
	'Permissions Policy': {
		name: 'Permissions Policy',
		url: 'https://w3c.github.io/webappsec-permissions-policy/',
		status: 'ED',
	},
	'Picture-in-Picture': {
		name: 'Picture-in-Picture API',
		url: 'https://w3c.github.io/picture-in-picture/',
		status: 'Draft',
	},
	'Pipeline operator': {
		name: 'Pipeline operator',
		url: 'https://tc39.es/proposal-pipeline-operator/',
		status: 'Draft',
	},
	'Pointer Events': {
		name: 'Pointer Events',
		url: 'https://www.w3.org/TR/pointerevents1/',
		status: 'Obsolete',
	},
	'Pointer Events 2': {
		name: 'Pointer Events – Level 2',
		url: 'https://www.w3.org/TR/pointerevents2/',
		status: 'REC',
	},
	'Pointer Events 3': {
		name: 'Pointer Events – Level 3',
		url: 'https://w3c.github.io/pointerevents/',
		status: 'ED',
	},
	'Portals': {
		name: 'Portals',
		url: 'https://wicg.github.io/portals/',
		status: 'ED',
	},
	'Pointer Lock': {
		name: 'Pointer Lock',
		url: 'https://w3c.github.io/pointerlock/',
		status: 'CR',
	},
	'Preload': {
		name: 'Preload',
		url: 'https://w3c.github.io/preload/',
		status: 'CR',
	},
	'Presentation': {
		name: 'Presentation API',
		url: 'https://w3c.github.io/presentation-api/',
		status: 'CR',
	},
	'Priority Hints': {
		name: 'Priority Hints',
		url: 'https://wicg.github.io/priority-hints/',
		status: 'Draft',
	},
	'Promise.any': {
		name: 'Promise.any',
		url: 'https://tc39.es/proposal-promise-any/',
		status: 'Draft',
	},
	'Proximity Events': {
		name: 'Proximity Sensor',
		url: 'https://w3c.github.io/proximity/',
		status: 'WD',
	},
	'Public and private instance fields': {
		name: 'Public and private instance fields',
		url: 'https://tc39.es/proposal-class-fields/',
		status: 'Draft',
	},
	'Push API': {
		name: 'Push API',
		url: 'https://w3c.github.io/push-api/',
		status: 'WD',
	},
	'Quota Management': {
		name: 'Quota Management API',
		url: 'https://w3c.github.io/quota-api/',
		status: 'Obsolete',
	},
	'Referrer Policy': {
		name: 'Referrer Policy',
		url: 'https://w3c.github.io/webappsec-referrer-policy/',
		status: 'CR',
	},
	'Relative Indexing Method': {
		name: 'Relative Indexing Method',
		url: 'https://tc39.es/proposal-relative-indexing-method/',
		status: 'Draft',
	},
	'Remote Playback': {
		name: 'Remote Playback API',
		url: 'https://w3c.github.io/remote-playback/',
		status: 'CR',
	},
	'Reporting API': {
		name: 'Reporting API',
		url: 'https://w3c.github.io/reporting/',
		status: 'ED',
	},
	'RequestAnimationFrame': {
		name: 'Timing control for script-based animations',
		url: 'https://www.w3.org/TR/animation-timing/',
		status: 'Obsolete',
	},
	'Resize Observer': {
		name: 'Resize Observer',
		url: 'https://drafts.csswg.org/resize-observer/',
		status: 'ED',
	},
	'Resource Hints': {
		name: 'Resource Hints',
		url: 'https://www.w3.org/TR/resource-hints/',
		status: 'WD',
	},
	'Resource Timing': {
		name: 'Resource Timing Level 1',
		url: 'https://www.w3.org/TR/resource-timing-1/',
		status: 'CR',
	},
	'Resource Timing 2': {
		name: 'Resource Timing Level 2',
		url: 'https://www.w3.org/TR/resource-timing-2/',
		status: 'WD',
	},
	'Resource Timing 3': {
		name: 'Resource Timing Level 3',
		url: 'https://w3c.github.io/resource-timing/',
		status: 'ED',
	},
	'Screen Capture': {
		name: 'Screen Capture',
		url: 'https://w3c.github.io/mediacapture-screen-share/',
		status: 'WD',
	},
	'Screen Orientation': {
		name: 'Screen Orientation API',
		url: 'https://w3c.github.io/screen-orientation/',
		status: 'WD',
	},
	'Screen Wake Lock': {
		name: 'Screen Wake Lock API',
		url: 'https://w3c.github.io/screen-wake-lock/',
		status: 'ED',
	},
	'Scroll Anchoring': {
		name: 'Scroll Anchoring',
		url: 'https://wicg.github.io/ScrollAnchoring/',
		status: 'Draft',
	},
	'Secure Contexts': {
		name: 'Secure Contexts',
		url: 'https://w3c.github.io/webappsec-secure-contexts/',
		status: 'CR',
	},
	'Selection API': {
		name: 'Selection API',
		url: 'https://w3c.github.io/selection-api/',
		status: 'WD',
	},
	'Service Workers': {
		name: 'Service Workers',
		url: 'https://w3c.github.io/ServiceWorker/',
		status: 'WD',
	},
	'Selectors API Level 1': {
		name: 'Selectors API Level 1',
		url: 'https://www.w3.org/TR/selectors-api/',
		status: 'Obsolete',
	},
	'Selectors API Level 2': {
		name: 'Selectors API Level 2',
		url: 'https://dev.w3.org/2006/webapi/selectors-api2/',
		status: 'Obsolete',
	},
	'Server Timing': {
		name: 'Server Timing',
		url: 'https://w3c.github.io/server-timing/',
		status: 'WD',
	},
	'Shadow DOM': {
		name: 'Shadow DOM',
		url: 'https://w3c.github.io/webcomponents/spec/shadow/',
		status: 'Obsolete',
	},
	'Shape Detection API': {
		name: 'Accelerated Shape Detection in Images',
		url: 'https://wicg.github.io/shape-detection-api/',
		status: 'Draft',
	},
	'Static Range': {
		name: 'Static Range',
		url: 'https://w3c.github.io/staticrange/',
		status: 'ED',
	},
	'Storage': {
		name: 'Storage',
		url: 'https://storage.spec.whatwg.org/',
		status: 'Living',
	},
	'Streams': {
		name: 'Streams',
		url: 'https://streams.spec.whatwg.org/',
		status: 'Living',
	},
	'Subresource Integrity': {
		name: 'Subresource Integrity',
		url: 'https://w3c.github.io/webappsec-subresource-integrity/',
		status: 'REC',
	},
	'SVG and HTML': {
		name: 'Inline SVG in HTML5 and XHTML',
		url: 'https://dev.w3.org/SVG/proposals/svg-html/svg-html-proposal.html',
		status: 'ED',
	},
	'SVG Animations 2': {
		name: 'SVG Animations Level&nbsp;2',
		url: 'https://svgwg.org/specs/animations/',
		status: 'ED',
	},
	'SVG Markers': {
		name: 'SVG Markers',
		url: 'https://svgwg.org/specs/markers/',
		status: 'WD',
	},
	'SVG Paths': {
		name: 'SVG Paths',
		url: 'https://svgwg.org/specs/paths/',
		status: 'WD',
	},
	'SVG Strokes': {
		name: 'SVG Strokes',
		url: 'https://svgwg.org/specs/strokes/',
		status: 'WD',
	},
	'SVG1.1': {
		name: 'Scalable Vector Graphics (SVG) 1.1 (Second Edition)',
		url: 'https://www.w3.org/TR/SVG11/',
		status: 'REC',
	},
	'SVG2': {
		name: 'Scalable Vector Graphics (SVG) 2',
		url: 'https://svgwg.org/svg2-draft/',
		status: 'CR',
	},
	'Telephony API': {
		name: 'Web Telephony API',
		url: 'https://wiki.mozilla.org/WebAPI/WebTelephony',
		status: 'Draft',
	},
	'Top Level Await': {
		name: 'Top Level Await',
		url: 'https://tc39.es/proposal-top-level-await/',
		status: 'Draft',
	},
	'Touch Events': {
		name: 'Touch Events',
		url: 'https://www.w3.org/TR/touch-events/',
		status: 'REC',
	},
	'Touch Events 2': {
		name: 'Touch Events – Level 2',
		url: 'https://w3c.github.io/touch-events/',
		status: 'Draft',
	},
	'Tracking': {
		name: 'Tracking Preference Expression (DNT)',
		url: 'https://www.w3.org/TR/tracking-dnt/',
		status: 'Obsolete',
	},
	'Typed Array': {
		name: 'Typed Array Specification',
		url: 'https://www.khronos.org/registry/typedarray/specs/latest/',
		status: 'Obsolete',
	},
	'Trusted Types': {
		name: 'Trusted Types',
		url: 'https://w3c.github.io/webappsec-trusted-types/dist/spec/',
		status: 'ED',
	},
	'UI Events': {
		name: 'UI Events',
		url: 'https://w3c.github.io/uievents/',
		status: 'WD',
	},
	'UI Events Code': {
		name: 'UI Events KeyboardEvent code Values',
		url: 'https://www.w3.org/TR/uievents-code/',
		status: 'CR',
	},
	'UI Events Key': {
		name: 'UI Events KeyboardEvent key Values',
		url: 'https://www.w3.org/TR/uievents-key/',
		status: 'CR',
	},
	'Undo Manager': {
		name: 'UndoManager and DOMTransaction',
		url: 'https://dvcs.w3.org/hg/undomanager/raw-file/tip/undomanager.html',
		status: 'ED',
	},
	'Upgrade Insecure Requests': {
		name: 'Upgrade Insecure Requests',
		url: 'https://w3c.github.io/webappsec-upgrade-insecure-requests/',
		status: 'CR',
	},
	'URL': {
		name: 'URL',
		url: 'https://url.spec.whatwg.org/',
		status: 'Living',
	},
	'User Timing': {
		name: 'User Timing',
		url: 'https://www.w3.org/TR/user-timing/',
		status: 'REC',
	},
	'User Timing Level 2': {
		name: 'User Timing Level 2',
		url: 'https://w3c.github.io/user-timing/',
		status: 'WD',
	},
	'vCard': {
		name: 'vCard Format Specification',
		url: 'https://datatracker.ietf.org/doc/html/rfc6350',
		status: 'RFC',
	},
	'Vibration API': {
		name: 'Vibration API',
		url: 'https://dev.w3.org/2009/dap/vibration/',
		status: 'REC',
	},
	'Visual Viewport': {
		name: 'Visual Viewport API',
		url: 'https://wicg.github.io/visual-viewport/',
		status: 'Draft',
	},
	'WeakRefs': {
		name: 'WeakRefs',
		url: 'https://tc39.es/proposal-weakrefs/',
		status: 'Draft',
	},
	'Web Animations': {
		name: 'Web Animations',
		url: 'https://drafts.csswg.org/web-animations-1/',
		status: 'WD',
	},
	'Web Animations 2': {
		name: 'Web Animations Level 2',
		url: 'https://drafts.csswg.org/web-animations-2/',
		status: 'Draft',
	},
	'WebAssembly Core': {
		name: 'WebAssembly Core Specification',
		url: 'https://webassembly.github.io/spec/core/bikeshed/',
		status: 'WD',
	},
	'WebAssembly Embedding': {
		name: 'WebAssembly features for web embedding',
		url: 'https://webassembly.org/docs/web/',
		status: 'Draft',
	},
	'WebAssembly JS': {
		name: 'WebAssembly JavaScript Interface',
		url: 'https://webassembly.github.io/spec/js-api/',
		status: 'WD',
	},
	'WebAssembly Web API': {
		name: 'WebAssembly Web API',
		url: 'https://webassembly.github.io/spec/web-api/',
		status: 'WD',
	},
	'Web Audio API': {
		name: 'Web Audio API',
		url: 'https://www.w3.org/TR/webaudio/',
		status: 'REC',
	},
	'Web Bluetooth': {
		name: 'Web Bluetooth',
		url: 'https://webbluetoothcg.github.io/web-bluetooth/',
		status: 'Draft',
	},
	'Web Budget API': {
		name: 'Web Budget API',
		url: 'https://wicg.github.io/budget-api/',
		status: 'Draft',
	},
	'Web Crypto API': {
		name: 'Web Cryptography API',
		url: 'https://www.w3.org/TR/WebCryptoAPI/',
		status: 'REC',
	},
	'WebGL': {
		name: 'WebGL 1.0',
		url: 'https://www.khronos.org/registry/webgl/specs/latest/1.0/',
		status: 'REC',
	},
	'WebGL2': {
		name: 'WebGL 2.0',
		url: 'https://www.khronos.org/registry/webgl/specs/latest/2.0/',
		status: 'ED',
	},
	'WebHID': {
		name: 'WebHID API',
		url: 'https://wicg.github.io/webhid/',
		status: 'Draft',
	},
	'Web NFC': {
		name: 'Web NFC',
		url: 'https://w3c.github.io/web-nfc/',
		status: 'Draft',
	},
	'WebOTP': {
		name: 'WebOTP',
		url: 'https://wicg.github.io/web-otp/',
		status: 'Draft',
	},
	'WindowControlsOverlay': {
		name: 'WindowControlsOverlay',
		url: 'https://wicg.github.io/window-controls-overlay/',
		status: 'Draft',
	},
	'EXT_blend_minmax': {
		name: 'EXT_blend_minmax',
		url: 'https://www.khronos.org/registry/webgl/extensions/EXT_blend_minmax/',
		status: 'REC',
	},
	'ANGLE_instanced_arrays': {
		name: 'ANGLE_instanced_arrays',
		url: 'https://www.khronos.org/registry/webgl/extensions/ANGLE_instanced_arrays/',
		status: 'REC',
	},
	'EXT_color_buffer_float': {
		name: 'EXT_color_buffer_float',
		url: 'https://www.khronos.org/registry/webgl/extensions/EXT_color_buffer_float/',
		status: 'REC',
	},
	'EXT_color_buffer_half_float': {
		name: 'EXT_color_buffer_half_float',
		url: 'https://www.khronos.org/registry/webgl/extensions/EXT_color_buffer_half_float/',
		status: 'REC',
	},
	'EXT_disjoint_timer_query': {
		name: 'EXT_disjoint_timer_query',
		url: 'https://www.khronos.org/registry/webgl/extensions/EXT_disjoint_timer_query/',
		status: 'WD',
	},
	'EXT_frag_depth': {
		name: 'EXT_frag_depth',
		url: 'https://www.khronos.org/registry/webgl/extensions/EXT_frag_depth/',
		status: 'REC',
	},
	'EXT_shader_texture_lod': {
		name: 'EXT_shader_texture_lod',
		url: 'https://www.khronos.org/registry/webgl/extensions/EXT_shader_texture_lod/',
		status: 'REC',
	},
	'EXT_sRGB': {
		name: 'EXT_sRGB',
		url: 'https://www.khronos.org/registry/webgl/extensions/EXT_sRGB/',
		status: 'REC',
	},
	'EXT_texture_filter_anisotropic': {
		name: 'EXT_texture_filter_anisotropic',
		url: 'https://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/',
		status: 'REC',
	},
	'EXT_texture_norm16': {
		name: 'EXT_texture_norm16',
		url: 'https://www.khronos.org/registry/webgl/extensions/EXT_texture_norm16/',
		status: 'REC',
	},
	'KHR_parallel_shader_compile': {
		name: 'KHR_parallel_shader_compile',
		url: 'https://www.khronos.org/registry/webgl/extensions/KHR_parallel_shader_compile/',
		status: 'REC',
	},
	'OES_element_index_uint': {
		name: 'OES_element_index_uint',
		url: 'https://www.khronos.org/registry/webgl/extensions/OES_element_index_uint/',
		status: 'REC',
	},
	'OES_standard_derivatives': {
		name: 'OES_standard_derivatives',
		url: 'https://www.khronos.org/registry/webgl/extensions/OES_standard_derivatives/',
		status: 'REC',
	},
	'OES_texture_float': {
		name: 'OES_texture_float',
		url: 'https://www.khronos.org/registry/webgl/extensions/OES_texture_float/',
		status: 'REC',
	},
	'OES_texture_float_linear': {
		name: 'OES_texture_float_linear',
		url: 'https://www.khronos.org/registry/webgl/extensions/OES_texture_float_linear/',
		status: 'REC',
	},
	'OES_texture_half_float': {
		name: 'OES_texture_half_float',
		url: 'https://www.khronos.org/registry/webgl/extensions/OES_texture_half_float/',
		status: 'REC',
	},
	'OES_texture_half_float_linear': {
		name: 'OES_texture_half_float_linear',
		url: 'https://www.khronos.org/registry/webgl/extensions/OES_texture_half_float_linear/',
		status: 'REC',
	},
	'OES_vertex_array_object': {
		name: 'OES_vertex_array_object',
		url: 'https://www.khronos.org/registry/webgl/extensions/OES_vertex_array_object/',
		status: 'REC',
	},
	'WebAuthn': {
		name: 'Web Authentication: An API for accessing Public Key Credentials Level 1',
		url: 'https://w3c.github.io/webauthn/',
		status: 'REC',
	},
	'WebDriver': {
		name: 'WebDriver',
		url: 'https://w3c.github.io/webdriver/',
		status: 'Living',
	},
	'WEBGL_color_buffer_float': {
		name: 'WEBGL_color_buffer_float',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_color_buffer_float/',
		status: 'REC',
	},
	'WEBGL_compressed_texture_s3tc': {
		name: 'WEBGL_compressed_texture_s3tc',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/',
		status: 'REC',
	},
	'WEBGL_compressed_texture_s3tc_srgb': {
		name: 'WEBGL_compressed_texture_s3tc_srgb',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/',
		status: 'REC',
	},
	'WEBGL_compressed_texture_etc': {
		name: 'WEBGL_compressed_texture_etc',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc/',
		status: 'Draft',
	},
	'WEBGL_compressed_texture_pvrtc': {
		name: 'WEBGL_compressed_texture_pvrtc',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/',
		status: 'Draft',
	},
	'WEBGL_compressed_texture_etc1': {
		name: 'WEBGL_compressed_texture_etc1',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc1/',
		status: 'Draft',
	},
	'WEBGL_compressed_texture_astc': {
		name: 'WEBGL_compressed_texture_astc',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/',
		status: 'REC',
	},
	'WEBGL_compressed_texture_atc': {
		name: 'WEBGL_compressed_texture_atc',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_atc/',
		status: 'Draft',
	},
	'WEBGL_depth_texture': {
		name: 'WEBGL_depth_texture',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_depth_texture/',
		status: 'REC',
	},
	'WEBGL_debug_renderer_info': {
		name: 'WEBGL_debug_renderer_info',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_debug_renderer_info/',
		status: 'REC',
	},
	'WEBGL_debug_shaders': {
		name: 'WEBGL_debug_shaders',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_debug_shaders/',
		status: 'REC',
	},
	'WEBGL_draw_buffers': {
		name: 'WEBGL_draw_buffers',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_draw_buffers/',
		status: 'REC',
	},
	'WEBGL_lose_context': {
		name: 'WEBGL_lose_context',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_lose_context/',
		status: 'REC',
	},
	'WEBGL_multi_draw': {
		name: 'WEBGL_multi_draw',
		url: 'https://www.khronos.org/registry/webgl/extensions/WEBGL_multi_draw/',
		status: 'REC',
	},
	'WebIDL': {
		name: 'Web IDL',
		url: 'https://heycam.github.io/webidl/',
		status: 'CR',
	},
	'Web Locks': {
		name: 'Web Locks API',
		url: 'https://wicg.github.io/web-locks/',
		status: 'Draft',
	},
	'WebMIDI API': {
		name: 'Web MIDI API',
		url: 'https://webaudio.github.io/web-midi-api/',
		status: 'WD',
	},
	'Web Notifications': {
		name: 'Notifications API',
		url: 'https://notifications.spec.whatwg.org/',
		status: 'Living',
	},
	'WebRTC 1.0': {
		name: 'WebRTC 1.0: Real-time Communication Between Browsers',
		url: 'https://w3c.github.io/webrtc-pc/',
		status: 'CR',
	},
	'WebRTC Identity': {
		name: 'Identity for WebRTC',
		url: 'https://w3c.github.io/webrtc-identity/',
		status: 'CR',
	},
	'WebRTC Statistics Identifiers': {
		name: "Identifiers for WebRTC's Statistics API",
		url: 'https://w3c.github.io/webrtc-stats/',
		status: 'CR',
	},
	'Web Serial API': {
		name: 'Web Serial API',
		url: 'https://wicg.github.io/serial/',
		status: 'Draft',
	},
	'Web Share API': {
		name: 'Web Share API',
		url: 'https://w3c.github.io/web-share/',
		status: 'Draft',
	},
	'Web Share API 2': {
		name: 'Web Share API - Level 2',
		url: 'https://w3c.github.io/web-share/level-2/',
		status: 'Draft',
	},
	'Web Speech API': {
		name: 'Web Speech API',
		url: 'https://wicg.github.io/speech-api/',
		status: 'Draft',
	},
	'Web Telephony': {
		name: 'Web Telephony',
		url: 'https://wiki.mozilla.org/WebAPI/WebTelephony',
		status: 'Draft',
	},
	'Web USB': {
		name: 'WebUSB',
		url: 'https://wicg.github.io/webusb/',
		status: 'Draft',
	},
	'WebVR 1.1': {
		name: 'WebVR 1.1',
		url: 'https://immersive-web.github.io/webvr/spec/1.1/',
		status: 'Draft',
	},
	'WebVTT': {
		name: 'WebVTT: The Web Video Text Tracks Format',
		url: 'https://w3c.github.io/webvtt/',
		status: 'CR',
	},
	'WebXR': {
		name: 'WebXR Device API',
		url: 'https://immersive-web.github.io/webxr/',
		status: 'WD',
	},
	'WebXR AR Module': {
		name: 'WebXR Augmented Reality Module',
		url: 'https://immersive-web.github.io/webxr-ar-module/',
		status: 'ED',
	},
	'WebXR Gamepads Module': {
		name: 'WebXR Gamepads Module',
		url: 'https://immersive-web.github.io/webxr-gamepads-module/',
		status: 'ED',
	},
	'WOFF1.0': {
		name: 'WOFF File Format 1.0',
		url: 'https://www.w3.org/TR/WOFF/',
		status: 'REC',
	},
	'WOFF2.0': {
		name: 'WOFF File Format 2.0',
		url: 'https://www.w3.org/TR/WOFF2/',
		status: 'REC',
	},
	'Worklets': {
		name: 'Worklets Level 1',
		url: 'https://drafts.css-houdini.org/worklets/',
		status: 'WD',
	},
	'XMLHttpRequest': {
		name: 'XMLHttpRequest',
		url: 'https://xhr.spec.whatwg.org/',
		status: 'Living',
	},
	'XPath1': {
		name: 'XPath 1.0',
		url: 'https://www.w3.org/TR/xpath-10/',
		status: 'REC',
	},
	'XPath2': {
		name: 'XPath 2.0',
		url: 'https://www.w3.org/TR/xpath20/',
		status: 'REC',
	},
	'XPath3': {
		name: 'XPath 3.0',
		url: 'https://www.w3.org/TR/xpath-30/',
		status: 'REC',
	},
	'XPath3.1': {
		name: 'XPath 3.1',
		url: 'https://www.w3.org/TR/xpath-31/',
		status: 'REC',
	},
	'XSLT 3.0': {
		name: 'XSLT 3.0',
		url: 'https://www.w3.org/TR/xslt-30/',
		status: 'REC',
	},
	'Blending': {
		name: 'Compositing and Blending Level 1',
		url: 'https://drafts.fxtf.org/compositing-1/',
		status: 'CR',
	},
	'CSS3 2D Transforms': {
		name: 'CSS Transforms Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-transforms/',
		status: 'WD',
	},
	'CSS3 3D Transforms': {
		name: 'CSS Transforms Level&nbsp;2',
		url: 'https://drafts.csswg.org/css-transforms-2/',
		status: 'ED',
	},
	'CSS3 Break': {
		name: 'CSS Fragmentation Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-break-3/',
		status: 'CR',
	},
	'CSS3 Flexbox': {
		name: 'CSS Flexible Box Layout Module',
		url: 'https://drafts.csswg.org/css-flexbox-1/',
		status: 'CR',
	},
	'CSS3 Grid': {
		name: 'CSS Grid Layout',
		url: 'https://drafts.csswg.org/css-grid/',
		status: 'CR',
	},
	'CSS3 Template': {
		name: 'CSS Grid Layout',
		url: 'https://drafts.csswg.org/css-grid/',
		status: 'CR',
	},
	'CSS3 UI': {
		name: 'CSS Basic User Interface Module Level&nbsp;3',
		url: 'https://drafts.csswg.org/css-ui-3/',
		status: 'REC',
	},
	'CSS4 UI': {
		name: 'CSS Basic User Interface Module Level&nbsp;4',
		url: 'https://drafts.csswg.org/css-ui-4/',
		status: 'WD',
	},
	'CSS Scroll Snap Points': {
		name: 'CSS Scroll Snap Module Level&nbsp;1',
		url: 'https://drafts.csswg.org/css-scroll-snap-1/',
		status: 'CR',
	},
	'WebSMS': {
		name: 'Messaging API',
		url: 'https://www.w3.org/2012/sysapps/messaging/',
		status: 'Obsolete',
	},
	'ES2015': {
		name: 'ECMAScript 2015 (6th Edition, ECMA-262)',
		url: 'https://www.ecma-international.org/ecma-262/6.0/',
		status: 'Standard',
	},
	'ES7': {
		name: 'ECMAScript 2016 (ECMA-262)',
		url: 'https://www.ecma-international.org/ecma-262/7.0/',
		status: 'Standard',
	},
	'ES8': {
		name: 'ECMAScript 2017 (ECMA-262)',
		url: 'https://www.ecma-international.org/ecma-262/8.0/',
		status: 'Standard',
	},
})

export default specData
