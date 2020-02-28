"use strict";

var resizeImageUrl = function resizeImageUrl(imgUrl) {
  /* Example imgUrl: "hahaha.png/manyQueries" */

  /* The firstPart variable returns:  'hahaha' */

  /* The secondPart variable returns: '.png/manyQueries' */
  var imgRegex = /(.jpg|.png)/g;

  if (imgRegex.test(imgUrl)) {
    if (imgUrl.includes("jpg")) {
      var firstPart = imgUrl.slice(0, imgUrl.indexOf(".jpg")),
        secondPart = imgUrl.slice(imgUrl.indexOf(".jpg"));
      return firstPart + "_600x700_crop_center" + secondPart;
    }

    if (imgUrl.includes(".png")) {
      var _firstPart = imgUrl.slice(0, imgUrl.indexOf(".png")),
        _secondPart = imgUrl.slice(imgUrl.indexOf(".png"));

      return _firstPart + "_600x700_crop_center" + _secondPart;
    }
  } else {
    /* If it's something other than .png || .jpg we will just return it. */
    return imgUrl;
  }
};

var app = document.getElementById("app");

/* This is the uncompiled version
  const renderCard = (title, price, src) => {
    return app.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="card-container">
          <img class="card-img" src="${resizeImageUrl(src)}" />
          <div class="card-text-container">
            <h3 class="card-text">${title}</h3>
            <p class="card-price">${"$ " + price}</p>
          </div>
        </div>
      `
    );
  };
*/

var renderCard = function renderCard(title, price, src) {
  return app.insertAdjacentHTML(
    "afterbegin",
    '\n      <div class="card-container">\n        <img class="card-img" src="'
      .concat(
        resizeImageUrl(src),
        '" />\n        <div class="card-text-container">\n          <h3 class="card-text">'
      )
      .concat(title, '</h3>\n          <p class="card-price">')
      .concat("$ " + price, "</p>\n        </div>\n      </div>\n\t\t")
  );
};

var shopifyUrl =
  "https://cors-anywhere.herokuapp.com/https://cznd.co/collections/julianna-zobrist/products.json";

var fetchShopifyUrl = function fetchShopifyUrl(url) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        document.body.className = "ok";
        var res = JSON.parse(this.responseText);
        return renderShopifyItems(res);
      } else if (this.response == null && this.status === 0) {
        document.body.className = "error offline";
      } else {
        document.body.className = "error";
      }
    }
  };

  req.open("GET", url, true);
  req.send(null);
};
/* Returned in the fetchShopifyUrl() */

var renderShopifyItems = async function renderShopifyItems(res) {
  var products = res.products;
  products.map(function(item) {
    return renderCard(item.title, item.variants[0].price, item.images[0].src);
  });
};

fetchShopifyUrl(shopifyUrl);
