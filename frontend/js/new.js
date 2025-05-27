document.addEventListener('DOMContentLoaded', () => {
  const nuevasNoticias = [
    {
      titulo: 'Serie A: Inter de Milán presenta su nueva equipación',
      descripcion: 'El Inter sorprende con un diseño innovador para la temporada 24/25 y anuncia refuerzos en defensa.',
      fecha: '23 de mayo de 2025',
    },
    {
      titulo: 'Bundesliga: Harry Kane sigue imparable en el Bayern',
      descripcion: 'El delantero inglés suma 2 goles en la victoria del Bayern sobre el Dortmund.',
      fecha: '22 de mayo de 2025',
    },
    {
      titulo: 'Ligue 1: PSG apuesta por jóvenes talentos',
      descripcion: 'El Paris Saint-Germain inicia la temporada con una plantilla renovada y varias promesas francesas.',
      fecha: '21 de mayo de 2025',
    },
    {
      titulo: 'LaLiga: Barcelona busca refuerzos en defensa',
      descripcion: 'El equipo catalán está en negociaciones para fichar a un central de renombre.',
      fecha: '20 de mayo de 2025',
    },
    {
      titulo: 'Premier League: Liverpool asegura su lugar en la Champions',
      descripcion: 'El equipo de Klopp vence al Chelsea y asegura su clasificación.',
      fecha: '19 de mayo de 2025',
    },
    {
      titulo: 'Europa League: Sevilla avanza a la final',
      descripcion: 'El equipo español vence al Arsenal en un emocionante partido de semifinales.',
      fecha: '18 de mayo de 2025',
    },
    {
      titulo: 'Copa Libertadores: Boca Juniors derrota a River Plate',
      descripcion: 'El clásico argentino termina con una victoria 2-1 para Boca en los cuartos de final.',
      fecha: '17 de mayo de 2025',
    },
    {
      titulo: 'MLS: Lionel Messi lidera al Inter Miami a la victoria',
      descripcion: 'El astro argentino marca un gol y da una asistencia en el triunfo sobre LA Galaxy.',
      fecha: '16 de mayo de 2025',
    },
    {
      titulo: 'Champions League: Real Madrid y Manchester City empatan en la ida',
      descripcion: 'El partido termina 1-1 con goles de Haaland y Vinícius Jr.',
      fecha: '15 de mayo de 2025',
    },
    {
      titulo: 'Bundesliga: Borussia Dortmund pierde terreno en la lucha por el título',
      descripcion: 'El equipo cae 2-0 ante el RB Leipzig en un partido clave.',
      fecha: '14 de mayo de 2025',
    },
    {
      titulo: 'LaLiga: Atlético de Madrid asegura su lugar en Europa',
      descripcion: 'El equipo de Simeone vence al Valencia y asegura su clasificación a la Europa League.',
      fecha: '13 de mayo de 2025',
    },
    {
      titulo: 'Serie A: Juventus enfrenta sanciones por irregularidades financieras',
      descripcion: 'El club italiano podría perder puntos en la clasificación.',
      fecha: '12 de mayo de 2025',
    },
    {
      titulo: 'Ligue 1: Neymar regresa tras lesión',
      descripcion: 'El brasileño vuelve a los entrenamientos con el PSG tras dos meses de baja.',
      fecha: '11 de mayo de 2025',
    },
    {
      titulo: 'Premier League: Tottenham busca nuevo entrenador',
      descripcion: 'El club londinense está en conversaciones con varios candidatos tras la salida de Conte.',
      fecha: '10 de mayo de 2025',
    },
    {
      titulo: 'Copa del Rey: Real Sociedad sorprende al Villarreal',
      descripcion: 'El equipo vasco avanza a la final tras una victoria 3-2 en tiempo extra.',
      fecha: '9 de mayo de 2025',
    },
    {
      titulo: 'LaLiga: Real Betis asegura su lugar en la Europa League',
      descripcion: 'El equipo andaluz vence al Espanyol y asegura su clasificación.',
      fecha: '8 de mayo de 2025',
    },
    {
      titulo: 'Bundesliga: Bayern Múnich gana el clásico alemán',
      descripcion: 'El equipo bávaro vence 3-2 al Borussia Dortmund en un emocionante partido.',
      fecha: '7 de mayo de 2025',
    },
    {
      titulo: 'Serie A: Napoli celebra su tercer Scudetto',
      descripcion: 'El equipo del sur de Italia asegura el título tras una victoria sobre la Roma.',
      fecha: '6 de mayo de 2025',
    },
    {
      titulo: 'Ligue 1: Mbappé alcanza los 30 goles en la temporada',
      descripcion: 'El delantero francés lidera la tabla de goleadores en la liga francesa.',
      fecha: '5 de mayo de 2025',
    },
    {
      titulo: 'Premier League: Arsenal pierde terreno en la lucha por el título',
      descripcion: 'El equipo londinense cae 2-1 ante el Newcastle.',
      fecha: '4 de mayo de 2025',
    },
    {
      titulo: 'Champions League: Milan sorprende al PSG en cuartos de final',
      descripcion: 'El equipo italiano avanza tras una victoria 2-0 en el partido de vuelta.',
      fecha: '3 de mayo de 2025',
    },
    {
      titulo: 'Europa League: Roma avanza a la final tras vencer al Leverkusen',
      descripcion: 'El equipo italiano asegura su lugar en la final con un gol en el último minuto.',
      fecha: '2 de mayo de 2025',
    },
    {
      titulo: 'Copa Libertadores: Flamengo avanza a semifinales',
      descripcion: 'El equipo brasileño vence al Palmeiras en un emocionante partido.',
      fecha: '1 de mayo de 2025',
    },
    {
      titulo: 'MLS: Inter Miami asegura su lugar en los playoffs',
      descripcion: 'El equipo liderado por Messi vence al Orlando City y asegura su clasificación.',
      fecha: '30 de abril de 2025',
    },
    {
      titulo: 'LaLiga: Villarreal sorprende al Sevilla con una goleada',
      descripcion: 'El equipo amarillo vence 4-0 en un partido clave por Europa.',
      fecha: '29 de abril de 2025',
    },
    {
      titulo: 'Bundesliga: Leipzig asegura su lugar en la Champions League',
      descripcion: 'El equipo vence al Hoffenheim y asegura su clasificación.',
      fecha: '28 de abril de 2025',
    },
    {
      titulo: 'Serie A: Roma busca refuerzos para la próxima temporada',
      descripcion: 'El equipo italiano está en conversaciones con varios jugadores clave.',
      fecha: '27 de abril de 2025',
    },
    {
      titulo: 'Ligue 1: PSG asegura el título con una victoria sobre el Lyon',
      descripcion: 'El equipo parisino celebra su décimo título de liga.',
      fecha: '26 de abril de 2025',
    },
    {
      titulo: 'Premier League: Manchester United asegura su lugar en Europa',
      descripcion: 'El equipo vence al Brighton y asegura su clasificación a la Europa League.',
      fecha: '25 de abril de 2025',
    },
    {
      titulo: 'Champions League: Bayern Múnich avanza a la final tras vencer al Real Madrid',
      descripcion: 'El equipo alemán asegura su lugar en la final con una victoria 3-1 en el global.',
      fecha: '24 de abril de 2025',
    },
  ];

  let indiceActual = 0; // Índice para controlar las noticias mostradas
  const noticiasPorRecarga = 5; // Número de noticias por recarga

  document.getElementById('btnRecargarNoticias').addEventListener('click', () => {
    const contenedorNoticias = document.getElementById('contenedorNoticias');

    // Limpiar el contenedor antes de agregar nuevas noticias
    contenedorNoticias.innerHTML = '';

    // Obtener las próximas noticias según el índice actual
    const noticiasAMostrar = nuevasNoticias.slice(
      indiceActual,
      indiceActual + noticiasPorRecarga
    );

    noticiasAMostrar.forEach((noticia) => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h3>${noticia.titulo}</h3>
        <p>${noticia.descripcion}</p>
        <span>${noticia.fecha}</span>
      `;
      contenedorNoticias.appendChild(article);
    });

    // Actualizar el índice para la próxima recarga
    indiceActual += noticiasPorRecarga;

    // Reiniciar el índice si se alcanzan todas las noticias
    if (indiceActual >= nuevasNoticias.length) {
      indiceActual = 0;
    }
  });
});