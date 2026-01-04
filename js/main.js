// DOM Elements
const mobileMenuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopBtn = document.getElementById('back-to-top');
const navLinks = document.querySelectorAll('a[href^="#"]');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    
    // Update ARIA attributes
    const isExpanded = mobileMenu.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
}

// Close mobile menu when clicking links
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

// Back to Top Button
function handleScroll() {
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Update header styles on scroll
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }
}

// Smooth scroll to section
function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    closeMobileMenu();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll(
        '.mission-vision-card, .value-card, .project-card, .work-card, .partner-card'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// Lazy load images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Keyboard navigation
function handleKeyboardNavigation(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
    
    // Tab navigation trap for mobile menu
    if (e.key === 'Tab' && mobileMenu.classList.contains('active')) {
        const focusableElements = mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
}

// Initialize all functionality
function init() {
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Set current year in footer (optional)
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initial scroll check
    handleScroll();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        closeMobileMenu,
        handleScroll,
        smoothScroll,
        initScrollAnimations,
        initLazyLoading,
        handleKeyboardNavigation,
        init
    };
}