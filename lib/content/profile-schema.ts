export type ProfileRole = {
  label: string
  color: string
}

export type ProfileStat = {
  numero: string
  label: string
}

export type ProfileIdioma = {
  nombre: string
  bandera: string
  nivel: string
}

export type ProfileEducation = {
  institucion: string
  logo_url: string
  carrera: string
  periodo_inicio: string
  periodo_fin: string
  descripcion: string
}

export type ProfileExperience = {
  id: string
  cargo: string
  empresa: string
  logo_url: string
  periodo_inicio: string
  periodo_fin: string
  tipo: string
  descripcion: string
  bullets: string[]
  skills: string[]
}

export type ProfileProject = {
  nombre: string
  empresa_anonima: string
  periodo: string
  metricas: string
  descripcion: string
  stack: string[]
  visible: boolean
}

export type ProfileCertification = {
  nombre: string
  institucion: string
  anio: string
  url_verificacion: string
  credential_id: string
  logo_url: string
}

export type ProfileRecommendation = {
  nombre: string
  cargo: string
  empresa: string
  foto_url: string
  texto: string
  visible: boolean
}

export type PublicProfile = {
  nombre: string
  nombre_mostrado: string
  nombre_completo: string
  titulo: string
  headline: string
  empresa: string
  empresa_actual: string
  ubicacion: string
  bio_1: string
  bio_2: string
  bio_3: string
  foto_url: string
  banner_url: string
  banner_tipo: 'imagen' | 'gradiente'
  banner_color_inicio: string
  banner_color_fin: string
  disponible: boolean
  disponibilidad_texto: string
  modalidades_trabajo: string[]
  email_contacto: string
  linkedin_url: string
  github_url: string
  twitter_url: string
  cv_url: string
  roles: ProfileRole[]
  stats: ProfileStat[]
  idiomas: ProfileIdioma[]
  skills: Record<string, string[]>
  educacion: ProfileEducation[]
  experiencia: ProfileExperience[]
  proyectos: ProfileProject[]
  certificaciones: ProfileCertification[]
  recomendaciones: ProfileRecommendation[]
  mostrar_publicaciones: boolean
}

