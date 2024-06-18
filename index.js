document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');
    const errorMessages = document.getElementById('errorMessages');
    const passwordRequirements = document.getElementById('passwordRequirements');

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const birthdateInput = document.getElementById('birthdate');

    let errors = [];

    function validateName(name) {
        return /^[a-zA-Zа-яА-ЯёЁ]+(?:-[a-zA-Zа-яА-ЯёЁ]+)*$/.test(name);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        return /^(?=.*\d)(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*[\W\_])[0-9a-zA-Zа-яА-ЯёЁ\W\_]{8,}$/.test(password);
    }

    function validateDateOfBirth(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    }

    function showError(message) {
        errors.push(message);
        errorMessages.innerHTML = errors.join('<br>');
    }

    function clearErrors() {
        errors = [];
        errorMessages.innerHTML = '';
    }

    function validateForm() {
        clearErrors();

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const birthdate = birthdateInput.value;

        if (validateName(firstName)) {
            firstNameInput.classList.remove('invalid');
            firstNameInput.classList.add('valid');
        } else {
            firstNameInput.classList.remove('valid');
            firstNameInput.classList.add('invalid');
        }

        if (validateName(lastName)) {
            lastNameInput.classList.remove('invalid');
            lastNameInput.classList.add('valid');
        } else {
            lastNameInput.classList.remove('valid');
            lastNameInput.classList.add('invalid');
        }

        if (validateEmail(email)) {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
        } else {
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
        }

        if (password === confirmPassword && validatePassword(password)) {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.add('valid');
            confirmPasswordInput.classList.remove('invalid');
            confirmPasswordInput.classList.add('valid');
        } else {
            passwordInput.classList.remove('valid');
            passwordInput.classList.add('invalid');
            confirmPasswordInput.classList.remove('valid');
            confirmPasswordInput.classList.add('invalid');
        }

        const age = validateDateOfBirth(birthdate);
        if (age >= 18) {
            birthdateInput.classList.remove('invalid');
            birthdateInput.classList.add('valid');
        } else {
            birthdateInput.classList.remove('valid');
            birthdateInput.classList.add('invalid');
        }

        if (!validateName(firstName) ||
            !validateName(lastName) ||
            !validateEmail(email) ||
            password !== confirmPassword ||
            !validatePassword(password) ||
            age < 18) {
            submitButton.disabled = true;
        } else {
            submitButton.disabled = false;
        }
    }

    function checkPasswordRequirements(password) {
        let requirements = [];
        
        if (password.length < 8) {
            requirements.push('Минимальная длина пароля 8 символов.');
        }
        if (!/[0-9]/.test(password)) {
            requirements.push('Пароль должен содержать минимум одну цифру.');
        }
        if (!/[a-zа-яё]/.test(password)) {
            requirements.push('Пароль должен содержать минимум одну строчную букву.');
        }
        if (!/[A-ZА-ЯЁ]/.test(password)) {
            requirements.push('Пароль должен содержать минимум одну заглавную букву.');
        }
        if (!/[\W\_]/.test(password)) {
            requirements.push('Пароль должен содержать минимум один специальный символ.');
        }

        passwordRequirements.innerHTML = requirements.join('<br>');
    }

    firstNameInput.addEventListener('input', validateForm);
    lastNameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', function() {
        validateForm();
        checkPasswordRequirements(passwordInput.value);
    });
    confirmPasswordInput.addEventListener('input', validateForm);
    birthdateInput.addEventListener('input', validateForm);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        clearErrors();
        showError('Форма успешно отправлена!');
        form.reset();
        submitButton.disabled = true;

        firstNameInput.classList.remove('valid', 'invalid');
        lastNameInput.classList.remove('valid', 'invalid');
        emailInput.classList.remove('valid', 'invalid');
        passwordInput.classList.remove('valid', 'invalid');
        confirmPasswordInput.classList.remove('valid', 'invalid');
        birthdateInput.classList.remove('valid', 'invalid');
    });

    validateForm();
});
