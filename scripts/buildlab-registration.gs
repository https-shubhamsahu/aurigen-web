/**
 * Aurigen BuildLab #001 — Google Apps Script Web App
 *
 * Deploy:
 * 1. Create a Google Sheet with a tab named "Registrations".
 * 2. Extensions → Apps Script. Paste this file.
 * 3. Set Script Properties: NOTIFICATION_EMAIL (optional, defaults below).
 * 4. Deploy → New deployment → Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5. Copy the Web App URL into NEXT_PUBLIC_BUILDLAB_GAS_URL.
 *
 * Sheet headers (row 1):
 * Timestamp | Full Name | Email | Phone | WhatsApp | College | Branch | Year |
 * Owns Laptop | Experience | Motivation | Source | Workshop ID
 */

var SHEET_NAME = "Registrations";
var NOTIFICATION_EMAIL = "shubhamsahu@aurigen.tech";
var WORKSHOP_ID = "buildlab-001";

function doOptions() {
  return jsonResponse({ ok: true }, 204);
}

function doGet() {
  return jsonResponse({
    ok: true,
    service: "Aurigen BuildLab Registration",
    workshopId: WORKSHOP_ID,
  });
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : "";
    var data = {};
    try {
      data = JSON.parse(raw || "{}");
    } catch (err) {
      return jsonResponse(
        { ok: false, code: "validation", message: "Invalid JSON body." },
        400,
      );
    }

    var validated = validatePayload(data);
    if (!validated.ok) {
      return jsonResponse(
        { ok: false, code: "validation", message: validated.message },
        400,
      );
    }

    var payload = validated.payload;
    var sheet = getOrCreateSheet_();
    var emailKey = String(payload.email).toLowerCase();

    if (isDuplicateEmail_(sheet, emailKey)) {
      return jsonResponse(
        {
          ok: false,
          code: "duplicate",
          message:
            "This email is already registered for BuildLab #001. Check your inbox or contact us on WhatsApp.",
        },
        409,
      );
    }

    sheet.appendRow([
      new Date().toISOString(),
      payload.fullName,
      emailKey,
      payload.phone,
      payload.whatsapp,
      payload.collegeName,
      payload.branch,
      payload.year,
      payload.ownsLaptop,
      payload.experience,
      payload.motivation || "",
      payload.source || "",
      WORKSHOP_ID,
    ]);

    sendStaffNotification_(payload, emailKey);
    sendParticipantConfirmation_(payload, emailKey);

    return jsonResponse({
      ok: true,
      message: "Registration received. Check your email for confirmation.",
    });
  } catch (err) {
    return jsonResponse(
      {
        ok: false,
        code: "error",
        message: "Server error while saving registration.",
      },
      500,
    );
  }
}

function validatePayload(data) {
  function trim(v) {
    return String(v == null ? "" : v).trim();
  }

  var fullName = trim(data.fullName);
  var email = trim(data.email).toLowerCase();
  var phone = trim(data.phone);
  var whatsapp = trim(data.whatsapp);
  var collegeName = trim(data.collegeName);
  var branch = trim(data.branch);
  var year = trim(data.year);
  var ownsLaptop = trim(data.ownsLaptop);
  var experience = trim(data.experience);
  var motivation = trim(data.motivation);
  var source = trim(data.source);
  var consent = data.consent === true || data.consent === "true";

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRe = /^[+]?[\d\s()-]{8,20}$/;
  var years = { first: 1, second: 1, third: 1, fourth: 1, other: 1 };
  var laptops = { yes: 1, no: 1 };
  var experiences = { none: 1, beginner: 1, project: 1, competition: 1 };

  if (fullName.length < 2) {
    return { ok: false, message: "Enter your full name." };
  }
  if (!emailRe.test(email)) {
    return { ok: false, message: "Enter a valid email address." };
  }
  if (!phoneRe.test(phone)) {
    return { ok: false, message: "Enter a valid phone number." };
  }
  if (!phoneRe.test(whatsapp)) {
    return { ok: false, message: "Enter a valid WhatsApp number." };
  }
  if (!collegeName) {
    return { ok: false, message: "Enter your college name." };
  }
  if (!branch) {
    return { ok: false, message: "Enter your branch." };
  }
  if (!years[year]) {
    return { ok: false, message: "Select your year." };
  }
  if (!laptops[ownsLaptop]) {
    return { ok: false, message: "Select whether you own a laptop." };
  }
  if (!experiences[experience]) {
    return { ok: false, message: "Select your previous robotics experience." };
  }
  if (!consent) {
    return { ok: false, message: "Consent is required to reserve a seat." };
  }

  return {
    ok: true,
    payload: {
      fullName: fullName,
      email: email,
      phone: phone,
      whatsapp: whatsapp,
      collegeName: collegeName,
      branch: branch,
      year: year,
      ownsLaptop: ownsLaptop,
      experience: experience,
      motivation: motivation,
      source: source,
      consent: true,
    },
  };
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Full Name",
      "Email",
      "Phone",
      "WhatsApp",
      "College",
      "Branch",
      "Year",
      "Owns Laptop",
      "Experience",
      "Motivation",
      "Source",
      "Workshop ID",
    ]);
  }
  return sheet;
}

function isDuplicateEmail_(sheet, emailKey) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var values = sheet.getRange(2, 3, lastRow, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).toLowerCase() === emailKey) {
      return true;
    }
  }
  return false;
}

function sendStaffNotification_(payload, emailKey) {
  var to =
    PropertiesService.getScriptProperties().getProperty("NOTIFICATION_EMAIL") ||
    NOTIFICATION_EMAIL;
  var subject = "BuildLab #001 registration: " + payload.fullName;
  var body = [
    "New BuildLab #001 registration",
    "",
    "Name: " + payload.fullName,
    "Email: " + emailKey,
    "Phone: " + payload.phone,
    "WhatsApp: " + payload.whatsapp,
    "College: " + payload.collegeName,
    "Branch: " + payload.branch,
    "Year: " + payload.year,
    "Owns laptop: " + payload.ownsLaptop,
    "Experience: " + payload.experience,
    "Motivation: " + (payload.motivation || "(none)"),
    "Source: " + (payload.source || "(none)"),
  ].join("\n");

  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: body,
  });
}

function sendParticipantConfirmation_(payload, emailKey) {
  var subject = "ESP32 Walking Robot Workshop: registration received";
  var body = [
    "Hi " + payload.fullName + ",",
    "",
    "We received your registration for the ESP32 Walking Robot Workshop.",
    "Organizer: Robotics & Automation Club, TSEC.",
    "Dates: 21-22 August 2026.",
    "",
    "Day 1: 21 August 2026, 1:00 PM to 5:30 PM.",
    "Day 2: 22 August 2026, 9:30 AM to 4:30 PM.",
    "Teams: 1 to 5 members. Mentors assign a BOT ID at check-in.",
    "",
    "Our team will follow up with next steps by email or WhatsApp.",
    "",
    "Workshop hub:",
    "https://aurigen.tech/workshops/esp32-walking-robot/",
    "",
    "Registration page:",
    "https://aurigen.tech/workshops/buildlab-001/",
  ].join("\n");

  MailApp.sendEmail({
    to: emailKey,
    subject: subject,
    body: body,
  });
}

function jsonResponse(obj, status) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  // Apps Script web apps do not set arbitrary CORS headers on ContentService
  // responses the same way as HtmlService. Client posts with text/plain to
  // avoid a preflight in most browsers. doOptions is provided for completeness.
  return output;
}
