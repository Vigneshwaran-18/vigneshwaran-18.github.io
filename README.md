# Vic's Interactive Portfolio

A modern, fast, and interactive personal portfolio demonstrating expertise in infrastructure, networking, and software engineering.

## 🚀 Technology Stack
- **Frontend Framework**: React 18 & Vite
- **Styling**: Tailwind CSS v4 (with automatic Light/Dark mode transitions)
- **Animations & 3D**: Framer Motion & React-Three-Fiber
- **Private API Backend**: Cloudflare Workers (Serverless Email Routing)
- **Deployment**: Fully automated via GitHub Actions to GitHub Pages.

## 🌐 Deployment Architecture
Because this repository (`vigneshwaran-18.github.io`) serves as the root GitHub Pages repository, it is configured with a robust deployment pipeline:
1. **GitHub Actions Workflow**: Every push to the `main` branch triggers the `.github/workflows/deploy.yml` action.
2. **Build Process**: The action automatically installs dependencies, runs `npm run build`, and creates the highly optimized static bundle in `/dist`.
3. **Automated Publishing**: The action then securely publishes the bundled static assets straight to GitHub Pages without cluttering the repository with build artifacts.

## 🔒 Private Contact Flow
The Contact page does not rely on invasive third-party processors. It securely transmits POST requests directly to a private, extremely lightweight **Cloudflare Edge Worker** located in the `/worker` directory. This isolates credentials and ensures end-to-end privacy for all inbound queries.

## 🛠️ Local Development

Clone the repository and install the dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```

Build for production (locally):
```bash
npm run build
```
