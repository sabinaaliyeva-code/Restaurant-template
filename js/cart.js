


document.addEventListener("DOMContentLoaded", () => {
   
  
  const container = document.getElementById("cart-container");
  const buyNowCartBtn = document.getElementById("buy-now-cart");

  const cart = JSON.parse(localStorage.getItem("cart")) || []; 

  function renderCart() {
   
    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {
      container.innerHTML = "<p>Cart is empty. 🛒</p>";
      if (buyNowCartBtn) buyNowCartBtn.style.display = "none";
      updateCartCounter();
      return;
    }

    if (buyNowCartBtn) buyNowCartBtn.style.display = "block";

    let totalPrice = 0;
    let totalQuantity = 0;

    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove") && 
            !e.target.closest("button")) {
          window.location.href = `detail.html?id=${item.id}`;
        }
      });

      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div>
          <h4>${item.title}</h4>
          <p>Price: $${item.price} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div>
          <button onclick="decreaseQty(${index})">-</button>
          <button onclick="increaseQty(${index})">+</button>
          <button class="remove" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
      container.appendChild(div);
    });

    const summary = document.createElement("div");
    summary.classList.add("cart-summary");
    summary.innerHTML = `
      <hr>
      <h3>Total number of product: ${totalQuantity}</h3>
      <h3>Total amount: $${totalPrice.toFixed(2)}</h3>
    `;
    container.appendChild(summary);
    
    updateCartCounter();
    } 

  
  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  window.increaseQty = function(index) {
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  window.decreaseQty = function(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  if (buyNowCartBtn) {
    buyNowCartBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Cart is empty!");
        return;
      }
      window.location.href = "checkout.html";
    });
  }
  

  renderCart();
});
