ALTER TABLE site_profile
  ADD COLUMN IF NOT EXISTS nombre_mostrado text,
  ADD COLUMN IF NOT EXISTS nombre_completo text,
  ADD COLUMN IF NOT EXISTS headline text,
  ADD COLUMN IF NOT EXISTS empresa_actual text,
  ADD COLUMN IF NOT EXISTS banner_url text,
  ADD COLUMN IF NOT EXISTS banner_tipo text DEFAULT 'gradiente',
  ADD COLUMN IF NOT EXISTS banner_color_inicio text DEFAULT '#f5f5f7',
  ADD COLUMN IF NOT EXISTS banner_color_fin text DEFAULT '#e8f0fd',
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS github_url text,
  ADD COLUMN IF NOT EXISTS twitter_url text,
  ADD COLUMN IF NOT EXISTS cv_url text DEFAULT '/Carlos_Cervantes_CV.pdf',
  ADD COLUMN IF NOT EXISTS email_contacto text,
  ADD COLUMN IF NOT EXISTS disponibilidad_texto text,
  ADD COLUMN IF NOT EXISTS modalidades_trabajo text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS stats jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS idiomas jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS educacion jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS proyectos jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS recomendaciones jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS mostrar_publicaciones boolean DEFAULT true;

INSERT INTO site_profile (
  nombre,
  nombre_mostrado,
  nombre_completo,
  titulo,
  headline,
  empresa,
  empresa_actual,
  ubicacion,
  bio_1,
  bio_2,
  bio_3,
  foto_url,
  disponible,
  disponibilidad_texto,
  modalidades_trabajo,
  email_contacto,
  linkedin_url,
  github_url,
  twitter_url,
  cv_url,
  roles,
  stats,
  idiomas,
  skills,
  educacion,
  experiencia,
  proyectos,
  certificaciones,
  recomendaciones,
  mostrar_publicaciones
) VALUES (
  'Carlos Cervantes',
  'Carlos Cervantes',
  'Carlos Eduardo Cervantes Arteaga',
  'Senior Software Engineer · Performance Test Engineer',
  'Senior Software Engineer · Performance Test Engineer en Wizeline',
  'Wizeline',
  'Wizeline',
  'Guadalajara, Jalisco, México',
  'Llevo más de 6 años construyendo calidad dentro de equipos de producto que no pueden permitirse fallar. Me especializo en performance testing, automatización E2E y estrategia QA para aplicaciones que escalan a millones de usuarios.',
  'Mi enfoque combina criterio técnico profundo con claridad de negocio: no solo encuentro bugs, sino que diseño sistemas que evitan que aparezcan. Trabajo con equipos en LATAM y Norteamérica para lanzar software más confiable.',
  'Actualmente trabajo como consultor independiente de QA & Performance, ayudando a startups y empresas de crecimiento rápido a implementar estrategias de calidad sostenibles. Si tu equipo lanza software con miedo, conversemos.',
  '/images/profile.jpg',
  true,
  'Disponible para consultoría · Remoto / Híbrido',
  ARRAY['Freelance','Consulting','Open to full-time'],
  'carlos.cervart@icloud.com',
  'https://linkedin.com/in/carlos-eduardo-cervantes-arteaga',
  'https://github.com/CarlosCerv',
  'https://x.com/CarlosCerv',
  '/Carlos_Cervantes_CV.pdf',
  '[
    {"label":"Performance Engineer","color":"#0071e3"},
    {"label":"Mobile Automation","color":"#7c3aed"},
    {"label":"Quality Advocate","color":"#1d8348"}
  ]'::jsonb,
  '[
    {"numero":"50M+","label":"Usuarios impactados en producción"},
    {"numero":"100+","label":"Proyectos entregados"},
    {"numero":"5,000+","label":"Bugs encontrados y resueltos"},
    {"numero":"10,000+","label":"Test cases creados"},
    {"numero":"6+","label":"Años de experiencia"},
    {"numero":"60%","label":"Reducción promedio en tiempo de regresión"}
  ]'::jsonb,
  '[
    {"nombre":"Español","bandera":"🇲🇽","nivel":"Nativo / Bilingüe"},
    {"nombre":"Inglés","bandera":"🇺🇸","nivel":"Profesional avanzado (B2-C1)"}
  ]'::jsonb,
  '{
    "Mobile":["Appium","XCUITest","Espresso"],
    "Web":["Playwright","Cypress","Selenium","Nightwatch"],
    "Performance":["JMeter","k6","GitHub Actions","Jenkins","Grafana"],
    "Cloud":["SauceLabs","BrowserStack","Firebase","AWS"],
    "Project Management":["Jira","TestRail","XRay","Agile"]
  }'::jsonb,
  '[
    {
      "institucion":"Universidad de Guadalajara (UdeG)",
      "logo_url":"",
      "carrera":"Licenciatura en Ingeniería en Informática",
      "periodo_inicio":"2016",
      "periodo_fin":"2020",
      "descripcion":"Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI) · Actividades: Desarrollo de software · Testing · Sistemas"
    },
    {
      "institucion":"Universidad de Guadalajara (UdeG)",
      "logo_url":"",
      "carrera":"Técnico en Desarrollo Web",
      "periodo_inicio":"2012",
      "periodo_fin":"2016",
      "descripcion":"Bachillerato General por Competencias — Preparatoria 14"
    }
  ]'::jsonb,
  '[
    {
      "id":"wizeline-performance",
      "cargo":"Senior Software Engineer — Performance Test Engineer",
      "empresa":"Wizeline",
      "logo_url":"",
      "periodo_inicio":"Enero 2025",
      "periodo_fin":"Presente",
      "tipo":"Tiempo completo",
      "descripcion":"Diseño y ejecución de estrategias de performance testing para garantizar escalabilidad y confiabilidad, con pruebas de carga, estrés y endurance integradas en pipelines CI/CD.",
      "bullets":[
        "Reducción de latencia P99 a 94ms bajo 100K usuarios concurrentes",
        "Integración de JMeter en pipelines CI/CD de 3 productos enterprise",
        "Identificación y resolución de bottlenecks críticos antes de eventos de alto tráfico",
        "Diseño de estrategia de performance para aplicación con 10M+ usuarios activos"
      ],
      "skills":["JMeter","Performance Testing","k6","CI/CD","Scalability","AWS"]
    },
    {
      "id":"wizeline-mobile",
      "cargo":"Software QA Engineer III — Mobile Automation",
      "empresa":"Wizeline",
      "logo_url":"",
      "periodo_inicio":"Marzo 2024",
      "periodo_fin":"Enero 2025",
      "tipo":"Tiempo completo",
      "descripcion":"Lideré la calidad para aplicaciones móviles iOS y Android del sector real estate con más de 10M usuarios activos.",
      "bullets":[
        "−60% en tiempo de regresión mediante automatización con XCUITest y Espresso",
        "QA sign-off para 4 releases de features con IA generativa en iOS",
        "Gestión de feature flags para 5+ features en paralelo sin impacto a usuarios",
        "Suite E2E de 200+ casos automatizados para iOS y Android"
      ],
      "skills":["Appium","XCUITest","Espresso","Feature Flags","iOS","Android","CI/CD"]
    },
    {
      "id":"wizeline-automation",
      "cargo":"Software QA Engineer — Automation Engineer",
      "empresa":"Wizeline",
      "logo_url":"",
      "periodo_inicio":"Agosto 2021",
      "periodo_fin":"Marzo 2024",
      "tipo":"Tiempo completo",
      "descripcion":"Construcción de suites automatizadas para SDKs de streaming, plataformas e-commerce y apps móviles.",
      "bullets":[
        "Setup de infraestructura de automatización para 3 productos distintos",
        "Integración de GitHub Actions con reportes automáticos a Slack",
        "Validación de datos con Firebase para app de e-commerce (5M+ usuarios)",
        "Gestión de suites Web, iOS y Android en un solo pipeline"
      ],
      "skills":["Cypress","Selenium","GitHub Actions","Firebase","JavaScript"]
    },
    {
      "id":"ibm-specialist",
      "cargo":"Software Test Specialist",
      "empresa":"IBM",
      "logo_url":"",
      "periodo_inicio":"Julio 2020",
      "periodo_fin":"Agosto 2021",
      "tipo":"Tiempo completo",
      "descripcion":"Definí planes de prueba completos y frameworks de automatización para ecosistemas cloud empresariales y productos web basados en Angular.",
      "bullets":[
        "Arquitectura completa del plan de pruebas para proyecto ES&D desde cero",
        "Setup de automatización UI con Nightwatch y performance con k6",
        "API testing con Postman para 20+ endpoints de servicios empresariales",
        "Integración de resultados de pruebas con Slack Reporter"
      ],
      "skills":["Nightwatch","k6","Grafana","Angular","Postman","Agile"]
    },
    {
      "id":"ibm-intern",
      "cargo":"Test Automation Engineer — Intern",
      "empresa":"IBM",
      "logo_url":"",
      "periodo_inicio":"Agosto 2019",
      "periodo_fin":"Julio 2020",
      "tipo":"Prácticas profesionales",
      "descripcion":"Construcción y mantenimiento de infraestructura de automatización, contribuyendo a ciclos de feedback más rápidos.",
      "bullets":[
        "Desarrollo de casos de prueba automatizados desde especificaciones técnicas",
        "Integración de reportes con Slack para visibilidad del equipo",
        "Primeros frameworks de automatización UI con Nightwatch"
      ],
      "skills":["Nightwatch","UI Automation","Slack","Agile"]
    }
  ]'::jsonb,
  '[
    {
      "nombre":"Real Estate Mobile Platform",
      "empresa_anonima":"Major Real Estate Company",
      "periodo":"2+ años",
      "metricas":"10M+ usuarios · 4.8★ en App Store · −60% tiempo regresión",
      "descripcion":"QA completo para iOS y Android. Implementación de framework E2E que redujo el tiempo de regresión un 60% y soportó features de IA.",
      "stack":["XCUITest","Espresso","Appium","GitHub Actions"],
      "visible":true
    },
    {
      "nombre":"E-Commerce Platform",
      "empresa_anonima":"Retail Technology Company",
      "periodo":"1.5 años",
      "metricas":"5M+ usuarios · 99.9% uptime · pipeline CI/CD completo",
      "descripcion":"Testing mobile y web para plataforma de alto tráfico. Automatización integrada en CI/CD con cobertura de regresión completa.",
      "stack":["Cypress","Selenium","Firebase","GitHub Actions"],
      "visible":true
    },
    {
      "nombre":"Healthcare Mobile App",
      "empresa_anonima":"Health Technology Startup",
      "periodo":"1 año",
      "metricas":"500K+ usuarios · HIPAA compliant · accesibilidad validada",
      "descripcion":"QA de seguridad, compliance y accesibilidad para app de salud en entorno regulado. Primera app HIPAA-compliant del portafolio.",
      "stack":["Appium","XCUITest","Manual Testing","Postman"],
      "visible":true
    },
    {
      "nombre":"FinTech Mobile Banking",
      "empresa_anonima":"Financial Services Company",
      "periodo":"6 meses",
      "metricas":"2M+ usuarios · Alta seguridad · Transacciones validadas",
      "descripcion":"Testing riguroso para app de banca móvil con foco en seguridad, performance y precisión de transacciones financieras.",
      "stack":["Appium","JMeter","Postman","Security Testing"],
      "visible":true
    }
  ]'::jsonb,
  '[
    {"nombre":"ISTQB Foundation Level","institucion":"International Software Testing Qualifications Board","anio":"2021","url_verificacion":"","credential_id":"","logo_url":""},
    {"nombre":"Test Automation University — Appium & Selenium","institucion":"Sauce Labs / TAU","anio":"2022","url_verificacion":"https://testautomationu.applitools.com","credential_id":"","logo_url":""},
    {"nombre":"Agile Testing Certification","institucion":"ICAgile","anio":"2022","url_verificacion":"https://www.icagile.com","credential_id":"","logo_url":""}
  ]'::jsonb,
  '[]'::jsonb,
  true
)
ON CONFLICT DO NOTHING;
