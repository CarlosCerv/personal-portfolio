# 🚀 Personal Portfolio Website Template

A modern, professional portfolio website template perfect for developers, QA engineers, and tech professionals. Built with Node.js, Express, MongoDB, and EJS, featuring a blog system, project showcase, and beautiful animations.

**[📖 Complete Setup Guide](SETUP_GUIDE.md)** | **[🌐 Live Demo](https://personal-website-carlos-cervantes-projects.vercel.app)**

---

> **This is a template!** Follow the [Setup Guide](SETUP_GUIDE.md) to customize it with your information.

## ✨ Features

### 🎨 Design & UI
- **Modern, Professional Design** with clean typography
- **Dark/Light Mode** toggle with persistent preference
- **Fully Responsive** - works perfectly on all devices
- **Animated Hero Section** with gradient effects
- **Interactive Backgrounds** with subtle animations
- **Smooth Transitions** throughout

### 📝 Content Sections
- **Professional Profile** with stats showcase
- **Work Experience Timeline** with detailed history
- **Technical Skills** organized by category
- **Projects Showcase** with GitHub integration
- **Blog System** with admin panel
- **Podcast Section** for episodes and platforms
- **Hobbies/Interests** section

### ✍️ Blog System
- **Markdown-based** with frontmatter support
- **Admin Panel** with visual editor and live preview
- **Real-time Search** functionality
- **Tag Filtering** and categories
- **Reading Progress Bar** on posts
- **Copy Code Blocks** feature
- **SEO Optimized** with meta tags

### 🔧 Technical Features
- **MongoDB Integration** for blog posts
- **GitHub API** for automatic project listing
- **Open Graph** meta tags for social sharing
- **Accessible** with WCAG compliance
- **Fast Performance** and optimized assets
- **Scroll Animations** and interactive elements

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/CarlosCerv/personal-portfolio.git
cd personal-portfolio

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Edit .env with your configuration

# 4. Start development server
npm run dev

# 5. Open browser
# Visit http://localhost:3000
```

### 📖 Complete Setup Instructions

**New to this template?** Follow the detailed [Setup Guide](SETUP_GUIDE.md) for:
- Step-by-step customization
- Personal information updates
- Blog setup
- Deployment instructions
- Troubleshooting tips

## Project Structure

```
/personal-website
├── /public          # Static assets (CSS, JS, images)
├── /views           # EJS templates
├── /posts           # Blog posts in Markdown
├── app.js           # Main Express server
└── package.json     # Dependencies
```

## 🎨 Customization Overview

The template is designed for easy customization. Here's what you can change:

### Quick Customization
- ✏️ **Personal Info** - Name, title, bio, location
- 📊 **Professional Stats** - Years, projects, certifications
- 💼 **Experience** - Job history with details
- 🎓 **Education** - Degrees and institutions
- 🏆 **Certifications** - Professional certifications
- 🛠️ **Skills** - Technical skills by category
- 📱 **Contact** - Social media links
- 🎨 **Theme Colors** - Brand colors and styling
- 🖼️ **Logo & Images** - Branding and photos

### Content Management
- **Blog Posts** - Use admin panel at `/admin` or create markdown files
- **Projects** - Connect GitHub API or add manually
- **Hobbies** - Add personal interests and activities
- **Podcast** - Share podcast episodes and platforms

### Advanced
- **SEO** - Meta tags and Open Graph images
- **Analytics** - Google Analytics integration
- **Custom Domain** - Configure your own domain
- **Styling** - CSS variables for colors and spacing

**👉 See the [Setup Guide](SETUP_GUIDE.md) for detailed instructions on each section.**

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for blog posts
- **Mongoose** - MongoDB ODM
- **EJS** - Templating engine

### Frontend
- **Vanilla JavaScript** - No framework needed
- **CSS3** - Modern styling with variables
- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **Markdown** - Blog content with frontmatter

### Features
- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme switching
- **Blog Admin Panel** - Visual markdown editor
- **GitHub API Integration** - Automatic project listing
- **SEO Optimization** - Meta tags and Open Graph
- **Accessibility** - WCAG compliant

### Deployment
- **Vercel** - Recommended (one-click deploy)
- **Heroku** - Alternative option
- **Railway** - Alternative option
- **DigitalOcean** - Alternative option

## � Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in Vercel dashboard:
- `MONGODB_URI`
- `ADMIN_PASSWORD`
- `GITHUB_TOKEN` (optional)

### Other Platforms
- **Heroku** - Add Procfile and configure MongoDB addon
- **Railway** - Connect GitHub and set environment variables
- **DigitalOcean** - Use App Platform or Droplets

See the [Setup Guide](SETUP_GUIDE.md) for detailed deployment instructions.

---

## 📸 Screenshots

### Homepage
![Homepage Hero Section](docs/screenshots/hero.png)
*Professional hero section with animated stats*

### Blog Admin Panel
![Blog Editor](docs/screenshots/admin.png)
*Visual markdown editor with live preview*

### Dark Mode
![Dark Mode](docs/screenshots/dark-mode.png)
*Beautiful dark mode theme*

---

## � Project Structure

```
personal-website/
├── app.js                 # Express server and routes
├── package.json           # Dependencies
├── .env                   # Environment variables
├── public/
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   ├── js/
│   │   └── main.js       # Frontend JavaScript
│   └── images/           # Static images
├── views/
│   ├── index.ejs         # Homepage
│   ├── blog.ejs          # Blog listing
│   ├── post.ejs          # Blog post detail
│   ├── projects.ejs      # Projects showcase
│   ├── podcast.ejs       # Podcast page
│   ├── hobbies.ejs       # Hobbies listing
│   └── partials/         # Reusable components
└── posts/                # Markdown blog posts
```

---

## 🤝 Contributing

This template is open for contributions! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests
- ⭐ Star the repository

---

## 📄 License

MIT License - feel free to use this template for your personal portfolio!

---

## 👤 Original Template By

**Carlos Cervantes**
- 🔗 [GitHub](https://github.com/CarlosCerv)
- 💼 [LinkedIn](https://linkedin.com/in/carloscerteaga)
- 🌐 [Portfolio](https://personal-website-carlos-cervantes-projects.vercel.app)

---

## 🙏 Acknowledgments

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography
- [Vercel](https://vercel.com/) - Hosting platform

---

## 🌟 Show Your Support

If this template helped you create your portfolio, please:
- ⭐ Star this repository
- 🔗 Share it with others
- 💬 Provide feedback

**Happy building! 🚀**
