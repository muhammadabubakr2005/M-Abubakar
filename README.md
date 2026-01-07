# Muhammad Abubakar - Portfolio Website

A professional, interactive multi-page portfolio website built with React + Vite, featuring smooth animations, dark mode, and particle effects.

## Features

### Core Features
- **Hero Section**: Animated typing effect with dynamic role cycling
- **About Me**: Profile section with education and personal details
- **Tech Skills**: Interactive skill cards with proficiency bars and category filtering
- **Projects**: Grid layout with filtering, project modals with detailed information
- **Experience**: Timeline view of work experience and education
- **Contact**: Functional contact form with social links

### Enhancements
- Smooth scrolling animations using Framer Motion
- Dark/Light mode toggle with localStorage persistence
- Particle.js animated background
- Project filtering (All, Web, Mobile)
- Responsive design for mobile and desktop
- Professional aesthetic with gradient accents

## Project Structure

```
portfolio-site/
├── public/
│   ├── data/
│   │   ├── summary.json        # Personal info, bio, contact details
│   │   ├── projects.json       # Project details with images/videos
│   │   ├── experience.json     # Work experience data
│   │   └── frameworks.json     # Skills and technologies
│   ├── images/
│   │   ├── projects/          # Project screenshots
│   │   ├── skills/            # Technology icons
│   │   └── companies/         # Company logos
│   ├── videos/
│   │   └── projects/          # Project demo videos
│   └── documents/
│       └── resume.pdf         # Resume file
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation bar with dark mode toggle
│   │   ├── Footer.jsx         # Footer with social links
│   │   └── ParticleBackground.jsx  # Animated background
│   ├── pages/
│   │   ├── Home.jsx           # Hero section
│   │   ├── About.jsx          # About me page
│   │   ├── Skills.jsx         # Skills & technologies
│   │   ├── Projects.jsx       # Projects showcase
│   │   ├── Experience.jsx     # Work experience
│   │   └── Contact.jsx        # Contact form
│   ├── App.jsx                # Main app with routing
│   └── App.css                # Global styles
└── package.json
```

## Data Files Structure

### summary.json
Contains personal information, bio, contact details, and social links.

### projects.json
Array of project objects with:
- Title, subtitle, description
- Technologies used
- Features list
- Images, videos, thumbnails
- Live URL and GitHub repository
- Status and dates

### experience.json
Array of work experience with:
- Job title, company, location
- Duration and type (Internship, Full-time, etc.)
- Responsibilities and achievements
- Technologies used
- Company logo

### frameworks.json
Categorized skills:
- Languages (JavaScript, TypeScript, Python, etc.)
- Frontend (React, Angular, React Native, etc.)
- Backend (Node.js, NestJS, FastAPI, etc.)
- Databases (PostgreSQL, MongoDB, etc.)
- Tools (VS Code, Git, Postman, etc.)
- Soft Skills

## Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The build files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Adding Your Content

1. **Update Personal Info**: Edit `public/data/summary.json`
2. **Add Projects**: Edit `public/data/projects.json`
3. **Update Experience**: Edit `public/data/experience.json`
4. **Update Skills**: Edit `public/data/frameworks.json`

### Adding Images and Videos

1. Add your profile image to `public/images/` as `profile.jpg`
2. Add project screenshots to `public/images/projects/[project-name]/`
3. Add company logos to `public/images/companies/`
4. Add skill icons to `public/images/skills/`
5. Add project demo videos to `public/videos/projects/`
6. Add your resume to `public/documents/`

### Customizing Colors

Edit the CSS variables in `src/App.css`:

```css
:root {
  --primary-color: #00ffca;      /* Main accent color */
  --secondary-color: #00d4aa;    /* Secondary accent */
  --accent-color: #7c3aed;       /* Gradient accent */
  /* ... other variables */
}
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Icons** - Icon components
- **React TSParticles** - Particle background effects
- **React Type Animation** - Typing animation effect
