# Personal website

This is the third major interation of personal website hosted on
[GitHub Pages](https://pages.github.com/), powered by
[Jekyll](https://jekyllrb.com/) and distributed through
[Cloudflare](https://cloudflare.com).

Everything was handicrafted with HTML and CSS, and there's no client-side
JavaScript.

## Privacy
No kind


## Search engine optimization
sss

## Security

## Conviniences

A [Cloudflare Worker](https://workers.cloudflare.com/) is used to automagically
redirect users to the page of their preferred language based on their
`Accept-Language` [HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language)
and to insert some of the [OWASP HTTP security headers](https://owasp.org/www-project-secure-headers/)
in the responses.
You can find its source code [here](_cfworkers/language.js).

Some static assets (pictures and fonts) are served through [Amazon S3](https://aws.amazon.com/s3).

This website uses a custom stripped-down version of [Font Awesome](https://fontawesome.com/).

### TODO
- Contact form
- Fix Cf workers
- Fix 404 for multi language pages
- Make dynamic sitemap
- Favicon
- Fonts/Icons
- Contact form
- Texts
- README Update
- Remove live.js
- Twitter metatag (@joaopenteado) creator
- RSS/ATOM feed
- Remove 3rd-pary CDNs on head.html
- Add CSP http-equiv
- Minify
- get filename dynamically
- links are folders !!! check hrefs
- Width css -> collaspse menu
- insert content-language header
- contact input max len