// apiConnection/consumeApi.js

export async function obtenerCamisetas() {
    try {
      const respuesta = await fetch("");
      const datos = await respuesta.json();
      return datos;
    } catch (error) {
      console.error("Error al obtener camisetas:", error);
      return [];
    }
  }
  