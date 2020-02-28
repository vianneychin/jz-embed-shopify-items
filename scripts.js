const resizeImageUrl = imgUrl => {
  /* Example imgUrl: "hahaha.png/manyQueries" */
  /* The firstPart variable returns:  'hahaha' */
  /* The secondPart variable returns: '.png/manyQueries' */

  const imgRegex = /(.jpg|.png)/g;

  if (imgRegex.test(imgUrl)) {
    if (imgUrl.includes("jpg")) {
      const firstPart = imgUrl.slice(0, imgUrl.indexOf(".jpg")),
        secondPart = imgUrl.slice(imgUrl.indexOf(".jpg"));

      return firstPart + "_600x700_crop_center" + secondPart;
    }

    if (imgUrl.includes(".png")) {
      const firstPart = imgUrl.slice(0, imgUrl.indexOf(".png")),
        secondPart = imgUrl.slice(imgUrl.indexOf(".png"));

      return firstPart + "_600x700_crop_center" + secondPart;
    }
  } else {
    /* If it's something other than .png || .jpg we will just return it. */
    return imgUrl;
  }
};

const app = document.getElementById("app");

const renderCard = (title, price, src) => {
  return app.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="card">
        <img class="item-img" src="${resizeImageUrl(src)}" />
        <div class="text-container">
          <h3 class="item-text">${title}</h3>
          <p class="item-price">$${price}</p>
        </div>
      </div>
		`
  );
};

const shopifyUrl =
  "https://cors-anywhere.herokuapp.com/https://cznd.co/collections/julianna-zobrist/products.json";

const getShopifyItems = url => {
  let req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        document.body.className = "ok";
        const res = JSON.parse(this.responseText);

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

const renderShopifyItems = async res => {
  const products = res.products;

  products.map(item => {
    return renderCard(item.title, item.variants[0].price, item.images[0].src);
  });
};

getShopifyItems(shopifyUrl);
