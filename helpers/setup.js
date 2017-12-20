const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Get date param for website url
async function getDateForUrl() {
  const dom = await JSDOM.fromURL("http://www.gspns.co.rs/red-voznje/gradski");

  return dom.window.document.querySelector("#vaziod option:nth-of-type(1)").value;
}

// extract time values from html elements
function getArrayOfTimes(elements) {
  let hour   = null;
  let times  = [];

  for (let key in elements) {

    if (elements[key].nodeName == 'B') {
      hour = elements[key].innerHTML;
    }

    if (elements[key].nodeName == 'SUP') {
      let sup = elements[key].innerHTML.replace(/<(?:.|\n)*?>/gm, '');

      times.push(
        {
          time: hour + ':' + sup.slice(0, 2),
          info: sup.slice(2)
       }
      );
    }
  }

  return times;
}

// Get all required data from url page
async function getDataFromPage(url) {
  const dom  = await JSDOM.fromURL(url);

  let info = [];
  let from = { times: [], label: '' };
  let to   = { times: [], label: '' };

  try {
    info = dom.window.document
      .querySelector('tbody tr:nth-of-type(3) td:nth-of-type(1) font')
      .innerHTML
      .replace(/<(?:.|\n)*?>/gm, '')
      .trim()
      .split(', ')
      .filter((current, index) => ( current != '' ));

    from = { 
      times: getArrayOfTimes(dom.window.document.querySelector('tbody tr:nth-of-type(2) td:nth-of-type(1)').children),
      label: dom.window.document.querySelector('tbody tr:nth-of-type(1) th:nth-of-type(1)').innerHTML.trim()
    };

    to   = { 
      times: getArrayOfTimes(dom.window.document.querySelector('tbody tr:nth-of-type(2) td:nth-of-type(2)').children),
      label: dom.window.document.querySelector('tbody tr:nth-of-type(1) th:nth-of-type(2)').innerHTML.trim()
    }
  } catch (e) {
    // error
  }
  
  return { info , from, to };
}

// get final data
async function getFinalData(line) {
  const date = await getDateForUrl();
  
  const urls = {
    weekday:  'http://www.gspns.co.rs/red-voznje/ispis-polazaka?rv=rvp&vaziod=' + date + '&dan=R&linija%5B%5D=' + line,
    saturday: 'http://www.gspns.co.rs/red-voznje/ispis-polazaka?rv=rvp&vaziod=' + date + '&dan=S&linija%5B%5D=' + line,
    sunday:   'http://www.gspns.co.rs/red-voznje/ispis-polazaka?rv=rvp&vaziod=' + date + '&dan=N&linija%5B%5D=' + line
  };

  const weekday  = await getDataFromPage(urls.weekday);
  const saturday = await getDataFromPage(urls.saturday);
  const sunday   = await getDataFromPage(urls.sunday);

  return { weekday, saturday, sunday };
}

module.exports = { getFinalData };