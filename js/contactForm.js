function preloadContactDetails() {}

function validateField(field) {
    const errorSpan = document.getElementById(field.id + 'Error');

    switch (field.type) {
        case 'text':
            if (field.required) {
                if (field.value.trim() === '') {
                    errorSpan.textContent = 'This field is required.';
                    return { valid: false, message: 'This field is required.' };
                }
                localStorage.setItem(field.name, field.value);
            }
            errorSpan.textContent = ''; // Clear any previous error message
            return { valid: true };
        case 'textarea':
            if (field.value.trim() === '') {
                errorSpan.textContent = 'This field is required.';
                return { valid: false, message: 'This field is required.' };
            }
            errorSpan.textContent = ''; // Clear any previous error message
            return { valid: true };
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errorSpan.textContent = 'Please enter a valid email address.';
                return { valid: false, message: 'Please enter a valid email address.' };
            }
            localStorage.setItem(field.name, field.value);
            errorSpan.textContent = ''; // Clear any previous error message
            return { valid: true };
        case 'date':
            if (!dateRequired) {
                if (errorSpan) errorSpan.textContent = ''; 
                return { valid: true };
            }
            
            // 1. Check if empty
            if (!field.value || field.value.trim() === '') {
                if (errorSpan) errorSpan.textContent = 'Please select a date.';
                return { valid: false };
            }
            
            // 2. Check if valid calendar syntax
            if (isNaN(Date.parse(field.value))) {
                if (errorSpan) errorSpan.textContent = 'Please enter a valid date.';
                return { valid: false };
            }
            
            // 3. Robust comparison using localized calendar midnights
            const inputDate = new Date(field.value + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Strip time mechanics out

            if (inputDate < today) {
                if (errorSpan) errorSpan.textContent = 'Please select a future date.';
                return { valid: false };
            }
            
            // Clear errors if everything matches perfectly
            if (errorSpan) errorSpan.textContent = '';
            return { valid: true };
        default:
            return { valid: false, message: 'Invalid field type.' };
    }
}

function validateContactForm() {
    return validateField(fNameInput).valid &&
           validateField(lNameInput).valid &&
           validateField(emailInput).valid &&
           validateField(messageInput).valid &&
           (!dateRequired || validateField(dateInput).valid);
}

const contactForm = document.getElementById('contactForm');
const fNameInput = contactForm.elements['fName'];
const lNameInput = contactForm.elements['lName'];
const emailInput = contactForm.elements['email'];
const messageInput = contactForm.elements['message'];
const dateInput = contactForm.elements['pickupDate'];
const dateRequired = contactForm.elements['typePickup'].checked;

const savedFName = localStorage.getItem('fName');
if (savedFName) {
    fNameInput.value = savedFName;
}

const savedLName = localStorage.getItem('lName');
if (savedLName) {
    lNameInput.value = savedLName;
}

const savedEmail = localStorage.getItem('email');
if (savedEmail) {
    emailInput.value = savedEmail;
}

fNameInput.addEventListener('change', function(event) {
    const validation = validateField(fNameInput);
    if (!validation.valid) {
        fNameInput.classList.add('invalid');
    } else {
        fNameInput.classList.remove('invalid');
    }
});

lNameInput.addEventListener('change', function(event) {
    const validation = validateField(lNameInput);
    if (!validation.valid) {
        lNameInput.classList.add('invalid');
    } else {
        lNameInput.classList.remove('invalid');
    }
});

emailInput.addEventListener('change', function(event) {
    const validation = validateField(emailInput);
    if (!validation.valid) {
        emailInput.classList.add('invalid');
    } else {
        emailInput.classList.remove('invalid');
    }
});

messageInput.addEventListener('change', function(event) {
    const validation = validateField(messageInput);
    if (!validation.valid) {
        messageInput.classList.add('invalid');
    } else {
        messageInput.classList.remove('invalid');
    }
});

dateInput.addEventListener('change', function(event) {
    const validation = validateField(dateInput);
    if (!validation.valid) {
        dateInput.classList.add('invalid');
    } else {
        dateInput.classList.remove('invalid');
    }
});

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    console.log('Form submission intercepted. Performing validation...');
    // Perform validation
    if (validateContactForm()) {
        // If validation passes, you can proceed with form submission
        contactForm.submit();
    }
});

console.log('Contact form validation script loaded.');