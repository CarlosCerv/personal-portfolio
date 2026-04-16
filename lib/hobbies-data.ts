export interface Hobby {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  backgroundImage: string;
  description: string;
  why: string;
  experience: string;
  highlights: string[];
  goals: string[];
  started: string;
  frequency: string;
  level: string;
  equipment: string[];
  resources: string[];
}

export const HOBBIES_DATA: Record<string, Hobby> = {
  photography: {
    slug: 'photography',
    title: 'Fotografía',
    subtitle: 'Capturando momentos y contando historias a través del lente',
    icon: '📸',
    backgroundImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&h=400&fit=crop',
    description: 'La fotografía ha sido una pasión creativa por varios años. Empecé con fotos básicas desde el celular y poco a poco evolucioné a usar cámaras más completas. Lo que comenzó como un interés casual se convirtió en un hobby serio donde exploro técnicas, composición y estilos con intención.',
    why: 'La fotografía me obliga a ver el mundo con otros ojos. Entrena mi atención al detalle, patrones y belleza en momentos cotidianos. Cada foto cuenta una historia, preserva una memoria y captura emociones que a veces son difíciles de explicar con palabras.',
    experience: 'Me enfoco principalmente en fotografía de paisaje y calle, aunque disfruto experimentar con otros géneros. He participado en meetups locales en Guadalajara y algunas de mis fotos han sido compartidas en exhibiciones de comunidad.',
    highlights: [
      'Landscape photography in Jalisco\'s natural areas',
      'Street photography in Guadalajara\'s historic center',
      'Golden hour and blue hour photography',
      'Long exposure techniques',
      'Edición y revelado con Lightroom y Photoshop'
    ],
    goals: [
      'Build a cohesive portfolio of Jalisco landscapes',
      'Master advanced editing techniques',
      'Participate in photography competitions',
      'Crear un blog para compartir mi trabajo'
    ],
    started: '2018',
    frequency: 'Semanal',
    level: 'Intermedio',
    equipment: [
      'Cámara mirrorless',
      'Lente gran angular',
      'Tripié para largas exposiciones',
      'Adobe Lightroom'
    ],
    resources: [
      'Comunidad r/photography',
      'Canales de fotografía en YouTube',
      'Talleres locales de fotografía'
    ]
  },
  gym: {
    slug: 'gym',
    title: 'Gym & Fitness',
    subtitle: 'Construyendo fuerza, disciplina y un estilo de vida saludable',
    icon: '💪',
    backgroundImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=400&fit=crop',
    description: 'El fitness se volvió parte esencial de mi rutina. Llevo varios años entrenando en el gym, con enfoque en fuerza, condición y salud cardiovascular.',
    why: 'Entrenar de forma constante me ayuda a mantener energía y claridad mental. El gym me da estructura, disciplina y progreso medible. Es mi espacio para desconectarme de la pantalla y sostener el ritmo físico que exige el trabajo diario.',
    experience: 'Mi entrenamiento combina movimientos compuestos, trabajo funcional y cardio. Sigo programas estructurados y registro avances para mantener constancia y progresión.',
    highlights: [
      'Rutina consistente 5 días por semana',
      'Fuerza con sobrecarga progresiva',
      'Sesiones de cardio tipo HIIT',
      'Nutrición y planeación de comidas',
      'Recuperación y movilidad'
    ],
    goals: [
      'Lograr metas específicas de fuerza',
      'Mantener constancia todo el año',
      'Mejorar flexibilidad y movilidad',
      'Ayudar a otros a iniciar su camino fitness'
    ],
    started: '2020',
    frequency: '5 veces por semana',
    level: 'Intermedio',
    equipment: [
      'Membresía de gimnasio',
      'Bandas de resistencia',
      'Cuerda para saltar',
      'Foam roller'
    ],
    resources: [
      'Canales de fitness en YouTube',
      'MyFitnessPal',
      'Sesiones de entrenamiento personal'
    ]
  },
  cooking: {
    slug: 'cooking',
    title: 'Cocina',
    subtitle: 'Experimentando con sabores y creando experiencias memorables',
    icon: '🍳',
    backgroundImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&h=400&fit=crop',
    description: 'Cocinar es mi salida creativa fuera del mundo digital. Disfruto el proceso completo: desde elegir ingredientes frescos hasta experimentar con distintas cocinas y técnicas.',
    why: 'Cooking is therapeutic and rewarding. There\'s something deeply satisfying about taking raw ingredients and transforming them into a delicious meal. It\'s a practical skill that allows me to maintain a healthy diet and explore cultures through their traditional dishes.',
    experience: 'He experimentado con distintas cocinas: italiana, asiática, platillos tradicionales mexicanos y mediterránea. Disfruto tanto seguir recetas como improvisar con lo que hay disponible.',
    highlights: [
      'Homemade pasta and Italian sauces',
      'Traditional Mexican dishes from Jalisco',
      'Asian stir-fries and noodle dishes',
      'Baking bread and pastries',
      'Experimenting with fusion cuisine'
    ],
    goals: [
      'Master knife skills and techniques',
      'Create a personal recipe collection',
      'Learn advanced baking techniques',
      'Host dinner parties for friends and family'
    ],
    started: '2019',
    frequency: '4 a 5 veces por semana',
    level: 'Intermedio',
    equipment: [
      'Chef\'s knife set',
      'Cast iron skillet',
      'Dutch oven',
      'Kitchen scale',
      'Food processor'
    ],
    resources: [
      'Canales de cocina en YouTube',
      'Sitios de recetas',
      'Clases locales de cocina'
    ]
  },
  reading: {
    slug: 'reading',
    title: 'Lectura',
    subtitle: 'Explorando nuevos mundos y expandiendo conocimiento a través de los libros',
    icon: '📚',
    backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&h=400&fit=crop',
    description: 'La lectura es una pasión de toda la vida que sigue moldeando mi forma de pensar. Mantengo una lista diversa que incluye ciencia ficción, biografías, libros técnicos y no ficción.',
    why: 'Leer expande mi mente más allá de mi experiencia inmediata y del trabajo. La ciencia ficción estimula creatividad, las biografías dejan lecciones y los libros técnicos me mantienen aprendiendo. Es una forma de invertir tiempo con retorno real.',
    experience: 'Procuro leer al menos un libro al mes. Tomo notas de ideas interesantes y mantengo un registro de lecturas. Algunos libros han influido mucho en cómo pienso sobre tecnología y sociedad.',
    highlights: [
      'Science fiction classics and contemporary works',
      'Biographies of tech pioneers',
      'Technical books on software testing and QA',
      'Philosophy and psychology',
      'Literatura mexicana y latinoamericana'
    ],
    goals: [
      'Read 20+ books per year',
      'Build a personal library',
      'Write book reviews and summaries',
      'Unirme a un club de lectura'
    ],
    started: 'Desde niño',
    frequency: 'Diaria',
    level: 'Avanzado',
    equipment: [
      'Kindle e-reader',
      'Colección de libros físicos',
      'Bitácora de lectura',
      'Cuenta de Goodreads'
    ],
    resources: [
      'Goodreads',
      'Comunidad r/books',
      'Librerías locales en Guadalajara',
      'Podcasts de libros'
    ]
  },
  music: {
    slug: 'music',
    title: 'Música',
    subtitle: 'Encontrando ritmo, inspiración y alegría a través del sonido',
    icon: '🎸',
    backgroundImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&h=400&fit=crop',
    description: 'La música ha sido una constante en mi vida. Ya sea tocando guitarra, descubriendo artistas o asistiendo a conciertos, la música acompaña mis experiencias y es una forma de expresar emociones.',
    why: 'La música tiene el poder de cambiar el ánimo y activar recuerdos. Tocar guitarra es meditativo y gratificante: exige enfoque y práctica. Escuchar música también me ayuda a concentrarme y conectar con distintas culturas.',
    experience: 'Toco guitarra desde hace varios años, principalmente acústica fingerstyle y algo de eléctrica. Mi gusto es ecléctico: rock, indie, electrónica y música latina.',
    highlights: [
      'Acoustic guitar fingerstyle playing',
      'Attending live concerts and music festivals',
      'Discovering indie and underground artists',
      'Crear playlists en Spotify',
      'Aprender teoría musical'
    ],
    goals: [
      'Escribir y grabar canciones propias',
      'Tocar en un open mic',
      'Dominar técnicas avanzadas de guitarra',
      'Formar una colección de instrumentos de calidad'
    ],
    started: '2017',
    frequency: '3 a 4 veces por semana',
    level: 'Intermedio',
    equipment: [
      'Guitarra acústica',
      'Guitarra eléctrica',
      'Amplificador',
      'Interfaz de audio'
    ],
    resources: [
      'Tutoriales de guitarra en YouTube',
      'Tabs de Ultimate Guitar',
      'Cursos de teoría musical',
      'Foros y venues locales en Guadalajara'
    ]
  },
  travel: {
    slug: 'travel',
    title: 'Viajes',
    subtitle: 'Explorando nuevos lugares y viviendo culturas diversas',
    icon: '✈️',
    backgroundImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=400&fit=crop',
    description: 'Viajar es mi ventana al mundo. Explorar nuevos lugares, vivir culturas distintas y conocer personas de diferentes contextos me ha marcado profundamente.',
    why: 'Viajar me saca de mi zona de confort y reta mis ideas. Es una experiencia humilde ver cómo vive la gente en distintos lugares. También rompe la rutina, enciende creatividad y deja historias que valen la pena.',
    experience: 'He viajado por varias ciudades de México y algunos destinos internacionales. Me gusta combinar planeación con exploración espontánea, buscando experiencias locales más que lo típico de turista.',
    highlights: [
      'Exploring Mexico\'s colonial cities and beaches',
      'Experiencing local food markets',
      'Visiting archaeological sites',
      'Meeting locals and learning their culture',
      'Escapadas de fin de semana desde Guadalajara'
    ],
    goals: [
      'Visitar todos los estados de México',
      'Hacer viajes internacionales a Sudamérica y Europa',
      'Aprender frases básicas en varios idiomas',
      'Crear un blog de viajes',
      'Realizar viajes más largos'
    ],
    started: '2016',
    frequency: 'Mensual (local) · Trimestral (extendido)',
    level: 'Intermedio',
    equipment: [
      'Mochila de viaje',
      'Cámara',
      'Bitácora de viaje',
      'Mapas y apps de viaje'
    ],
    resources: [
      'Blogs y vlogs de viajes',
      'TripAdvisor y Google Maps',
      'Sitios locales de turismo'
    ]
  }
};

export function getHobby(slug: string): Hobby | null {
  return HOBBIES_DATA[slug] || null;
}

export function getAllHobbies(): Hobby[] {
  return Object.values(HOBBIES_DATA);
}

export function getHobbyList(): Array<{ slug: string; title: string; subtitle: string; icon: string; backgroundImage: string }> {
  return Object.values(HOBBIES_DATA).map(({ slug, title, subtitle, icon, backgroundImage }) => ({ slug, title, subtitle, icon, backgroundImage }));
}
