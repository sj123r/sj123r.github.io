# Portfolio Website

Vite + React portfolio site configured for GitHub Pages user site deployment.

## Structure
- `public/assets/images`
- `public/assets/videos`
- `public/assets/documents`
- `public/assets/fonts`

## Development
```sh
npm install
npm run dev
```

## Build
```sh
npm run build
```

## Deploy (GitHub Pages)
Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys to Pages.
In the repo settings, set Pages source to **GitHub Actions**.