export const DEFAULT_PUBLIC_PROFILE: PublicProfile = {
  nombre: 'Carlos Cervantes',
  nombre_mostrado: 'Carlos Cervantes',
  nombre_completo: 'Carlos Eduardo Cervantes Arteaga',
  titulo: 'Senior Software Engineer · Ingeniero de Performance Testing',
  headline: 'Senior Software Engineer · Ingeniero de Performance Testing en Wizeline',
  empresa: 'Wizeline',
  empresa_actual: 'Wizeline',
  ubicacion: 'Guadalajara, Jalisco, México',
  bio_1:
    'Llevo más de 6 años construyendo calidad dentro de equipos de producto que no pueden permitirse fallar. Me especializo en performance testing, automatización E2E y estrategia QA para aplicaciones que escalan a millones de usuarios.',
  bio_2:
    'Mi enfoque combina criterio técnico profundo con claridad de negocio: no solo encuentro bugs, sino que diseño sistemas que evitan que aparezcan. Trabajo con equipos en LATAM y Norteamérica para lanzar software más confiable.',
  bio_3:
    'Actualmente trabajo como consultor independiente de QA & Performance, ayudando a startups y empresas de crecimiento rápido a implementar estrategias de calidad sostenibles. Si tu equipo lanza software con miedo, conversemos.',
  foto_url: '/images/profile.jpg',
  banner_url: '',
  banner_tipo: 'gradiente',
  banner_color_inicio: '#f5f5f7',
  banner_color_fin: '#e8f0fd',
  disponible: true,
  disponibilidad_texto: 'Disponible para consultoría · Remoto / Híbrido',
  modalidades_trabajo: ['Freelance', 'Consultoría', 'Abierto a tiempo completo'],
  email_contacto: 'carlos.cervart@icloud.com',
  linkedin_url: 'https://linkedin.com/in/carlos-eduardo-cervantes-arteaga',
  github_url: 'https://github.com/CarlosCerv',
  twitter_url: 'https://x.com/CarlosCerv',
  cv_url: '/Carlos_Cervantes_CV.pdf',
  roles: [
    { label: 'Ingeniería de performance', color: '#0071e3' },
    { label: 'Automatización mobile', color: '#7c3aed' },
    { label: 'Defensor de calidad', color: '#1d8348' },
  ],
  stats: [
    { numero: '10M+', label: 'Usuarios impactados en producción' },
    { numero: '10+', label: 'Productos y proyectos entregados' },
    { numero: '200+', label: 'Casos E2E automatizados (web/iOS/Android)' },
    { numero: '3', label: 'Pipelines CI/CD con performance integrado' },
    { numero: '6+', label: 'Años de experiencia' },
    { numero: '60%', label: 'Reducción promedio en tiempo de regresión' },
  ],
  idiomas: [
    { nombre: 'Español', bandera: '🇲🇽', nivel: 'Nativo / Bilingüe' },
    { nombre: 'Inglés', bandera: '🇺🇸', nivel: 'Profesional avanzado (B2-C1)' },
  ],
  skills: {
    Mobile: ['Appium', 'XCUITest', 'Espresso'],
    Web: ['Playwright', 'Cypress', 'Selenium', 'Nightwatch'],
    Performance: ['JMeter', 'k6', 'GitHub Actions', 'Jenkins', 'Grafana'],
    Cloud: ['SauceLabs', 'BrowserStack', 'Firebase', 'AWS'],
    'Project Management': ['Jira', 'TestRail', 'XRay', 'Agile'],
  },
  educacion: [
    {
      institucion: 'Universidad de Guadalajara (UdeG)',
      logo_url: '',
      carrera: 'Licenciatura en Ingeniería en Informática',
      periodo_inicio: '2016',
      periodo_fin: '2020',
      descripcion: 'Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI) · Actividades: Desarrollo de software · Testing · Sistemas',
    },
    {
      institucion: 'Universidad de Guadalajara (UdeG)',
      logo_url: '',
      carrera: 'Técnico en Desarrollo Web',
      periodo_inicio: '2012',
      periodo_fin: '2016',
      descripcion: 'Bachillerato General por Competencias — Preparatoria 14',
    },
  ],
  experiencia: [
    {
      id: 'wizeline-performance',
      cargo: 'Senior Software Engineer — Ingeniero de Performance Testing',
      empresa: 'Wizeline',
      logo_url: '',
      periodo_inicio: 'Enero 2025',
      periodo_fin: 'Presente',
      tipo: 'Tiempo completo',
      descripcion:
        'Diseño y ejecución de estrategias de performance testing para garantizar escalabilidad y confiabilidad, con pruebas de carga, estrés y endurance integradas en pipelines CI/CD.',
      bullets: [
        'Reducción de latencia P99 a 94ms bajo 100K usuarios concurrentes',
        'Integración de JMeter en pipelines CI/CD de 3 productos enterprise',
        'Identificación y resolución de bottlenecks críticos antes de eventos de alto tráfico',
        'Diseño de estrategia de performance para aplicación con 10M+ usuarios activos',
      ],
      skills: ['JMeter', 'Performance Testing', 'k6', 'CI/CD', 'Scalability', 'AWS'],
    },
    {
      id: 'wizeline-mobile',
      cargo: 'Ingeniero de QA III — Automatización Mobile',
      empresa: 'Wizeline',
      logo_url: '',
      periodo_inicio: 'Marzo 2024',
      periodo_fin: 'Enero 2025',
      tipo: 'Tiempo completo',
      descripcion:
        'Lideré la calidad para aplicaciones móviles iOS y Android del sector real estate con más de 10M usuarios activos.',
      bullets: [
        '−60% en tiempo de regresión mediante automatización con XCUITest y Espresso',
        'QA sign-off para 4 releases de features con IA generativa en iOS',
        'Gestión de feature flags para 5+ features en paralelo sin impacto a usuarios',
        'Suite E2E de 200+ casos automatizados para iOS y Android',
      ],
      skills: ['Appium', 'XCUITest', 'Espresso', 'Feature Flags', 'iOS', 'Android', 'CI/CD'],
    },
    {
      id: 'wizeline-automation',
      cargo: 'Ingeniero de QA — Automatización',
      empresa: 'Wizeline',
      logo_url: '',
      periodo_inicio: 'Agosto 2021',
      periodo_fin: 'Marzo 2024',
      tipo: 'Tiempo completo',
      descripcion:
        'Construcción de suites automatizadas para SDKs de streaming, plataformas e-commerce y apps móviles.',
      bullets: [
        'Setup de infraestructura de automatización para 3 productos distintos',
        'Integración de GitHub Actions con reportes automáticos a Slack',
        'Validación de datos con Firebase para app de e-commerce (5M+ usuarios)',
        'Gestión de suites Web, iOS y Android en un solo pipeline',
      ],
      skills: ['Cypress', 'Selenium', 'GitHub Actions', 'Firebase', 'JavaScript'],
    },
    {
      id: 'ibm-specialist',
      cargo: 'Especialista en pruebas de software',
      empresa: 'IBM',
      logo_url: '',
      periodo_inicio: 'Julio 2020',
      periodo_fin: 'Agosto 2021',
      tipo: 'Tiempo completo',
      descripcion:
        'Definí planes de prueba completos y frameworks de automatización para ecosistemas cloud empresariales y productos web basados en Angular.',
      bullets: [
        'Arquitectura completa del plan de pruebas para proyecto ES&D desde cero',
        'Setup de automatización UI con Nightwatch y performance con k6',
        'API testing con Postman para 20+ endpoints de servicios empresariales',
        'Integración de resultados de pruebas con Slack Reporter',
      ],
      skills: ['Nightwatch', 'k6', 'Grafana', 'Angular', 'Postman', 'Agile'],
    },
    {
      id: 'ibm-intern',
      cargo: 'Ingeniero de automatización de pruebas — Prácticas',
      empresa: 'IBM',
      logo_url: '',
      periodo_inicio: 'Agosto 2019',
      periodo_fin: 'Julio 2020',
      tipo: 'Prácticas profesionales',
      descripcion:
        'Construcción y mantenimiento de infraestructura de automatización, contribuyendo a ciclos de feedback más rápidos.',
      bullets: [
        'Desarrollo de casos de prueba automatizados desde especificaciones técnicas',
        'Integración de reportes con Slack para visibilidad del equipo',
        'Primeros frameworks de automatización UI con Nightwatch',
      ],
      skills: ['Nightwatch', 'UI Automation', 'Slack', 'Agile'],
    },
  ],
  proyectos: [
    {
      nombre: 'Plataforma móvil de Real Estate',
      empresa_anonima: 'Empresa de Real Estate (anónima)',
      periodo: '2+ años',
      metricas: '10M+ usuarios · 4.8★ en App Store · −60% tiempo regresión',
      descripcion:
        'QA completo para iOS y Android. Implementación de framework E2E que redujo el tiempo de regresión un 60% y soportó features de IA.',
      stack: ['XCUITest', 'Espresso', 'Appium', 'GitHub Actions'],
      visible: true,
    },
    {
      nombre: 'Plataforma de e-commerce',
      empresa_anonima: 'Empresa retail (anónima)',
      periodo: '1.5 años',
      metricas: '5M+ usuarios · 99.9% uptime · pipeline CI/CD completo',
      descripcion:
        'Testing mobile y web para plataforma de alto tráfico. Automatización integrada en CI/CD con cobertura de regresión completa.',
      stack: ['Cypress', 'Selenium', 'Firebase', 'GitHub Actions'],
      visible: true,
    },
    {
      nombre: 'App móvil de salud',
      empresa_anonima: 'Startup de salud (anónima)',
      periodo: '1 año',
      metricas: '500K+ usuarios · HIPAA compliant · accesibilidad validada',
      descripcion:
        'QA de seguridad, compliance y accesibilidad para app de salud en entorno regulado. Primera app HIPAA-compliant del portafolio.',
      stack: ['Appium', 'XCUITest', 'Manual Testing', 'Postman'],
      visible: true,
    },
    {
      nombre: 'Banca móvil FinTech',
      empresa_anonima: 'Servicios financieros (anónima)',
      periodo: '6 meses',
      metricas: '2M+ usuarios · Alta seguridad · Transacciones validadas',
      descripcion:
        'Testing riguroso para app de banca móvil con foco en seguridad, performance y precisión de transacciones financieras.',
      stack: ['Appium', 'JMeter', 'Postman', 'Security Testing'],
      visible: true,
    },
  ],
  certificaciones: [
    {
      nombre: 'ISTQB Foundation Level',
      institucion: 'International Software Testing Qualifications Board',
      anio: '2021',
      url_verificacion: '',
      credential_id: '',
      logo_url: '',
    },
    {
      nombre: 'Test Automation University — Appium & Selenium',
      institucion: 'Sauce Labs / TAU',
      anio: '2022',
      url_verificacion: 'https://testautomationu.applitools.com',
      credential_id: '',
      logo_url: '',
    },
    {
      nombre: 'Agile Testing Certification',
      institucion: 'ICAgile',
      anio: '2022',
      url_verificacion: 'https://www.icagile.com',
      credential_id: '',
      logo_url: '',
    },
  ],
  recomendaciones: [],
  mostrar_publicaciones: true,
}

