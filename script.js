document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    
    if(slides.length > 0) {
        showSlide(slideIndex);
        
        // Set up automatic slideshow
        const slideshowInterval = setInterval(function() {
            nextSlide(1);
        }, 5000); // Change slide every 5 seconds
        
        // Stop autoplay when user interacts with controls
        const slideshowControls = document.querySelectorAll('.prev, .next, .dot');
        slideshowControls.forEach(control => {
            control.addEventListener('click', function() {
                clearInterval(slideshowInterval);
            });
        });
        
        // Add click events for controls
        if(prev && next) {
            prev.addEventListener('click', function() {
                nextSlide(-1);
            });
            
            next.addEventListener('click', function() {
                nextSlide(1);
            });
        }
        
        // Add click events for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }
    
    // Function to show a specific slide
    function showSlide(index) {
        // Wrap around if index is out of range
        if (index >= slides.length) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex = index;
        }
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
    }
    
    // Function to move to next/previous slide
    function nextSlide(direction) {
        showSlide(slideIndex + direction);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let valid = true;
            
            // Simple validation
            this.querySelectorAll('[required]').forEach(field => {
                if(!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = this.querySelector('input[type="email"]');
            if(emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('error');
                }
            }
            
            if(valid) {
                // Form is valid - in a real site, you would submit data here
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'سوپاس بۆ ناردنی فۆڕمەکە. بە زووترین کات پەیوەندیت پێوە دەکەین.';
                
                form.appendChild(successMsg);
                
                // Reset form after submission
                form.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }
        });
    });
    
    // Add animation effects on scroll
    const animatedElements = document.querySelectorAll('.activity-card, .service-card, .team-member');
    
    // Check if IntersectionObserver is available
    if('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.1});
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Function to animate counting
    function animateStats() {
        statNumbers.forEach(stat => {
            const targetValue = stat.getAttribute('data-count');
            let currentValue = 0;
            let increment = 1;
            
            // Convert Arabic/Kurdish numerals if needed
            const isArabic = /[\u0660-\u0669\u06F0-\u06F9]/.test(targetValue);
            let numericValue = 0;
            
            // If target has a plus sign, extract the number part
            if (targetValue.includes('+')) {
                numericValue = parseInt(targetValue.replace(/\D/g, ''));
            } else {
                numericValue = parseInt(targetValue);
            }
            
            // Calculate increment based on target value
            increment = Math.max(1, Math.floor(numericValue / 100));
            
            // Animate the counting
            const interval = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(interval);
                    
                    // Add back the plus sign if it was there
                    if (targetValue.includes('+')) {
                        stat.textContent = targetValue;
                    } else {
                        stat.textContent = currentValue;
                    }
                } else {
                    stat.textContent = currentValue;
                }
                
                // If using Arabic numerals, convert the display
                if (isArabic) {
                    stat.textContent = convertToArabicNumerals(stat.textContent);
                }
            }, 20);
        });
    }
    
    // Helper function to convert western digits to Arabic/Kurdish
    function convertToArabicNumerals(text) {
        const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return text.toString().replace(/[0-9]/g, function(w) {
            return arabicDigits[+w];
        });
    }
    
    // Use Intersection Observer to trigger animation when stats section is visible
    if ('IntersectionObserver' in window) {
        const statsSection = document.querySelector('.stats-section');
        
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, {threshold: 0.3});
            
            statsObserver.observe(statsSection);
        }
    } else {
        // Fallback for browsers without IntersectionObserver
        setTimeout(animateStats, 1000);
    }
    
    // Activity filtering (already implemented in activities.html)
});
