# Media & Branding Integration Guide

This guide will help you add videos, your logo, and favicon to your Next.js + Tailwind project, ensuring best practices for performance, accessibility, and responsive design.

---

## 1. **Logo & Favicon Integration**

### Logo
- **Location:** Place your logo file (e.g., `logo.svg` or `logo.png`) in the `public/` directory:
  - `public/logo.svg`
  - `public/logo.png`
- **Usage in Code:** Reference it in your components using a relative path from the public folder:
  ```jsx
  <img src="/logo.svg" alt="Your Brand Logo" />
  ```
  Or, inline the SVG directly in your React component for more control.

### Favicon
- **Location:** Place your favicon file (e.g., `favicon.ico`, `favicon.svg`, or `favicon.png`) in the `public/` directory:
  - `public/favicon.ico`
  - `public/favicon.svg`
- **Usage in Code:**
  - Next.js will automatically use `public/favicon.ico` as the default favicon.
  - For advanced favicons, add them to `public/` and reference them in your `<head>` via `app/layout.tsx` or `pages/_document.js`:
    ```jsx
    // In app/layout.tsx (Next.js 13+)
    export const metadata = {
      title: 'Your Site Title',
      icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
      },
    }
    ```
    Or, for custom `<head>`:
    ```jsx
    <head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </head>
    ```
- **Best Practices:**
  - Provide both `favicon.ico` and `favicon.svg` for broad browser support.
  - Add `apple-touch-icon.png` for iOS home screen icons.

---

