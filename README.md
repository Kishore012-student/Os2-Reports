# OS2 Reports

Automated Insurance Claims OCR & AI Form Generation website by OS2 Studio (os2studio.com), built in pure **HTML, CSS, and Vanilla JavaScript**.

## Project Structure

```text
├── index.html        # Complete semantic HTML page with OS2 Reports branding
├── css/
│   └── styles.css    # OS2 Studio signature palette (#ffb600, #0a0a0a), lens effects, and animations
├── js/
│   ├── app.js        # Hero workspace (rail, presets, queue/vault, prompt), FAQ, modals
│   ├── new-sections.js # Why OS2 Reports comparison + 6-step workflow guide
│   └── scroll-animations.js # Lenis smooth scroll + GSAP ScrollTrigger section reveals
└── assets/
    └── images/       # Editorial portraits, evidence images, avatars, dashboard + sky backdrops
```

## How to Run

No build step or Node.js packages required. Lenis and GSAP/ScrollTrigger load from CDN with an IntersectionObserver fallback, so the page still works offline. Every section reveals on scroll; `prefers-reduced-motion` disables the motion layer.

- **Direct in browser:** Double click `index.html` to open directly.
- **Local server:** Run `npm start` (or `npx serve .`) to view at `http://localhost:3000`.
