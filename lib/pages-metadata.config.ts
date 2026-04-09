/**
 * Centralized metadata configuration for all pages
 */

export const pagesMetadata = {
  home: {
    title: 'Carlos Cervantes | QA Engineer & Performance Specialist',
    description: 'Transforming quality assurance through automation and performance engineering. 10+ years of expertise in test automation, performance optimization, and scaling software systems.',
    keywords: ['QA Engineer', 'Test Automation', 'Performance Testing', 'QA Consultant', 'Software Quality'],
    path: '/',
  },
  blog: {
    title: 'Blog | QA Testing & Performance Insights',
    description: 'Deep dives into QA automation, performance engineering, testing strategies, and software quality. Learn best practices from real-world experience.',
    keywords: ['QA Blog', 'Testing', 'Automation', 'Performance', 'Quality Assurance', 'Test Automation', 'Engineering'],
    path: '/blog',
  },
  services: {
    title: 'QA & Performance Services | Expert Consulting',
    description: 'Professional QA automation, performance testing, and quality assurance consulting. Custom solutions for enterprise-level challenges.',
    keywords: ['QA Services', 'Test Automation Services', 'Performance Testing', 'QA Consulting', 'Software Testing'],
    path: '/servicios',
  },
  profile: {
    title: 'Profile | Carlos Cervantes',
    description: 'Full profile with experience, skills, certifications, and professional journey in QA Engineering and Performance Optimization.',
    keywords: ['QA Engineer Profile', 'Professional Experience', 'Skills', 'Certifications'],
    path: '/profile',
  },
  contact: {
    title: 'Contact | Get in Touch',
    description: 'Have a project in mind or want to discuss QA automation and performance? Get in touch with Carlos Cervantes.',
    keywords: ['Contact', 'QA Consulting', 'Get in Touch', 'Email'],
    path: '/contacto',
  },
  podcast: {
    title: 'Podcast | QA Engineering Conversations',
    description: 'Discussions about QA automation, performance testing, and software quality with industry experts.',
    keywords: ['Podcast', 'QA', 'Testing', 'Performance', 'Software Engineering'],
    path: '/podcast',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'Privacy policy and data protection information for carloscer.dev',
    keywords: ['Privacy', 'Data Protection', 'GDPR'],
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
