
document.addEventListener("DOMContentLoaded", () => {
  
  renderCart();

  
  const paymentForm = document.getElementById("paymentForm");
  if (paymentForm) {
    paymentForm.addEventListener("submit", handlePayment);
  }

  
  const container = document.getElementById("cartItems");
  if (container) {
    enableVerticalDrag(container);
  }
});

function enableVerticalDrag(container) {
  let isDown = false;
  let startY = 0;
  let startScrollTop = 0;

  
  container.addEventListener("mousedown", (e) => {
    isDown = true;
    startY = e.pageY;
    startScrollTop = container.scrollTop;
    container.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
    container.style.cursor = "grab";
    document.body.style.userSelect = "";
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const y = e.pageY;
    const walk = (y - startY) * 1.5;
    container.scrollTop = startScrollTop - walk;
  });

  
  container.addEventListener("touchstart", (e) => {
    if (!e.touches.length) return;
    startY = e.touches[0].pageY;
    startScrollTop = container.scrollTop;
  });

  container.addEventListener("touchmove", (e) => {
    if (!e.touches.length) return;
    const y = e.touches[0].pageY;
    const walk = (y - startY) * 1.5;
    container.scrollTop = startScrollTop - walk;
  });
}



function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  if (typeof window.updateCartInfo === "function") {
    window.updateCartInfo();
  }
}


function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartItems");
  const summary = document.getElementById("cartSummary");

  if (!container || !summary) return; 

  container.innerHTML = "";

  if (!cart || cart.length === 0) {
    container.innerHTML = `<div class="empty">Cart is empty.</div>`;
    summary.textContent = "Total amount: $0.00";
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    const itemTotal = price * qty;
    totalItems += qty;
    totalPrice += itemTotal;

    const row = document.createElement("div");
    row.className = "cart-item";

    row.addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        window.location.href = `detail.html?id=${item.id}`;
      }
    });

    row.innerHTML = `
      <img src="${item.img || ''}" alt="${escapeHtml(item.title || '')}">
      <div class="info">
        <h3>${escapeHtml(item.title || '')}</h3>
        <p>Price: $${price.toFixed(2)}</p>
        <p>Quantity: ${qty}</p>
      </div>

      <div class="controls">
        <div class="item-total">$${itemTotal.toFixed(2)}</div>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

   
    const remBtn = row.querySelector(".remove-btn");

    

    remBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      removeItem(item.id);
    });

    container.appendChild(row);
  });

  summary.textContent = `Product number: ${totalItems} | Total amount: $${totalPrice.toFixed(2)}`;
}


function changeQuantity(id, newQty) {
  const cart = getCart();
  const idx = cart.findIndex(i => String(i.id) === String(id));
  if (idx === -1) return;
  cart[idx].quantity = Number(newQty);
  saveCart(cart);
  renderCart();
}


function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(i => String(i.id) !== String(id));
  saveCart(cart);
  renderCart();
}


function handlePayment(e) {
  e.preventDefault();
  const cart = getCart();
  if (!cart || cart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  const name = document.getElementById("fullName")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const address = document.getElementById("address")?.value.trim() || "";
  const card = document.getElementById("cardNumber")?.value.trim() || "";
  const expiry = document.getElementById("expiry")?.value.trim() || "";
  const cvv = document.getElementById("cvv")?.value.trim() || "";

  if (!name || !email || !address || !card || !expiry || !cvv) {
    alert("Please fill in all fields.");
    return;
  }

  
  alert("✅ Payment completed successfully. Thanks!");
  localStorage.removeItem("cart");
  if (typeof window.updateCartInfo === "function") window.updateCartInfo();
  window.location.href = "index.html";
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
