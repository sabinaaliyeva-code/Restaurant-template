document.addEventListener("DOMContentLoaded", () => {
    
    
    
    fetch("./footer.html")
        .then(res => res.text())
        .then(data => {
            const footerElement = document.querySelector("footer");
            if (footerElement) {
                footerElement.innerHTML = data;
            }
    });


    let slideIndex = 1;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    function showSlides(n) {
        if (slides.length === 0) return;
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        for (let slide of slides) slide.style.display = "none";
        for (let dot of dots) dot.className = dot.className.replace(" active", "");

        slides[slideIndex - 1].style.display = "block";
        if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
    }

    function plusSlides(n) { showSlides(slideIndex += n); }
    function currentSlide(n) { showSlides(slideIndex = n); }

    showSlides(slideIndex);
    
    
    setInterval(() => plusSlides(1), 5000);

    
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", () => currentSlide(i + 1));
    }



          const sections = document.querySelectorAll(
    ".services, .about-section, .chefs, .slider-page, .faq-section"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, 1000); 
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(sec => observer.observe(sec));


    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove("active");
            });
            item.classList.toggle("active");
        });
    });

   
    const container = document.getElementById('slider-container');
    const track = document.getElementById('slider-track');
    if (container && track) { 
        let originalSlides = Array.from(track.children);
        const totalSlides = originalSlides.length;

        
        track.innerHTML += track.innerHTML + track.innerHTML;
        let slides = Array.from(track.children);

        
        let currentIndex = totalSlides; 
        let isTransitioning = false;


        


function getSizes() {
    if (!slides[0]) return { slideWidth: 0, slideOffset: 0, containerWidth: 0 };
    const slideStyle = window.getComputedStyle(slides[0]);
    
    
    const slideWidth = slides[0].offsetWidth; 
    const marginLeft = parseFloat(slideStyle.marginLeft) || 0; 
    const marginRight = parseFloat(slideStyle.marginRight) || 0; 
    const slideMargin = 4*marginLeft + marginRight; 
    
    const slideOffset = slideWidth + slideMargin; 
    const containerWidth = container.clientWidth;

    return { slideWidth, slideOffset, containerWidth };
}


function getCenteredOffset(index) {
    const { slideOffset, containerWidth, slideWidth } = getSizes();
    
    const normalOffset = -index * slideOffset;
    
   
    const centerAdjustment = (containerWidth / 2) - (slideWidth /2) - slideOffset;

    
    return normalOffset + centerAdjustment;
}


        

        
function updateSlider(index = currentIndex, withTransition = true) {
    const translateX = getCenteredOffset(index);
    track.style.transition = withTransition ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
    track.style.transform = `translateX(${translateX}px)`;

    
    slides.forEach(s => s.classList.remove('active')); 

    const centerIndex = index + 1; 

   
    if (slides[centerIndex]) {
        slides[centerIndex].classList.add('active');
    }
    
    currentIndex = index;
}
        
        
        function setupSlideClicks() {
            slides.forEach((slide, index) => {
                slide.onclick = (e) => {
                    e.preventDefault();
                    if (isTransitioning) return;
                    
                   
                    const centerIndex = currentIndex + 1; 

                    if (index === centerIndex) {
                        currentIndex++; 
                    } 
                    
                    else if (index < centerIndex) {
                        currentIndex--; 
                    }
                    
                    else if (index > centerIndex) {
                        currentIndex++; 
                    }

                    if (index !== centerIndex) { 
                        
                    }

                    isTransitioning = true;
                    updateSlider(currentIndex);
                };
            });
        }


        
        track.addEventListener('transitionend', function handler() {
            isTransitioning = false;
            
            
            if (currentIndex >= totalSlides * 2) {
                updateSlider(totalSlides, false);
            }
            
            else if (currentIndex < totalSlides) {
                updateSlider(totalSlides * 2 - 1, false); 
            }
        });

       
        window.addEventListener('resize', () => {
            updateSlider(currentIndex, false);
        });
        
        window.addEventListener('load', () => {
            updateSlider(currentIndex, false);
            setupSlideClicks();
        });
    }

   
    const chefCards = document.querySelectorAll(".chef-card");

    chefCards.forEach(card => {
        const social = card.querySelector(".social-icons");
        if (social) {
            card.addEventListener("mouseenter", () => {
                social.style.opacity = "1";
            });

            card.addEventListener("mouseleave", () => {
                social.style.opacity = "0";
            });
        }
    });
             
    (function () {
  const whatsappUrl = "#"; 

  
  const wrapper = document.createElement("div");
  wrapper.className = "whatsapp-wrapper";

  
  const a = document.createElement("a");
  a.className = "whatsapp-float";
  a.href = whatsappUrl;
  a.target = "_blank";
  a.title = "Contact us on WhatsApp";

  
  const i = document.createElement("i");
  i.className = "bi bi-whatsapp";

  
  a.appendChild(i);
  wrapper.appendChild(a);
  document.body.appendChild(wrapper);
})();


const reserveBtn = document.querySelector(".reservation-btn");


const popup = document.createElement("div");
popup.className = "popup";
popup.innerHTML = `
  <div class="popup-content">
  <span class="close">&times;</span>
  <h2>Reservation</h2>
  <form>
    
    <label for="reservation-name">Your Name</label>
    <input type="text" id="reservation-name" placeholder="Your Name" required>

    
    <label for="reservation-email">Your Email</label>
    <input type="email" id="reservation-email" placeholder="example@mail.com" required>

    
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

    
    <button type="submit">Reserve</button>
  </form>
</div>

`;
document.body.appendChild(popup);


reserveBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});


popup.querySelector(".close").addEventListener("click", () => {
  popup.style.display = "none";
});


window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});



}); 
