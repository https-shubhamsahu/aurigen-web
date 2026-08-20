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
- Custom domain: https://aurigen.tech (also www.aurigen.tech)
- Project URL (legacy): https://https-shubhamsahu.github.io/aurigen-web/
- Deploy: `.github/workflows/deploy-pages.yml` on every push to `main`
- CI builds with empty `PAGES_BASE_PATH` for the apex custom domain

## Custom domain DNS (get.tech)

`public/CNAME` is set to `aurigen.tech`. At get.tech, create:

| Record type | Host name | Value | TTL |
|-------------|-----------|-------|-----|
| **A** | `@` | `185.199.108.153` | Auto |
| **A** | `@` | `185.199.109.153` | Auto |
| **A** | `@` | `185.199.110.153` | Auto |
| **A** | `@` | `185.199.111.153` | Auto |
| **AAAA** | `@` | `2606:50c0:8000::153` | Auto |
| **AAAA** | `@` | `2606:50c0:8001::153` | Auto |
| **AAAA** | `@` | `2606:50c0:8002::153` | Auto |
| **AAAA** | `@` | `2606:50c0:8003::153` | Auto |
| **CNAME** | `www` | `https-shubhamsahu.github.io` | Auto |

Use `@` for apex and `www` for the subdomain — not the full domain name. Enable **Enforce HTTPS** in GitHub Pages settings after DNS propagates.

## Constraints

Static export means **no Next.js API routes / server features** on Pages. The local debug logger under `src/app/api/debug-log` is ignored and is not part of the published site.

## ESP32 Walking Robot workshop

See [`docs/workshop-ecosystem.md`](docs/workshop-ecosystem.md) for routes, BOT ID assignment, public vs private data, and what is live vs localStorage.

Registration GAS setup: [`docs/buildlab-gas-setup.md`](docs/buildlab-gas-setup.md).

