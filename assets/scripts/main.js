let amount = document.getElementById('amount');
let btnGenerator = document.getElementById('generator');
let btnReset = document.getElementById('reset');
let btnCopy = document.getElementById('copy');
let inputPassword = document.getElementById('password');
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';



function genaratePassword() {
  let number = parseInt(amount.value);

  if (number < 8) {
    alert('The password must be 8 or more characters');
    return;
  };

  let password = '';

  for (let i = 0; i < number; i++) {
    let randomCharacter = Math.floor(Math.random() * characters.length);
    password += characters[randomCharacter];
  };
  inputPassword.value = password;
};

btnGenerator.addEventListener('click', genaratePassword);

function reset() {
  let userResponse = confirm('Are you sure you want to delete the generated password?');
  if (userResponse) {
    inputPassword.value = '';
  }
  else {
    return;
  };
};

btnReset.addEventListener('click', reset);

function copyText() {
  if (inputPassword.value !== '') {
    inputPassword.select();
    navigator.clipboard.writeText(inputPassword.value);
    alert('Text Copied Successfully');
  }
  else {
    alert('There is no text to Copy');
  };
}

btnCopy.addEventListener('click', copyText);