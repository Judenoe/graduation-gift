Graduation Gift — Static site

Build & deploy

- Local build:

```bash
npm run build
```

This creates a `dist/` folder suitable for deployment.

- Deploy options:
  - Netlify: connect your GitHub repo or use the Netlify CLI: `npx netlify-cli deploy --prod --dir=dist` (requires Netlify auth/token)
  - GitHub Pages: push repository and enable Pages in repo settings (use `gh-pages` if you need a build action)
  - Vercel: import repository in Vercel or run `vercel --prod`
  - Surge: `npx surge dist/ your-name.surge.sh`

Notes

- Images and audio should be optimized for production (recommend ~800px width for photos and compressed mp3/webm audio).
- To connect a custom domain in Netlify, add the domain in Site settings → Domain management and update DNS records as instructed by Netlify.

Netlify (recommended)

- Build command: `npm run build`
- Publish directory: `dist`
- Deploy (one-off production deploy using Netlify CLI):

```bash
npx netlify-cli deploy --prod --dir=dist
```

Or connect this repository to Netlify for continuous deploys by running `netlify init` and selecting the repository.
