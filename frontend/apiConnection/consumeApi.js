export async function obtenerCamisetas() {
    try {
      const respuesta = await fetch("https://backend-proyecto-9mqd.onrender.com/api/camisetas");
      const datos = await respuesta.json();
      return datos;
    } catch (error) {
      console.error("Error al obtener camisetas:", error);
      return [];
    }
}