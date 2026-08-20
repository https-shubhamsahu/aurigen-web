# ESP32 Walking Robot workshop ecosystem

Official organizer: **Robotics & Automation Club, TSEC**. Aurigen hosts pages and project resources. Aurigen is not the organizer.

Hardware: ESP32-C3, 4 servos on GPIO 0/1/3/10 (no PCA9685), 0.96" SH1106 OLED on GPIO 8/9 at 0x3C, buzzer on GPIO 4, 1× 3.7V Li-ion + holder, slide switch, optional 470µF capacitor on the servo rail. BLE advertises as AlbertMini.

Dates: 21-22 August 2026. Day 1 1:00 PM-5:30 PM. Day 2 9:30 AM-4:30 PM. Teams of 1-5.

This site is a **static GitHub Pages export** (`output: 'export'`). There is no Next.js API, no login, and no server database at runtime.

**Admin = the private Google Sheet.** The website is public. `/admin/workshop/` is not secure. Anyone can POST to the Apps Script Web App.

The college did not allow website registration. Teams signed up through a Google Form. This site does not take registrations.

## Routes

| Path | Role |
|------|------|
| `/workshops/esp32-walking-robot/` | During-workshop hub (schedule, field guide) |
| `/labs/esp32-walking-robot/` | Code library. Hardware map is GPIO 0/1/3/10 servos, GPIO 4 buzzer, GPIO 8/9 SH1106. Downloadable sketches: `public/firmware/esp32-walking-robot/` generated from `src/content/labs/esp32-walking-robot/firmware.ts`. |
| `/builders/` | Roster + Find your BOT ID (14 teams) |
| `/builders/[botId]/` | Public profile |
| `/workshops/esp32-walking-robot/vlog/` | Vlog brief + submit to shared Sheet |
| `/workshops/esp32-walking-robot/7-day-challenge/` | Post-workshop personal tracker |
| `/workshops/esp32-walking-robot/social-kit/` | Story PNG + captions |
| `/workshops/buildlab-001/` | Moved: client redirect to the hub |
| `/admin/workshop/` | Public note. Real moderation is the Sheet. **noindex.** |

## Shared store (GAS + Sheets)

Vlog submissions POST to Google Apps Script and append to a `Vlogs` tab. Setup: [`docs/workshop-runtime-gas.md`](workshop-runtime-gas.md).

- Default: `WORKSHOP_RUNTIME_GAS_URL_DEFAULT` in [`src/lib/workshop-runtime.ts`](../src/lib/workshop-runtime.ts)
- Optional override: `NEXT_PUBLIC_WORKSHOP_RUNTIME_GAS_URL` (the `/exec` URL)
- Public GET returns only Status `approved` / `featured` / `winner`
- Pending stays in the Sheet
- No phone or email fields
- If the URL is empty (no default and no env), the form shows **Shared sheet not configured**. It does not silently use localStorage as the product database.

`scripts/buildlab-registration.gs` is a template only. It is not used by the live UI.

## BOT IDs

Roster IDs `BOT-001` through `BOT-014` are on `/builders/` (from the Google Form). Mentors can confirm at check-in. This site does not issue BOT IDs.

`BOT-901+` in `src/content/builders/seed.ts` are layout samples only.

## Public vs private data

Public pages may show: BOT ID, team name, first names, college, robot name, features, awards, public GitHub/demo/video URLs, consented photos.

Never publish: phone, email, WhatsApp, private Drive folder IDs, registration sheet rows, pending vlogs.

## What is local / mock

- 7-Day progress: per-browser localStorage. Post-workshop. Not a shared leaderboard.
- Vlog offline retry: labeled local cache only if the Sheet POST fails or the URL is unset.
- Google Drive: stub in `src/lib/storage/google-drive-provider.ts`.
- Admin page: public checklist. No auth.

## What is live

- Static pages on GitHub Pages / aurigen.tech
- Vlog gallery: client fetch of approved rows from the shared Sheet Web App

## Environment variables

Build-time only (`NEXT_PUBLIC_*` inlined by `next build`).

| Name | Required | Purpose |
|------|----------|---------|
| `NEXT_PUBLIC_WORKSHOP_RUNTIME_GAS_URL` | No (source default) | Optional override of workshop runtime Web App `/exec` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Unused by the live workshop hub |
| `NEXT_PUBLIC_BUILDLAB_GAS_URL` | No | Old registration template only |
| `NEXT_PUBLIC_VLOG_GAS_URL` | No | Legacy alias read by workshop-runtime |
| `NEXT_PUBLIC_CHALLENGE_GAS_URL` | No | Unused. 7-day is local |
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

1. In the private Sheet, set Status to `approved`, `featured`, or `winner`.
2. Refresh `/workshops/esp32-walking-robot/vlog/`. No rebuild required for Sheet-backed rows.
3. Optional static seed: `seedApprovedVlogs` in `src/content/workshops/esp32-walking-robot/vlog.ts`.
