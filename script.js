// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Fade in animation for the page
    document.body.classList.add('opacity-100');
    
    // Add scroll animation
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Particle animation for background
    createParticles();
    
    // Typing effect for header subtitle
    const subtitle = document.querySelector('.header-subtitle');
    if (subtitle) {
        const subtitleText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < subtitleText.length) {
                subtitle.textContent += subtitleText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                
                // Add cursor blink effect after typing is done
                subtitle.classList.add('cursor-effect');
            }
        }, 100);
    }
    
    // Add event listeners for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('active');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('active');
        });
    });
    
    // Enable dark/light mode toggle if it exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Save preference to localStorage
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }
});

// Create floating particles in the background
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Add parallax effect
window.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add skill progress animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = `${percentage}%`;
    });
}

// Run skill animation when skills section is in view
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillsObserver.observe(skillsSection);
}

// Simple form validation for contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            highlightError(nameInput);
            isValid = false;
        } else {
            removeHighlight(nameInput);
        }
        
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            highlightError(emailInput);
            isValid = false;
        } else {
            removeHighlight(emailInput);
        }
        
        if (!messageInput.value.trim()) {
            highlightError(messageInput);
            isValid = false;
        } else {
            removeHighlight(messageInput);
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Message sent successfully!';
            
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
}

// Helper functions for form validation
function highlightError(input) {
    input.classList.add('error');
}

function removeHighlight(input) {
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} 