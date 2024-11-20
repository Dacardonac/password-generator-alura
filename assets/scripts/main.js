import Swal from 'sweetalert2';

let amount = document.getElementById('amount');
let btnGenerator = document.getElementById('generator');
let btnReset = document.getElementById('reset');
let btnCopy = document.getElementById('copy');
let inputPassword = document.getElementById('password');
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

function genaratePassword() {
  let number = parseInt(amount.value);
  let password = '';

  for (let i = 0; i < number; i++) {
    let randomCharacter = Math.floor(Math.random() * characters.length);
    password += characters[randomCharacter];
  }
  inputPassword.value = password;
}

btnGenerator.addEventListener('click', genaratePassword);

async function reset() {
  if (inputPassword.value === '') {
    await Swal.fire('There is no text to delete');
    return;
  }

  let result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Are you sure you want to Delete the Generated Password?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#06ab00',
    cancelButtonColor: '#ad0303',
    confirmButtonText: 'Yes, delete it!',
  });
  if (result.isConfirmed) {
    inputPassword.value = '';
  } else {
    return;
  }
}

btnReset.addEventListener('click', reset);

async function copyText() {
  if (inputPassword.value !== '') {
    inputPassword.select();
    navigator.clipboard.writeText(inputPassword.value);
    await Swal.fire({
      position: 'top-end',
      width: '30rem',
      icon: 'success',
      title: 'The Password was Copied Successfully',
      showConfirmButton: false,
      timer: 2500,
    });
  } else {
    await Swal.fire('There is no text to Copy');
  }
}

btnCopy.addEventListener('click', copyText);
