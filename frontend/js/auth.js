// Toggle entre login y registro
function toggleForm() {
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  loginBox.classList.toggle('hidden');
  registerBox.classList.toggle('hidden');
}

// Evento para LOGIN
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    alert('Por favor completa todos los campos');
    return;
  }

  try {
    const response = await fetch('../backend/auth/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.success) {
      alert(`Bienvenido, ${result.user.name}`);
      // Guardar en sessionStorage/localStorage si deseas
      if (result.user.role === 'admin') {
        window.location.href = 'admin/dashboard.html';
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

// Evento para REGISTRO
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

  const role = adminKey === 'RangelyBryan2025' ? 'admin' : 'user';

  try {
    const response = await fetch('../backend/auth/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const result = await response.json();

    if (result.success) {
      alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión');
      toggleForm(); // cambia a login
    } else {
      alert(result.message || 'No se pudo crear la cuenta');
    }
  } catch (error) {
    console.error('Error en registro:', error);
    alert('Error al registrar');
  }
});
