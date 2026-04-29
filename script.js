/* =========================================
   XELA NOTICIAS — script.js
   Funcionalidades: slider, noticias, comentarios, LocalStorage
   ========================================= */

'use strict';

// ── DATOS DE NOTICIAS con imágenes reales de Unsplash ──
// Unsplash: licencia libre, sin atribución requerida
const DATA = {
  destacadas: [
    {
      title: 'Feria de Quetzaltenango 2026: Todo listo para la gran celebración',
      cat: 'Quetzaltenango',
      // Mercado colorido Guatemala
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    {
      title: 'Festival Internacional de Marimba reúne a músicos de todo Centroamérica',
      cat: 'Cultura',
      // Músicos en vivo / cultura
      img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    },
    {
      title: 'Inauguran nuevo corredor vial en la 4a. calle del centro histórico',
      cat: 'Ciudad',
      // Ciudad colonial latinoamericana
      img: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80',
    },
    {
      title: 'El volcán Santa María luce espectacular bajo las estrellas',
      cat: 'Naturaleza',
      // Volcán / montaña verde
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    },
    {
      title: 'Quetzaltenango lidera ranking de calidad del aire en el altiplano',
      cat: 'Medio Ambiente',
      // Naturaleza montañas verdes
      img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    },
    {
      title: 'Emprendedoras xelenses conquistan mercado internacional con textiles típicos',
      cat: 'Economía',
      // Textiles coloridos artesanía
      img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    },
  ],
  xela: [
    {
      title: 'Municipalidad presenta plan de renovación del parque central',
      desc: 'El alcalde dio a conocer un ambicioso proyecto de remodelación que incluye nueva iluminación, áreas verdes y espacios para eventos culturales.',
      cat: 'Ciudad',
      icon: 'fa-city',
      date: '22 Abr 2026',
      img: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=600&q=75',
    },
    {
      title: 'Jóvenes xelenses ganan concurso nacional de robótica',
      desc: 'Estudiantes del INTECAP Quetzaltenango se coronan campeones en la competencia nacional con su robot diseñado para asistir a personas con discapacidad.',
      cat: 'Educación',
      icon: 'fa-graduation-cap',
      date: '21 Abr 2026',
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=75',
    },
    {
      title: 'Mercado La Democracia estrena nuevo sistema de pagos digitales',
      desc: 'Los comerciantes del mercado más grande de Xela adoptaron terminales POS y billeteras digitales para facilitar las compras cotidianas.',
      cat: 'Economía',
      icon: 'fa-store',
      date: '20 Abr 2026',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=75',
    },
    {
      title: 'Lluvia record revitalizó los reservorios municipales de agua',
      desc: 'Después de semanas de sequía, las intensas lluvias de este fin de semana lograron reponer más del 60% de la capacidad de los depósitos.',
      cat: 'Ambiente',
      icon: 'fa-cloud-rain',
      date: '19 Abr 2026',
      img: 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=600&q=75',
    },
    {
      title: 'Rutas de senderismo en el Parque Regional Zunil abren al turismo',
      desc: 'Nuevos senderos señalizados permiten a visitantes disfrutar de la biodiversidad de la zona, con guías locales certificados disponibles.',
      cat: 'Turismo',
      icon: 'fa-map-marked-alt',
      date: '18 Abr 2026',
      img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=75',
    },
    {
      title: 'Artesanos de Almolonga lanzan colección de textiles digitales',
      desc: 'En una fusión de tradición y tecnología, tejedoras de la comunidad digitalizaron sus diseños ancestrales para venta internacional.',
      cat: 'Tecnología',
      icon: 'fa-palette',
      date: '17 Abr 2026',
      img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=75',
    },
  ],
  farandula: [
    {
      title: 'Cantante guatemalteca triunfa en los Latin Music Awards',
      desc: 'La artista guatemalteca se alzó con tres premios en la gala celebrada en Miami, consagrándose como la figura musical del año en Centroamérica.',
      cat: 'Música',
      icon: 'fa-music',
      date: '22 Abr 2026',
      img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75',
    },
    {
      title: 'Película guatemalteca preseleccionada para los Premios Goya',
      desc: 'El largometraje "Tierra Viva" fue elegida como la representante de Guatemala en los premios de cine hispano más importantes del mundo.',
      cat: 'Cine',
      icon: 'fa-film',
      date: '21 Abr 2026',
      img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=75',
    },
    {
      title: 'Influencer guatemalteco llega a 5 millones de seguidores en TikTok',
      desc: 'El creador de contenido originario de Mixco se convirtió en uno de los guatemaltecos con mayor alcance en redes sociales a nivel regional.',
      cat: 'Redes Sociales',
      icon: 'fa-hashtag',
      date: '20 Abr 2026',
      img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=75',
    },
    {
      title: 'Festival Gastronómico Nacional reúne a los mejores chefs del país',
      desc: 'El evento celebrado en el Centro Cultural Miguel Ángel Asturias presentó platillos innovadores que fusionan la cocina maya con tendencias internacionales.',
      cat: 'Gastronomía',
      icon: 'fa-utensils',
      date: '19 Abr 2026',
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75',
    },
    {
      title: 'La Marimba Nacional celebra 75 años con concierto en el Palacio',
      desc: 'El conjunto oficial del instrumento nacional ofreció un emotivo recital ante centenares de espectadores reunidos en la Plaza de la Constitución.',
      cat: 'Cultura',
      icon: 'fa-drum',
      date: '18 Abr 2026',
      img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=75',
    },
    {
      title: 'Miss Guatemala representará al país en certamen internacional en París',
      desc: 'La reina de belleza viajará a Europa en mayo para competir en el certamen Miss Grand International 2026.',
      cat: 'Belleza',
      icon: 'fa-crown',
      date: '17 Abr 2026',
      img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=75',
    },
  ],
  deportes: [
    {
      title: 'Comunicaciones FC avanza a semifinales del torneo Apertura 2026',
      desc: 'Los cremas vencieron 3-1 a Antigua GFC en el estadio Mateo Flores ante más de 25 mil aficionados que apoyaron a su equipo.',
      cat: 'Fútbol Nacional',
      icon: 'fa-futbol',
      date: '22 Abr 2026',
      img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=75',
    },
    {
      title: 'Atleta guatemalteca clasifica a los Juegos Olímpicos de Los Ángeles',
      desc: 'La maratonista obtuvo su boleto olímpico al romper el récord nacional en la competencia de clasificación celebrada en la Ciudad de Guatemala.',
      cat: 'Atletismo',
      icon: 'fa-running',
      date: '21 Abr 2026',
      img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=75',
    },
    {
      title: 'UCL: Bayern Múnich vs PSG, el partidazo del siglo en Champions League',
      desc: 'En un duelo de titanes que mantuvo al mundo en vilo, Bayern Múnich y Paris Saint-Germain protagonizaron uno de los mejores partidos en la historia de la UEFA Champions League, con goles, emociones y un desenlace histórico.',
      cat: 'UEFA Champions League',
      icon: 'fa-trophy',
      date: '29 Abr 2026',
      img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=75',
    },
    {
      title: 'NBA Playoffs: Thunder elimina a Denver y avanza a semifinales del Oeste',
      desc: 'Oklahoma City cerró la serie 4-2 con una actuación estelar de Shai Gilgeous-Alexander, quien anotó 38 puntos en el partido decisivo.',
      cat: 'Básquetbol',
      icon: 'fa-basketball-ball',
      date: '20 Abr 2026',
      img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=75',
    },
    {
      title: 'Boxeador guatemalteco pelea por el título mundial en Las Vegas',
      desc: 'El púgil capitalino enfrentará al campeón del mundo en peso gallo el próximo 10 de mayo en el MGM Grand Garden Arena.',
      cat: 'Boxeo',
      icon: 'fa-fist-raised',
      date: '19 Abr 2026',
      img: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=75',
    },
    {
      title: 'Formula 1: Gran Premio de Miami anuncia fanzone gratuito',
      desc: 'El circuito de Miami Beach habilitará zonas de acceso libre con transmisiones en pantalla gigante para el público latinoamericano.',
      cat: 'Automovilismo',
      icon: 'fa-flag-checkered',
      date: '18 Abr 2026',
      img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=75',
    },
  ],
};

// ── Helpers ──
function formatDate() {
  return new Date().toLocaleDateString('es-GT', { day: 'numeric', month: 'short', year: 'numeric' });
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── NAVBAR ──
(function initNavbar() {
  const nav = document.getElementById('navbar');
  const burger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  const allLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });

  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      allLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

// ── SLIDER ──
(function initSlider() {
  const slider = document.getElementById('mainSlider');
  const dotsEl = document.getElementById('sliderDots');
  const data = DATA.destacadas;
  const perPage = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  let current = 0;

  // Build slides
  data.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'slide-card glass-card';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.style.opacity='0.3'" />
      <div class="slide-overlay">
        <div class="slide-cat"><i class="fas fa-tag"></i> ${item.cat}</div>
        <div class="slide-title">${item.title}</div>
      </div>`;
    slider.appendChild(div);
  });

  // Build dots
  const totalPages = Math.ceil(data.length / perPage);
  for (let i = 0; i < totalPages; i++) {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  }

  function goTo(page) {
    current = (page + totalPages) % totalPages;
    const cards = slider.querySelectorAll('.slide-card');
    cards.forEach((c, i) => {
      c.classList.toggle('active', i >= current * perPage && i < (current + 1) * perPage);
    });
    dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  goTo(0);
  document.getElementById('sliderPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('sliderNext').addEventListener('click', () => goTo(current + 1));

  // Auto-slide
  setInterval(() => goTo(current + 1), 5000);
})();

// ── RENDER NEWS CARDS ──
function buildCard(item) {
  const card = document.createElement('article');
  card.className = 'news-card';

  const fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='340'%3E%3Crect width='600' height='340' fill='%232d4a32'/%3E%3Ctext x='300' y='180' font-size='48' text-anchor='middle' fill='%236abf6955'%3E%F0%9F%93%B0%3C/text%3E%3C/svg%3E";
  const imgHTML = item.img
    ? `<div class="card-img-wrap"><img class="card-img" src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'"/></div>`
    : `<div class="card-img-wrap"><div class="card-img-placeholder"><i class="fas ${item.icon || 'fa-newspaper'}"></i></div></div>`;

  card.innerHTML = `
    ${imgHTML}
    <div class="card-body">
      <div class="card-cat"><i class="fas ${item.icon || 'fa-tag'}"></i> ${item.cat}</div>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-desc">${item.desc}</p>
      <div class="card-meta">
        <span class="card-date"><i class="far fa-clock"></i> ${item.date}</span>
        <button class="card-read">Leer más</button>
      </div>
    </div>`;

  card.querySelector('.card-read').addEventListener('click', () => {
    showToast('📰 Abriendo noticia completa...');
  });

  return card;
}

function renderGrid(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  items.forEach((item, i) => {
    const card = buildCard(item);
    card.style.transitionDelay = `${i * 0.07}s`;
    el.appendChild(card);
  });
}

// Load user-submitted news from localStorage
function loadUserNews() {
  const saved = JSON.parse(localStorage.getItem('xela_news') || '[]');
  saved.forEach(item => {
    const gridId = item.section === 'farandula' ? 'farandulaGrid' : item.section === 'deportes' ? 'deportesGrid' : 'xelaGrid';
    const grid = document.getElementById(gridId);
    const card = buildCard({ ...item, icon: 'fa-user-edit', date: item.date });
    grid.prepend(card);
  });
}

renderGrid('xelaGrid', DATA.xela);
renderGrid('farandulaGrid', DATA.farandula);
renderGrid('deportesGrid', DATA.deportes);
loadUserNews();

// ── CAPACITACIONES ──
(function initCapacitaciones() {
  const articulo = {
    titulo: 'El Nuevo Paradigma en la Producción de Contenidos Periodísticos',
    autores: 'Esdras García y Lisbeth Tzic',
    fecha: '29 Abr 2026',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80',
    contenido: [
      {
        tipo: 'intro',
        texto: 'En un mundo informativo cada vez más dinámico y competitivo, la adopción de nuevas tecnologías se ha vuelto una necesidad imperativa para los comunicadores. Recientemente, en la Universidad Mesoamericana se llevó a cabo una jornada de capacitación enfocada en dos herramientas que están transformando el ejercicio periodístico: <strong>Google Trends</strong> y la inteligencia artificial <strong>Google Gemini</strong>.',
      },
      {
        tipo: 'subtitulo',
        texto: 'Google Trends: El algoritmo de la audiencia en tiempo real',
      },
      {
        tipo: 'parrafo',
        texto: 'La conferencista destacó a Google Trends como un recurso fundamental para identificar tendencias globales y locales. Esta plataforma permite a los periodistas dejar de adivinar qué le interesa al público para pasar a un análisis basado en datos estadísticos, pudiendo así crear contenido que las personas están buscando.',
      },
      {
        tipo: 'parrafo',
        texto: 'Durante la sesión, se exploraron las tres secciones clave de la herramienta:',
      },
      {
        tipo: 'lista',
        items: [
          '<strong>Página Principal:</strong> Un punto de partida para escribir palabras clave y eventos internacionales mediante gráficos de popularidad. Como recomendación, debemos ser específicos. Ejemplo: <em>"Guerra entre EE.UU e Irán en el estrecho de Ormuz"</em>.',
          '<strong>Sección "Explorar":</strong> Un espacio de análisis profundo donde es posible filtrar búsquedas por ubicación, categorías y periodos (desde 2004 a la fecha), permitiendo segmentar el contenido para audiencias específicas.',
          '<strong>Tendencias Actuales:</strong> Una función vital para la cobertura de última hora, lo que permite al periodista crear noticias de interés en tiempo real.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Google Gemini: Eficiencia y Verificación con Inteligencia Artificial',
      },
      {
        tipo: 'parrafo',
        texto: 'Complementando el análisis de tendencias, la capacitación introdujo el uso de Google Gemini como un aliado en la creación de contenidos. La IA no solo agiliza la búsqueda de información, sino que redefine la productividad editorial. Uno de los puntos más relevantes fue la capacidad de Gemini para:',
      },
      {
        tipo: 'lista_numerada',
        items: [
          '<strong>Sintetizar información:</strong> Evita la navegación exhaustiva por múltiples sitios, ofreciendo enlaces de páginas específicas para sustentar la investigación.',
          '<strong>Transparencia de fuentes:</strong> Gemini facilita la verificación al proporcionar las fuentes bibliográficas de los datos, un paso esencial para mantener la credibilidad periodística.',
          '<strong>Optimización del tiempo:</strong> Al reducir la carga de tareas repetitivas, los comunicadores pueden enfocar su esfuerzo en el análisis crítico y la calidad narrativa, tomando en cuenta que en la redacción periodística la inmediatez es de mucha importancia.',
        ],
      },
      {
        tipo: 'subtitulo',
        texto: 'Conclusión: Hacia un periodismo más estratégico y eficiente',
      },
      {
        tipo: 'parrafo',
        texto: 'El uso conjunto de estas herramientas permite a los medios diversificar su contenido y conectar de manera más efectiva con diferentes grupos sociales. El mundo periodístico está distribuido de distintas maneras debido a que los intereses del público son diversos, por eso se necesita ser eficientes y crear noticias con inmediatez. La capacidad de analizar datos en tiempo real con Trends, sumada a la potencia de organización y redacción de Gemini, posiciona a los profesionales de la comunicación en una ventaja estratégica para ofrecer noticias precisas, relevantes y oportunas.',
      },
    ],
  };

  const el = document.getElementById('capArticle');
  if (!el) return;

  let html = `
    <div class="cap-hero">
      <img src="${articulo.img}" alt="${articulo.titulo}" loading="lazy" onerror="this.style.display='none'" />
      <div class="cap-hero-overlay">
        <span class="card-cat"><i class="fas fa-robot"></i> Inteligencia Artificial</span>
        <h2 class="cap-title">${articulo.titulo}</h2>
        <div class="cap-meta">
          <span><i class="fas fa-users"></i> ${articulo.autores}</span>
          <span><i class="far fa-clock"></i> ${articulo.fecha}</span>
        </div>
      </div>
    </div>
    <div class="cap-body">`;

  articulo.contenido.forEach(bloque => {
    if (bloque.tipo === 'intro') {
      html += `<p class="cap-intro">${bloque.texto}</p>`;
    } else if (bloque.tipo === 'subtitulo') {
      html += `<h3 class="cap-subtitle"><i class="fas fa-chevron-right"></i> ${bloque.texto}</h3>`;
    } else if (bloque.tipo === 'parrafo') {
      html += `<p class="cap-p">${bloque.texto}</p>`;
    } else if (bloque.tipo === 'lista') {
      html += `<ul class="cap-list">${bloque.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
    } else if (bloque.tipo === 'lista_numerada') {
      html += `<ol class="cap-list cap-list-num">${bloque.items.map(i => `<li>${i}</li>`).join('')}</ol>`;
    }
  });

  html += `</div>`;
  el.innerHTML = html;
})();

// ── SCROLL ANIMATIONS ──
(function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Cards animation
  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.news-card').forEach(el => cardObs.observe(el));
})();

// ── MODAL SUBIR NOTICIAS ──
(function initModal() {
  const modal = document.getElementById('uploadModal');
  const openBtn = document.getElementById('openUploadModal');
  const closeBtn = document.getElementById('closeModal');
  const publishBtn = document.getElementById('publishNews');
  const imageInput = document.getElementById('newImage');
  const preview = document.getElementById('imagePreview');

  openBtn.addEventListener('click', () => modal.classList.add('open'));
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Vista previa" />`;
    };
    reader.readAsDataURL(file);
  });

  publishBtn.addEventListener('click', () => {
    const title = document.getElementById('newTitle').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    const section = document.getElementById('newSection').value;
    const imgEl = preview.querySelector('img');

    if (!section) { showToast('⚠️ Selecciona una sección'); return; }
    if (!title || !desc) { showToast('⚠️ Completa el título y descripción'); return; }

    const sectionLabels = { quetzaltenango: 'Quetzaltenango', farandula: 'Farándula', deportes: 'Deportes' };

    const item = {
      title, desc,
      img: imgEl ? imgEl.src : null,
      cat: sectionLabels[section] || 'Ciudadano',
      date: formatDate(),
      section,
    };

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('xela_news') || '[]');
    saved.unshift(item);
    localStorage.setItem('xela_news', JSON.stringify(saved));

    // Add card to correct grid
    const gridId = section === 'quetzaltenango' ? 'xelaGrid' : section === 'farandula' ? 'farandulaGrid' : 'deportesGrid';
    const card = buildCard({ ...item, icon: 'fa-user-edit' });
    const grid = document.getElementById(gridId);
    card.style.transitionDelay = '0s';
    grid.prepend(card);
    setTimeout(() => card.classList.add('visible'), 50);

    // Reset form
    document.getElementById('newTitle').value = '';
    document.getElementById('newDesc').value = '';
    document.getElementById('newSection').value = '';
    imageInput.value = '';
    preview.innerHTML = '';
    modal.classList.remove('open');
    showToast(`✅ ¡Noticia publicada en ${sectionLabels[section]}!`);

    // Scroll to section
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  });
})();

// ── COMENTARIOS ──
(function initComments() {
  const textEl = document.getElementById('commentText');
  const nameEl = document.getElementById('commentName');
  const countEl = document.getElementById('charCount');
  const submitBtn = document.getElementById('submitComment');
  const list = document.getElementById('commentsList');

  textEl.addEventListener('input', () => {
    countEl.textContent = textEl.value.length;
  });

  function renderComment(c, prepend = false) {
    const div = document.createElement('div');
    div.className = 'comment-item';
    const initials = c.name.substring(0, 2).toUpperCase();
    div.innerHTML = `
      <div class="comment-header">
        <div class="comment-avatar">${initials}</div>
        <div>
          <div class="comment-name">${c.name}</div>
          <div class="comment-date"><i class="far fa-clock"></i> ${c.date}</div>
        </div>
      </div>
      <p class="comment-text">${c.text}</p>`;
    prepend ? list.prepend(div) : list.appendChild(div);
  }

  function loadComments() {
    const comments = JSON.parse(localStorage.getItem('xela_comments') || '[]');
    if (comments.length === 0) {
      list.innerHTML = `<p class="no-comments"><i class="far fa-comment-dots"></i><br/>Sé el primero en comentar.</p>`;
    } else {
      comments.forEach(c => renderComment(c));
    }
  }

  submitBtn.addEventListener('click', () => {
    const name = nameEl.value.trim() || 'Anónimo';
    const text = textEl.value.trim();
    if (!text) { showToast('⚠️ Escribe un comentario primero'); return; }

    const comment = { name, text, date: formatDate() };
    const saved = JSON.parse(localStorage.getItem('xela_comments') || '[]');
    saved.unshift(comment);
    localStorage.setItem('xela_comments', JSON.stringify(saved));

    const noMsg = list.querySelector('.no-comments');
    if (noMsg) noMsg.remove();
    renderComment(comment, true);

    nameEl.value = '';
    textEl.value = '';
    countEl.textContent = 0;
    showToast('💬 ¡Comentario publicado!');
  });

  loadComments();
})();

// ── ACTIVE NAV ON SCROLL ──
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const links = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => obs.observe(s));
})();
