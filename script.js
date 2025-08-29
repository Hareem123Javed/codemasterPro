    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const scrollTopBtn = document.getElementById('scroll-top'); // Fixed variable name
    const newsletterForm = document.getElementById('newsletter-form');
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');
    const modalMessage = document.getElementById('modal-message');

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Scroll to Top Functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Newsletter Form Validation
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const errorMessage = newsletterForm.querySelector('.error-message');
        
        if (validateEmail(emailInput.value)) {
            // Form is valid - show success message
            showModal('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
            errorMessage.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
        }
    });

    // Contact Form Validation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.style.display = 'none';
        });
        
        // Validate name
        if (!nameInput.value.trim()) {
            nameInput.nextElementSibling.style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            emailInput.nextElementSibling.style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            messageInput.nextElementSibling.style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid - show success message
            showModal('Your message has been sent successfully. We will get back to you soon!');
            contactForm.reset();
        }
    });

    // Modal Functions
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    }

    // Email Validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    window.addEventListener('load', animateOnScroll);
