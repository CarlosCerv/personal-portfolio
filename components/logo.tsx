export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Carlos Cervantes - QA Engineer"
    >
      <defs>
        <linearGradient id="gradientCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0891B2', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="gradientIndigo" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Outer circle - Gradient border effect */}
      <circle cx="24" cy="24" r="23" stroke="url(#gradientCyan)" strokeWidth="1.5" opacity="0.6" />

      {/* Inner dark background */}
      <circle cx="24" cy="24" r="21" className="fill-background" />

      {/* Gradient circle accent */}
      <circle cx="24" cy="24" r="20" fill="url(#gradientCyan)" opacity="0.1" />

      {/* CC Text - Modern, bold */}
      <text
        x="24"
        y="20"
        fontSize="10"
        fontWeight="900"
        fill="white"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, Inter, sans-serif"
        className="select-none"
        letterSpacing="-0.5"
      >
        CC
      </text>

      {/* Accent dots - Cyan & Indigo */}
      <circle cx="32" cy="16" r="2.5" fill="url(#gradientCyan)" />
      <circle cx="16" cy="32" r="2" fill="url(#gradientIndigo)" opacity="0.8" />

      {/* Subtle line accent */}
      <line
        x1="20"
        y1="28"
        x2="28"
        y2="30"
        stroke="url(#gradientCyan)"
        strokeWidth="1"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function LogoMinimal({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="gradMinimal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#06B6D4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Border */}
      <circle cx="20" cy="20" r="19.5" stroke="url(#gradMinimal)" strokeWidth="1" opacity="0.5" />

      {/* Background */}
      <circle cx="20" cy="20" r="19" className="fill-background" />

      {/* CC Text */}
      <text
        x="20"
        y="18"
        fontSize="10"
        fontWeight="900"
        fill="white"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, Inter, sans-serif"
        className="select-none"
        letterSpacing="-0.5"
      >
        CC
      </text>
    </svg>
  )
}
