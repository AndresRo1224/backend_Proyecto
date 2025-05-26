let usuario = JSON.parse(localStorage.getItem('usuario'));
if (!usuario || usuario.role !== 'admin') {
  alert('Acceso solo para administradores');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  cargarPedidos();
});

async function cargarPedidos() {
  try {
    const response = await fetch('https://backend-proyecto-9mqd.onrender.com/api/pedidos');
    const pedidos = await response.json();
    mostrarPedidos(pedidos);
  } catch (error) {
    document.getElementById('pedidosContainer').innerHTML = '<p>Error al cargar pedidos.</p>';
  }
}

function mostrarPedidos(pedidos) {
  const container = document.getElementById('pedidosContainer');
  container.innerHTML = '';

  if (!pedidos.length) {
    container.innerHTML = '<p>No hay pedidos pendientes.</p>';
    return;
  }

  pedidos.forEach(pedido => {
    const detalles = pedido.detalles.map(detalle => `
      <li>
        <strong>${detalle.equipo}</strong> - Cantidad: ${detalle.cantidad} - Precio: $${detalle.precio_unitario} - Talla: ${detalle.talla}
      </li>
    `).join('');

    const card = document.createElement('div');
    card.classList.add('pedido-card');
    card.innerHTML = `
      <h3>Pedido #${pedido.id_pedido} - Usuario: ${pedido.usuario}</h3>
      <p><strong>Fecha:</strong> ${new Date(pedido.fecha).toLocaleString()}</p>
      <p><strong>Estado:</strong> <span class="${pedido.estado === 'pendiente' ? 'pendiente' : 'confirmado'}">${pedido.estado}</span></p>
      
      <h4>Datos del Cliente</h4>
      <p><strong>Nombre:</strong> ${pedido.Nombre}</p>
      <p><strong>Teléfono:</strong> ${pedido.Telefono}</p>
      <p><strong>Barrio:</strong> ${pedido.Barrio}</p>
      <p><strong>Dirección:</strong> ${pedido.Direccion}</p>
      <p><strong>Ciudad:</strong> ${pedido.Ciudad}</p>
      <p><strong>Correo:</strong> ${pedido.Correo}</p>

      <h4>Detalle del Pedido</h4>
      <ul>${detalles}</ul>

      ${pedido.estado === 'pendiente' ? `<button onclick="confirmarPedido(${pedido.id_pedido})"><i class="fas fa-check"></i> Confirmar</button>` : ''}
    `;
    container.appendChild(card);
  });
}

window.confirmarPedido = async function(id) {
  if (!confirm('¿Confirmar este pedido?')) return;
  try {
    const response = await fetch(`https://backend-proyecto-9mqd.onrender.com/api/pedidos/${id}/confirmar`, {
      method: 'PUT'
    });
    const result = await response.json();
    if (result.success) {
      alert('Pedido confirmado');
      cargarPedidos();
    } else {
      alert(result.message || 'No se pudo confirmar');
    }
  } catch (error) {
    alert('Error al confirmar pedido');
  }
};
