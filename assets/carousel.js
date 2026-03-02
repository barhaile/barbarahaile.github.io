const track = document.getElementById('track');
const slides = Array.from(track.children);
const dots = Array.from(document.getElementById('nav').children);

let currentIndex = 0;
let autoPlayInterval;

function updateCarousel(index) {
    // Update Track Position
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // Update Active Classes
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
}

// Add Click Events to Dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateCarousel(index);
        resetAutoPlay(); // Pause autoplay when manually interacting
    });
});

// Recalculate widths on window resize so the alignment doesn't break
window.addEventListener('resize', () => updateCarousel(currentIndex));

// Optional: Auto-play functionality (slides every 6 seconds)
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        updateCarousel(nextIndex);
    }, 6000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Initialize AutoPlay
startAutoPlay();