# Technical Specifications

---

## 1. Project Overview
This project is a modern web application built with Next.js and Tailwind CSS, designed for high performance, responsive design, and easy media/branding integration. It supports video, logo, and favicon management, and is optimized for deployment on Vercel.

---

## 2. Tech Stack
- **Framework:** Next.js (React-based, supports SSR/SSG)
- **Styling:** Tailwind CSS (utility-first CSS framework)
- **Language:** TypeScript (recommended for type safety)
- **Package Manager:** npm or yarn
- **Deployment:** Vercel (optimized for Next.js)
- **Media:** Video, SVG/PNG logos, favicons in `public/`

---

## 3. Directory Structure
```
project-root/
├── app/ or pages/         # Next.js app/pages directory
├── components/            # Reusable React components
├── public/                # Static assets (videos, images, favicon, logo)
│   ├── videos/
│   ├── logo.svg/png
│   └── favicon.ico/svg
├── styles/                # Tailwind and global CSS
├── package.json           # Project metadata and scripts
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── ...
```

---

## 4. Key Dependencies
- **next**: React framework for SSR/SSG
- **react** & **react-dom**: UI library
- **tailwindcss**: Utility-first CSS
- **autoprefixer** & **postcss**: CSS tooling
- **typescript**: (optional, recommended)
- **@headlessui/react**, **@heroicons/react**: (optional, for UI components/icons)

---

## 5. Build & Deployment
- **Local Build:**
  ```sh
  npm run build
  npm start
  ```
- **Deployment:**
  - Push to GitHub/GitLab/Bitbucket
  - Import repo to Vercel and deploy (auto-detects Next.js)
  - All static assets must be in `public/`

---

## 6. Asset Management
- **Videos:** Place in `public/videos/`, use `<video src="/videos/filename.mp4" ... />`
- **Logo:** Place in `public/`, use `<img src="/logo.svg" ... />`
- **Favicon:** Place in `public/`, referenced automatically or via `<head>`
- **Best Practices:** Compress videos, use SVG for logos, provide multiple favicon formats

---

## 7. Accessibility & Performance
- Use semantic HTML and ARIA attributes
- Provide alt text for images/logos
- Use fallback text for videos
- Compress and optimize all media
- Test responsiveness on all devices
- Use `poster` for videos for better UX

---

**Update this document if the tech stack or architecture changes.** 