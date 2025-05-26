function logout() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('carrito');
  window.location.href = 'auth.html';
}
window.logout = logout;