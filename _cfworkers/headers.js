/*

This Cloudflare worker inserts the appropriate OWASP Security HTTP headers and
other headers on all pages.

A few headers are already automatically setted by the zone configuration:
- Strict-Transport-Security (with preload)
- X-Content-Type-Options (nosniff)
- Expect-CT

*/

const securityHeaders = [
  ["Access-Control-Allow-Methods", "GET"],
  ["Access-Control-Allow-Origin", "https://joaopenteado.com"],
  ["Content-Security-Policy", "default-src 'none'; font-src https://storage.googleapis.com/static.joaopenteado.com; img-src https://storage.googleapis.com/static.joaopenteado.com; script-src 'self'; style-src 'self'"],
  ["Cross-Origin-Resource-Policy", "same-origin"],
  ["Feature-Policy", "ambient-light-sensor 'none'; autoplay 'none'; accelerometer 'none'; battery 'none'; camera 'none'; display-capture 'none'; document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; wake-lock 'none'; webauthn 'none'; vr 'none'; xr-spatial-tracking 'none'"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Frame-Options", "SAMEORIGIN"],
  ["X-Permitted-Cross-Domain-Policies", "none"],
  ["X-Xss-Protection", "1; mode=block"]
]

async function handleRequest(request) {
  // Make the request
  let response = await fetch(request)

  // Make the headers mutable by re-constructing the Response.
  response = new Response(response.body, response)

  // Add the headers to the new response
  for (let index = 0; index < securityHeaders.length; index++) {
    response.headers.set(securityHeaders[index][0], securityHeaders[index][1])
  }

  return response
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
