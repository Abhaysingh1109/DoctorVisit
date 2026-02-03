// ===============================================
// DOCTOR VISIT - Main JavaScript
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbarScroll();
    initWhatsAppModal();
    initSmoothScroll();
    initAnimations();
});

// ===============================================
// NAVBAR SCROLL EFFECT
// ===============================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// ===============================================
// WHATSAPP MODAL FUNCTIONALITY
// ===============================================

function initWhatsAppModal() {
    const modal = document.getElementById('whatsappModal');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.querySelector('.modal-close');
    const bookVisitLinks = document.querySelectorAll('.book-visit-link, .book-visit-btn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const successMessage = document.getElementById('successMessage');
    const contactPhone = '+1234567890'; // Replace with actual phone number

    // Open modal when clicking "Book home visit" links
    if (bookVisitLinks.length > 0) {
        bookVisitLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        });
    }

    // Open modal function
    function openModal() {
        if (modal && backdrop) {
            modal.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset success message
            if (successMessage) {
                successMessage.classList.remove('show');
            }
        }
    }

    // Close modal function
    function closeModal() {
        if (modal && backdrop) {
            modal.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close on backdrop click
    if (backdrop) {
        backdrop.addEventListener('click', closeModal);
    }

    // Close on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // WhatsApp button click handler
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form data if available
            const name = document.getElementById('visitorName')?.value || '';
            const phone = document.getElementById('visitorPhone')?.value || '';
            const message = document.getElementById('visitorMessage')?.value || '';
            
            // Build WhatsApp message
            let whatsappMessage = `🏥 *Book Home Visit Request*\n\n`;
            
            if (name) {
                whatsappMessage += `👤 *Name:* ${name}\n`;
            }
            if (phone) {
                whatsappMessage += `📞 *Phone:* ${phone}\n`;
            }
            if (message) {
                whatsappMessage += `📝 *Message:* ${message}\n`;
            }
            
            whatsappMessage += `\n━━━━━━━━━━━━━━━━━━━━\n`;
            whatsappMessage += `Sent from DoctorVisit Website`;
            
            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${contactPhone}?text=${encodedMessage}`;
            
            // Show success message
            if (successMessage) {
                successMessage.classList.add('show');
            }
            
            // Open WhatsApp after short delay
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Close modal after opening WhatsApp
                setTimeout(closeModal, 1500);
            }, 500);
        });
    }
}

// ===============================================
// SMOOTH SCROLL
// ===============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===============================================
// SCROLL ANIMATIONS
// ===============================================

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animateElements = document.querySelectorAll(
        '.glass-card, .feature-item, .stat-item, .service-icon'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===============================================
// COUNTER ANIMATION FOR STATS
// ===============================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ===============================================
// FORM VALIDATION (Optional)
// ===============================================

function validateForm(formId) {
    const form = document.getElementById(formId);
    
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Debounce function for scroll events
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===============================================
// INITIALIZE COUNTERS (Call this after page load)
// ===============================================

window.addEventListener('load', function() {
    // Add data-count attributes to stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        if (!stat.getAttribute('data-count')) {
            const text = stat.textContent.replace(/[^0-9]/g, '');
            if (text) {
                stat.setAttribute('data-count', text);
            }
        }
    });
    
    animateCounters();
});

// ===============================================
// TOAST NOTIFICATIONS (Optional Feature)
// ===============================================

function showToast(message, type = 'info') {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '10000';
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    // Set background color based on type
    const bgColors = {
        'success': 'bg-success',
        'error': 'bg-danger',
        'warning': 'bg-warning',
        'info': 'bg-info'
    };
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body ${bgColors[type] || bgColors.info} text-white rounded-3 px-4 py-3">
                <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);
    
    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
    });
    bsToast.show();
    
    // Remove from DOM after hiding
    toast.addEventListener('hidden.bs.toast', () => {
        toastContainer.remove();
    });
}

