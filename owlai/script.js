// ===================================
// DARK MODE THEME TOGGLE
// ===================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    const isDarkMode = body.classList.contains('dark-mode');
    const icon = isDarkMode ? '🌙' : '☀️';
    themeToggle.textContent = icon;
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// ===================================
// MODAL POPUP FUNCTIONALITY
// ===================================
const ctaButton = document.getElementById('ctaButton');
const ctaModal = document.getElementById('ctaModal');
const closeBtn = document.querySelector('.close-btn');
const submitBtn = document.querySelector('.submit-btn');
const modalForm = document.querySelector('.modal-form');

// Open modal when CTA button is clicked
ctaButton.addEventListener('click', () => {
    ctaModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close modal when X button is clicked
closeBtn.addEventListener('click', () => {
    ctaModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Enable scrolling
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === ctaModal) {
        ctaModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(modalForm);
    const name = modalForm.querySelector('input[type="text"]').value;
    const email = modalForm.querySelector('input[type="email"]').value;
    const service = modalForm.querySelector('select').value;
    const message = modalForm.querySelector('textarea').value;
    
    // Show success message
    showNotification('Thank you! We will contact you shortly.', 'success');
    
    // Reset form
    modalForm.reset();
    
    // Close modal after 1.5 seconds
    setTimeout(() => {
        ctaModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }, 1500);
});

// ===================================
// SERVICE CARD INTERACTIONS
// ===================================
const serviceCards = document.querySelectorAll('.service-card');
const serviceButtons = document.querySelectorAll('.service-btn');

serviceButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceTitle = button.closest('.service-card').querySelector('.service-title').textContent;
        showNotification(`Explore ${serviceTitle} →`, 'info');
    });
});

// ===================================
// SMOOTH SCROLLING FOR NAV LINKS
// ===================================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    // Set color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#6366f1';
        notification.style.color = 'white';
    }
    
    // Add animation styles if not already present
    if (!document.querySelector('style[data-notification-style]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification-style', 'true');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
const revealElements = document.querySelectorAll('.service-card, .about-content');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================
const buttons = document.querySelectorAll('.cta-button, .service-btn, .submit-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        // Add ripple animation if not already in stylesheet
        if (!document.querySelector('style[data-ripple-style]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple-style', 'true');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===================================
// PARALLAX EFFECT FOR HERO SHAPES
// ===================================
const shapes = document.querySelectorAll('.floating-shape');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const moveX = (mouseX - 0.5) * (50 * (index + 1));
        const moveY = (mouseY - 0.5) * (30 * (index + 1));
        
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ===================================
// ACTIVE NAVIGATION INDICATOR
// ===================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// ===================================
// KEYBOARD EVENTS
// ===================================
document.addEventListener('keydown', (e) => {
    // Close modal on Escape key
    if (e.key === 'Escape' && ctaModal.classList.contains('show')) {
        ctaModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.animation = 'slideInUp 0.8s ease';
    }
});

// ===================================
// FORM VALIDATION
// ===================================
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 8px rgba(99, 102, 241, 0.4)';
    });
    
    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log(
    '%c🦉 Welcome to Owl AI! 🦉',
    'font-size: 20px; font-weight: bold; color: #6366f1;'
);
console.log(
    '%cWe are an AI-driven organization focused on smart automation and intelligent solutions.',
    'font-size: 14px; color: #666;'
);
console.log(
    '%cCheck out our services and get in touch to learn more!',
    'font-size: 12px; color: #999; font-style: italic;'
);
