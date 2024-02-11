const { argv } = require('node:process');
const { JSDOM } = require('jsdom');

const innerText = (el) => {
  const elementArray = [...el.querySelectorAll(":not(script,style,.hidden)")];
  let sanitizedArray = [];

  elementArray.forEach((item) => {
    if (item.children.length == 0) return sanitizedArray.push(item.textContent || "");
    return innerText(item);
  });

  sanitizedArray = sanitizedArray.flat();

  return [...new Set(sanitizedArray)];
};

function sanitizeString(s) {
  return s.replaceAll('\r', '')
    .replaceAll('\t', '')
    .replaceAll('\n', '')
    // .replaceAll('\u00a0', ' ')
    // .replaceAll('\u200b', ' ')
    // .replaceAll('\u00ad', ' ')
    // .replaceAll('\u200e', ' ')
    // .replaceAll('\u200f', ' ')
    .replaceAll('  ', '')
    .trim();
}

const sanitizeBody = (body) => {
  const bodyElements = body.querySelectorAll('*:not(script,style,.hidden)');
  const textContents = [];
  for (const e of bodyElements) {
    textContents.push(e?.textContent || "");
  }
  return textContents.join('');
};

async function main() {
  if (argv.length < 3) return console.log('No URL specified');

  const queryURLs = argv.slice(2).map(s => s.replaceAll('\\', ''))
  const URLInfo = {};

  for (let i = 0; i < queryURLs.length; i++) {
    try {
      const url = queryURLs[i];
      const response = await fetch(url.toLowerCase(), {
        headers: {
          accept: 'text/html',
        },
      });

      const html = await response.text();

      /** @type {JSDOM} */
      const dom = new JSDOM(html);

      URLInfo[queryURLs[i]] = sanitizeString(sanitizeBody(dom.window.document.body)).slice(0, 4096*2);
    } catch (e) {
      URLInfo[queryURLs[i]] = 'Error while fetching the URL or its contents';
      console.error(e);
    }
  }

  // Print out the results
  console.log(Object.entries(URLInfo).map(([url, contents]) => `The contents of ${ url }: \n${ contents } `).join('\n\n'));
}
main();
