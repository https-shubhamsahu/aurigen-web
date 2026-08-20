/**
 * ESP32 Walking Robot workshop runtime — Google Apps Script Web App
 *
 * Shared store for DURING-workshop submissions (vlogs).
 * Admin = this private Google Sheet (share it with mentors).
 * The website is public. Anyone can POST. That is expected.
 *
 * doGet never returns pending rows, phone, or email.
 * ?role=mentor is NOT a secret and is ignored. Open the Sheet to moderate.
 *
 * Deploy:
 * 1. Create a Google Spreadsheet (name it e.g. ESP32 Walking Robot Workshop Runtime).
 * 2. Extensions → Apps Script. Paste this file. Save.
 * 3. Deploy → New deployment → Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 4. Put the Web App URL (.../exec) in WORKSHOP_RUNTIME_GAS_URL_DEFAULT
 *    (src/lib/workshop-runtime.ts). Optional local override:
 *    NEXT_PUBLIC_WORKSHOP_RUNTIME_GAS_URL in .env.local. Rebuild for Pages.
 *
 * Tabs (created if missing):
 *   Vlogs: Timestamp | Bot ID | Team Name | Video URL | Instagram | YouTube |
 *          Description | GitHub | Consent | Status | Workshop ID
 *   ChallengeProgress (optional): Timestamp | Bot ID | Completed Days | Workshop ID
 *
 * Moderate vlogs: set Status to approved, featured, or winner.
 * Leave pending (or blank) to keep a row off the public site.
 */

var VLOGS_SHEET = "Vlogs";
var CHALLENGE_SHEET = "ChallengeProgress";
var WORKSHOP_ID = "esp32-walking-robot";
var BOT_ID_RE = /^BOT-\d{3,}$/i;
var PUBLIC_STATUSES = { approved: 1, featured: 1, winner: 1 };

function doOptions() {
  return jsonResponse_({ ok: true });
}

function doGet(e) {
  try {
    var type = param_(e, "type") || "vlog";
    if (type === "challenge_progress") {
      return jsonResponse_({
        ok: true,
        service: "workshop-runtime",
        workshopId: WORKSHOP_ID,
        message:
          "Challenge progress is not public. Open the Google Sheet to view it.",
        items: [],
      });
    }

    var vlogs = listPublicVlogs_();
    return jsonResponse_({
      ok: true,
      service: "workshop-runtime",
      workshopId: WORKSHOP_ID,
      vlogs: vlogs,
    });
  } catch (err) {
    return jsonResponse_({
      ok: false,
      code: "error",
      message: "Could not read the shared sheet.",
    });
  }
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : "";
    var data = {};
    try {
      data = JSON.parse(raw || "{}");
    } catch (err) {
      return jsonResponse_({
        ok: false,
        code: "validation",
        message: "Invalid JSON body.",
      });
    }

    var type = String(data.type || "vlog").trim().toLowerCase();
    if (type === "challenge_progress") {
      return saveChallengeProgress_(data);
    }
    if (type === "vlog") {
      return saveVlog_(data);
    }

    return jsonResponse_({
      ok: false,
      code: "validation",
      message: "Unknown type. Use vlog or challenge_progress.",
    });
  } catch (err) {
    return jsonResponse_({
      ok: false,
      code: "error",
      message: "Server error while saving to the shared sheet.",
    });
  }
}

function saveVlog_(data) {
  var validated = validateVlog_(data);
  if (!validated.ok) {
    return jsonResponse_({
      ok: false,
      code: "validation",
      message: validated.message,
    });
  }

  var payload = validated.payload;
  var sheet = getOrCreateVlogsSheet_();

  if (isDuplicateVlog_(sheet, payload.botId, payload.videoUrl)) {
    return jsonResponse_({
      ok: false,
      code: "duplicate",
      message: "This video URL is already saved for this BOT ID.",
    });
  }

  sheet.appendRow([
    new Date().toISOString(),
    payload.botId,
    payload.teamName,
    payload.videoUrl,
    payload.instagram,
    payload.youtube,
    payload.description,
    payload.github,
    payload.consent ? "TRUE" : "FALSE",
    "pending",
    WORKSHOP_ID,
  ]);

  return jsonResponse_({
    ok: true,
    type: "vlog",
    message: "Saved to shared sheet.",
  });
}

