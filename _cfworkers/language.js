/*

This Cloudflare worker redirects the user navigating to the root of the website
to his/her preferred language, based on the Accept-Language header.

Compliant with ISO 639-2 and RFC 3282

*/

const securityHeaders = [
  ["Access-Control-Allow-Methods", "GET"],
  ["Access-Control-Allow-Origin", "https://joaopenteado.com"],
  ["Content-Security-Policy", "default-src 'none'; font-src https://storage.googleapis.com/static.joaopenteado.com/static.joaopenteado.com; img-src https://storage.googleapis.com/static.joaopenteado.com/static.joaopenteado.com; script-src 'self'; style-src 'self'"],
  ["Cross-Origin-Resource-Policy", "same-origin"],
  ["Feature-Policy", "ambient-light-sensor 'none'; autoplay 'none'; accelerometer 'none'; battery 'none'; camera 'none'; display-capture 'none'; document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; wake-lock 'none'; webauthn 'none'; vr 'none'; xr-spatial-tracking 'none'"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Frame-Options", "SAMEORIGIN"],
  ["X-Permitted-Cross-Domain-Policies", "none"],
  ["X-Xss-Protection", "1; mode=block"]
]

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

const supportedLanguages = ['en', 'ja', 'pt', 'ru'];

async function handleRequest(request) {

  // Parse Accept-Language header
  let langHeader = request.headers.get('Accept-Language').toLowerCase();
  if (!!langHeader) {
    // Header found, let's parse it
    let parsedHeader = [];
    langHeader.replace(/\s/g, '').split(',').forEach(
      (str) => {
        let langQ = str.split(';');
        let q = parseFloat((langQ[1] || 'q=1').split('=')[1]);
        parsedHeader.push([langQ[0].split('-')[0], q]);
      }
    )

    // Sort each language according to its quality value
    parsedHeader = parsedHeader.sort(
      (a, b) => (a[1] < b[1]) ? 1 : ((b[1] < a[1]) ? -1 : 0)
    )

    for (let index = 0; index < parsedHeader.length; index++) {
      let langIndex = supportedLanguages.indexOf(parsedHeader[index][0]);
      if (langIndex > -1) {

        // Found a matching language!
        response = Response.redirect("https://joaopenteado.com/" + supportedLanguages[langIndex] + '/', 307);
        response = new Response(response.body, response)

        for (let index = 0; index < securityHeaders.length; index++) {
          response.headers.set(securityHeaders[index][0], securityHeaders[index][1])
        }

        return response

      }
    }
  }

  response = Response.redirect("https://joaopenteado.com/en/", 307);
  response = new Response(response.body, response)

  // No matching language...defaults to English
  for (let index = 0; index < securityHeaders.length; index++) {
    response.headers.set(securityHeaders[index][0], securityHeaders[index][1])
  }

  return response

}
