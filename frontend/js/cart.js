document.addEventListener('DOMContentLoaded', () => {
  mostrarCarrito();
});

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
  let carrito = obtenerCarrito();
  const producto = carrito.find(p => p.id === id);

  if (producto) {
    producto.cantidad += 1;
  } else {
    carrito.push({ id, cantidad: 1 });
  }

  guardarCarrito(carrito);
  alert('Producto agregado al carrito');
}

async function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const container = document.getElementById('carrito-container');
  container.innerHTML = '';

  if (carrito.length === 0) {
    container.innerHTML = '<p>Tu carrito está vacío.</p>';
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/camisetas');
    const productos = await res.json();

    let total = 0;

    carrito.forEach(item => {
      const producto = productos.find(p => p.id === item.id);
      if (producto) {
        const subtotal = producto.precio * item.cantidad;
        total += subtotal;

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="uploads/${producto.imagen}" alt="${producto.nombre}">
          <div class="card-body">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio} x ${item.cantidad} = $${subtotal}</p>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
          </div>
        `;
        container.appendChild(card);
      }
    });

    const resumen = document.createElement('div');
    resumen.innerHTML = `<h3>Total: $${total}</h3><button onclick="realizarCompra()">Finalizar Compra</button>`;
    container.appendChild(resumen);

  } catch (error) {
    console.error('Error al mostrar carrito:', error);
  }
}

function eliminarDelCarrito(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito(carrito);
  mostrarCarrito();
}

function realizarCompra() {
  window.location.href = '../cart/checkout.php';
}
