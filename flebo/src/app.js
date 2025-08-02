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
  document.querySelectorAll("[data-en]").forEach((el) => {
    if (el.placeholder !== undefined && el.placeholder !== null) {
      el.dataset.originalPlaceholder = el.placeholder;
    } else {
      el.dataset.originalText = el.textContent;
    }
  });

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

function updateSlider() {
  const card = slider.children[0];
  if (!card) return;
  const slideWidth = card.offsetWidth + 24; // 24 = gap-6
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < slider.children.length - 1) {
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





/* DİL SEÇİM */
let currentLang = "tr";

// Tüm lang butonlarını yakala
document.querySelectorAll(".langMenuButton").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Aynı butonun içindeki dropdown'u bul
    const dropdown = btn.parentElement.querySelector(".langMenu");
    dropdown.classList.toggle("hidden");

    // Diğer açık menüleri kapat
    document.querySelectorAll(".langMenu").forEach((menu, i) => {
      if (i !== index) menu.classList.add("hidden");
    });
  });
});

// Her dropdown içindeki dil seçeneğini işle
document.querySelectorAll(".langMenu").forEach((menu) => {
  menu.querySelectorAll("button").forEach((langBtn) => {
    langBtn.addEventListener("click", () => {
      const selectedLang = langBtn.dataset.lang;
      currentLang = selectedLang;

      // Menü kapat
      menu.classList.add("hidden");

      // Diğer dil butonları güncellenebilirse
      document.querySelectorAll(".langToggle").forEach((b) => {
        b.textContent = currentLang === "tr" ? "EN" : "TR";
      });

      // Sayfa içeriğini güncelle
      document.querySelectorAll("[data-en]").forEach((el) => {
        if (el.placeholder !== undefined && el.placeholder !== null) {
          el.placeholder =
            currentLang === "en"
              ? el.getAttribute("data-en")
              : el.dataset.originalPlaceholder;
        } else {
          el.textContent =
            currentLang === "en"
              ? el.getAttribute("data-en")
              : el.dataset.originalText;
        }
      });
    });
  });
});

// Sayfa dışında bir yere tıklanırsa dropdown'u kapat
document.addEventListener("click", (e) => {
  const isDropdown = e.target.closest(".langMenuButton") || e.target.closest(".langMenu");
  if (!isDropdown) {
    document.querySelectorAll(".langMenu").forEach((menu) => menu.classList.add("hidden"));
  }
});




// mobil için animasyon hızı ayarla

function setMarqueeSpeed() {
  const marquee = document.getElementById('brandMarquee');
  const isMobile = window.innerWidth < 768;

  if (marquee) {
    // Reset animasyonu
    marquee.style.animation = 'none';
    void marquee.offsetWidth; // Force reflow
    marquee.style.animation = `marquee ${isMobile ? '10s' : '20s'} linear infinite`;
  }
}
