/* ================================
   LAFDOORS — ОСНОВНОЙ СКРИПТ
   ================================ */

/* === ОТКРЫТИЕ СТАТЬИ ===
   (для страниц News и Fashion) */
document.addEventListener("DOMContentLoaded", () => {
  const articles = document.querySelectorAll(".article-card");
  articles.forEach(card => {
    card.addEventListener("click", () => {
      const url = card.getAttribute("data-url");
      if (url) {
        window.open(url, "_blank");
      }
    });
  });
});

/* === КАРУСЕЛЬ (для страницы Archive) === */
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".carousel img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let index = 0;

  if (!carousel) return; // если нет карусели — выходим

  function showSlide(n) {
    slides.forEach((img, i) => {
      img.style.display = i === n ? "block" : "none";
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function prevSlideFunc() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", prevSlideFunc);

  // Управление с клавиатуры
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight" || e.code === "Space") nextSlide();
    if (e.code === "ArrowLeft") prevSlideFunc();
  });

  showSlide(index);
});

/* === КАРТА (на странице Contact) === */
document.addEventListener("DOMContentLoaded", () => {
  const map = document.querySelector(".map");
  if (map) {
    map.addEventListener("click", () => {
      window.open(
        "https://www.google.com/maps/place/Vatican+City/",
        "_blank"
      );
    });
  }
});

// ======== АНИМАЦИЯ ПРИ ПРОКРУТКЕ ========
const faders = document.querySelectorAll('.fade-in');
const reveals = document.querySelectorAll('.reveal');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.classList.add('active');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
reveals.forEach(reveal => {
  appearOnScroll.observe(reveal);
});

// Открытие карточек и поддержка клавиш (Enter/Space)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.article-card');
  cards.forEach(card => {
    // клик (у тебя уже есть, но на всякий случай)
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      if (url) window.open(url, '_blank');
    });
    // клавиши
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const url = card.dataset.url;
        if (url) window.open(url, '_blank');
      }
    });
  });
});

// ======== КАРУСЕЛЬ ДЛЯ АРХИВА С ЭФФЕКТОМ ЛИСТАНИЯ ========
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = Array.from(track.children);
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function flipAnimation(direction) {
    slides[currentIndex].classList.add(direction === 'next' ? 'flip-forward' : 'flip-back');
    setTimeout(() => {
      slides[currentIndex].classList.remove('flip-forward', 'flip-back');
    }, 800);
  }

  nextBtn.addEventListener('click', () => {
    flipAnimation('next');
    if (currentIndex < slides.length - 2) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    flipAnimation('back');
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slides.length - 2;
    }
    updateCarousel();
  });

  // Листание стрелками и пробелом
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    }
  });

  // Пересчёт при ресайзе
  window.addEventListener('resize', updateCarousel);
});
