const app = document.getElementById("app");

const renderCard = (title, price, src) => {
  return app.insertAdjacentHTML(
    "afterbegin",
    `
			<div class="card">
				<img class="item-img" src="${src}" />
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

/* IMG_4861_600x600_crop_center.png */
/* IMG_4861.png */

/* convert to xml/xhr */
/* Run it through babel for es2015 */
const renderShopifyItems = async () => {
  const response = await fetch(shopifyUrl);

  const data = await response.json();

  const products = data.products;

  products.map(item => {
    return renderCard(item.title, item.variants["0"].price, item.images[0].src);
  });
};

renderShopifyItems();
