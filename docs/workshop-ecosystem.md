# ESP32 Walking Robot workshop ecosystem

Official organizer: **Robotics & Automation Club, TSEC**. Aurigen hosts pages and project resources. Aurigen is not the organizer.

Hardware: ESP32-C3, 4 servos on ESP32 GPIO (no PCA9685), 0.96" OLED, 1× 3.7V Li-ion + holder, slide switch, optional 470µF capacitor.

Dates: 21-22 August 2026. Day 1 1:00 PM-5:30 PM. Day 2 9:30 AM-4:30 PM. Teams of 1-5.

This site is a **static GitHub Pages export** (`output: 'export'`). There is no Next.js API, no login, and no server database at runtime.

## Routes

| Path | Role |
|------|------|
| `/workshops/esp32-walking-robot/` | Hub (central nav) |
| `/labs/esp32-walking-robot/` | Code library |
| `/builders/` | Public showcase |
| `/builders/[botId]/` | Public profile |
| `/workshops/esp32-walking-robot/vlog/` | Vlog brief + local submit |
| `/workshops/esp32-walking-robot/7-day-challenge/` | Challenge tracker |
| `/workshops/esp32-walking-robot/social-kit/` | Story PNG + captions |
| `/workshops/buildlab-001/` | Registration (GAS) |
| `/admin/workshop/` | Demo workflow notes. **Not secure.** |

## BOT ID assignment (manual)

Registration does **not** issue a BOT ID. Mentors assign `BOT-001`, `BOT-002`, ... at check-in.

1. Print or open a sheet with columns: Timestamp, Team name, Member names (1-5), BOT ID, Notes.
2. Next unused number. Never reuse. One ID per team, not per person.
3. Tell the team to use that ID on vlog, challenge, and social kit.
4. Real public profiles start at BOT-001 after consent.
5. `BOT-901+` in `src/content/builders/seed.ts` are layout samples only.

## Public vs private data

Public pages may show: BOT ID, team name, first names, college, robot name, features, awards, public GitHub/demo/video URLs, consented photos.

Never publish: phone, email, WhatsApp, private Drive folder IDs, registration sheet rows.

Registration PII lives only in the Apps Script sheet.

## What is local / mock

- Vlog submit: `localStorage` via `src/lib/vlog-service.ts`. Optional `NEXT_PUBLIC_VLOG_GAS_URL` fire-and-forget. Gallery only shows approved/featured/winner after a human copies them into `vlog.ts`.
- 7-Day progress: `localStorage` via `src/lib/challenge-service.ts`. Optional `NEXT_PUBLIC_CHALLENGE_GAS_URL`. Not a shared leaderboard. Clearing site data resets it.
- Google Drive: stub in `src/lib/storage/google-drive-provider.ts`. Env placeholders only. No live Drive API.
- Admin: static checklist. No auth.
- Builder samples: `isSample: true`, BOT-901+. Hidden from the default All filter.

## What is live

- BuildLab registration form posts to Google Apps Script. See `docs/buildlab-gas-setup.md`.
- Static pages on GitHub Pages / aurigen.tech.

## Environment variables

Build-time only (`NEXT_PUBLIC_*` inlined by `next build`).

| Name | Required | Purpose |
|------|----------|---------|
| `NEXT_PUBLIC_BUILDLAB_GAS_URL` | No (code default exists) | Registration Web App `/exec` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No (code default exists) | `wa.me` digits |
| `NEXT_PUBLIC_VLOG_GAS_URL` | No | Optional vlog remote copy |
| `NEXT_PUBLIC_CHALLENGE_GAS_URL` | No | Optional challenge remote copy |
| `NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID` | No | Drive stub |
| `NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY` | No | Drive stub |
| `NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID` | No | Drive stub |
| `PAGES_BASE_PATH` | CI sets `""` | Empty for apex domain |

## After the workshop (publish a real builder)

1. Get written/verbal consent.
2. Add a `Project` in `src/content/builders/seed.ts` with `isSample: false` and a real BOT ID.
3. First names only. No contact fields.
4. `npm run build`, deploy (`main` push).
5. Do not copy sample teams into the All gallery as if they competed.

## After a vlog is approved

1. Confirm consent + public URL.
2. Append to `seedApprovedVlogs` in `src/content/workshops/esp32-walking-robot/vlog.ts` with `status: "approved"` (or featured/winner).
3. Rebuild. Pending localStorage rows are not the public gallery.
