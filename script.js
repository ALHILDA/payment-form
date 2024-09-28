'use strict'
const months = [
    { name: "select month",code:"" },
    { name: "January",code:"1" },
    { name: "February",code:"1" },
    { name: "March",code:"1" },
    { name: "April",code:"1" },
    { name: "May",code:"1" },
    { name: "June",code:"1" },
    { name: "July",code:"1" },
    { name: "August",code:"1" },
    { name: "September",code:"1" },
    { name: "October",code:"1" },
    { name: "November",code:"1" },
    { name: "December",code:"1" },
]
const monthSelect = document.getElementById('expiration-month');
months.forEach((month) => {
    const option = document.createElement('option');
    option.value = month.code;
    option.text = month.name;
    monthSelect.appendChild(option);
});

const years=[
    { name: "select year"},
    { name: "2025"},
    { name: "2026"},
    { name: "2027"},
    { name: "2028"},
    { name: "2029"},
    { name: "2030"},
]
const expirationYear = document.getElementById('expiration-year');

years.forEach(function(year){
  const option = document.createElement('option');
  option.text = year.name;
  expirationYear.appendChild(option);
});
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const cardNumberInput = document.getElementById('card-number');
const expirationMonthSelect = document.getElementById('expiration-month');
const expirationYearSelect = document.getElementById('expiration-year');
const cvvInput = document.getElementById('cvv');
const form = document.getElementById('payment-form');

let isValidName = false;
let isValidEmail = false;
let isValidCardNumber = false;
let isValidExpirationMonth = false;
let isValidExpirationYear = false;
let isValidCvv = false;

nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
cardNumberInput.addEventListener('blur', validateCardNumber);
expirationMonthSelect.addEventListener('change', validateExpirationMonth);
expirationYearSelect.addEventListener('change', validateExpirationYear);
cvvInput.addEventListener('blur', validateCvv);
form.addEventListener('submit', submitForm);

function validateName() {
  const name = nameInput.value.trim();
  const nameError = document.getElementById('name-error');

  if (name.length === 0) {
    nameError.textContent = 'Name is required';
    isValidName = false;
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    nameError.textContent = 'Name must contain only letters and spaces';
    isValidName = false;
  } else if (name.length < 2 || name.length > 50) {
    nameError.textContent = 'Name must be between 2 and 50 characters';
    isValidName = false;
  } else {
    nameError.textContent = '';
    isValidName = true;
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailError = document.getElementById('email-error');

  if (email.length === 0) {
    emailError.textContent = 'Email is required';
    isValidEmail = false;
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    emailError.textContent = 'Invalid email format';
    isValidEmail = false;
  } else {
    emailError.textContent = '';
    isValidEmail = true;
  }
}

function validateCardNumber() {
  const cardNumber = cardNumberInput.value.replace(/\s/g, '');
  const cardError = document.getElementById('card-number-error');

  if (cardNumber.length === 15 && isAmericanExpress(cardNumber)) {
    cardError.textContent = '';
    isValidCardNumber = true;
  } else if (cardNumber.length !== 16) {
    cardError.textContent = 'Card number must be 16 digits (15 for American Express)';
    isValidCardNumber = false;
  } else if (!/^[0-9]{15,16}$/.test(cardNumber)) {
    cardError.textContent = 'Invalid card number';
    isValidCardNumber = false;
  } else {
    cardError.textContent = '';
    isValidCardNumber = true;
  }
}

function isAmericanExpress(cardNumber) {
  return /^34|37/.test(cardNumber);
}

function validateExpirationMonth() {
  const selectedValue = expirationMonthSelect.value;
  const expirationMonthError = document.getElementById('expiration-month-error');

  if (selectedValue === '') {
    expirationMonthError.textContent = 'Expiration month is required';
    isValidExpirationMonth = false;
  } else {
    expirationMonthError.textContent = '';
    isValidExpirationMonth = true;
  }
}

function validateExpirationYear() {
  const selectedValue = expirationYearSelect.value;
  const expirationYearError = document.getElementById('expiration-year-error');

  if (selectedValue === '') {
    expirationYearError.textContent = 'Expiration year is required';
    isValidExpirationYear = false;
  } else {
    expirationYearError.textContent = '';
    isValidExpirationYear = true;
  }
}

function validateCvv() {
  const cvv = cvvInput.value.trim();
  const cvvError = document.getElementById('cvv-error');

  if (cvv.length === 0) {
    cvvError.textContent = 'CVV is required';
    isValidCvv = false;
  } else if (cvv.length !== 3 || isNaN(cvv)) {
    cvvError.textContent = 'CVV must be 3 digits';
    isValidCvv = false;
  } else {
    cvvError.textContent = '';
    isValidCvv = true;
  }
}


function submitForm(event) {
    if (
      isValidName &&
      isValidEmail &&
      isValidCardNumber &&
      isValidExpirationMonth &&
      isValidExpirationYear &&
      isValidCvv
    ) {
      event.preventDefault();
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        cardNumber: cardNumberInput.value.replace(/\s/g, ''),
        expirationMonth: expirationMonthSelect.value,
        expirationYear: expirationYearSelect.value,
        cvv: cvvInput.value.trim(),
      };
      console.log(formData);
      console.table(formData);
    } else {
      event.preventDefault();
      alert('Please fill in all required fields correctly.');
    }
  }
