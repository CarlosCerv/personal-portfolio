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
  titulo: 'Senior Software Engineer · Performance Testing Engineer',
  headline: 'Senior Software Engineer · Performance Testing Engineer at Wizeline',
  empresa: 'Wizeline',
  empresa_actual: 'Wizeline',
  ubicacion: 'Guadalajara, Jalisco, Mexico',
  bio_1:
    'I have been building quality within product teams that cannot afford to fail for over 6 years. I specialize in performance testing, E2E automation, and QA strategy for applications scaling to millions of users.',
  bio_2:
    'My approach combines deep technical judgment with business clarity: I don\'t just find bugs, I design systems that prevent them from appearing. I work with teams in LATAM and North America to launch more reliable software.',
  bio_3:
    'I currently work as an independent QA & Performance consultant, helping startups and fast-growing companies implement sustainable quality strategies. If your team releases software with fear, let\'s talk.',
  foto_url: '/images/profile.jpg',
  banner_url: '',
  banner_tipo: 'gradiente',
  banner_color_inicio: '#f5f5f7',
  banner_color_fin: '#e8f0fd',
  disponible: true,
  disponibilidad_texto: 'Available for consulting · Remote / Hybrid',
  modalidades_trabajo: ['Freelance', 'Consulting', 'Open to full-time'],
  email_contacto: 'carlos.cervart@icloud.com',
  linkedin_url: 'https://linkedin.com/in/carlos-eduardo-cervantes-arteaga',
  github_url: 'https://github.com/CarlosCerv',
  twitter_url: 'https://x.com/CarlosCerv',
  cv_url: '/Carlos_Cervantes_CV.pdf',
  roles: [
    { label: 'Performance Engineering', color: '#0071e3' },
    { label: 'Mobile Automation', color: '#7c3aed' },
    { label: 'Quality Advocate', color: '#1d8348' },
  ],
  stats: [
    { numero: '10M+', label: 'Impacted users in production' },
    { numero: '10+', label: 'Delivered products and projects' },
    { numero: '200+', label: 'Automated E2E cases (web/iOS/Android)' },
    { numero: '3', label: 'CI/CD pipelines with integrated performance' },
    { numero: '6+', label: 'Years of experience' },
    { numero: '60%', label: 'Average reduction in regression time' },
  ],
  idiomas: [
    { nombre: 'Spanish', bandera: '🇲🇽', nivel: 'Native / Bilingual' },
    { nombre: 'English', bandera: '🇺🇸', nivel: 'Advanced Professional (B2-C1)' },
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
      institucion: 'University of Guadalajara (UdeG)',
      logo_url: '',
      carrera: 'B.S. in Computer Engineering',
      periodo_inicio: '2016',
      periodo_fin: '2020',
      descripcion: 'University Center of Exact Sciences and Engineering (CUCEI) · Activities: Software Development · Testing · Systems',
    },
    {
      institucion: 'University of Guadalajara (UdeG)',
      logo_url: '',
      carrera: 'Web Development Technician',
      periodo_inicio: '2012',
      periodo_fin: '2016',
      descripcion: 'General Baccalaureate by Competencies — High School 14',
    },
  ],
  experiencia: [
    {
      id: 'wizeline-performance',
      cargo: 'Senior Software Engineer — Performance Testing Engineer',
      empresa: 'Wizeline',
      logo_url: '',
      periodo_inicio: 'January 2025',
      periodo_fin: 'Present',
      tipo: 'Full-time',
      descripcion:
        'Design and execution of performance testing strategies to ensure scalability and reliability, with load, stress, and endurance testing integrated into CI/CD pipelines.',
      bullets: [
        'Reduced P99 latency to 94ms under 100K concurrent users',
        'Integrated JMeter in CI/CD pipelines for 3 enterprise products',
        'Identified and resolved critical bottlenecks before high-traffic events',
        'Designed performance strategy for an application with 10M+ active users',
      ],
      skills: ['JMeter', 'Performance Testing', 'k6', 'CI/CD', 'Scalability', 'AWS'],
    },
    {
      id: 'wizeline-mobile',
      cargo: 'QA Engineer III — Mobile Automation',
      empresa: 'Wizeline',
      logo_url: '',
      periodo_inicio: 'March 2024',
      periodo_fin: 'January 2025',
      tipo: 'Full-time',
      descripcion:
        'Led quality for iOS and Android mobile apps in the real estate sector with over 10M active users.',
      bullets: [
        '−60% in regression time through automation with XCUITest and Espresso',
        'QA sign-off for 4 releases of generative AI features on iOS',
        'Feature flags management for 5+ features in parallel with no user impact',
        'E2E suite with 200+ automated cases for iOS and Android',
      ],
      skills: ['Appium', 'XCUITest', 'Espresso', 'Feature Flags', 'iOS', 'Android', 'CI/CD'],
    },
    {
      id: 'wizeline-automation',
      cargo: 'QA Engineer — Automation',
      empresa: 'Wizeline',
      logo_url: '',
      periodo_inicio: 'August 2021',
      periodo_fin: 'March 2024',
      tipo: 'Full-time',
      descripcion:
        'Built automated suites for streaming SDKs, e-commerce platforms, and mobile apps.',
      bullets: [
        'Setup of automation infrastructure for 3 different products',
        'Integrated GitHub Actions with automatic Slack reporting',
        'Data validation with Firebase for e-commerce app (5M+ users)',
        'Managed Web, iOS, and Android suites in a single pipeline',
      ],
      skills: ['Cypress', 'Selenium', 'GitHub Actions', 'Firebase', 'JavaScript'],
    },
    {
      id: 'ibm-specialist',
      cargo: 'Software Testing Specialist',
      empresa: 'IBM',
      logo_url: '',
      periodo_inicio: 'July 2020',
      periodo_fin: 'August 2021',
      tipo: 'Full-time',
      descripcion:
        'Defined comprehensive test plans and automation frameworks for enterprise cloud ecosystems and Angular-based web products.',
      bullets: [
        'Complete architecture of the test plan for the ES&D project from scratch',
        'UI automation setup with Nightwatch and performance with k6',
        'API testing with Postman for 20+ enterprise service endpoints',
        'Test results integration with Slack Reporter',
      ],
      skills: ['Nightwatch', 'k6', 'Grafana', 'Angular', 'Postman', 'Agile'],
    },
    {
      id: 'ibm-intern',
      cargo: 'Test Automation Engineer — Intern',
      empresa: 'IBM',
      logo_url: '',
      periodo_inicio: 'August 2019',
      periodo_fin: 'July 2020',
      tipo: 'Internship',
      descripcion:
        'Built and maintained automation infrastructure, contributing to faster feedback cycles.',
      bullets: [
        'Developed automated test cases from technical specifications',
        'Integrated reports with Slack for team visibility',
        'First UI automation frameworks with Nightwatch',
      ],
      skills: ['Nightwatch', 'UI Automation', 'Slack', 'Agile'],
    },
  ],
  proyectos: [
    {
      nombre: 'Mobile Real Estate Platform',
      empresa_anonima: 'Real Estate Company (anonymous)',
      periodo: '2+ years',
      metricas: '10M+ users · 4.8★ on App Store · −60% regression time',
      descripcion:
        'Complete QA for iOS and Android. Implemented an E2E framework that reduced regression time by 60% and supported AI features.',
      stack: ['XCUITest', 'Espresso', 'Appium', 'GitHub Actions'],
      visible: true,
    },
    {
      nombre: 'E-commerce Platform',
      empresa_anonima: 'Retail Company (anonymous)',
      periodo: '1.5 years',
      metricas: '5M+ users · 99.9% uptime · full CI/CD pipeline',
      descripcion:
        'Mobile and web testing for a high-traffic platform. Automation integrated into CI/CD with full regression coverage.',
      stack: ['Cypress', 'Selenium', 'Firebase', 'GitHub Actions'],
      visible: true,
    },
    {
      nombre: 'Health Mobile App',
      empresa_anonima: 'Health Startup (anonymous)',
      periodo: '1 year',
      metricas: '500K+ users · HIPAA compliant · accessibility validated',
      descripcion:
        'Security, compliance, and accessibility QA for a health app in a regulated environment. First HIPAA-compliant app in the portfolio.',
      stack: ['Appium', 'XCUITest', 'Manual Testing', 'Postman'],
      visible: true,
    },
    {
      nombre: 'FinTech Mobile Banking',
      empresa_anonima: 'Financial Services (anonymous)',
      periodo: '6 months',
      metricas: '2M+ users · High security · Transactions validated',
      descripcion:
        'Rigorous testing for a mobile banking app focusing on security, performance, and financial transaction accuracy.',
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
