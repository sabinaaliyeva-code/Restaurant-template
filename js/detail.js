let quantity = 1;
const qtyDisplay = document.getElementById("quantity");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id"); 

const addCartBtn = document.getElementById("add-cart");
const buyNowBtn = document.getElementById("buy-now");

let currentProduct = null;


window.increaseQty = function () {
  quantity++;
  qtyDisplay.textContent = quantity;
};


window.decreaseQty = function () {
  if (quantity > 1) {
    quantity--;
    qtyDisplay.textContent = quantity;
  }
};


fetch("./product.json")
  .then(res => res.json())
  .then(data => {
    const product = data.find(item => item.id == productId);

    if (product) {
      currentProduct = product;
      document.getElementById("product-img").src = product.img;
      document.getElementById("product-title").textContent = product.title;
      document.getElementById("product-ingredients").textContent = product.ingredients;
      document.getElementById("product-price").textContent = "$" + product.price.toFixed(2);
    }
  });


addCartBtn.addEventListener("click", () => {
  if (!currentProduct) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id == currentProduct.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: currentProduct.id,
      title: currentProduct.title,
      price: currentProduct.price,
      img: currentProduct.img,
      quantity: quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification("Product added to basket ✅");
  updateCartInfo();

 


 
});



 function showNotification(message) {
  const notif = document.getElementById("notification");
  notif.textContent = message;
  notif.classList.add("show");

  setTimeout(() => {
    notif.classList.remove("show");
  }, 1000); 
 }

 
