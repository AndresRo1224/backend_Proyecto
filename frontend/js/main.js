const apiUrl = 'https://backend-proyecto-9mqd.onrender.com/api/camisetas';
let camisetas = [];

document.addEventListener('DOMContentLoaded', async () => {
  await cargarCamisetas();

  document.getElementById('btnFiltrar').addEventListener('click', filtrarProductos);
});

async function cargarCamisetas() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    camisetas = await response.json();

    // Solo mostrar camisetas con stock > 0
    mostrarCamisetas(camisetas.filter(c => c.stock > 0));
  } catch (error) {
    console.error('Error al cargar camisetas:', error);
  }
}

function mostrarCamisetas(lista) {
  const container = document.getElementById('contenedorProductos');
  container.innerHTML = '';

  if (lista.length === 0) {
    container.innerHTML = '<p>No se encontraron camisetas.</p>';
    return;
  }

  lista.forEach(camiseta => {
    const card = document.createElement('div');
    card.classList.add('card');

    const nombre = camiseta.equipo || "Nombre no disponible";
    const descripcion = camiseta.temporada || "Descripción no disponible";
    const precio = camiseta.precio ? `$${camiseta.precio.toLocaleString()}` : "Precio no disponible";

    card.innerHTML = `
      <div class="card-body">
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
        <p class="precio">${precio}</p>
        <button onclick='verDetalles(${JSON.stringify(camiseta.id_camiseta)})'>
          <i class="fas fa-info-circle"></i> Ver detalles
        </button>
        <button onclick='agregarAlCarrito(${JSON.stringify(camiseta)})'>
          <i class="fas fa-cart-plus"></i> Agregar al carrito
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filtrarProductos() {
  const nombreFiltro = document.getElementById('filterName').value.toLowerCase();
  const precioFiltro = parseFloat(document.getElementById('filterPrice').value);

  const filtradas = camisetas.filter(c => {
    const coincideNombre = c.equipo && c.equipo.toLowerCase().includes(nombreFiltro);
    const coincidePrecio = isNaN(precioFiltro) || c.precio <= precioFiltro;
    return coincideNombre && coincidePrecio && c.stock > 0;
  });

  mostrarCamisetas(filtradas);
}

// Agregar producto al carrito
function agregarAlCarrito(camiseta) {
  let usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) {
    alert('Debes iniciar sesión para agregar productos al carrito.');
    window.location.href = 'auth.html';
    return;
  }
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existe = carrito.find(item => item.id_camiseta === camiseta.id_camiseta);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...camiseta, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert('¡Producto agregado al carrito!');
}

// Mostrar detalles de la camiseta (modal)
function verDetalles(id) {
  const camiseta = camisetas.find(c => c.id_camiseta === id);
  if (!camiseta) return;
  let modal = document.getElementById('modalDetalles');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalDetalles';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="cerrarModalDetalles()">&times;</span>
      <h3>${camiseta.equipo}</h3>
      <p><strong>Temporada:</strong> ${camiseta.temporada}</p>
      <p><strong>Talla:</strong> ${camiseta.talla}</p>
      <p><strong>Precio:</strong> $${camiseta.precio}</p>
      <p><strong>Stock:</strong> ${camiseta.stock}</p>
      <img src="${camiseta.imagen || 'assets/no-image.png'}" alt="Imagen camiseta" style="width:100%;max-width:300px;margin:10px 0;">
      <button onclick='agregarAlCarrito(${JSON.stringify(camiseta)})'>
        <i class="fas fa-cart-plus"></i> Agregar al carrito
      </button>
    </div>
  `;
  modal.style.display = 'flex';
}
window.verDetalles = verDetalles;

function cerrarModalDetalles() {
  const modal = document.getElementById('modalDetalles');
  if (modal) modal.style.display = 'none';
}
window.cerrarModalDetalles = cerrarModalDetalles;
window.agregarAlCarrito = agregarAlCarrito;