// ==================== HAMBURGER MENU ==================== //

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== FAQ ACCORDION ==================== //

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ==================== FORM SUBMISSION ==================== //

const enquiryForm = document.getElementById('enquiryForm');
const formMessage = document.getElementById('formMessage');

enquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        businessName: document.getElementById('businessName').value,
        contactNumber: document.getElementById('contactNumber').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        domain: document.getElementById('domain').value,
        projectDetails: document.getElementById('projectDetails').value,
        contactMethod: document.querySelector('input[name="contactMethod"]:checked').value,
        additionalDetails: document.getElementById('additionalDetails').value,
        submittedAt: new Date().toLocaleString()
    };
    
    // Log form data (in production, this would be sent to a backend)
    console.log('Form submitted:', formData);
    
    // Store in localStorage as backup
    const submissions = JSON.parse(localStorage.getItem('enquiries') || '[]');
    submissions.push(formData);
    localStorage.setItem('enquiries', JSON.stringify(submissions));
    
    // Send email via backend (if email service is configured)
    try {
        // This is a placeholder for actual email sending
        // In production, this would connect to a backend email service
        await sendEmailNotification(formData);
    } catch (error) {
        console.log('Note: Email sending requires backend configuration');
    }
    
    // Show success message
    enquiryForm.style.display = 'none';
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth' });
    
    // Reset form for future use
    setTimeout(() => {
        enquiryForm.reset();
    }, 2000);
});

// Placeholder function for email sending
async function sendEmailNotification(formData) {
    // This would connect to a backend service
    // Example using a generic endpoint:
    /*
    const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    return response.json();
    */
    
    // For now, just log to console
    console.log('Email would be sent to: helpinghandenquiry@gmail.com');
    console.log('Data:', formData);
}

// ==================== SMOOTH SCROLL FOR NAVIGATION ==================== //

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ==================== //

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== WHATSAPP INTEGRATION ==================== //

const whatsappNumber = '917905903514';
const whatsappMessage = encodeURIComponent('Hi The Helping Hands, I would like to discuss a project.');

// Update all WhatsApp links
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    if (!link.href.includes('text=')) {
        link.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    }
});

// ==================== EMAIL LINKS ==================== //

const email = 'helpinghandenquiry@gmail.com';
document.querySelectorAll('a[href*="mailto:"]').forEach(link => {
    link.href = `mailto:${email}`;
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== //

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('.service-card, .project-card, .feature-card, .pricing-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== FORM VALIDATION ==================== //

const contactNumberInput = document.getElementById('contactNumber');

if (contactNumberInput) {
    contactNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}

// ==================== MOBILE MENU STYLES ==================== //

const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(10, 14, 39, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.5);
            padding: 20px 0;
            gap: 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-item {
            padding: 15px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// ==================== LAZY LOADING FOR IMAGES ==================== //

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== ANALYTICS TRACKING ==================== //

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        const buttonText = btn.textContent.trim();
        console.log('CTA Clicked:', buttonText);
        
        // Send to analytics (if configured)
        if (window.gtag) {
            gtag('event', 'cta_click', {
                'button_text': buttonText,
                'page': window.location.pathname
            });
        }
    });
});

// Track form submissions
document.addEventListener('submit', (e) => {
    if (e.target.id === 'enquiryForm') {
        console.log('Enquiry form submitted');
        if (window.gtag) {
            gtag('event', 'form_submission', {
                'form_name': 'enquiry_form'
            });
        }
    }
});

// ==================== DARK MODE TOGGLE (Optional) ==================== //

// Check for dark mode preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
    document.body.style.colorScheme = 'dark';
}

// ==================== PERFORMANCE OPTIMIZATION ==================== //

// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle scroll events for better performance
let lastScrollEvent = 0;
window.addEventListener('scroll', debounce(() => {
    if (Date.now() - lastScrollEvent > 100) {
        lastScrollEvent = Date.now();
        // Perform scroll-based operations here
    }
}, 100));

// ==================== UTILITY FUNCTIONS ==================== //

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get query parameters
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

// ==================== SERVICE WORKER REGISTRATION (PWA) ==================== //

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA functionality
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ==================== PAGE LOAD ANALYTICS ==================== //

window.addEventListener('load', () => {
    console.log('The Helping Hands website loaded successfully');
    
    // Log page performance metrics
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    }
});

// ==================== ERROR TRACKING ==================== //

window.addEventListener('error', (event) => {
    console.error('Error occurred:', event.error);
    // Send error to logging service (if configured)
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
});

// ==================== INITIALIZATION ==================== //

console.log('The Helping Hands - Website Initialized');
console.log('Contact: 7905903514');
console.log('Email: helpinghandenquiry@gmail.com');