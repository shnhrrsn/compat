# Methodology

Usage data is sourced from [Statcounter](https://gs.statcounter.com/) and [Wikimedia](https://analytics.wikimedia.org/published/datasets/periodic/reports/metrics/browser/) and compiled into a single dataset keyed by MDN’s [browser list](https://github.com/mdn/browser-compat-data/tree/main/browsers).

All desktop usage data is used as&#8209;is from Statcounter.

Unfortunately, Statcounter does not provide version level breakdown for non-Desktop browsers so additional data soruces are used and usage is inferred.

## Safari for iOS

As of iOS 15, the following assumptions can be made:

- Safari is bundled with each iOS release and does not release independently
- Safari versions map 1&#8209;to&#8209;1 with iOS versions
- Third party browser engines are not allowed iOS; therefore from a functionality standpoint, any usage of a third party browser on iOS like Chrome used the same engine as Safari itself

Due to this tightly coupling, using Statcounter’s iOS version breakdown gives an accurate window into the breakdown of Safari versions on iOS.

If **Safari for iOS** has a 10% market share, and **iOS 15.4** has a 40% market share, we can safely assume **Safari for iOS 15.4** has a 4% market share.

## Chrome for Android

**Chrome for Android** is distributed independently from Android releases, so there’s no way to extrapolate Statcounter’s data to determine a version breakdown.

In order to provide version level usage data for **Chrome for Android**, data from Wikimedia is substituted.

This is done by determining the version distribution of **Chrome for Android** versions within Wikimedia and then applying them to the top level market share for **Chrome for Android** from Statcounter.

If **Chrome for Android** has a 10% market share in Statcounter, and Wikimedia indicates **Chrome for Android 99** has a 40% market share, this will be reflected as **Chrome for Android 99** having a 4% total market share.

While this doesn’t give a wholly accurate version breakdown as it assumes the version distribution between Statcounter and Wikimedia are the same (which is unlikely), it should provide reasonable accuracy to provide a close signal for developers vs the alternative of providing no version level data at all.
