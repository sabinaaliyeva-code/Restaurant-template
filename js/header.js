fetch("footer.html")
        .then(res => res.text())
        .then(data => {
            const footerElement = document.querySelector("footer");
            if (footerElement) {
                footerElement.innerHTML = data;
            }
    });

function initHeader() {
  fetch('header.html')
    .then(res => res.text())
    .then(data => {
      document.querySelector('header').outerHTML = data;

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
    const currentUrl = window.location.pathname.split("/").pop();

    links.forEach(link => {
       if(link.getAttribute("href") === currentUrl){
           link.classList.add("active");
    }
    });
  
}


function initReservation() {
  const popupHTML = `
    <div id="reservation-popup" style="display:none;">
      <div class="reservation-content">
        <span id="close-popup" class="close-btn">&times;</span>
        <h2>Book Your Table</h2>
        <form id="reservation-form">
          <label for="reservation-name">Full Name</label>
          <input type="text" id="reservation-name" placeholder="Your Name" required>

          <label for="reservation-email">Email</label>
          <input type="email" id="reservation-email" placeholder="example@mail.com" required>

          <label for="reservation-phone">Phone Number</label>
          <input type="tel" id="reservation-phone" placeholder="+1234567890" required>

          <label for="reservation-date">Date</label>
          <input type="date" id="reservation-date" required>

          <label for="reservation-time">Time</label>
          <input type="time" id="reservation-time" required>

          <label for="reservation-occasion">Occasion</label>
          <input type="text" id="reservation-occasion" placeholder="Birthday, Anniversary, etc.">

          <label for="reservation-filial">Which Filial</label>
          <input type="text" id="reservation-filial" placeholder="Choose filial">

          <label for="reservation-guests">Number of Guests</label>
          <input type="number" id="reservation-guests" placeholder="2" min="1" required>

          <button type="submit">Reserve Now</button>
        </form>
      </div>
    </div>
  `;

  
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const reserveBtn = document.getElementById("reserve-btn");
  const popup = document.getElementById("reservation-popup");
  const closeBtn = document.getElementById("close-popup");
  const form = document.getElementById("reservation-form");

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


document.addEventListener("DOMContentLoaded", initReservation);
document.addEventListener("DOMContentLoaded", initHeader);
