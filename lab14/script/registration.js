document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const agree = document.getElementById('agree');

    const fullnameError = document.getElementById('fullnameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const agreeError = document.getElementById('agreeError');

    const welcomeBlock = document.getElementById('welcomeBlock');
    const logoutBtn = document.getElementById('logoutBtn');

    const welcomeName = document.getElementById('welcomeName');
    const welcomeEmail = document.getElementById('welcomeEmail');

    function validateForm(){
        let valid = true;
        let firstInvalid = null;

        if (!fullname.value.trim()){
            markInvalid(fullname, "Ім'я не може бути порожнім", fullnameError);
            fullnameError.textContent = fullname.validationMessage;
            valid = false;
            firstInvalid ??= fullname;
        } else{
            markValid(fullname);
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)){
            markInvalid(email, "Введіть коректний Email", emailError);
            emailError.textContent = email.validationMessage;
            valid = false;
            firstInvalid ??= email;
        } else{
            markValid(email);
        }

        if (password.value.length < 6){
            markInvalid(password, "Пароль має містити мінімум 6 символів");
            passwordError.textContent = password.validationMessage;
            valid = false;
            firstInvalid ??= password;
        } else{
            markValid(password);
        }

        if (!agree.checked){
            markInvalid(agree, "Потрібно погодитись з умовами", agreeError);
            agreeError.textContent = agree.validationMessage;
            valid = false;
            firstInvalid ??= agree;
        } else{
            markValid(agree);
        }

        if(!valid && firstInvalid){
            firstInvalid.focus();
        }

        return valid;
    }

    function markValid(field) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        field.setCustomValidity("");
        field.setAttribute('aria-invalid', 'false');
    }

    function markInvalid(field, msg, errorElem) {
        field.classList.remove('valid');
        field.classList.add('invalid');
        field.setAttribute('aria-invalid', 'true');
        if (errorElem) errorElem.textContent = msg;
        field.setCustomValidity(msg);
    }

    function saveFormData() {
        const userData = {
            fullname: fullname.value.trim(),
            email: email.value.trim(),
            gender: document.querySelector('input[name="gender"]:checked').value,
            specialty: document.getElementById('specialty').value,
            birthdate: document.getElementById('birthdate').value
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(localStorage);
    }

    function getFormData() {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    }

    function clearFormData() {
        localStorage.removeItem('userData');
    }

    function showWelcome(user) {
        form.hidden = true;
        welcomeBlock.hidden = false;
        welcomeName.textContent = user.fullname;
        welcomeEmail.textContent = user.email;
    }

    function logout() {
        clearFormData();
        welcomeBlock.hidden = true;
        form.hidden = false;
        form.reset();
        clearErrors();
    }

    function clearErrors() {
        emailError.textContent = '';
        passwordError.textContent = '';
        fullnameError.textContent = '';
        agreeError.textContent = '';

        email.classList.remove('invalid');
        password.classList.remove('invalid');
        fullname.classList.remove('invalid');
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        if(validateForm()){
            saveFormData();
            showWelcome(getFormData());
        }
    });

    logoutBtn.addEventListener('click', logout);

    const savedUser = getFormData();
    if (savedUser) {
        showWelcome(savedUser);
    }

});
