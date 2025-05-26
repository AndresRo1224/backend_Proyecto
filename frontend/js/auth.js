function toggleForm() {
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  loginBox.classList.toggle('hidden');
  registerBox.classList.toggle('hidden');
}

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    alert('Por favor completa todos los campos');
    return;
  }

  try {
    const response = await fetch('https://backend-proyecto-9mqd.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.success) {
      alert(`Bienvenido, ${result.user.name}`);
      localStorage.setItem('usuario', JSON.stringify(result.user)); // <-- Guarda el usuario en localStorage
      if (result.user.role === 'admin') {
        window.location.href = 'productos.html';
      } else {
        window.location.href = 'index.html';
      }
    } else {
      alert(result.message || 'Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error en login:', error);
    alert('Error al iniciar sesión');
  }
});

document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const adminKey = document.getElementById('adminKey').value.trim();

  if (!name || !email || !password) {
    alert('Por favor completa todos los campos');
    return;
  }

  try {
    const response = await fetch('https://backend-proyecto-9mqd.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, adminKey })
    });

    const result = await response.json();

    if (result.success) {
      alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión');
      toggleForm();
    } else {
      alert(result.message || 'No se pudo crear la cuenta');
    }
  } catch (error) {
    console.error('Error en registro:', error);
    alert('Error al registrar');
  }
});