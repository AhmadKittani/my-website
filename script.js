document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let timer;

    // Show the specified slide
    function showSlide(n) {
        // Hide all slides
        slides.forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none';
        });
        dots.forEach(d => d.classList.remove('active'));

        // Show current slide
        slides[n].classList.add('active');
        slides[n].style.display = 'block';
        dots[n].classList.add('active');
        currentSlide = n;
    }

    // Next/Previous controls
    document.querySelector('.next').onclick = () => {
        clearTimeout(timer);
        showSlide((currentSlide + 1) % slides.length);
        autoSlide();
    };

    document.querySelector('.prev').onclick = () => {
        clearTimeout(timer);
        showSlide((currentSlide - 1 + slides.length) % slides.length);
        autoSlide();
    };

    // Dot controls
    dots.forEach((dot, index) => {
        dot.onclick = () => {
            clearTimeout(timer);
            showSlide(index);
            autoSlide();
        };
    });

    // Auto slide
    function autoSlide() {
        timer = setTimeout(() => {
            showSlide((currentSlide + 1) % slides.length);
            autoSlide();
        }, 5000);
    }

    // Start slideshow
    showSlide(0);
    autoSlide();
});
