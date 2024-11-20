// Importaciones
import Swal from 'sweetalert2';

// Variables
let amount = document.getElementById('amount');
let btnGenerator = document.getElementById('generator');
let btnReset = document.getElementById('reset');
let btnCopy = document.getElementById('copy');
let inputPassword = document.getElementById('password');
const passwordStrength = document.getElementById('passwordStrength');

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^"&*()+~';

// Función para generar la contraseña
function genaratePassword() {
  let number = parseInt(amount.value);
  let password = '';

  for (let i = 0; i < number; i++) {
    let randomCharacter = Math.floor(Math.random() * characters.length);
    password += characters[randomCharacter];
  }
  inputPassword.value = password;
  securityValidation(inputPassword.value); // Usar inputPassword.value
}

btnGenerator.addEventListener('click', genaratePassword);

// Función para restablecer la contraseña
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
    passwordStrength.innerText = ''; // Limpiar el resultado de la validación
  } else {
    return;
  }
}

btnReset.addEventListener('click', reset);

// Función para copiar la contraseña al portapapeles
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

// Función para validar la seguridad de la contraseña
function securityValidation(password) {
  // Patrones (Regex)
  const weakPattern = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Requiere al menos una letra y un número.
  const mediumPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Letras mayúsculas, minúsculas, números.
  const strongPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Mayúsculas, minúsculas, números y símbolos.

  if (strongPattern.test(password)) {
    passwordStrength.innerText = 'Strong password';
    passwordStrength.style.color = 'green';
  } else if (mediumPattern.test(password)) {
    passwordStrength.innerText = 'Medium password';
    passwordStrength.style.color = 'orange';
  } else {
    passwordStrength.innerText = 'Weak password';
    passwordStrength.style.color = 'red';
  }
}

// Detecta cuando el valor del input de la contraseña cambia
inputPassword.addEventListener('input', function () {
  securityValidation(inputPassword.value);
});
