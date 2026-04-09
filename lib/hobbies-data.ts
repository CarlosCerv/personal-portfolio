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
    description: 'Photography has been a creative passion of mine for several years. I started with basic smartphone photography and gradually evolved to using professional cameras. What began as a simple interest has transformed into a serious hobby where I constantly explore new techniques, compositions, and styles.',
    why: 'Photography allows me to see the world differently. It trains my eye to notice details, patterns, and beauty in everyday moments that others might overlook. Each photograph tells a story, preserves a memory, and captures emotions that words sometimes cannot express.',
    experience: 'I primarily focus on landscape and street photography, though I enjoy experimenting with different genres. I\'ve participated in local photography meetups in Guadalajara and have had some of my work featured in community exhibitions.',
    highlights: [
      'Landscape photography in Jalisco\'s natural areas',
      'Street photography in Guadalajara\'s historic center',
      'Golden hour and blue hour photography',
      'Long exposure techniques',
      'Photo editing with Lightroom and Photoshop'
    ],
    goals: [
      'Build a cohesive portfolio of Jalisco landscapes',
      'Master advanced editing techniques',
      'Participate in photography competitions',
      'Create a photo blog to share my work'
    ],
    started: '2018',
    frequency: 'Weekly',
    level: 'Intermediate',
    equipment: [
      'Mirrorless camera',
      'Wide-angle lens',
      'Tripod for long exposures',
      'Adobe Lightroom'
    ],
    resources: [
      'r/photography community',
      'YouTube photography channels',
      'Local photography workshops'
    ]
  },
  gym: {
    slug: 'gym',
    title: 'Gym & Fitness',
    subtitle: 'Construyendo fuerza, disciplina y un estilo de vida saludable',
    icon: '💪',
    backgroundImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=400&fit=crop',
    description: 'Fitness has become an integral part of my daily routine. I\'ve been committed to gym training for the past few years, focusing on both strength training and cardiovascular health.',
    why: 'Regular exercise is essential for maintaining energy levels and mental clarity. The gym provides structure, discipline, and measurable progress. It\'s my time to disconnect from screens and maintain the physical stamina needed for long work hours.',
    experience: 'My fitness journey includes a mix of compound weightlifting movements, functional training, and cardio work. I follow structured workout programs and track my progress consistently.',
    highlights: [
      'Consistent 5-day per week training schedule',
      'Progressive overload strength training',
      'HIIT cardio sessions',
      'Nutrition and meal planning',
      'Recovery and mobility work'
    ],
    goals: [
      'Achieve specific strength milestones',
      'Maintain consistent year-round training',
      'Improve flexibility and mobility',
      'Help others start their fitness journey'
    ],
    started: '2020',
    frequency: '5 times per week',
    level: 'Intermediate',
    equipment: [
      'Gym membership',
      'Resistance bands',
      'Jump rope',
      'Foam roller'
    ],
    resources: [
      'Fitness YouTube channels',
      'MyFitnessPal',
      'Personal training sessions'
    ]
  },
  cooking: {
    slug: 'cooking',
    title: 'Cocina',
    subtitle: 'Experimentando con sabores y creando experiencias memorables',
    icon: '🍳',
    backgroundImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&h=400&fit=crop',
    description: 'Cooking is my creative outlet beyond the digital world. I enjoy the entire process—from selecting fresh ingredients to experimenting with different cuisines and techniques.',
    why: 'Cooking is therapeutic and rewarding. There\'s something deeply satisfying about taking raw ingredients and transforming them into a delicious meal. It\'s a practical skill that allows me to maintain a healthy diet and explore cultures through their traditional dishes.',
    experience: 'I\'ve experimented with various cuisines including Italian, Asian, Mexican traditional dishes, and Mediterranean fare. I enjoy both following traditional recipes and improvising with available ingredients.',
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
    frequency: '4-5 times per week',
    level: 'Intermediate',
    equipment: [
      'Chef\'s knife set',
      'Cast iron skillet',
      'Dutch oven',
      'Kitchen scale',
      'Food processor'
    ],
    resources: [
      'YouTube cooking channels',
      'Recipe websites',
      'Local cooking classes'
    ]
  },
  reading: {
    slug: 'reading',
    title: 'Lectura',
    subtitle: 'Explorando nuevos mundos y expandiendo conocimiento a través de los libros',
    icon: '📚',
    backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&h=400&fit=crop',
    description: 'Reading has been a lifelong passion that continues to shape my thinking and worldview. I maintain a diverse reading list that includes science fiction, biographies, technical books, and non-fiction.',
    why: 'Reading expands my mind beyond my immediate experiences and profession. Science fiction stimulates creativity, biographies provide lessons from remarkable lives, and technical books keep me learning. Reading is a more enriching use of time compared to other activities.',
    experience: 'I try to read at least one book per month. I take notes on interesting concepts and maintain a reading journal. Some books have profoundly influenced my thinking about technology and society.',
    highlights: [
      'Science fiction classics and contemporary works',
      'Biographies of tech pioneers',
      'Technical books on software testing and QA',
      'Philosophy and psychology',
      'Mexican and Latin American literature'
    ],
    goals: [
      'Read 20+ books per year',
      'Build a personal library',
      'Write book reviews and summaries',
      'Join a book club'
    ],
    started: 'Childhood',
    frequency: 'Daily',
    level: 'Advanced',
    equipment: [
      'Kindle e-reader',
      'Physical book collection',
      'Reading journal',
      'Goodreads account'
    ],
    resources: [
      'Goodreads',
      'r/books community',
      'Local bookstores in Guadalajara',
      'Book podcasts'
    ]
  },
  music: {
    slug: 'music',
    title: 'Música',
    subtitle: 'Encontrando ritmo, inspiración y alegría a través del sonido',
    icon: '🎸',
    backgroundImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&h=400&fit=crop',
    description: 'Music has been a constant companion throughout my life. Whether I\'m playing guitar, discovering new artists, or attending live concerts, music provides a soundtrack to my experiences and a way to express emotions.',
    why: 'Music has the unique power to change moods and evoke memories. Playing guitar is meditative and rewarding—it requires focus and practice. Listening to music helps me concentrate during work and connect with cultures and emotions across the world.',
    experience: 'I\'ve been playing guitar for several years, focusing mainly on acoustic fingerstyle and some electric guitar. My music taste is eclectic, ranging from rock and indie to electronic and Latin music.',
    highlights: [
      'Acoustic guitar fingerstyle playing',
      'Attending live concerts and music festivals',
      'Discovering indie and underground artists',
      'Creating Spotify playlists',
      'Learning music theory'
    ],
    goals: [
      'Write and record original songs',
      'Perform at an open mic night',
      'Master advanced guitar techniques',
      'Build a collection of quality instruments'
    ],
    started: '2017',
    frequency: '3-4 times per week',
    level: 'Intermediate',
    equipment: [
      'Acoustic guitar',
      'Electric guitar',
      'Guitar amplifier',
      'Audio interface'
    ],
    resources: [
      'YouTube guitar tutorials',
      'Ultimate Guitar tabs',
      'Music theory courses',
      'Local music venues in Guadalajara'
    ]
  },
  travel: {
    slug: 'travel',
    title: 'Viajes',
    subtitle: 'Explorando nuevos lugares y viviendo culturas diversas',
    icon: '✈️',
    backgroundImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=400&fit=crop',
    description: 'Travel is my window to the world. Exploring new places, experiencing different cultures, and meeting people from diverse backgrounds has profoundly shaped who I am.',
    why: 'Travel pushes me out of my comfort zone and challenges my assumptions about the world. It\'s humbling to experience how people live in different parts of the world. Travel also provides a break from routine, sparking creativity and giving me stories to share.',
    experience: 'I\'ve traveled to various cities across Mexico and a few international destinations. I prefer a mix of planned activities and spontaneous exploration, often seeking local experiences rather than typical tourist attractions.',
    highlights: [
      'Exploring Mexico\'s colonial cities and beaches',
      'Experiencing local food markets',
      'Visiting archaeological sites',
      'Meeting locals and learning their culture',
      'Weekend trips from Guadalajara'
    ],
    goals: [
      'Visit all states of Mexico',
      'International trips to South America and Europe',
      'Learn basic phrases in multiple languages',
      'Create a travel blog',
      'Take extended trips'
    ],
    started: '2016',
    frequency: 'Monthly (local), Quarterly (extended)',
    level: 'Intermediate',
    equipment: [
      'Travel backpack',
      'Camera',
      'Travel journal',
      'Maps and travel apps'
    ],
    resources: [
      'Travel blogs and vlogs',
      'TripAdvisor and Google Maps',
      'Local tourism websites'
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
