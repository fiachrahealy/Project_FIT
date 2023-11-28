const cheerio = require('cheerio');
const OpenAI = require("openai");

// Get Tesco Items

exports.getTescoItems = async (req, res, next) => {

  console.log("Searching Tesco for query: " + req.params.query);

  const response = await fetch('https://www.tesco.ie/groceries/en-IE/search?query=' + req.params.query);

  const body = await response.text();

  const $ = cheerio.load(body);

  const titles = [];
  const productRefs = [];
  const imageURLs = [];

  const items = [];

  $('.styled__Text-sc-1i711qa-1').each((index, titleNode) => {
    const title = $(titleNode).text();
    if (!(title.startsWith("Skip to") || title.startsWith("Rest of") || title == "Register" || title == "Sign in" || title == "Help" || title == "Write a review")) {
      titles.push(title);
    }
  });

  $('.styled__Anchor-sc-1i711qa-0').each((index, linkNode) => {
    const link = $(linkNode).attr('href');
    if (link.startsWith("/groceries/en-IE/products")) {
      productRefs.push(link.slice(26))
    }
  });

  $('.styled__Image-sc-j2gwt2-0').each((index, imageNode) => {
    const image = $(imageNode).attr('src');
    imageURLs.push(image);
  });

  var j = 8;

  if (titles.length < j) {
    j = titles.length;
  }

  for (var i = 0; i < j; i++) {
    items.push({ title: titles[i], imageURL: imageURLs[i], productRef: productRefs[i] });
  }

  res.json(items);

};

// Get Tesco Item Info

