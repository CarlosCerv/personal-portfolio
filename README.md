# Quality & Performance — Premium Portfolio

[![Platform](https://img.shields.io/badge/Platform-Node.js-black?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-black?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Design](https://img.shields.io/badge/Design-Apple--Inspired-black?style=flat-square&logo=apple)](https://www.apple.com/design/)
[![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)

A high-end, professional portfolio platform designed for **Quality Assurance Specialists** and **Performance Engineers**. Optimized for visual impact, high-scale recruitment, and international brand presence.

**[Live Platform](https://carloscervantes.qa)** | **[Documentation](docs/)**

---

##  The Design Philosophy

Built with a strict **Apple-inspired Monochrome Aesthetic**, the platform prioritizes clarity, precision, and visual hierarchy.

- **Monochrome Slate Palette**: A sophisticated grayscale design system that eliminates distractions.
- **Apple Typography**: Leveraging the system font stack (SF Pro, Inter, SF Mono) for a native, premium feel.
- **Bento-Grid Architecture**: A unified content system for Projects, Podcast, Hobbies, and Blog cards.
- **Glassmorphism**: Elegant mobile navigation with staggered animations and blurred backdrops.

---

## 🔘 Key Features

### International Identity
- **Full English Localization**: Every user-facing and administrative label is in English.
- **Global Branding**: Standardized under the **"Quality & Performance"** identity.
- **Professional Metadata**: SEO-optimized descriptions and Open Graph integration.

### Content Infrastructure
- **Unified Card System**: Consistent design tokens across all content types.
- **Markdown Blog Engine**: Flexible, high-performance publishing.
- **Dynamic GitHub Sync**: Projects are automatically fetched and displayed via GitHub API.
- **Admin Dashboard**: A secure, monochrome-styled backend for content management.

### Technical Excellence
- **Zero Framework Bloat**: Pure Vanilla JS and CSS variables for maximum performance.
- **Security First**: Session-only cookies, No-Cache headers, and NoSQL injection protection.
- **Responsive**: Pixel-perfect layout from UltraWide desktops to mobile devices.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (Atlas or local)

### Installation
```bash
git clone https://github.com/CarlosCerv/personal-portfolio.git
cd personal-portfolio
npm install
cp .env.example .env
# Configure MONGODB_URI and ADMIN_PASSWORD in .env
npm run dev
```

---

## 📂 Project Navigation

- **[docs/BRAND_GUIDE.md](docs/BRAND_GUIDE.md)**: Visual tokens, colors, and typography.
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**: Vercel & MongoDB Atlas setup.
- **[docs/CONTENT_UPDATE_GUIDE.md](docs/CONTENT_UPDATE_GUIDE.md)**: How to update profile and blog.
- **[docs/MANUAL_DEPLOY_INSTRUCTIONS.md](docs/MANUAL_DEPLOY_INSTRUCTIONS.md)**: Advanced deployment scenarios.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Node.js, Express, Mongoose |
| **Frontend** | EJS Templates, Vanilla CSS, JS |
| **Database** | MongoDB (Cloud Atlas) |
| **Styling** | Custom CSS Variable System |
| **Icons** | Font Awesome (Monochrome) |
| **Deployment**| Vercel (Production) |

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed by [Carlos Cervantes](https://linkedin.com/in/carloscerteaga)**  
*Quality & Performance Engineering Strategy*
