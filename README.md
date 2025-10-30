# Carlos Cervantes - QA Engineer Portfolio

A modern, interactive personal portfolio website showcasing QA automation expertise and professional experience. Built with Node.js, Express, and EJS, featuring Google Sans Flex typography and engaging animations.

## ✨ Features

### Design & UI
- 🎨 **Modern Design** with Google Sans Flex typography
- 🌓 **Dark/Light Mode** toggle with persistent preference
- 📱 **Fully Responsive** across all devices
- ✨ **Animated Hero Section** with gradient effects and floating text
- 🎭 **Interactive Backgrounds** with subtle movement effects
- � **Smooth Transitions** and hover effects throughout

### Content Sections
- 👤 **Professional Profile** with animated introduction
- 💼 **Work Experience Timeline** with visual indicators
- 🛠️ **Comprehensive Technical Skills** organized by category
- 📝 **Interactive Blog** with search and filter functionality
- � **QA Automation Projects** showcase
- 🎙️ **Podcast Section** for QA insights
- 🎯 **Enhanced Hobbies** with interactive card animations

### Blog Features
- 📝 **Markdown-based** blog system
- � **Real-time Search** functionality
- 🏷️ **Category Filters** (Mobile, Automation, CI/CD, QA)
- ⏱️ **Reading Time** indicators
- 📊 **Reading Progress Bar** on blog posts
- 🎨 **Animated Cards** with gradient accents
- 👤 **Author Attribution** and metadata

### Technical Features
- ⚡ **Fast Performance** and lightweight
- 🔒 **SEO Optimized** meta tags
- ♿ **Accessible** with ARIA labels
- 🎬 **Scroll Animations** for content reveal
- 📋 **Copy Code Blocks** functionality
- 🎯 **Staggered Load** animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Production

To run in production mode:

```bash
npm start
```

## Project Structure

```
/personal-website
├── /public          # Static assets (CSS, JS, images)
├── /views           # EJS templates
├── /posts           # Blog posts in Markdown
├── app.js           # Main Express server
└── package.json     # Dependencies
```

## 🎨 Customization

### Personal Information
- **Profile**: Update name and title in `views/partials/navigation.ejs` and `views/index.ejs`
- **About Section**: Modify professional summary in `views/index.ejs`
- **Experience**: Update work history in the experience timeline
- **Skills**: Edit technical skills by category in `views/index.ejs`
- **Profile Picture**: Replace `public/images/profile.jpg` with your photo

### Content
- **Blog Posts**: Create markdown files in `/posts` directory with frontmatter
- **Projects**: Update GitHub projects data in `app.js`
- **Hobbies**: Customize hobby cards in `views/hobbies.ejs`
- **Podcast**: Add your podcast embed in `views/podcast.ejs`

### Styling
- **Colors**: Modify CSS variables in `public/css/style.css` (`:root` section)
- **Typography**: Change font settings in the typography variables
- **Animations**: Adjust animation timings and effects in CSS
- **Layout**: Modify spacing using CSS custom properties

### Social Links
Update social media links in `views/partials/footer.ejs`:
- GitHub
- LinkedIn
- Twitter/X
- Email

## 🎯 Key Technologies

### Technical Skills Showcased
- **Mobile Testing**: Appium, Espresso, Android Studio
- **Web Testing**: Selenium, Cypress, Nightwatch
- **CI/CD**: GitHub Actions, Circle CI, Jenkins
- **Languages**: Java, JavaScript
- **Tools**: Jira, TestRail, XRay, SauceLabs, BrowserStack
- **Cloud**: AWS, Firebase

## 📝 Blog Topics

Current blog posts focus on:
- Mobile Test Automation with Appium and Espresso
- CI/CD Integration for QA Automation
- Testing strategies and best practices
- Quality Assurance methodologies

## 🎨 Design Features

### Animations
- **Hero Section**: Gradient text animation and floating effect
- **Experience Timeline**: Animated dots and hover effects
- **Skill Categories**: Organized with interactive tags
- **Blog Cards**: Gradient accents and lift effects
- **Hobby Cards**: Bounce animations and shimmer effects

### Interactive Elements
- **Search Bar**: Real-time blog post filtering
- **Filter Buttons**: Category-based content filtering
- **Hover Effects**: Throughout all card components
- **Smooth Scrolling**: For anchor links
- **Progress Indicators**: Reading progress on blog posts

## 🚀 Deployment

### Environment Variables
No environment variables required for basic setup.

### Production Checklist
- [ ] Update personal information
- [ ] Add real GitHub API token (optional)
- [ ] Configure domain and hosting
- [ ] Enable HTTPS
- [ ] Test all links and images
- [ ] Verify mobile responsiveness
- [ ] Check dark mode compatibility

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Fork for your own use
- Submit bug reports
- Suggest improvements

## 📄 License

MIT

## 👤 Author

**Carlos Cervantes**
- Software QA Engineer III
- Mobile Automation Expert
- 6+ years of QA experience

## 🙏 Acknowledgments

- Google Fonts for Google Sans Flex typography
- Font Awesome for icons
- Express.js and EJS templating
- Marked for Markdown parsing
