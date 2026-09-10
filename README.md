# HUEHAVEN — Painting discovery

The `` folder is the complete portable website: upload its contents to your PHP hosting document root. Six HTML pages, local images, fonts, Swiper and AOS are included. No Node build is needed.

## One configuration file

Edit `config/config.js`. Keep the object valid JSON: double-quoted keys and strings, no trailing commas or functions. `contact.php` reads this same file. There is no site.json. Logo, favicon, company name, legal name, email, browser title, disclaimer, navigation labels and success text are controlled there. The copyright accepts `{year}` and `{companyName}`. The `browserTitle`, `legalName` and `disclaimer` fields accept `{companyName}` and follow name changes automatically by default.

## Contact form

PHP 8.1+ and a working server mail transport are required. The initial `hello@huehaven.example` address is deliberately a reserved, non-deliverable placeholder. Replace it in config.js with your real recipient before launch. Configure your hosting mail transport and verify delivery to that mailbox. The PHP handler validates the data and consent, checks the honeypot and throttles repeat requests. It returns success only if the server mail transport accepts the message. This does not prove inbox delivery. The sender uses website@ followed by the configured recipient domain; authorize that sender on your mail host.

The Sites preview is static and cannot execute PHP. Its form therefore reports an error instead of pretending an enquiry was sent. The full PHP handler is included for deployment on PHP hosting. There are no live provider integrations or invented provider matches.

## Assets and credits

Reference: https://preview.moxcreative.com/paintters/template-kit/homepage/
Photographs and paint masks are the user-requested Paintters / MoxCreative reference assets. No ownership or commercial licence is asserted. Confirm the appropriate asset/template licence for your production use. Flaticon icon authors and source URLs are recorded in assets/icon-sources.json and credited in the footer. Fonts: Heebo and Inter, Google Fonts. Swiper 11.2.10 and AOS 2.3.4 include their upstream licence headers.

## Behaviour

All three heroes contain three distinct house photos with looping automatic fades. Interior room tabs respond to hover, click and keyboard. Finish cards use photographic surfaces. Home includes photographic flip cards, an interactive roller canvas, a compact before/after comparison and three illustrative Team role cards. Both service pages include three roller-painted cards. Native vertical scrolling is preserved, decorative animation pauses offscreen and reduced motion is respected.

## Image optimisation

The complete portable project is below 5,000,000 bytes. Photos use AVIF at their existing pixel dimensions; transparent icons use lossless WebP. Modern browsers with AVIF support are required. Older unused image copies are excluded. The room wall-colour canvas retains the original 1672×941 geometry and masking. Generated photographs and illustrative team portraits are recorded in assets/generated-photo-prompts.json. Updated Flaticon sources are recorded in assets/refined-icon-sources.json and credited in the footer.
