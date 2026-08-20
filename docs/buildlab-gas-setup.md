# BuildLab #001 Google Apps Script setup

Static export (GitHub Pages) has **no** Next.js API routes at runtime. The browser posts registration data straight to a Google Apps Script Web App.

## 1. Create the sheet

1. Create a Google Spreadsheet (name it e.g. `Aurigen BuildLab #001 Registrations`).
2. Rename the first tab to `Registrations` (optional; the script creates it if missing).

## 2. Deploy the script

1. Open **Extensions → Apps Script**.
2. Replace the default code with [`scripts/buildlab-registration.gs`](../scripts/buildlab-registration.gs).
3. Save the project.
4. Optional: **Project Settings → Script properties** add `NOTIFICATION_EMAIL` if you want a different staff inbox (default is `shubhamsahu@aurigen.tech`).
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Authorize the script (Sheets + Gmail scopes).
7. Copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).

Redeploy after every script change (**Manage deployments → Edit → New version**).

## 3. Environment variables

Use the **public** variable so the static client can read it. For GitHub Pages,
`NEXT_PUBLIC_*` must be present at **build** time — either via CI secrets or the
code defaults in [`src/lib/buildlab-config.ts`](../src/lib/buildlab-config.ts)
(GAS Web App URL is a client-facing endpoint by design).

### Local (`.env.local`)

```bash
NEXT_PUBLIC_BUILDLAB_GAS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
NEXT_PUBLIC_WHATSAPP_NUMBER=919372580326
```

`.env.local` is gitignored. Restart `npm run dev` after changing env vars.

### Defaults (static Pages without CI secrets)

[`src/lib/buildlab-config.ts`](../src/lib/buildlab-config.ts) falls back to the
deployed GAS `/exec` URL and WhatsApp `919372580326` when env vars are unset, so
`next build` for Pages still ships a working form and float button.

### GitHub Pages (optional overrides)

Add repository **Secrets and variables → Actions** if you want to override
defaults without a code change:

| Name | Notes |
|------|--------|
| `NEXT_PUBLIC_BUILDLAB_GAS_URL` | Web App `/exec` URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, with country code (e.g. `919372580326`) |

Wire them into the Pages / Actions build (`deploy-pages.yml` already passes them
when set). Empty secrets fall through to the config-module defaults.

## 4. CORS / POST shape

The client sends:

```http
POST <GAS_URL>
Content-Type: text/plain;charset=utf-8

{ ...json payload... }
```

`text/plain` avoids a CORS preflight in most browsers. The script parses JSON from `e.postData.contents` and returns JSON `{ ok, message, code? }`.

## 5. What the script does

- Appends a row to the `Registrations` sheet
- Rejects duplicate emails for `buildlab-001`
- Emails `shubhamsahu@aurigen.tech` (or `NOTIFICATION_EMAIL`)
- Sends a confirmation email to the participant

BOT IDs are **not** created by this script. Mentors assign `BOT-001` style IDs at check-in (teams of 1-5). Do not add BOT ID to the public site from this sheet.

After you edit `scripts/buildlab-registration.gs`, you must **redeploy** the Apps Script web app (Manage deployments → Edit → New version) or the live form still uses the old email copy.

## 6. Media & brochure

Drop assets under `public/workshops/buildlab-001/`:

| File | Used for |
|------|----------|
| `hero.mp4` / `hero.webm` | Hero + gallery demo |
| `showcase.jpg` | What You'll Build |
| `robot-1.jpg` | Gallery |
| `robot-2.jpg` | Gallery |
| `brochure.pdf` | Share bar download |

Until files exist, the page shows branded placeholders. The brochure button stays **Brochure coming soon** until `brochure.pdf` returns HTTP 200.

## 7. Smoke test

1. Set `NEXT_PUBLIC_BUILDLAB_GAS_URL` locally.
2. Open `/workshops/buildlab-001/`.
3. Submit the form with a real email you can check.
4. Confirm sheet row + staff email + participant email.
5. Submit again with the same email and expect a duplicate error.
