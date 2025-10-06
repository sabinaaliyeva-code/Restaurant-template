fetch("./header.html")
  .then(res => res.text())
  .then(data => document.querySelector("header").innerHTML = data);

fetch("./footer.html")
  .then(res => res.text())
  .then(data => document.querySelector("footer").innerHTML = data);

function initSlider(jsonUrl, cardsGrid, pageInfo, pageButtonsContainer, prevBtn, nextBtn, cardsPerPage = 16) {
  let currentPage = 1;
  let products = [];
  let filteredProducts = [];

  
  fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
      products = data;
      filteredProducts = products; 
      renderSlider();
      renderPageButtons();
      initFilters();
    })
    .catch(err => console.error("JSON yüklənmədi:", err));

  
  function renderSlider() {
    cardsGrid.innerHTML = '';
    const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const pageCards = filteredProducts.slice(start, end);

    pageCards.forEach(product => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');
      cardDiv.dataset.id = product.id;

      const viewsKey = `product-${product.id}-views`;
      const currentViews = parseInt(localStorage.getItem(viewsKey)) || product.views;

      cardDiv.innerHTML = `
        <div class="img-container">
          <img src="${product.img}" alt="${product.title}">
          <div class="img-overlay">${product.title}</div>
          <div class="img-border"></div>
        </div>
        <div class="card-info">
          <span class="views">${currentViews}views</span>
        </div>
      `;

      cardDiv.addEventListener('click', () => {
        let newViews = currentViews + 1;
        localStorage.setItem(viewsKey, newViews);
        cardDiv.querySelector('.views').textContent = newViews + ' views';
        window.location.href = `detail.html?id=${product.id}`;
      });

      cardsGrid.appendChild(cardDiv);
    });

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  
  function renderPageButtons() {
    pageButtonsContainer.innerHTML = '';
    const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');

      btn.addEventListener('click', () => {
        currentPage = i;
        renderSlider();
        renderPageButtons();
      });

      pageButtonsContainer.appendChild(btn);
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderSlider();
      renderPageButtons();
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderSlider();
      renderPageButtons();
    }
  });

  
  function initFilters() {
    const MenuhamburgerBtn = document.createElement("button");
    MenuhamburgerBtn.classList.add("menu-hamburger");
    MenuhamburgerBtn.textContent = "☰ Menu";
    document.querySelector("header").after(MenuhamburgerBtn);

    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filter-container");
    filterContainer.innerHTML = `
      <button data-category="all" class="all">All</button>

      <div class="dropdown">
        <button class="dropbtn">Main Courses ⬇</button>
        <div class="dropdown-content">
          <button data-category="fish">Fish</button>
          <button data-category="chicken">Chicken</button>
          <button data-category="meat">Meat</button>
        </div>
      </div>

      <div class="dropdown">
        <button class="dropbtn">Drinks ⬇</button>
        <div class="dropdown-content">
          <button data-category="sparkling drinks">Sparkling Juice</button>
          <button data-category="fruit juice">Fruit Juice</button>
          <button data-category="ice tea">Ice Tea</button>
          <button data-category="coffee">Coffee</button>
          <button data-category="milk-shake">Milk Shake</button>
        </div>
      </div>

      <div class="dropdown">
        <button class="dropbtn">Fast Food ⬇</button>
        <div class="dropdown-content">
          <button data-category="pizza">Pizza</button>
          <button data-category="burger">Burger</button>
          <button data-category="potato">Potato</button>
        </div>
      </div>

      <div class="dropdown">
        <button class="dropbtn">Desserts ⬇</button>
        <div class="dropdown-content">
          <button data-category="keks">Keks</button>
          <button data-category="tiramisu">Tiramisu</button>
          <button data-category="ice cream">Ice Cream</button>
        </div>
      </div>

      <div class="dropdown">
        <button class="dropbtn">Salad ⬇</button>
        <div class="dropdown-content">
          <button data-category="fish-salad">Fish Salad</button>
          <button data-category="chicken-salad">Chicken  Salad</button>
          <button data-category="vegetable-salad">Vegetable Salad</button>
          <button data-category="mixed-salad">Mixed Salad</button>
        </div>
      </div>
    `;

    document.querySelector("header").after(filterContainer);

    MenuhamburgerBtn.addEventListener("click", () => {
      filterContainer.classList.toggle("show");
      MenuhamburgerBtn.classList.toggle("active");

      MenuhamburgerBtn.textContent = MenuhamburgerBtn.classList.contains("active")
      ? "✖ Close"
      : "☰ Menu";
    });

    filterContainer.querySelectorAll("button[data-category]").forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        if (category === "all") {
          filteredProducts = products;
        } else {
          filteredProducts = products.filter(p => p.category === category);
        }
        currentPage = 1;
        renderSlider();
        renderPageButtons();
      });
    });
  }
}


document.addEventListener("DOMContentLoaded", () => {
 
  initSlider(
    "./product.json",
    document.getElementById("cards-grid"),
    document.getElementById("page-info"),
    document.getElementById("page-buttons"),
    document.getElementById("prev-btn"),
    document.getElementById("next-btn"),
    16
  );
});