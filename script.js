// Fade-in animations on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.fade-in, .fade-in-delay, .fade-up, .slide-up').forEach(el => observer.observe(el));
