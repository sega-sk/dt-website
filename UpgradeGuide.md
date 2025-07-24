# Upgrade & Maintenance Guide

---

## 1. Upgrading Dependencies
- **Check for Updates:**
  ```sh
  npm outdated
  npm update
  # or use `npx npm-check-updates -u` then `npm install`
  ```
- **Upgrade Next.js:**
  - Review [Next.js release notes](https://nextjs.org/docs/upgrading)
  - Update `next` in `package.json`, test locally
- **Upgrade Tailwind CSS:**
  - Review [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide)
  - Update `tailwindcss` in `package.json`, check for config changes
- **Upgrade React:**
  - Update `react` and `react-dom`, review breaking changes

---

## 2. Migrating to New Next.js Features
- For major Next.js upgrades (e.g., from pages/ to app/ directory), follow official migration guides
- Refactor custom `_document.js` or `_app.js` as needed

---

## 3. Asset & Media Upgrades
- Replace videos/logos/favicons in `public/` as needed
- Use modern formats (SVG, WebP, compressed MP4)
- Test all assets after replacement

---

## 4. Testing After Upgrades
- Run `npm run build` and `npm run lint`
- Test all major pages and features
- Check deployment on Vercel preview

---

## 5. Best Practices
- Keep dependencies up to date
- Regularly audit for security (`npm audit`)
- Use version control (git) for all changes
- Document any custom scripts or configurations

---

## 6. References
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [React Documentation](https://react.dev/)

---

**Update this document with each major upgrade or maintenance event.** 