
function updateCartInfo() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = totalCount;
  }
}


document.addEventListener("DOMContentLoaded", updateCartInfo);


window.updateCartInfo = updateCartInfo;
