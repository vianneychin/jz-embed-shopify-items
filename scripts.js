(function() {
  ("use strict");

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

  var app = document.getElementById("embedded-shopify-cznd");

  const css = `
    /* Remove */
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    /* Remove */
    html {
      height: 100%;
    }

    /* Remove */
    body {
      background-color: rgb(250, 250, 250);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #embedded-shopify-cznd {
      display: flex;
      flex-wrap: wrap;
      /* Removes extra spacing in between flex-wraps */
      align-content: flex-start;
      width: 100%;
      height: 100%;
      max-width: 1080px;
      margin: 85px 30px 23px 30px;
      justify-content: center;
    }

    .cznd-card-container {
      width: 270px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1.3em;
      cursor: pointer;
      text-decoration: none;
      color: unset;
    }
    .cznd-card-img {
      width: 100%;
    }
    .cznd-card-text-container {
      width: 100%;
      height: 100%;
      text-align: center;
      /* margin: 10px 0; */
      height: 45px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    .cznd-card-text {
      font-size: 0.75em;
      font-weight: 700;
      text-transform: uppercase;
    }
    .cznd-card-price {
      font-size: 0.75em;
      color: #333;
    }

    /* Media queries for fluid and bigger pictures. */

    /* 3 columns */
    @media screen and (max-width: 1139px) {
      .card {
        width: 300px;
      }
    }

    /* 2 columns */
    @media screen and (max-width: 959px) {
      .card {
        width: 50%;
      }
    }

    /* 1 column */
    @media screen and (max-width: 659px) {
      #app {
        max-width: 1080px;
      }
      .card {
        width: 80%;
      }
    }

  `;

  const insertStyles = () => {
    const head = document.head || document.getElementsByTagName("head")[0],
      style = document.createElement("style");

    head.appendChild(style);

    style.type = "text/css";

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  };

  // This is the uncompiled version
  const renderCard = (title, price, src, handle) => {
    return app.insertAdjacentHTML(
      "afterbegin",
      `
          <a
            href="https://cznd.co/collections/julianna-zobrist/products/${handle}" class="cznd-card-container"
          >
            <img class="cznd-card-img" src="${resizeImageUrl(src)}" />
            <div class="cznd-card-text-container">
              <h3 class="cznd-card-text">${title}</h3>
              <p class="cznd-card-price">${"$ " + price}</p>
            </div>
          </a>
        `
    );
  };

  var shopifyUrl = "https://cznd.co/collections/julianna-zobrist/products.json";
  // var shopifyUrl =
  // "https://cors-anywhere.herokuapp.com/https://cznd.co/collections/julianna-zobrist/products.json";

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
      return renderCard(
        item.title,
        item.variants[0].price,
        item.images[0].src,
        item.handle
      );
    });
  };

  insertStyles();
  fetchShopifyUrl(shopifyUrl);
})();
