#!/usr/bin/env node

/**
 * Generate OG Image with new logo
 * Requires: npm install canvas
 */

const fs = require('fs');
const path = require('path');

// Simple SVG to create OG image
const ogImageSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Gradient backgrounds -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Decorative circles -->
  <circle cx="1100" cy="100" r="150" fill="url(#accentGradient)" opacity="0.1"/>
  <circle cx="100" cy="550" r="120" fill="url(#accentGradient)" opacity="0.08"/>
  
  <!-- Logo area -->
  <g transform="translate(100, 80)">
    <!-- Logo shape: Modern C -->
    <path d="M 40 20 Q 60 20 70 35 Q 75 45 75 60 Q 75 75 70 85 Q 60 100 40 100 Q 25 100 15 90 L 25 80 Q 32 85 40 85 Q 58 85 60 60 Q 58 35 40 35 Q 25 35 20 50 L 10 50 Q 15 20 40 20 Z" 
          fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Accent lines -->
    <line x1="30" y1="15" x2="50" y2="15" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>
    <line x1="30" y1="105" x2="50" y2="105" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>
  </g>
  
  <!-- Main content -->
  <text x="280" y="120" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#ffffff">
    Carlos Cervantes
  </text>
  
  <text x="280" y="180" font-family="Arial, sans-serif" font-size="48" fill="#3b82f6">
    QA & Performance Engineer
  </text>
  
  <rect x="280" y="210" width="200" height="4" fill="#3b82f6" rx="2"/>
  
  <text x="280" y="280" font-family="Arial, sans-serif" font-size="28" fill="#cbd5e1">
    Especialista en Automation & Testing
  </text>
  
  <text x="280" y="330" font-family="Arial, sans-serif" font-size="24" fill="#94a3b8">
    Construir software que escala con calidad y confianza
  </text>
  
  <!-- Skills chips -->
  <g>
    <!-- Chip 1: Automation -->
    <rect x="280" y="380" width="180" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2"/>
    <text x="370" y="415" font-family="Arial, sans-serif" font-size="18" fill="#3b82f6" text-anchor="middle" font-weight="500">
      QA Automation
    </text>
    
    <!-- Chip 2: Performance -->
    <rect x="480" y="380" width="180" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2"/>
    <text x="570" y="415" font-family="Arial, sans-serif" font-size="18" fill="#3b82f6" text-anchor="middle" font-weight="500">
      Performance
    </text>
    
    <!-- Chip 3: Testing -->
    <rect x="680" y="380" width="180" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2"/>
    <text x="770" y="415" font-family="Arial, sans-serif" font-size="18" fill="#3b82f6" text-anchor="middle" font-weight="500">
      Testing Strategy
    </text>
  </g>
  
  <!-- URL footer -->
  <text x="1100" y="600" font-family="Arial, sans-serif" font-size="18" fill="#94a3b8" text-anchor="end">
    carloscer.dev
  </text>
</svg>`;

// Write SVG file
const outputPath = path.join(__dirname, 'public/og-image.svg');
fs.writeFileSync(outputPath, ogImageSVG);
console.log('✅ OG image SVG created:', outputPath);

// Also create a version for PNG (note: in production, Vercel will convert SVG to PNG automatically)
console.log('📝 OG image SVG ready at: /public/og-image.svg');
console.log('💡 Note: Next.js will serve .svg files in image tags. For PNG format, use vercel/og package or upload PNG manually.');
