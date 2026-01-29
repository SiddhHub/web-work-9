const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

/* =========================
   Reusable helpers
========================= */

function showError(input, message) {
  const group = input.parentElement;
  const small = group.querySelector(".error");

  small.innerText = message;
  input.classList.add("error-input");
  input.classList.remove("success");
}

function showSuccess(input) {
  const group = input.parentElement;
  const small = group.querySelector(".error");

  small.innerText = "";
  input.classList.add("success");
  input.classList.remove("error-input");
}

function isEmailValid(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isStrongPassword(password) {
  // min 8 chars, 1 number, 1 special char
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

/* =========================
   Field Validations
========================= */

function validateName() {
  const value = nameInput.value.trim();

  if (value === "") {
    showError(nameInput, "Name cannot be empty");
    return false;
  }

  showSuccess(nameInput);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();

  if (!isEmailValid(value)) {
    showError(emailInput, "Invalid email format");
    return false;
  }

  showSuccess(emailInput);
  return true;
}

function validatePassword() {
  const value = passwordInput.value.trim();

  if (!isStrongPassword(value)) {
    showError(passwordInput, "Weak password (min 8 chars, number & symbol)");
    return false;
  }

  showSuccess(passwordInput);
  return true;
}

function validateConfirmPassword() {
  if (confirmInput.value !== passwordInput.value) {
    showError(confirmInput, "Passwords do not match");
    return false;
  }

  showSuccess(confirmInput);
  return true;
}

/* =========================
   Real-time validation
========================= */

nameInput.addEventListener("keyup", validateName);
emailInput.addEventListener("keyup", validateEmail);
passwordInput.addEventListener("keyup", validatePassword);
confirmInput.addEventListener("keyup", validateConfirmPassword);

/* =========================
   Submit handling
========================= */

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid =
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword();

  if (isValid) {
    alert("Form Submitted Successfully ✅");
    form.reset();
  }
});
