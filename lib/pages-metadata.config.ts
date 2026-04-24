/**
 * Centralized metadata configuration for all pages
 */

export const pagesMetadata = {
  home: {
    title: 'Carlos Cervantes | QA & Performance',
    description: 'Software quality with automation, performance testing, and QA strategy. Experience applying quality in scaling products and high-impact teams.',
    keywords: ['QA', 'Test Automation', 'Performance testing', 'QA Consulting', 'Software Quality'],
    path: '/',
  },
  blog: {
    title: 'Blog | QA & Performance',
    description: 'Articles about automation, testing strategies, performance, and software quality. Practical ideas based on real experience.',
    keywords: ['QA Blog', 'Testing', 'Automation', 'Performance', 'Software Quality', 'E2E', 'QA Strategy'],
    path: '/blog',
  },
  services: {
    title: 'Services | QA & Performance',
    description: 'Automation services, performance testing, and QA strategy. Clear deliverables, focus on risks and sustainable quality.',
    keywords: ['QA Services', 'Test Automation', 'Performance testing', 'QA Consulting', 'Software Testing'],
    path: '/servicios',
  },
  profile: {
    title: 'Profile | Carlos Cervantes',
    description: 'Professional profile with experience, skills, certifications, and projects in QA, automation, and performance.',
    keywords: ['QA Profile', 'Professional Experience', 'Skills', 'Certifications'],
    path: '/profile',
  },
  contact: {
    title: 'Contact | Let\'s talk',
    description: 'Do you have a project in mind or want to talk about QA and performance? Contact me and we\'ll review it.',
    keywords: ['Contact', 'QA Consulting', 'QA', 'Performance', 'Email'],
    path: '/contacto',
  },
  podcast: {
    title: 'Podcast | QA & Performance',
    description: 'Conversations about automation, performance testing, and software quality.',
    keywords: ['Podcast', 'QA', 'Testing', 'Performance', 'Software Quality'],
    path: '/podcast',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'Privacy policy and data protection for carloscer.dev',
    keywords: ['Privacy', 'Data Protection', 'Security'],
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
