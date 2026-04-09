export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Carlos Cervantes Logo"
    >
      {/* Background circle */}
      <circle cx="24" cy="24" r="24" className="fill-primary" />
      
      {/* C letter - minimalist design */}
      <g className="fill-white">
        {/* Top horizontal line */}
        <rect x="14" y="14" width="12" height="3" rx="1.5" />
        
        {/* Left vertical line */}
        <rect x="14" y="14" width="3" height="20" rx="1.5" />
        
        {/* Bottom horizontal line */}
        <rect x="14" y="31" width="12" height="3" rx="1.5" />
        
        {/* Right quarter circle gap - creating C effect */}
        <path
          d="M 26 17 Q 30 20 30 24 Q 30 28 26 31"
          stroke="currentColor"
          strokeWidth="0"
          fill="none"
        />
        
        {/* Inner dot accent - for modern look */}
        <circle cx="24" cy="24" r="1.5" />
      </g>
      
      {/* Modern accent line */}
      <line
        x1="32"
        y1="22"
        x2="36"
        y2="20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <line
        x1="32"
        y1="26"
        x2="36"
        y2="28"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
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
      {/* Simple C in modern sans-serif style */}
      <circle cx="20" cy="20" r="20" className="fill-primary" />
      <text
        x="20"
        y="26"
        fontSize="20"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        className="select-none"
      >
        C
      </text>
    </svg>
  )
}
