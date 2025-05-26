let usuario = JSON.parse(localStorage.getItem('usuario'));
if (!usuario || usuario.role !== 'admin') {
  alert('Acceso solo para administradores');
  window.location.href = 'index.html';
}

const apiUrl = 'https://backend-proyecto-9mqd.onrender.com/api/camisetas';
let camisetas = [];

document.addEventListener('DOMContentLoaded', async () => {
  await cargarCamisetas();

  document.getElementById('btnFiltrar').addEventListener('click', filtrarProductos);
  document.getElementById('btnAgregar').addEventListener('click', () => abrirModal());
  document.getElementById('closeModal').addEventListener('click', cerrarModal);
  document.getElementById('formCamiseta').addEventListener('submit', guardarCamiseta);
});

async function cargarCamisetas() {
  try {
    const response = await fetch(apiUrl);
    camisetas = await response.json();
    mostrarCamisetas(camisetas);
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

    card.innerHTML = `
      <div class="card-body">
        <h3>${camiseta.equipo}</h3>
        <p>${camiseta.temporada}</p>
        <p>Talla: ${camiseta.talla}</p>
        <p class="precio">$${camiseta.precio}</p>
        <p>Stock: ${camiseta.stock}</p>
        <div class="actions">
          ${usuario && usuario.role === 'admin' ? `
            <button class="edit" onclick="editarCamiseta(${camiseta.id_camiseta})"><i class="fas fa-edit"></i> Editar</button>
            <button class="delete" onclick="eliminarCamiseta(${camiseta.id_camiseta})"><i class="fas fa-trash"></i> Eliminar</button>
          ` : ''}
        </div>
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
    return coincideNombre && coincidePrecio;
  });

  mostrarCamisetas(filtradas);
}

function abrirModal(camiseta = null) {
  document.getElementById('modalCamiseta').classList.remove('hidden');
  document.getElementById('formCamiseta').reset();
  document.getElementById('camisetaId').value = '';
  document.getElementById('modalTitle').textContent = camiseta ? 'Editar Camiseta' : 'Agregar Camiseta';

  if (camiseta) {
    document.getElementById('camisetaId').value = camiseta.id_camiseta;
    document.getElementById('equipo').value = camiseta.equipo;
    document.getElementById('temporada').value = camiseta.temporada;
    document.getElementById('talla').value = camiseta.talla;
    document.getElementById('precio').value = camiseta.precio;
    document.getElementById('stock').value = camiseta.stock;
    document.getElementById('imagen').value = camiseta.imagen;
  }
}

function cerrarModal() {
  document.getElementById('modalCamiseta').classList.add('hidden');
}

window.editarCamiseta = function(id) {
  const camiseta = camisetas.find(c => c.id_camiseta === id);
  abrirModal(camiseta);
};

window.eliminarCamiseta = async function(id) {
  if (!confirm('¿Seguro que deseas eliminar esta camiseta?')) return;
  try {
    const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      alert('Camiseta eliminada');
      await cargarCamisetas();
    } else {
      alert('Error al eliminar');
    }
  } catch (error) {
    alert('Error al eliminar');
  }
};

async function guardarCamiseta(e) {
  e.preventDefault();
  const id = document.getElementById('camisetaId').value;
  const equipo = document.getElementById('equipo').value;
  const temporada = document.getElementById('temporada').value;
  const talla = document.getElementById('talla').value;
  const precio = document.getElementById('precio').value;
  const stock = document.getElementById('stock').value;
  const imagen = document.getElementById('imagen').value;

  const data = { equipo, temporada, talla, precio, stock, imagen };

  try {
    let response;
    if (id) {
      response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    if (response.ok) {
      alert('Guardado correctamente');
      cerrarModal();
      await cargarCamisetas();
    } else {
      alert('Error al guardar');
    }
  } catch (error) {
    alert('Error al guardar');
  }
}