
fetch("./footer.html")
  .then(res => res.text())
  .then(data => {
    const footerElement = document.querySelector("footer");
    if (footerElement) {
      footerElement.innerHTML = data;
    }
  });


function initHeader() {
  fetch("./header.html")
    .then(res => res.text())
    .then(data => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        headerElement.outerHTML = data;
      }

      
      initNav();
      initReservation();
      updateCartCounter();

      if (typeof updateCartInfo === "function") {
        updateCartInfo();
      }
    });
}


function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemCount = document.getElementById("cart-count");
  if (itemCount) {
    itemCount.textContent = totalCount;
  }
}


function initNav() {
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  if (!nav || !hamburger) return;

  hamburger.addEventListener('click', () => nav.classList.toggle('show'));

  const links = document.querySelectorAll(".nav-links a");

  
  let path = window.location.pathname;

  
  if (path === "/" || path === "") path = "/index.html";

  links.forEach(link => {
    let href = link.getAttribute("href");

    
    if (href === path || href === path.replace(".html","") || href === path.split("/").pop()) {
      link.classList.add("active");
    }
  });
}




function initReservation() {
  const popupHTML = `
    <div id="reservation-popup1" style="display:none;">
      <div class="reservation-content1">
        <span id="close-popup1" class="close-btn">&times;</span>
        <h2>Book Your Table</h2>
        <form id="reservation-form1">
          <label for="reservation-name1">Full Name</label>
          <input type="text" id="reservation-name1" placeholder="Your Name" required>

          <label for="reservation-email1">Email</label>
          <input type="email" id="reservation-email1" placeholder="example@mail.com" required>

          <label for="reservation-phone1">Phone Number</label>
          <input type="tel" id="reservation-phone1" placeholder="+1234567890" required>

          <label for="reservation-date1">Date</label>
          <input type="date" id="reservation-date1" required>

          <label for="reservation-time1">Time</label>
          <input type="time" id="reservation-time1" required>

          <label for="reservation-occasion1">Occasion</label>
          <input type="text" id="reservation-occasion1" placeholder="Birthday, Anniversary, etc.">

          <label for="reservation-filial1">Which Filial</label>
          <input type="text" id="reservation-filial1" placeholder="Choose filial">

          <label for="reservation-guests1">Number of Guests</label>
          <input type="number" id="reservation-guests1" placeholder="2" min="1" required>

          <button type="submit">Reserve Now</button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const reserveBtn = document.getElementById("reserve-btn");
  const popup = document.getElementById("reservation-popup1");
  const closeBtn = document.getElementById("close-popup1");
  const form = document.getElementById("reservation-form1");

  if (!reserveBtn || !popup || !closeBtn || !form) return;

  reserveBtn.addEventListener("click", () => popup.style.display = "flex");
  closeBtn.addEventListener("click", () => popup.style.display = "none");
  window.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Your table has been reserved! ✅");
    form.reset();
    popup.style.display = "none";
  });
}


document.addEventListener("DOMContentLoaded", initHeader);
