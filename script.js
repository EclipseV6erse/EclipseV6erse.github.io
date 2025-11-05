// Typing effect
const typingText = document.querySelector('.typing');
const text = typingText.textContent;
typingText.textContent = '';
let i = 0;

function type() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80);
    }
}
window.addEventListener('load', type);

// Scroll reveal
const fadeEls = document.querySelectorAll('.fade-up');
function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    fadeEls.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) el.classList.add('visible');
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
