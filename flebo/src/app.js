document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector(".mobileMenu");
  const mobileMenuPanel = document.querySelector(".mobileMenuPanel");
  const xMarkButton = document.querySelector(".x-markButton");
  const scrollIndicator = document.getElementById("scrollIndicator");


  /* menu açma tusu */
  mobileMenuButton.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenuPanel.classList.toggle("hidden");  //hidden varsa çıkar, yoksa ekle.
  });

  /* menu kapatma tusu */
  xMarkButton.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenuPanel.classList.toggle("hidden");
  });

  /* menudeki ogelerden birine tıklayınca menuyu kapat */
  document.querySelectorAll(".mobileMenuPanel .pages a").forEach((link) =>
    link.addEventListener("click", () => {
      mobileMenuPanel.classList.toggle("hidden");

    })
  );


  // Menü dışına tıklanınca kapatma
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = mobileMenuPanel.contains(e.target);
    const isClickOnButton = mobileMenuButton.contains(e.target);

    if (!isClickInsideMenu && !isClickOnButton) {
      mobileMenuPanel.classList.add('hidden');
    }
  });

  /* scroll indicator uyarısı çıkış zamanları */
  setTimeout(() => {
    scrollIndicator.classList.toggle("hidden");
  }, 4000);

  setTimeout(() => {
    scrollIndicator.classList.toggle("hidden");
  }, 5000);



  // Sayfa yüklendiğinde orijinal metinleri ve placeholderları sakla
  const elements = document.querySelectorAll("[data-en]");
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.placeholder !== undefined) {
      el.dataset.originalPlaceholder = el.placeholder;
    } else {
      el.dataset.originalText = el.textContent;
    }
  }

});


/* scroll aşağı kaydıkça navbarı gizle */

let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Aşağı kaydırıyor → header gizle
    header.style.transform = "translateY(-100%)";
  } else {
    // Yukarı kaydırıyor → header göster
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});




/* ÜRÜNLER SAYFASI GEÇİŞLERİ*/

const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalSlides = slider.children.length;

function updateSlider() {
  const slideWidth = slider.clientWidth;
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

window.addEventListener('resize', updateSlider);


let currentLang = "tr";

document.getElementById("langToggle").addEventListener("click", () => {
  const btn = document.getElementById("langToggle");

  if (currentLang === "tr") {
    currentLang = "en";
    btn.textContent = "TR";
  } else {
    currentLang = "tr";
    btn.textContent = "EN";
  }

  const elements = document.querySelectorAll("[data-en]");
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.placeholder !== undefined) {
      // Eğer elementin placeholder attribute'u varsa, onu güncelle
      if (currentLang === "en") {
        el.placeholder = el.getAttribute("data-en");
      } else {
        el.placeholder = el.dataset.originalPlaceholder;
      }
    } else {
      // Yoksa normal textContent güncelle
      if (currentLang === "en") {
        el.textContent = el.getAttribute("data-en");
      } else {
        el.textContent = el.dataset.originalText;
      }
    }
  }
});
