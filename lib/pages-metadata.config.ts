/**
 * Centralized metadata configuration for all pages
 */

export const pagesMetadata = {
  home: {
    title: 'Carlos Cervantes | QA y performance',
    description: 'Calidad de software con automatización, performance testing y estrategia QA. Experiencia aplicando calidad en productos que escalan y equipos de alto impacto.',
    keywords: ['QA', 'Automatización de pruebas', 'Performance testing', 'Consultoría QA', 'Calidad de software'],
    path: '/',
  },
  blog: {
    title: 'Blog | QA y performance',
    description: 'Artículos sobre automatización, estrategias de testing, performance y calidad de software. Ideas prácticas basadas en experiencia real.',
    keywords: ['Blog QA', 'Testing', 'Automatización', 'Performance', 'Calidad de software', 'E2E', 'Estrategia QA'],
    path: '/blog',
  },
  services: {
    title: 'Servicios | QA y performance',
    description: 'Servicios de automatización, performance testing y estrategia QA. Entregables claros, foco en riesgos y calidad sostenible.',
    keywords: ['Servicios QA', 'Automatización de pruebas', 'Performance testing', 'Consultoría QA', 'Pruebas de software'],
    path: '/servicios',
  },
  profile: {
    title: 'Perfil | Carlos Cervantes',
    description: 'Perfil profesional con experiencia, skills, certificaciones y proyectos en QA, automatización y performance.',
    keywords: ['Perfil QA', 'Experiencia profesional', 'Skills', 'Certificaciones'],
    path: '/profile',
  },
  contact: {
    title: 'Contacto | Hablemos',
    description: '¿Tienes un proyecto en mente o quieres hablar de QA y performance? Contáctame y lo revisamos.',
    keywords: ['Contacto', 'Consultoría QA', 'QA', 'Performance', 'Email'],
    path: '/contacto',
  },
  podcast: {
    title: 'Podcast | QA y performance',
    description: 'Conversaciones sobre automatización, performance testing y calidad de software.',
    keywords: ['Podcast', 'QA', 'Testing', 'Performance', 'Calidad de software'],
    path: '/podcast',
  },
  privacy: {
    title: 'Política de privacidad',
    description: 'Política de privacidad y protección de datos para carloscer.dev',
    keywords: ['Privacidad', 'Protección de datos', 'Seguridad'],
    path: '/politica-de-privacidad',
  },
} as const

export type PageMetadataKey = keyof typeof pagesMetadata

export function getPageMetadata(page: PageMetadataKey) {
  const data = pagesMetadata[page]
  return {
    ...data,
    keywords: [...data.keywords] // Convert to mutable array
  }
}
