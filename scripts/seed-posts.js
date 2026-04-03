#!/usr/bin/env node
/**
 * Seed script — Creates initial blog posts for the portfolio
 * Run: node scripts/seed-posts.js
 */

const mongoose = require('mongoose');
const Post = require('../models/Post');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-portfolio';

const posts = [
  {
    title: 'Por qué la automatización de pruebas no es solo escribir scripts',
    slug: 'automatizacion-pruebas-no-es-solo-scripts',
    author: 'Carlos Cervantes',
    date: new Date('2026-03-28'),
    tags: ['Automatización', 'Estrategia QA', 'CI/CD'],
    published: true,
    metaDescription: 'Automatizar pruebas va más allá de escribir código. Descubre cómo construir una estrategia de automatización sostenible y con impacto real.',
    content: `## El mito del "automatiza todo"

Muchos equipos caen en la trampa de querer automatizar el 100% de sus pruebas sin antes definir *qué* vale la pena automatizar. He visto proyectos con miles de tests E2E que tardan horas en ejecutarse, son frágiles y nadie confía en ellos.

La realidad es que la automatización efectiva empieza con **criterio**, no con código.

## La pirámide que funciona en la vida real

En los equipos donde he trabajado — desde e-commerce con millones de transacciones hasta apps móviles con +10M de usuarios — la estrategia que consistentemente funciona es:

1. **Unit tests** como base: rápidos, aislados, ejecutados en cada commit
2. **Integration/API tests** como columna: validan contratos entre servicios
3. **E2E tests selectivos**: solo flujos críticos de negocio (checkout, login, onboarding)

La clave no es la cantidad. Es la **calidad de la señal** que cada test te da.

## Lo que nadie te dice sobre mantener una suite

Automatizar es fácil. Mantener una suite estable durante meses es donde la mayoría falla. Algunas prácticas que he refinado:

- **Selectores resilientes**: data-testid > CSS selectors > xpath
- **Page Object Pattern**: encapsula la UI para que un cambio de diseño no rompa 50 tests
- **Retry inteligente**: no ocultes flakiness, arréglala
- **Reportes accionables**: que el equipo sepa *qué* falló y *por qué* en 10 segundos

## Mi stack actual

Para web uso **Playwright** como primera opción. Su velocidad, debugging con trace viewer y soporte para múltiples navegadores lo hacen imbatible en 2026.

Para mobile nativo trabajo con **Appium** y cuando el proyecto lo permite, **XCUITest** para iOS y **Espresso** para Android. La portabilidad de Appium tiene un costo en velocidad, pero gana en flexibilidad.

Todo esto integrado en **GitHub Actions** con quality gates que bloquean el merge si la suite falla.

## Conclusión

Antes de escribir tu primer test automatizado, pregúntate: ¿qué riesgo estoy mitigando? Si no puedes responder eso claramente, probablemente estás automatizando por inercia, no por estrategia.

> La mejor suite de tests no es la más grande. Es la que te da confianza para hacer deploy un viernes.`
  },
  {
    title: 'Performance Testing: lo que aprendí validando plataformas para Black Friday',
    slug: 'performance-testing-black-friday',
    author: 'Carlos Cervantes',
    date: new Date('2026-03-15'),
    tags: ['Performance', 'JMeter', 'Escalabilidad'],
    published: true,
    metaDescription: 'Lecciones reales de performance testing en plataformas e-commerce durante eventos de alto tráfico como Black Friday y Cyber Monday.',
    content: `## Cuando fallar no es una opción

Black Friday es el Super Bowl del e-commerce. Miles de usuarios concurrentes, carritos simultáneos, procesamiento de pagos en paralelo. Si tu plataforma falla durante esas 24 horas, pierdes más que dinero — pierdes confianza.

He tenido el privilegio (y la presión) de validar plataformas que manejan millones de transacciones durante estos eventos. Aquí comparto lo que realmente importa.

## No es solo simular usuarios

El error más común es crear un test de carga que solo mide "cuántos usuarios soportamos". El valor real está en entender el **comportamiento bajo presión**:

- ¿Cómo se degrada la latencia cuando pasamos de 1K a 50K concurrentes?
- ¿Dónde está el primer cuello de botella? ¿La API, la DB, el CDN?
- ¿El sistema se recupera automáticamente o necesita intervención manual?
- ¿Los timeouts están configurados correctamente?

## Mi stack de performance

- **JMeter** como motor principal de carga. Es battle-tested y su modelo de Thread Groups permite simular patrones de tráfico realistas
- **k6** para scripts programáticos cuando el equipo prefiere JavaScript
- **Grafana** para dashboards en tiempo real durante la ejecución
- **New Relic** o **Dynatrace** para correlacionar métricas de infraestructura

## Patrones de test que uso

### 1. Smoke Test
Carga mínima (5-10 usuarios) para validar que el script funciona. Nunca saltes este paso.

### 2. Load Test
Carga esperada durante el pico normal. Valida que los SLAs se cumplen.

### 3. Stress Test  
Incremento gradual más allá del pico esperado. Encuentra el punto de quiebre.

### 4. Endurance Test
Carga sostenida durante horas. Detecta memory leaks y degradación progresiva.

## La métrica que más importa

Todos hablan de throughput y latencia promedio. Pero en mi experiencia, el **percentil 99 (P99)** es lo que separa una buena experiencia de una mala. Si tu P99 es 3 segundos, significa que 1 de cada 100 usuarios espera más de 3 segundos. En Black Friday, eso son miles de personas frustradas.

## Conclusión

Performance testing no es un checkbox antes del release. Es una disciplina continua que necesita datos reales, patrones de uso actualizados y un equipo que entienda que la velocidad **es** una feature del producto.`
  },
  {
    title: 'Cómo la IA está transformando el testing (sin reemplazar al QA)',
    slug: 'ia-transformando-testing-sin-reemplazar-qa',
    author: 'Carlos Cervantes',
    date: new Date('2026-03-05'),
    tags: ['IA', 'Futuro del QA', 'Automatización'],
    published: true,
    metaDescription: 'La inteligencia artificial está cambiando cómo probamos software, pero el criterio humano sigue siendo insustituible. Mi perspectiva como QA Engineer.',
    content: `## La narrativa simplista

"La IA va a reemplazar a los testers." He escuchado esta frase en conferencias, meetups y LinkedIn durante los últimos dos años. Y cada vez que la escucho, pienso en lo mismo: las personas que dicen eso nunca han tenido que validar un flujo de pago en producción con deadline de mañana.

## Lo que la IA sí hace muy bien

Después de integrar herramientas de IA en mi flujo de trabajo, puedo decir con confianza que la IA es excelente para:

- **Generar casos de prueba iniciales** a partir de requerimientos. No reemplaza el análisis de riesgo, pero acelera el primer borrador
- **Crear datos de prueba** variados y realistas en segundos
- **Sugerir selectores** cuando estás automatizando una UI compleja
- **Analizar logs de error** y encontrar patrones que a simple vista no ves
- **Escribir documentación** de tests existentes

## Lo que la IA no puede hacer (todavía)

- **Entender el contexto de negocio**: saber que un error en el cálculo de impuestos en México tiene implicaciones legales requiere conocimiento de dominio
- **Priorizar riesgos**: decidir qué es P1 vs P3 necesita entender el impacto real en el usuario
- **Diseñar estrategia**: elegir entre Playwright y Cypress, entre API testing y E2E, requiere experiencia con trade-offs reales
- **Dar QA sign-off**: la decisión final de "esto está listo para producción" sigue siendo una responsabilidad humana

## Mi flujo actual con IA

1. Recibo el PRD o la historia de usuario
2. Le pido a la IA un primer borrador de escenarios de prueba
3. Filtro, priorizo y agrego edge cases basados en mi experiencia
4. Uso IA para generar el esqueleto de los tests automatizados
5. Reviso, ajusto selectores y agrego aserciones de negocio
6. Ejecuto en CI y analizo resultados (aquí la IA me ayuda con logs)

El resultado: hago en 2 horas lo que antes me tomaba un día. Pero la **calidad de las decisiones** sigue dependiendo de mi criterio.

## Mi predicción para 2027

El QA que sepa usar IA como herramienta será 3x más productivo. El QA que ignore la IA se volverá lento en comparación. Pero el QA que piense que la IA puede hacer su trabajo completo… va a descubrir la diferencia entre generar tests y garantizar calidad.

> La IA es el mejor copiloto que he tenido. Pero el piloto sigo siendo yo.`
  },
  {
    title: 'Mobile Testing: lecciones de 10 millones de usuarios activos',
    slug: 'mobile-testing-10-millones-usuarios',
    author: 'Carlos Cervantes',
    date: new Date('2026-02-20'),
    tags: ['Mobile', 'Appium', 'iOS', 'Android'],
    published: true,
    metaDescription: 'Lecciones prácticas de QA móvil trabajando con apps nativas de iOS y Android con más de 10 millones de usuarios activos.',
    content: `## Cuando cada crash importa

Trabajar con una app que usan 10 millones de personas cambia tu perspectiva sobre el testing. Un bug que afecta al 0.1% de usuarios son 10,000 personas. Un crash rate de 0.5% genera miles de reseñas negativas en la App Store.

En mi experiencia como QA Engineer III en proyectos de real estate mobile, aprendí que el mobile testing tiene reglas propias.

## Las diferencias con testing web

- **Fragmentación de dispositivos**: en Android, tu app corre en miles de combinaciones de hardware, OS y skin del fabricante
- **Conectividad variable**: simulé edge cases de red (3G, offline, cambio WiFi→cellular) que expusieron bugs que nunca aparecen en desktop
- **Permisos del OS**: iOS y Android manejan permisos de forma diferente y las reglas cambian con cada versión del OS
- **Lifecycle de la app**: background, foreground, killed, multitasking — cada estado puede causar bugs únicos

## Feature Flags: la clave para releases seguros

Una de las prácticas que más impacto tuvo fue implementar **Feature Flags** en el ciclo de QA:

- Habilitamos features gradualmente al 5%, 25%, 50%, 100% de usuarios
- Si algo falla, desactivamos el flag sin necesitar un hotfix
- QA valida con el flag encendido y apagado
- Product puede hacer A/B testing con métricas reales

Resultado: reducimos el tiempo de regresión en un **60%** porque ya no necesitábamos hacer regression completa en cada release.

## Mi stack para mobile

- **Appium** como framework cross-platform para cuando necesitas una suite unificada iOS + Android
- **XCUITest** para tests nativos de iOS que necesitan velocidad
- **Espresso** para tests nativos de Android integrados en el build
- **SauceLabs** y **BrowserStack** como device farms en la nube
- **Firebase Test Lab** para matrix testing en Android

## El golden path approach

En lugar de intentar probar todo, identifiqué los **5 flujos más críticos** de la app (los que generan revenue) y los protegí con:

1. Tests automatizados E2E en cada PR
2. Tests de smoke en cada build
3. Tests de regresión completa antes de cada release
4. Monitoreo de crash rate post-release

Los demás flujos se cubren con exploratory testing + Risk-Based Testing.

## Conclusión

Mobile testing no es web testing en pantalla pequeña. Es una disciplina distinta que requiere entender hardware, OS, conectividad y comportamiento del usuario en movimiento. El QA que domina mobile tiene una ventaja competitiva enorme en 2026.`
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    for (const post of posts) {
      const exists = await Post.findOne({ slug: post.slug });
      if (exists) {
        console.log(`   ⏭  "${post.title}" ya existe, saltando...`);
        continue;
      }
      await Post.create(post);
      console.log(`   ✓  Creado: "${post.title}"`);
    }

    console.log('\n✅ Seed completado');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
