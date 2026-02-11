// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== GOOGLE SHEETS INTEGRATION =====
const scriptURL = 'https://script.google.com/macros/s/AKfycbz3bWasgGFisq-HXqzneAX9Et6m7rHTARl3SNBAXFLDCyZHYdt98_6RG_jbxx0YCQjzaQ/exec';

// Function to handle form submission
function handleFormSubmit(formId, successId, errorId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successId);
    const errorMessage = document.getElementById(errorId);

    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Hide any previous messages
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';

        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(form),
            mode: 'no-cors'
        })
        .then(response => {
            console.log('Form submitted successfully');
            
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'flex';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            if (successMessage) {
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        })
        .catch(error => {
            console.error('Error!', error);
            
            // Show error message
            if (errorMessage) {
                errorMessage.style.display = 'flex';
                
                // Scroll to error message
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}

// Initialize forms on different pages
document.addEventListener('DOMContentLoaded', () => {
    // Home page coming soon form
    handleFormSubmit('contactForm', 'successMessage', 'errorMessage');
    
    // Contact page form
    handleFormSubmit('contactPageForm', 'successMessage', 'errorMessage');
    
    // Registration form
    handleFormSubmit('registrationForm', 'successMessage', 'errorMessage');
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
