let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let usuario = JSON.parse(localStorage.getItem('usuario')) || null;

document.addEventListener('DOMContentLoaded', () => {
  if (!usuario) {
    alert('Debes iniciar sesión para realizar compras.');
    window.location.href = 'auth.html';
    return;
  }

  mostrarCarrito();

  const btnConfirmar = document.getElementById('btnConfirmarPedido');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', abrirModalDatosEnvio);
  }

  const formEnvio = document.getElementById('formDatosEnvio');
  if (formEnvio) {
    formEnvio.addEventListener('submit', function (event) {
      event.preventDefault();
      enviarPedidoConDatosEnvio();
    });
  }
});

function mostrarCarrito() {
  const contenedor = document.getElementById('carritoContainer');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    const totalEl = document.getElementById('totalCarrito');
    if (totalEl) totalEl.textContent = '$0';
    return;
  }

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    const div = document.createElement('div');
    div.classList.add('carrito-item');
    div.innerHTML = `
      <div class="carrito-info">
        <img src="${item.imagen && item.imagen !== '0' ? item.imagen : 'assets/no-image.png'}" alt="Camiseta" class="carrito-img">
        <div>
          <strong>${item.equipo}</strong> <br>
          <span>Talla: ${item.talla}</span><br>
          <span>Precio: $${item.precio.toLocaleString()}</span><br>
          <span>Cantidad: 
            <button class="btn-cantidad" onclick="cambiarCantidad(${item.id_camiseta}, -1)">-</button>
            ${item.cantidad}
            <button class="btn-cantidad" onclick="cambiarCantidad(${item.id_camiseta}, 1)">+</button>
          </span>
        </div>
      </div>
      <div class="carrito-actions">
        <button class="btn-detalles" onclick="verDetallesCarrito(${item.id_camiseta})" title="Ver detalles">
          <i class="fas fa-info-circle"></i>
        </button>
        <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id_camiseta})" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  const totalEl = document.getElementById('totalCarrito');
  if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
}

window.eliminarDelCarrito = function (id) {
  carrito = carrito.filter(item => item.id_camiseta !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
};

window.cambiarCantidad = function (id, cambio) {
  const item = carrito.find(i => i.id_camiseta === id);
  if (!item) return;

  item.cantidad += cambio;
  if (item.cantidad < 1) item.cantidad = 1;

  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
};

function abrirModalDatosEnvio() {
  if (!usuario) {
    alert('Debes iniciar sesión para confirmar el pedido.');
    return;
  }
  if (carrito.length === 0) {
    alert('El carrito está vacío. Añade productos antes de confirmar.');
    return;
  }

  const modal = document.getElementById('modalDatosEnvio');
  if (!modal) return;

  modal.style.display = 'flex';

  const nombreInput = document.getElementById('nombre');
  const correoInput = document.getElementById('correo');

  if (nombreInput) nombreInput.value = usuario.nombre || '';
  if (correoInput) correoInput.value = usuario.email || '';
}

window.cerrarModalDatosEnvio = function () {
  const modal = document.getElementById('modalDatosEnvio');
  if (modal) modal.style.display = 'none';
};

async function enviarPedidoConDatosEnvio() {
  const form = document.getElementById('formDatosEnvio');
  if (!form) return;

  const { nombre, telefono, barrio, direccion, ciudad, correo } = form;

  if (!nombre.value || !telefono.value || !barrio.value || !direccion.value || !ciudad.value || !correo.value) {
    alert('Por favor, completa todos los campos de envío.');
    return;
  }

  try {
    const response = await fetch('https://backend-proyecto-9mqd.onrender.com/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario: usuario.id,
        nombre: nombre.value,
        telefono: telefono.value,
        barrio: barrio.value,
        direccion: direccion.value,
        ciudad: ciudad.value,
        correo: correo.value,
        carrito: carrito
      })
    });

    const result = await response.json();

    if (result.success) {
      alert('¡Pedido realizado con éxito!');
      carrito = [];
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito();
      cerrarModalDatosEnvio();
    } else {
      alert(result.message || 'No se pudo realizar el pedido. Inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error al confirmar el pedido:', error);
    alert('Hubo un error al confirmar el pedido. Por favor, verifica tu conexión o inténtalo más tarde.');
  }
}

window.verDetallesCarrito = function (id) {
  const item = carrito.find(i => i.id_camiseta === id);
  if (!item) return;

  let modal = document.getElementById('modalDetallesCarrito');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalDetallesCarrito';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="cerrarModalDetallesCarrito()">&times;</span>
      <h3>${item.equipo}</h3>
      <p><strong>Temporada:</strong> ${item.temporada}</p>
      <p><strong>Talla:</strong> ${item.talla}</p>
      <p><strong>Precio:</strong> $${item.precio.toLocaleString()}</p>
      <p><strong>Cantidad:</strong> ${item.cantidad}</p>
      <img src="${item.imagen && item.imagen !== '0' ? item.imagen : 'assets/no-image.png'}" alt="Imagen camiseta" style="width:100%;max-width:300px;margin:10px 0;">
    </div>
  `;
  modal.style.display = 'flex';
};

window.cerrarModalDetallesCarrito = function () {
  const modal = document.getElementById('modalDetallesCarrito');
  if (modal) modal.style.display = 'none';
};
