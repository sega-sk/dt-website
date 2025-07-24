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

**You can now add or swap videos, logo, and favicon in any section by following these steps!** 