// frontend/public/js/register.js
const url='http://localhost:4000/api/auth/registro';


document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const department = document.getElementById('department').value.trim();
    const city = document.getElementById('city').value.trim();
    const celnum = document.getElementById('celnum').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!validateFields(usuario, email, department, city, celnum, password)) {
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, email, department, city, celnum, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Usuario Registrado con éxito');
            window.location.href = '../index.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al registrarse');
    }
});

function validateFields(usuario, email, department, city, celnum, password) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const celnumPattern = /^\d{10}$/;

    if (usuario.length < 3) {
        alert("El nombre de usuario debe tener al menos 3 caracteres.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Por favor, introduce un correo electrónico válido.");
        return false;
    }

    if (department.length < 3) {
        alert("El departamento debe tener al menos 3 caracteres.");
        return false;
    }

    if (city.length < 3) {
        alert("La ciudad debe tener al menos 3 caracteres.");
        return false;
    }

    if (!celnumPattern.test(celnum)) {
        alert("Por favor, introduce un número de celular válido de 10 dígitos.");
        return false;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }

    return true;
}
