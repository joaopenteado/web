# Personal website

This is my personal website hosted on [GitHub Pages](https://pages.github.com/) and distributed through [Cloudflare](https://cloudflare.com).

No frameworks nor bootstraping tools were used to build it.
Everything was handicrafted with HTML and CSS. Although it's important to 
mention that some JS code is used by Cloudflare in order to speed things up 
and provide some analytics insights.

A [Cloudflare Worker](https://workers.cloudflare.com/) is used to automagically redirect users to the page of their preferred language based on their `Accept-Language` [HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language). You can find its source code [here](_cfworkers/language.js).

Some static assets (pictures and fonts) are served through [Amazon S3](https://aws.amazon.com/s3).

This website uses a custom stripped-down version of [Font Awesome](https://fontawesome.com/).

### TODO
- Contact form
