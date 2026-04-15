# Design System

Este proyecto usa un sistema visual único alineado al rediseño premium actual del sitio público.

## Principios

- Fondo base blanco con alternancia sutil en `#FAFAFA` y `#F5F5F7`
- Mucho espacio vertical para respiración visual
- Jerarquía editorial con títulos grandes y copy más ligero
- Cards premium con borde suave, superficies claras y elevación contenida
- Motion discreto y accesible

## Tokens principales

La fuente de verdad visual vive en [app/globals.css](/Users/carloseduardo/Documents/GitHub/personal-portfolio/app/globals.css).

### Color

- `--background`: blanco base
- `--background-alt`: gris ultra claro
- `--background-soft`: superficie secundaria
- `--foreground`: tinta principal
- `--text-secondary`: copy secundaria
- `--accent-blue`: color de acento principal

### Tipografía

- Stack base: `SF Pro / Inter / system sans`
- `h1`: escala hero dominante
- `h2`: títulos editoriales de sección
- `p`: cuerpo con line-height amplio para lectura

### Espaciado

- Ritmo de sección amplio
- Componentes principales con `p-6` a `p-10`
- Radios entre `16px` y `32px`

### Elevación

- `--shadow-sm` para cards suaves
- `--shadow-md` para bloques destacados
- `--shadow-xl` solo para hero o shells premium

## Componentes clave

- [components/Header.tsx](/Users/carloseduardo/Documents/GitHub/personal-portfolio/components/Header.tsx)
- [components/Footer.tsx](/Users/carloseduardo/Documents/GitHub/personal-portfolio/components/Footer.tsx)
- [components/sections/HeroSection.tsx](/Users/carloseduardo/Documents/GitHub/personal-portfolio/components/sections/HeroSection.tsx)
- [components/sections/SectionHeader.tsx](/Users/carloseduardo/Documents/GitHub/personal-portfolio/components/sections/SectionHeader.tsx)
- [components/sections/ProcessStep.tsx](/Users/carloseduardo/Documents/GitHub/personal-portfolio/components/sections/ProcessStep.tsx)
- [components/sections/FeatureCard.tsx](/Users/carloseduardo/Documents/GitHub/personal-portfolio/components/sections/FeatureCard.tsx)

## Reglas de implementación

- No cambiar copy sin una petición explícita.
- Mantener el sitio en modo claro y accesible.
- Reusar primero tokens y primitivas existentes antes de crear estilos nuevos.
- Mantener estados `hover`, `focus-visible` y `prefers-reduced-motion`.
- Evitar patrones visuales genéricos o gradients agresivos.
