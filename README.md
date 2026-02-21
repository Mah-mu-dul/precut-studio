# Precut Studio

A modern, high-performance React application built with Vite and Tailwind CSS. The platform serves as a cinematic video editing agency storefront, featuring scroll-driven animations and a premium SaaS aesthetic.

## 🚀 Tech Stack

- **Framework:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** Custom CSS & pure native DOM `requestAnimationFrame`

## ✨ Core Features

- **High-Performance Architecture:** Pure React components with minimal external dependencies to ensure ultra-fast load times.
- **Scroll-Driven Interpolation:** The "Subscription Model" pricing section utilizes a strictly scroll-scrubbed, jank-free `IntersectionObserver` and `requestAnimationFrame` lerp loop for 1:1 user-scroll "jelly fan-out" animation.
- **Brand Theming:** Strictly adheres to the defined color palette — Sky Blue (`#87CEEB`), Dark Navy (`#091549`), and Beige/Off-white (`#F5F5DC`).
- **Typography Engine:** Dual-font setup mapping Google Fonts **Space Mono** (Headlines & CTAs) and **DM Sans** (Body & Subtext).
- **Responsive Layout:** fully fluid layouts relying on flexbox and CSS grids, guaranteed to work flawlessly from mobile breakpoints up to 4K displays.

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mah-mu-dul/precut-studio.git
   cd precut-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

- `src/components/layout/` - Core shell components (Navbar, Footer, etc.)
- `src/components/sections/` - Individual page blocks (Hero, Portfolio, Pricing, How It Works, Testimonials)
- `src/index.css` - Global styles and Tailwind directives
- `tailwind.config.js` - Centralized theme tokens and design system variables

## 🛠️ Build & Deployment

To build a highly optimized, minified bundle for production:

```bash
npm run build
```

This will output the compiled static assets into the `/dist` directory, ready to be deployed to Vercel, Netlify, or AWS S3.    tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
