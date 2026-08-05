# Aurigen Web

Marketing site for Aurigen — Next.js static export hosted on GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build (static)

```bash
npm run build
```

Output is written to `out/` (GitHub Pages artifact).

## GitHub Pages

- Repo: https://github.com/https-shubhamsahu/aurigen-web
- Pages URL: https://https-shubhamsahu.github.io/aurigen-web/ (also reported as http://shubham-sahu.me/aurigen-web/)
- Deploy: `.github/workflows/deploy-pages.yml` on every push to `main`
- CI builds with `PAGES_BASE_PATH=/aurigen-web` so assets work on the project path URL

## Custom domain (get.tech)

1. In the repo: Settings → Pages → Custom domain, enter your domain (e.g. `aurigen.tech`), **or** add `public/CNAME` with that single line and push.
2. Set `PAGES_BASE_PATH` to `""` in `.github/workflows/deploy-pages.yml` and push again (apex domains must not use `/aurigen-web`).
3. At your get.tech DNS panel, create:

| Type | Host / Name | Value | TTL |
|------|-------------|-------|-----|
| **A** | `@` (apex) | `185.199.108.153` | Auto |
| **A** | `@` (apex) | `185.199.109.153` | Auto |
| **A** | `@` (apex) | `185.199.110.153` | Auto |
| **A** | `@` (apex) | `185.199.111.153` | Auto |
| **AAAA** | `@` (apex) | `2606:50c0:8000::153` | Auto |
| **AAAA** | `@` (apex) | `2606:50c0:8001::153` | Auto |
| **AAAA** | `@` (apex) | `2606:50c0:8002::153` | Auto |
| **AAAA** | `@` (apex) | `2606:50c0:8003::153` | Auto |
| **CNAME** | `www` | `https-shubhamsahu.github.io` | Auto |

3. In GitHub Pages settings, enable **Enforce HTTPS** after DNS propagates (can take minutes to hours).

Replace `aurigen.tech` with your exact get.tech domain when you have it.

## Constraints

Static export means **no Next.js API routes / server features** on Pages. The local debug logger under `src/app/api/debug-log` is ignored and is not part of the published site.
