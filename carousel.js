const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__button-right');
const prevBtn = document.querySelector('.carousel__button-left');
const dotsNav = document.querySelector('.carousel__nav');

// Position slides side-by-side
const slideWidth = slides[0].getBoundingClientRect().width;

const slideGap = 0; // Gap in pixels

const setSlideSPosition = (slide, index) => {
    slide.style.left = (slideWidth + slideGap) * index + 'px';
};
slides.forEach(setSlideSPosition);

// Dynamically create dots based on slides
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active'); // Set the first dot as active initially
    dotsNav.appendChild(dot);
});
const dots = Array.from(dotsNav.children);

// Function to update active dot
const updateActiveDot = (currentIndex) => {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('current-slide');
        } else {
            dot.classList.remove('current-slide');
        }
    });
};

// Move to a specific slide
const moveToSlide = (currentSlide, targetSlide) => {
    const amountToMove = parseFloat(targetSlide.style.left.replace('px', ''));

    // Move the track
    track.style.transform = `translateX(-${amountToMove}px)`;

    // Update the current-slide class
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

    // Update active dot
    const targetIndex = slides.indexOf(targetSlide);
    updateActiveDot(targetIndex);
};

// Next button functionality
nextBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling || slides[0]; // Loop to first slide if at the end

    moveToSlide(currentSlide, nextSlide);
});

// Previous button functionality
prevBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1]; // Loop to last slide if at the beginning

    moveToSlide(currentSlide, prevSlide);
});

// Dot click functionality
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const targetSlide = slides[index]; // Find the slide corresponding to the dot

        moveToSlide(currentSlide, targetSlide); // Move to the appropriate slide
    });
});

// Initialize styles
updateActiveDot(0); // Ensure the first dot is active initially
