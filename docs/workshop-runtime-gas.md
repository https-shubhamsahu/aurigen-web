# Workshop runtime (Google Apps Script + Sheets)

This is the shared store for **during-workshop** vlog submissions.

- **Admin** = the private Google Sheet. Share it with mentors. That is the access control.
- **Website** = public static GitHub Pages. Anyone can POST. `/admin/workshop/` is not secure.
- Public `doGet` returns only rows whose **Status** is `approved`, `featured`, or `winner`. Pending stays in the Sheet.
- No phone or email fields. Do not add them.

The college did not allow website registration. Teams already signed up through a Google Form. This script is **not** a registration backend.

## 1. Copy the script

1. Open Google Drive and create a Google Spreadsheet named `ESP32 Walking Robot Workshop Runtime`.
2. **Extensions → Apps Script**.
3. Delete the default `Code.gs` contents.
4. Paste [`scripts/workshop-runtime.gs`](../scripts/workshop-runtime.gs).
5. Save the project (name it `workshop-runtime`).

If you use a standalone Apps Script project (not bound to the sheet), add a Script property `SPREADSHEET_ID` with the spreadsheet ID from the Sheet URL.

## 2. Create spreadsheet tabs

The script creates tabs if they are missing. You can also create them first:

### `Vlogs` (row 1 headers)

| Timestamp | Bot ID | Team Name | Video URL | Instagram | YouTube | Description | GitHub | Consent | Status | Workshop ID |
|-----------|--------|-----------|-----------|-----------|---------|-------------|--------|---------|--------|-------------|

- New POSTs append `Status = pending`.
- Moderate by editing **Status**.
- Do not put phone or email on this tab.

### `ChallengeProgress` (optional)

| Timestamp | Bot ID | Completed Days | Workshop ID |
|-----------|--------|----------------|-------------|

Public `doGet` does **not** return this tab. Mentors open the Sheet.

## 3. Deploy the web app

1. **Deploy → New deployment → Web app**
2. Execute as: **Me**
3. Who has access: **Anyone**
4. Authorize Sheets access.
5. Copy the Web app URL. It ends in `/exec`:

```
https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Redeploy after every script change (**Manage deployments → Edit → New version**).

Anyone who has the `/exec` URL can POST. That is expected on a public site. The Sheet sharing list is what limits who can approve rows.

## 4. Point the site at the `/exec` URL

Static export inlines `NEXT_PUBLIC_*` at **build** time.

### Defaults (static Pages without CI secrets)

[`src/lib/workshop-runtime.ts`](../src/lib/workshop-runtime.ts) falls back to `WORKSHOP_RUNTIME_GAS_URL_DEFAULT` when env vars are unset, so `next build` for Pages still ships a working vlog form. The GAS Web App URL is a client-facing endpoint by design (same pattern as [`src/lib/buildlab-config.ts`](../src/lib/buildlab-config.ts)).

If that default is also empty, the vlog form shows **Shared sheet not configured**. It will not silently treat localStorage as the product database.

### Local (`.env.local`)

```
NEXT_PUBLIC_WORKSHOP_RUNTIME_GAS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

`.env.local` is gitignored. Restart `npm run dev` after changing env vars.

### GitHub Pages (optional overrides)

Add a repository secret named `NEXT_PUBLIC_WORKSHOP_RUNTIME_GAS_URL` only if you want to override the source default without a code change. `.github/workflows/deploy-pages.yml` passes it into `next build`. Empty secrets fall through to `WORKSHOP_RUNTIME_GAS_URL_DEFAULT`.

## 5. How mentors approve vlogs

1. Open the private Google Sheet (the real admin).
2. On the `Vlogs` tab, find the new row (`Status` is `pending` or blank).
3. Confirm the video URL is public and consent is TRUE.
4. Set **Status** to one of:
   - `approved` (shows in the public gallery)
   - `featured`
   - `winner`
5. To keep a row off the site, leave `pending`, set `rejected`, or clear Status.
6. Refresh `/workshops/esp32-walking-robot/vlog/` (client fetch, no rebuild needed for gallery rows).

`?role=mentor` on the Web App URL is **not** a secret. The script ignores it. Pending rows never go to the public website.

## 6. Verify

1. Confirm the default in `src/lib/workshop-runtime.ts` (or `.env.local`) and rebuild if you changed it.
2. Open `/workshops/esp32-walking-robot/vlog/`.
3. Submit a test vlog with BOT ID `BOT-001` and a public `https://` video URL.
4. Confirm a new `pending` row on the `Vlogs` tab. No phone/email columns.
5. Confirm the public gallery still does **not** show the test row.
6. Change Status to `approved`. Refresh the gallery. The vlog should appear.
7. Submit the same BOT ID + video URL again. Expect a duplicate message.
8. Open `/admin/workshop/`. It should say this URL is public and point here.

## Client contract

POST `Content-Type: text/plain;charset=utf-8` (avoids a CORS preflight):

```json
{
  "type": "vlog",
  "botId": "BOT-001",
  "teamName": "Team name",
  "videoUrl": "https://...",
  "instagram": "",
  "youtube": "",
  "description": "What we built, broke, and fixed.",
  "github": "",
  "consent": true
}
```

GET `?type=vlog` returns `{ ok: true, vlogs: [...] }` with approved rows only. Fields: botId, teamName, videoUrl, instagramUrl, youtubeUrl, description, githubUrl, consent, status, createdAt. No PII.

Optional POST `{ "type": "challenge_progress", "botId": "BOT-001", "completedDays": [1, 2] }` appends to `ChallengeProgress`. The public site does not show a global leaderboard from this.