exports.getTescoItemInfo = async (req, res, next) => {

  console.log("Retrieving information from Tesco for product ref: " + req.params.productRef);

  const url = "https://www.tesco.ie/groceries/en-IE/products/" + req.params.productRef;

  const responseFromInitialRequest = await fetch(url);

  const initialBody = await responseFromInitialRequest.text();

  let $ = cheerio.load(initialBody);

  var text = $($('script')).text();

  var iFront = text.substring(text.search("var i =") + "var i =".length, text.length);
  var jFront = text.substring(text.search("var j =") + "var j =".length, text.length);
  var bmFront = text.substring(text.search("\"bm-verify\": \"") + "\"bm-verify\": \"".length, text.length);

  var i = parseInt(iFront.substring(0, iFront.search(";")));
  var jArr = (jFront.substring(0, jFront.search(";"))).split(/["]/);
  var j = i + parseInt(jArr[1]) + parseInt(jArr[3]);
  var bm = bmFront.substring(0, bmFront.search("\""))

  const payload = { 'bm-verify': bm, 'pow': j };

  const responseFromFromServer = await fetch("https://www.tesco.ie/_sec/verify?provider=interstitial", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en-GB;q=0.9,en;q=0.8",
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookie": parseCookieString(responseFromInitialRequest.headers.get('set-cookie')),
      "Referer": url,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": JSON.stringify(payload),
    "method": "POST"
  });

  const responseFromSecondRequest = await fetch(url, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en-GB;q=0.9,en;q=0.8",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "upgrade-insecure-requests": "1",
      "cookie": parseCookieString(responseFromFromServer.headers.get('set-cookie')),
      "Referer": url,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  const secondBody = await responseFromSecondRequest.text();

  $ = cheerio.load(secondBody);

  let recordedVals = [];

  let recordNext = false;

  let unableToLocateNutritionalInfo = false;

  let title = "";

  $('.product-details-tile__title').each((index, titleNode) => {
    title = $(titleNode).text();
  });

  $('.product__info-table').find('tr').each((i, row) => {

    $(row).find('td, th').each((j, cell) => {
      if (recordNext) {
        recordedVals.push($(cell).text());
        recordNext = false;
      }
      if (((($(cell).text()).toLowerCase()).includes("typical")) && !((($(cell).text()).toLowerCase()).includes("typically"))) {
        recordNext = true;
      }
      else if ((($(cell).text()).toLowerCase()).includes("energy")) {
        recordNext = true;
      }
      else if ((($(cell).text()).toLowerCase()).includes("fat")) {
        recordNext = true;
      }
      else if (((($(cell).text()).toLowerCase()).includes("saturates")) && !((($(cell).text()).toLowerCase()).includes("monounsaturates"))) {
        recordNext = true;
      }
      else if ((($(cell).text()).toLowerCase()).includes("sugars")) {
        recordNext = true;
      }
      else if ((($(cell).text()).toLowerCase()).includes("protein")) {
        recordNext = true;
      }
      else if ((($(cell).text()).toLowerCase()).includes("salt")) {
        recordNext = true;
      }
    });

  });

  if (recordedVals.length != 7) {
    unableToLocateNutritionalInfo = true;
  }

  if (unableToLocateNutritionalInfo) {
    res
      .status(400)
      .json({ message: "Nutritional Information not found for item" })
  }
  else {
    res.json({
      title: title,
      amount: parseFloat((((recordedVals[0]).toLowerCase()).split('per '))[1]),
      unit: ((((recordedVals[0]).toLowerCase()).split('per '))[1]).replace(/[0-9]/g, ''),
      calories: parseFloat(((recordedVals[1]).split('/'))[1]),
      fat: parseFloat(recordedVals[2]),
      saturates: parseFloat(recordedVals[3]),
      sugars: parseFloat(recordedVals[4]),
      protein: parseFloat(recordedVals[5]),
      salt: parseFloat(recordedVals[6])
    });
  }

};

// Get Dunnes Items

exports.getDunnesItems = async (req, res, next) => {

  console.log("Searching Dunnes for query: " + req.params.query);

  const response = await fetch('https://www.dunnesstoresgrocery.com/sm/pickup/rsid/314/results?q=' + req.params.query);

  const body = await response.text();

  const $ = cheerio.load(body);

  const titles = [];
  const productRefs = [];
  const imageURLs = [];

  const items = [];

  $('.sc-eCApGN').each((index, titleNode) => {
    const title = $(titleNode).text();
    titles.push(title.slice(0, title.length - 24));
  });

  if (titles.length == 0) {
    $('.sc-hKFyIo').each((index, titleNode) => {
      const title = $(titleNode).text();
      titles.push(title.slice(0, title.length - 24));
    });

  }

  $('.ProductCardHiddenLink--v3c62m').each((index, linkNode) => {
    const link = $(linkNode).attr('href');
    productRefs.push(link.slice(63));
  });

  $('.ProductCardImage--qpr2ve ').each((index, imageNode) => {
    const image = $(imageNode).attr('src');
    imageURLs.push(image);
  });

  var j = 8;

  if (titles.length < j) {
    j = titles.length;
  }

  for (var i = 0; i < j; i++) {
    items.push({ title: titles[i], imageURL: imageURLs[i], productRef: productRefs[i] });
  }

  res.json(items);

};

// Get Dunnes Item Info

exports.getDunnesItemInfo = async (req, res, next) => {

  console.log("Retrieving information from Dunnes for product ref: " + req.params.productRef);

  const response = await fetch('https://www.dunnesstoresgrocery.com/sm/pickup/rsid/314/product/' + req.params.productRef);

  const body = await response.text();

  const $ = cheerio.load(body);

  let title = "";
  let amount = "";
  let unit = "";
  let calories = "";
  let protein = "";
  let fat = "";
  let saturates = "";
  let sugars = "";
  let salt = "";

  let unableToLocateNutritionalInfo = false;

  $('.PdpInfoTitle--1qi97uk').each((index, titleNode) => {
    title = $(titleNode).text();
  });

  $('script').each((index, scriptNode) => {
    if (($(scriptNode).text()).startsWith("window.__PRELOADED_STATE__=")) {
      if (Object.keys(JSON.parse((($(scriptNode).text()).slice(27))).product.nutritionProfiles)[0] != undefined) {
        amount = parseFloat((Object.keys(JSON.parse((($(scriptNode).text()).slice(27))).product.nutritionProfiles)[0]).slice(4));
        unit = unit = ((Object.keys(JSON.parse((($(scriptNode).text()).slice(27))).product.nutritionProfiles)[0]).slice(4)).replace(/[0-9]/g, '');
        calories = parseFloat((Object.values(JSON.parse((($(scriptNode).text()).slice(27))).product.nutritionProfiles)[0]).calories.size);
        protein = parseFloat((Object.values(JSON.parse((($(scriptNode).text()).slice(27))).product.nutritionProfiles)[0]).protein.size);
        fat = parseFloat((Object.values(JSON.parse((($(scriptNode).text()).slice(27))).product.nutritionProfiles)[0])["total Fat"].size);
        saturates = parseFloat((Object.values(JSON.parse((($(scriptNode).text()).slice(27))).product.nutritionProfiles)[0]).saturates.size);
        sugars = parseFloat((Object.values(JSON.parse((($(scriptNode).text()).slice(27))).product.nutritionProfiles)[0]).sugars.size);
        salt = parseFloat((Object.values(JSON.parse((($(scriptNode).text()).slice(27))).product.nutritionProfiles)[0]).sodium.size);
      }
      else {
        unableToLocateNutritionalInfo = true;
      }
    }
  });

  if (unableToLocateNutritionalInfo) {
    res
      .status(400)
      .json({ message: "Nutritional Information not found for item" })
  }
  else {
    res.json({
      title: title,
      amount: amount,
      unit: unit,
      calories: calories,
      protein: protein,
      fat: fat,
      saturates: saturates,
      sugars: sugars,
      salt: salt
    });
  }

};

// Get Aldi Items

exports.getAldiItems = async (req, res, next) => {

  console.log("Searching Aldi for query: " + req.params.query);

  const response = await fetch('https://groceries.aldi.ie/en-GB/Search?keywords=' + req.params.query);

  const body = await response.text();

  const $ = cheerio.load(body);

  let items = []

  $('.products-search-results').each((index, resultsNode) => {
    const results = JSON.parse($(resultsNode).attr('data-context'));
    items = results.SearchResults.map(item => {
      return {
        title: item.FullDisplayName,
        imageURL: item.ImageUrl,
        productRef: item.Url
      };
    });

  });

  if (items.length > 8) {
    items = items.slice(0, 8);
  }

  res.json(items);

};

// Get Aldi Item Info

exports.getAldiItemsInfo = async (req, res, next) => {

  console.log("Retrieving information from Aldi for product ref: " + req.params.productRef);

  const response = await fetch('https://groceries.aldi.ie' + req.params.productRef);

  const body = await response.text();

  const $ = cheerio.load(body);

  let title = "";

  let unableToLocateNutritionalInfo = true;

  $('.my-0').each((index, titleNode) => {
    title = $(titleNode).text();
  });

  const table = $('.table');

  let nutInfo = "";
  let nextCell = false;

  table.find('tr').each((i, row) => {
    $(row).find('td, th').each((j, cell) => {
      if (nextCell) {
        nutInfo = $(cell).text();
        nextCell = false;
        unableToLocateNutritionalInfo = false;
      }
      if ($(cell).text() == "Nutrition information") {
        nextCell = true;
      }
    });
  });

  if (unableToLocateNutritionalInfo) {
    res
      .status(400)
      .json({ message: "Nutritional Information not found for item" })
  }
  else {

    const prompt = `Return a JSON object with 8 key-value pairs: amount, unit, calories, protein, sugars, salt, fat, saturates for the first set in the dataset. 
        Use '100' as the default for 'amount' and 'g' as the default for 'unit' if no 'per [amount][unit]' statement exists for the dataset. 
        For other values, use numeric values only, recording 0 if not available. Dataset: `
      + nutInfo;

    const openai = new OpenAI();

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0,
    });

    let start = completion.choices[0].text.indexOf('{');
    let end = completion.choices[0].text.lastIndexOf('}') + 1;
    let json = completion.choices[0].text.substring(start, end);

    res.json(Object.assign({}, { title: title }, JSON.parse(json)));

  }

};

// Parse Cookie String

function parseCookieString(cookies) {

  var cookiesToRemove = [];

  cookies = cookies.split(',');

  cookies.forEach((cookie, index) => {
    cookies[index] = (cookie.split(';'))[0]
    if (!((cookie.split(';'))[0]).includes("=")) {
      cookiesToRemove.push((cookie.split(';'))[0]);
    }
  });

  cookiesToRemove.forEach((cookieToRemove) => {
    cookies.splice(cookies.indexOf(cookieToRemove), 1);
  });

  var cookieString = "";

  cookies.forEach((cookie) => {
    cookieString += cookie + ";";
  });

  return cookieString;
}