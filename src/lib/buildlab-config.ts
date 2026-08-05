/**
 * BuildLab #001 public client config.
 *
 * NEXT_PUBLIC_* values are inlined at `next build` time (required for static
 * GitHub Pages). Defaults keep production working without CI secrets — the GAS
 * Web App URL is a client-facing endpoint by design.
 *
 * Prefer `.env.local` for local overrides; restart `npm run dev` after changes.
 */

/** Google Apps Script Web App (`…/exec`) for registration POSTs. */
export const BUILDLAB_GAS_URL_DEFAULT =
  "https://script.google.com/macros/s/AKfycbzphh8ibYZf8WlQExJIzaS4AzbfJF-XrcLp-M4nrDiU-LeMELs8682xVpjAAZYF-Lxtzw/exec";

/** Digits only, country code included (India). Used for wa.me links. */
export const WHATSAPP_NUMBER_DEFAULT = "919372580326";

export function getBuildLabGasUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_BUILDLAB_GAS_URL?.trim() ||
    process.env.BUILDLAB_GAS_URL?.trim();
  return fromEnv || BUILDLAB_GAS_URL_DEFAULT;
}

/** Digits-only WhatsApp number with country code. */
export function getWhatsAppNumber(): string {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  return fromEnv || WHATSAPP_NUMBER_DEFAULT;
}