## 2. **Prepare Your Video Files**
- **Format:** Use `.mp4` (H.264/AAC) for best browser compatibility.
- **Resolution:** Use 720p or 1080p for quality; compress for web (try [HandBrake](https://handbrake.fr/)).
- **Naming:** Use clear, lowercase names (e.g., `hero-demo.mp4`, `ai-search-demo.mp4`).
- **Location:** Place videos in `public/videos/` (e.g., `public/videos/hero-demo.mp4`).

---

## 3. **Add Video to a Section Component**

### Example: Adding a Video to `HeroSection.tsx`

1. **Import/Reference the Video**
   - No import needed; use the `<video>` tag with a relative path:
     ```jsx
     <video
       src="/videos/hero-demo.mp4"
       autoPlay
       loop
       muted
       playsInline
       className="w-full h-auto object-cover rounded-2xl"
       style={{ aspectRatio: '16/9' }}
     >
       Sorry, your browser does not support embedded videos.
     </video>
     ```

2. **Replace or Add the Video in the Component**
   - Replace the `<img>` or add the `<video>` in the appropriate place (usually the right or left column).
   - Example:
     ```jsx
     <div className="relative rounded-2xl overflow-hidden bg-white w-full max-w-xl">
       <video ... />
     </div>
     ```

3. **Responsive Sizing**
   - Use `w-full h-auto` and `max-w-xl` or `max-w-2xl` for desktop.
   - For mobile, ensure the container is full width and has appropriate min-height.

---

## 4. **Recommended Video Tag Attributes**
- `autoPlay` — Plays automatically (useful for demo/hero videos)
- `loop` — Loops the video
- `muted` — Required for autoplay to work on most browsers
- `playsInline` — Prevents full-screen on mobile
- `controls` — (Optional) Show controls if you want users to play/pause
- `poster` — (Optional) Show an image before the video loads

---

## 5. **Accessibility & Fallbacks**
- Always include fallback text inside `<video>`:
  ```jsx
  <video ...>
    Sorry, your browser does not support embedded videos.
  </video>
  ```
- For important content, consider providing captions or a transcript.

---

## 6. **Example: Adding Videos to All Homepage Sections**

### Hero Section
- Place `hero-demo.mp4` in `public/videos/`.
- In `HeroSection.tsx`, replace the `<img>` with the `<video>` as shown above.

### AI Search Section
- Place `ai-search-demo.mp4` in `public/videos/`.
- In `AISearchSection.tsx`, replace the `<img>` with:
  ```jsx
  <video
    src="/videos/ai-search-demo.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-auto object-cover rounded-2xl"
    style={{ aspectRatio: '16/9' }}
  >
    Sorry, your browser does not support embedded videos.
  </video>
  ```

### Lightning Fast Section
- Place `performance-demo.mp4` in `public/videos/`.
- In `LightningFastSection.tsx`, use the same `<video>` pattern.

### SRP Customizer Section
- Place `srp-customizer-demo.mp4` in `public/videos/`.
- In `SRPCustomizerSection.tsx`, use the same `<video>` pattern.

---

## 7. **Best Practices**
- **Compress videos** for fast loading.
- **Keep videos short** (5–30 seconds) for performance.
- **Test on mobile and desktop** for responsiveness.
- **Use a poster image** for a better loading experience (add `poster="/images/preview.jpg"`).
- **Lazy load** videos if not in the initial viewport (advanced: use `loading="lazy"` or intersection observer).

---

## 8. **Troubleshooting**
- If the video doesn’t play, check the file path and format.
- If autoplay doesn’t work, ensure `muted` is set.
- For slow loading, compress the video further.

---

## 9. **Summary Table**

| Section                | Video File                   | Component File                |
|------------------------|------------------------------|-------------------------------|
| Hero                   | `/videos/hero-demo.mp4`      | `HeroSection.tsx`             |
| AI Search              | `/videos/ai-search-demo.mp4` | `AISearchSection.tsx`         |
| Lightning Fast         | `/videos/performance-demo.mp4`| `LightningFastSection.tsx`    |
| SRP Customizer         | `/videos/srp-customizer-demo.mp4` | `SRPCustomizerSection.tsx` |

---

## 10. **How to Build and Deploy to Vercel**

### 1. Build Your Project Locally (Optional)
You can test the production build locally before deploying:
```sh
npm run build
npm start
```
Visit `http://localhost:3000` to preview the production build.

### 2. Push Your Code to GitHub (or GitLab/Bitbucket)
If your project is not already in a git repository:
```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```
Replace the URL with your actual repository.

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com/) and sign in with your GitHub/GitLab/Bitbucket account.
2. Click **“New Project”**.
3. Import your repository.
4. Vercel will auto-detect your Next.js project. Click **“Deploy”**.
5. Wait for the build to finish. You’ll get a live URL (e.g., `https://your-project.vercel.app`).

### 4. Best Practices
- Make sure your `public/` folder contains all assets (videos, logo, favicon).
- Check your environment variables (if any) in the Vercel dashboard under Project Settings > Environment Variables.
- For custom domains, add them in the Vercel dashboard.

### 5. Push Updates
After making changes, just run:
```sh
git add .
git commit -m "Describe your change"
git push
```
Vercel will automatically rebuild and redeploy.

### 6. Troubleshooting
- If the build fails, check the Vercel logs for errors.
- Make sure your `package.json` has the correct `build` script (`next build`).
- If you use custom fonts or assets, ensure they are in the `public/` directory.

---

**You can now add or swap videos, logo, favicon, and deploy your site by following these steps!** 

# 11. Running the Project Locally

To preview your changes and develop locally, follow these steps:

1. **Install dependencies** (if you haven't already):
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```
   This will start your Next.js app in development mode. By default, it will be available at [http://localhost:3000](http://localhost:3000).

3. **Preview your site:**
   Open your browser and go to [http://localhost:3000](http://localhost:3000) to see your changes live.

4. **Stop the server:**
   Press `Ctrl+C` in your terminal to stop the development server when you're done.

> **Tip:** If you see a warning about `caniuse-lite` being outdated, you can update it with:
> ```sh
> npx update-browserslist-db@latest
> ```

--- 

---

## 12. Video Poster Placeholders (Best Practices)

To improve perceived performance and user experience, use a small, blurry image as a placeholder for each video. This image will show while the video loads.

### How to Create Video Poster Placeholders

1. **Take a screenshot** of the first frame of your video.
2. **Resize** it to 128×72 pixels (16:9 aspect ratio).
3. **Apply a blur** (optional, but recommended for a modern look).
4. **Save as `.webp`** with high compression (low quality, small file size).
5. **Place in** `public/images/posters/` with the following names:
   - `hero-demo-poster.webp`
   - `ai-search-demo-poster.webp`
   - `performance-demo-poster.webp`
   - `srp-customizer-demo-poster.webp`

### Why 128×72 px and .webp?
- Loads instantly (usually under 10 KB)
- Looks good even on high-DPI screens
- Matches the 16:9 aspect ratio of your videos
- `.webp` offers best compression and browser support

### Example Usage in Code
```jsx
<video
  src="/videos/hero-demo.webm"
  poster="/images/posters/hero-demo-poster.webp"
  width={1280}
  height={720}
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-auto object-cover rounded-2xl"
>
  Sorry, your browser does not support embedded videos.
</video>
```

**Result:**
Users see a fast-loading, visually relevant preview while the video loads, improving both perceived speed and layout stability. 

---

## 13. How to Push Your Project to GitHub

Follow these steps to upload your local project to a GitHub repository:

1. **Open your terminal in your project root.**
2. **Stage all changes:**
   ```sh
   git add .
   ```
3. **Commit your changes:**
   ```sh
   git commit -m "Your commit message here"
   ```
4. **Add your GitHub repository as the remote:**
   ```sh
   git remote add origin https://github.com/your-username/your-repo.git
   ```
   (Replace with your actual repo URL, e.g. `https://github.com/Roto1212n/dtt1.git`)
5. **Set the main branch name (if not already):**
   ```sh
   git branch -M main
   ```
6. **Push your code to GitHub:**
   ```sh
   git push -u origin main
   ```

**Tip:**
- For future changes, just run:
  ```sh
  git add .
  git commit -m "Describe your change"
  git push
  ```
- You can also use GitHub Desktop or VS Code for a visual interface. 