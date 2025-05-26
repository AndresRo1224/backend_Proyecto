async function buscarPedido() {
  const correo = document.getElementById("correoInput").value;
  if (!correo) {
    alert("Por favor, ingresa un correo.");
    return;
  }

  try {
    const response = await fetch(`https://backend-proyecto-9mqd.onrender.com/api/pedidos/correo/${correo}`);
    const pedidos = await response.json();
    mostrarPedidos(pedidos);
  } catch (error) {
    document.getElementById("resultadoPedidos").innerHTML = '<p>Error al consultar pedidos.</p>';
  }
}

function mostrarPedidos(pedidos) {
  const container = document.getElementById("resultadoPedidos");
  container.innerHTML = '';

  if (!pedidos.length) {
    container.innerHTML = '<p>No hay pedidos para este correo.</p>';
    return;
  }

  pedidos.forEach(pedido => {
    const detalles = pedido.detalles.map(detalle => `
      <li>
        <strong>${detalle.equipo}</strong> - Talla: ${detalle.talla} - Cantidad: ${detalle.cantidad} - Precio: $${detalle.precio_unitario}
      </li>
    `).join('');

    const card = document.createElement('div');
    card.classList.add('pedido-card');
    card.innerHTML = `
      <h3>Pedido #${pedido.id_pedido}</h3>
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
    `;
    container.appendChild(card);
  });
}
