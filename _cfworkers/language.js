/*

This Cloudflare worker redirects the user navigating to the root of the website
to his/her preferred language, based on the Accept-Language header.

*/

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

const supportedLanguages = ['en', 'ja', 'pt', 'ru'];

async function handleRequest(request) {

  // Parse Accept-Language header
  let langHeader = request.headers.get('Accept-Language');
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
        return Response.redirect("https://joaopenteado.com/" + supportedLanguages[langIndex] + '/', 307);
     
      }
    }
  }

    // No matching language...defaults to English
    return Response.redirect("https://joaopenteado.com/en/", 307);
}
