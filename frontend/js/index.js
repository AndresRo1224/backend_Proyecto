const apiUrl = 'https://proyecto-futstyles2.onrender.com/api/camisetas';
let camisetas = [];

document.addEventListener('DOMContentLoaded', async () => {
  await cargarCamisetas();
});

async function cargarCamisetas() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    camisetas = await response.json();

    // Verificar los datos recibidos
    console.log("Datos recibidos del backend:", camisetas);

    mostrarCamisetas(camisetas);
  } catch (error) {
    console.error('Error al cargar camisetas:', error);
  }
}

function mostrarCamisetas(lista) {
  const container = document.getElementById('productos-container');
  container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos

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
    const imagen = camiseta.imagen || "assets/default-image.png";

    card.innerHTML = `
      <img src="${imagen}" alt="${nombre}" class="card-img">
      <div class="card-body">
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
        <p class="precio">${precio}</p>
      </div>
    `;
    container.appendChild(card);
  });
}