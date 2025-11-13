# Baroque Pieces - Interactive Art Gallery

A beautiful, interactive carousel showcasing Baroque art masterpieces with smooth animations powered by GSAP and Lenis.

## 🎨 Features

- Stunning carousel with custom animations
- Smooth scroll effects using Lenis
- Detailed artwork pages with rich content
- Responsive design
- Optimized performance

## 🚀 Deployment on Vercel

### Prerequisites
- A [Vercel account](https://vercel.com/signup)
- Git repository

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment Steps

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Select your repository
   - Vercel will automatically detect it's a Vite project

3. **Configure build settings** (should auto-detect):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `your-project.vercel.app`

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── index.html              # Main page
├── pages/                  # Detail pages for artworks
├── public/
│   ├── carousel/          # Artwork images
│   ├── pages/             # HTML pages (for build)
│   └── DeFonte-DemiGras.ttf
├── script.js              # Main carousel logic
├── scroll-animations.js   # Smooth scroll animations
├── styles.css             # Main styles
├── detail-page.css        # Detail page styles
└── detail-page-animations.js

```

## 🛠️ Technologies Used

- **Vite** - Build tool and dev server
- **GSAP** - Animation library
- **Lenis** - Smooth scroll library
- **Vanilla JavaScript** - No framework overhead

## 🎯 Vercel Configuration

The project includes a `vercel.json` configuration file for optimal deployment. The build process is configured to:
- Use Vite as the build tool
- Output to the `dist` directory
- Handle routing correctly for all pages

## 📝 Notes

- All images are optimized for web
- Fonts are self-hosted for better performance
- The `.gitignore` excludes build artifacts and documentation files

## 👤 Author

Developed by Srikar Sunchu

## 📄 License

ISC

