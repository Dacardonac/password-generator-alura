let amount = document.getElementById('amount');
let btnGenerator = document.getElementById('generator');
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