function normalizeStringArray(value: unknown, fallback: string[] = []) {
  return Array.isArray(value) ? value.map(String) : fallback
}

function normalizeObjectArray<T>(value: unknown, fallback: T[]) {
  return Array.isArray(value) ? (value as T[]) : fallback
}

function isLegacyInflatedStats(stats: ProfileStat[]) {
  const numbers = new Set(stats.map((s) => String(s.numero).trim()))
  return (
    numbers.has('50M+') ||
    numbers.has('5,000+') ||
    numbers.has('10,000+') ||
    stats.some((s) => String(s.label).toLowerCase().includes('bugs encontrados'))
  )
}

export function normalizePublicProfile(dbProfile?: Record<string, any> | null): PublicProfile {
  if (!dbProfile) return DEFAULT_PUBLIC_PROFILE

  const next: PublicProfile = {
    ...DEFAULT_PUBLIC_PROFILE,
    ...dbProfile,
    nombre: dbProfile.nombre || dbProfile.nombre_mostrado || DEFAULT_PUBLIC_PROFILE.nombre,
    nombre_mostrado:
      dbProfile.nombre_mostrado || dbProfile.nombre || DEFAULT_PUBLIC_PROFILE.nombre_mostrado,
    nombre_completo: dbProfile.nombre_completo || DEFAULT_PUBLIC_PROFILE.nombre_completo,
    titulo: dbProfile.titulo || dbProfile.headline || DEFAULT_PUBLIC_PROFILE.titulo,
    headline: dbProfile.headline || dbProfile.titulo || DEFAULT_PUBLIC_PROFILE.headline,
    empresa: dbProfile.empresa || dbProfile.empresa_actual || DEFAULT_PUBLIC_PROFILE.empresa,
    empresa_actual:
      dbProfile.empresa_actual || dbProfile.empresa || DEFAULT_PUBLIC_PROFILE.empresa_actual,
    ubicacion: dbProfile.ubicacion || DEFAULT_PUBLIC_PROFILE.ubicacion,
    bio_1: dbProfile.bio_1 || DEFAULT_PUBLIC_PROFILE.bio_1,
    bio_2: dbProfile.bio_2 || DEFAULT_PUBLIC_PROFILE.bio_2,
    bio_3: dbProfile.bio_3 || DEFAULT_PUBLIC_PROFILE.bio_3,
    foto_url: dbProfile.foto_url || DEFAULT_PUBLIC_PROFILE.foto_url,
    banner_url: dbProfile.banner_url || DEFAULT_PUBLIC_PROFILE.banner_url,
    banner_tipo: dbProfile.banner_tipo || DEFAULT_PUBLIC_PROFILE.banner_tipo,
    banner_color_inicio:
      dbProfile.banner_color_inicio || DEFAULT_PUBLIC_PROFILE.banner_color_inicio,
    banner_color_fin: dbProfile.banner_color_fin || DEFAULT_PUBLIC_PROFILE.banner_color_fin,
    disponible:
      typeof dbProfile.disponible === 'boolean'
        ? dbProfile.disponible
        : DEFAULT_PUBLIC_PROFILE.disponible,
    disponibilidad_texto:
      dbProfile.disponibilidad_texto || DEFAULT_PUBLIC_PROFILE.disponibilidad_texto,
    modalidades_trabajo: normalizeStringArray(
      dbProfile.modalidades_trabajo,
      DEFAULT_PUBLIC_PROFILE.modalidades_trabajo
    ),
    email_contacto: dbProfile.email_contacto || DEFAULT_PUBLIC_PROFILE.email_contacto,
    linkedin_url: dbProfile.linkedin_url || DEFAULT_PUBLIC_PROFILE.linkedin_url,
    github_url: dbProfile.github_url || DEFAULT_PUBLIC_PROFILE.github_url,
    twitter_url: dbProfile.twitter_url || DEFAULT_PUBLIC_PROFILE.twitter_url,
    cv_url: dbProfile.cv_url || DEFAULT_PUBLIC_PROFILE.cv_url,
    roles: normalizeObjectArray<ProfileRole>(dbProfile.roles, DEFAULT_PUBLIC_PROFILE.roles),
    stats: normalizeObjectArray<ProfileStat>(dbProfile.stats, DEFAULT_PUBLIC_PROFILE.stats),
    idiomas: normalizeObjectArray<ProfileIdioma>(dbProfile.idiomas, DEFAULT_PUBLIC_PROFILE.idiomas),
    skills:
      dbProfile.skills && Object.keys(dbProfile.skills).length
        ? dbProfile.skills
        : DEFAULT_PUBLIC_PROFILE.skills,
    educacion: normalizeObjectArray<ProfileEducation>(
      dbProfile.educacion,
      DEFAULT_PUBLIC_PROFILE.educacion
    ),
    experiencia: normalizeObjectArray<ProfileExperience>(
      dbProfile.experiencia,
      DEFAULT_PUBLIC_PROFILE.experiencia
    ),
    proyectos: normalizeObjectArray<ProfileProject>(
      dbProfile.proyectos,
      DEFAULT_PUBLIC_PROFILE.proyectos
    ),
    certificaciones: normalizeObjectArray<ProfileCertification>(
      dbProfile.certificaciones,
      DEFAULT_PUBLIC_PROFILE.certificaciones
    ),
    recomendaciones: normalizeObjectArray<ProfileRecommendation>(
      dbProfile.recomendaciones,
      DEFAULT_PUBLIC_PROFILE.recomendaciones
    ),
    mostrar_publicaciones:
      typeof dbProfile.mostrar_publicaciones === 'boolean'
        ? dbProfile.mostrar_publicaciones
        : DEFAULT_PUBLIC_PROFILE.mostrar_publicaciones,
  }

  // If the database still contains the legacy inflated metrics, override them
  // with the updated, more realistic defaults. The admin panel can always edit
  // these values explicitly.
  if (Array.isArray(next.stats) && isLegacyInflatedStats(next.stats)) {
    next.stats = DEFAULT_PUBLIC_PROFILE.stats
  }

  return next
}