function saveChallengeProgress_(data) {
  var botId = normalizeBotId_(data.botId);
  if (!BOT_ID_RE.test(botId)) {
    return jsonResponse_({
      ok: false,
      code: "validation",
      message: "Use a BOT ID like BOT-001.",
    });
  }

  var days = Array.isArray(data.completedDays) ? data.completedDays : [];
  var cleaned = [];
  for (var i = 0; i < days.length; i++) {
    var n = Number(days[i]);
    if (n >= 1 && n <= 7 && cleaned.indexOf(n) === -1) cleaned.push(n);
  }
  cleaned.sort(function (a, b) {
    return a - b;
  });

  var sheet = getOrCreateChallengeSheet_();
  sheet.appendRow([
    new Date().toISOString(),
    botId,
    cleaned.join(","),
    WORKSHOP_ID,
  ]);

  return jsonResponse_({
    ok: true,
    type: "challenge_progress",
    message: "Saved to shared sheet.",
  });
}

function validateVlog_(data) {
  var botId = normalizeBotId_(data.botId);
  var teamName = trim_(data.teamName);
  var videoUrl = trim_(data.videoUrl);
  var instagram = trim_(data.instagram || data.instagramUrl);
  var youtube = trim_(data.youtube || data.youtubeUrl);
  var description = trim_(data.description);
  var github = trim_(data.github || data.githubUrl);
  var consent = data.consent === true || data.consent === "true" || data.consent === "TRUE";

  if (!BOT_ID_RE.test(botId)) {
    return { ok: false, message: "Use a BOT ID like BOT-001." };
  }
  if (teamName.length < 2) {
    return { ok: false, message: "Enter a team name." };
  }
  if (!/^https?:\/\//i.test(videoUrl)) {
    return { ok: false, message: "Enter a valid video URL." };
  }
  if (description.length < 10) {
    return { ok: false, message: "Add a short description." };
  }
  if (!consent) {
    return { ok: false, message: "Consent is required to submit a vlog." };
  }

  return {
    ok: true,
    payload: {
      botId: botId,
      teamName: teamName,
      videoUrl: videoUrl,
      instagram: instagram,
      youtube: youtube,
      description: description,
      github: github,
      consent: true,
    },
  };
}

function listPublicVlogs_() {
  var sheet = getOrCreateVlogsSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var values = sheet.getRange(2, 1, lastRow - 1, 11).getValues();
  var out = [];
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var consent = isTruthy_(row[8]);
    var status = String(row[9] || "").trim().toLowerCase();
    if (!consent) continue;
    if (!PUBLIC_STATUSES[status]) continue;

    var botId = normalizeBotId_(row[1]);
    var videoUrl = trim_(row[3]);
    if (!BOT_ID_RE.test(botId) || !videoUrl) continue;

    out.push({
      id: "sheet_" + (i + 2),
      botId: botId,
      teamName: trim_(row[2]),
      videoUrl: videoUrl,
      instagramUrl: trim_(row[4]) || undefined,
      youtubeUrl: trim_(row[5]) || undefined,
      description: trim_(row[6]),
      githubUrl: trim_(row[7]) || undefined,
      consent: true,
      status: status,
      createdAt: String(row[0] || ""),
    });
  }
  return out;
}

function isDuplicateVlog_(sheet, botId, videoUrl) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var values = sheet.getRange(2, 2, lastRow - 1, 3).getValues();
  var idKey = String(botId).toUpperCase();
  var urlKey = normalizeUrl_(videoUrl);
  for (var i = 0; i < values.length; i++) {
    var rowId = String(values[i][0] || "").toUpperCase();
    var rowUrl = normalizeUrl_(values[i][2]);
    if (rowId === idKey && rowUrl === urlKey) return true;
  }
  return false;
}

function getOrCreateVlogsSheet_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(VLOGS_SHEET);
  if (!sheet) sheet = ss.insertSheet(VLOGS_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Bot ID",
      "Team Name",
      "Video URL",
      "Instagram",
      "YouTube",
      "Description",
      "GitHub",
      "Consent",
      "Status",
      "Workshop ID",
    ]);
  }
  return sheet;
}

function getOrCreateChallengeSheet_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(CHALLENGE_SHEET);
  if (!sheet) sheet = ss.insertSheet(CHALLENGE_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Bot ID", "Completed Days", "Workshop ID"]);
  }
  return sheet;
}

function getSpreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (id) return SpreadsheetApp.openById(id);
  return SpreadsheetApp.getActiveSpreadsheet();
}

function jsonResponse_(obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function param_(e, name) {
  if (!e || !e.parameter) return "";
  return String(e.parameter[name] || "").trim();
}

function trim_(v) {
  return String(v == null ? "" : v).trim();
}

function normalizeBotId_(v) {
  return trim_(v).toUpperCase();
}

function normalizeUrl_(v) {
  return trim_(v).toLowerCase().replace(/\/+$/, "");
}

function isTruthy_(v) {
  var s = String(v == null ? "" : v).trim().toLowerCase();
  return s === "true" || s === "yes" || s === "1";
}
