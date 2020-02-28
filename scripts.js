const resizeImageUrl = imgUrl => {
  /* Example imgUrl: "hahaha.png/manyQueries" */
  /* The firstPart variable returns:  'hahaha' */
  /* The secondPart variable returns: '.png/manyQueries' */

  const imgRegex = /(.jpg|.png)/g;

  if (imgRegex.test(imgUrl)) {
    if (imgUrl.includes("jpg")) {
      const firstPart = imgUrl.slice(0, imgUrl.indexOf(".jpg")),
        secondPart = imgUrl.slice(imgUrl.indexOf(".jpg"));
      return firstPart + "_600x600_crop_center" + secondPart;
    }

    if (imgUrl.includes(".png")) {
      const firstPart = imgUrl.slice(0, imgUrl.indexOf(".png")),
        secondPart = imgUrl.slice(imgUrl.indexOf(".png"));
      return firstPart + "_600x600_crop_center" + secondPart;
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

const shopifyUrl = "https://cznd.co/collections/julianna-zobrist/products.json";

/* Use Regex to manipulate the image. */
/* _600x600_crop_center */

/* IMG_4861.png */
/* IMG_4861_600x600_crop_center.png */

/* convert to xml/xhr */
/* Run it through babel for es2015 */

/*  Final Desired Result:
  If the string is either '.jpg' or '.png'
  Append _600x600_crop_center to it.
  */

/*
 First try to get a match of .jpg or .png that returns true or false.
 */

const renderShopifyItems = async () => {
  const response = await fetch(shopifyUrl);

  const data = await response.json();

  const products = data.products;

  products.map(item => {
    console.log(item.images[0].src);
    console.log(item.images[0].src.length, "🙂 length");
    return renderCard(item.title, item.variants[0].price, item.images[0].src);
  });
};

renderShopifyItems();
