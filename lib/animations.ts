// Centralized Framer Motion Animation Variants
// Reusable across entire app

export const animations = {
  // Fade In + Up Animations
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  },

  fadeInUpStagger: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  },

  fadeInUpReduced: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.3 }
  },

  // Stagger Container
  stagger: {
    whileInView: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  },

  // Scale In
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  },

  // Slide In from Left
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  },

  // Slide In from Right
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  },

  // Rotation
  rotateIn: {
    initial: { opacity: 0, rotate: -10 },
    whileInView: { opacity: 1, rotate: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }
}

// Hover/Tap animations for interactive elements
export const hoverTap = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 }
}

// Progress bar animation
export const progressBar = {
  initial: { width: 0 },
  whileInView: { width: '94%' },
  transition: { duration: 1.5, ease: "easeOut" }
}

// Get animation variant based on reduced motion preference
export const getAnimationVariant = (shouldReduce: boolean, standard: any, reduced: any = animations.fadeInUpReduced) => {
  return shouldReduce ? reduced : standard
}
