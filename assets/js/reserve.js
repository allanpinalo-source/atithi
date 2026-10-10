/* Reservation page: validates the booking and sends it to Atithi on WhatsApp. */
(function () {
  "use strict";

  var WA_NUMBER = "260967970640";
  var OPEN_MIN = 10 * 60;      // 10:00
  var LAST_SLOT = 21 * 60 + 30; // 21:30 (kitchen closes 22:00)
  var SLOT_STEP = 30;
  var MAX_GUESTS = 30;
  var CLOSED_DAY = 1;          // Monday

  var doc = document;
  var form = doc.getElementById("reserve-form");
  if (!form) return;

  var dateEl = doc.getElementById("res-date");
  var timeEl = doc.getElementById("res-time");
  var nameEl = doc.getElementById("res-name");
  var phoneEl = doc.getElementById("res-phone");
  var notesEl = doc.getElementById("res-notes");
  var guestsEl = doc.getElementById("res-guests");
  var guestsOut = doc.getElementById("guests-out");
  var guestsNote = doc.getElementById("guests-note");
  var summaryText = doc.getElementById("res-summary-text");
  var errorSummary = doc.getElementById("error-summary");
  var done = doc.getElementById("reserve-done");

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtTime(m) { return pad(Math.floor(m / 60)) + ":" + pad(m % 60); }

  // "Now" in Zambia (CAT, UTC+2), whatever the visitor's device timezone.
  function nowCAT() {
    var d = new Date();
    return new Date(d.getTime() + (d.getTimezoneOffset() + 120) * 60000);
  }
  function isoDate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseDate(v) {
    var p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
    return p ? new Date(+p[1], +p[2] - 1, +p[3]) : null;
  }
  function longDate(d) {
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  /* ---------- Date limits ---------- */
  var today = nowCAT();
  var maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  dateEl.min = isoDate(today);
  dateEl.max = isoDate(maxDate);

  /* ---------- Time slots (past slots hidden when booking for today) ---------- */
  function buildSlots() {
    var keep = timeEl.value;
    var d = parseDate(dateEl.value);
    var now = nowCAT();
    var earliest = OPEN_MIN;
    if (d && isoDate(d) === isoDate(now)) {
      var m = now.getHours() * 60 + now.getMinutes() + 30; // at least 30 minutes' notice
      earliest = Math.max(OPEN_MIN, Math.ceil(m / SLOT_STEP) * SLOT_STEP);
    }
    var html = '<option value="">Choose a time</option>';
    var count = 0;
    for (var t = OPEN_MIN; t <= LAST_SLOT; t += SLOT_STEP) {
      if (t < earliest) continue;
      var label = fmtTime(t);
      var part = t < 12 * 60 ? "Morning" : t < 17 * 60 ? "Afternoon" : "Evening";
      html += '<option value="' + label + '"' + (label === keep ? " selected" : "") + ">" + label + " · " + part + "</option>";
      count++;
    }
    if (!count) html = '<option value="">No more tables today, so please pick another date</option>';
    timeEl.innerHTML = html;
  }

  /* ---------- Guests ---------- */
  function setGuests(n) {
    n = Math.max(1, Math.min(MAX_GUESTS, n));
    guestsEl.value = n;
    guestsOut.textContent = n + (n === MAX_GUESTS ? "+" : "");
    doc.getElementById("guests-dec").disabled = n <= 1;
    doc.getElementById("guests-inc").disabled = n >= MAX_GUESTS;
    guestsNote.textContent = n >= 10 ? "For big groups we recommend a private gazebo." : "";
    updateSummary();
  }
  doc.getElementById("guests-dec").addEventListener("click", function () { setGuests(+guestsEl.value - 1); });
  doc.getElementById("guests-inc").addEventListener("click", function () { setGuests(+guestsEl.value + 1); });

  /* ---------- Prefill from links like reservation.html?area=bar ---------- */
  var params = new URLSearchParams(location.search);
  var areaKey = params.get("area");
  if (areaKey) {
    var pre = form.querySelector('input[name="area"][data-key="' + areaKey + '"]');
    if (pre) pre.checked = true;
    if (areaKey === "bar") form.querySelector('input[name="occasion"][value="Match day"]').checked = true;
  }

  /* ---------- Validation ---------- */
  function setError(input, errId, msg) {
    var err = doc.getElementById(errId);
    err.textContent = msg || "";
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }
  function checkDate() {
    var d = parseDate(dateEl.value);
    var msg = "";
    if (!d) msg = "Please choose the date of your visit.";
    else if (isoDate(d) < isoDate(nowCAT())) msg = "That date has passed. Please choose today or a later date.";
    else if (d > maxDate) msg = "We take bookings up to 3 months ahead. Please choose an earlier date.";
    else if (d.getDay() === CLOSED_DAY) msg = "We're closed on Mondays. Please choose Tuesday to Sunday.";
    return setError(dateEl, "date-err", msg);
  }
  function checkTime() { return setError(timeEl, "time-err", timeEl.value ? "" : "Please choose a time."); }
  function checkName() { return setError(nameEl, "name-err", nameEl.value.trim().length >= 2 ? "" : "Please enter your name."); }
  function checkPhone() {
    var digits = phoneEl.value.replace(/\D/g, "");
    return setError(phoneEl, "phone-err", digits.length >= 9 && digits.length <= 13 ? "" : "Please enter a valid phone number, e.g. 097 123 4567.");
  }

  dateEl.addEventListener("change", function () { checkDate(); buildSlots(); updateSummary(); });
  timeEl.addEventListener("change", function () { checkTime(); updateSummary(); });
  nameEl.addEventListener("blur", function () { if (nameEl.value) checkName(); });
  phoneEl.addEventListener("blur", function () { if (phoneEl.value) checkPhone(); });
  [nameEl, phoneEl].forEach(function (el) {
    el.addEventListener("input", function () {
      if (el.getAttribute("aria-invalid") === "true") (el === nameEl ? checkName : checkPhone)();
    });
  });
  form.addEventListener("change", function (e) { if (e.target.name === "area" || e.target.name === "occasion") updateSummary(); });

  /* ---------- Summary + message ---------- */
  function values() {
    return {
      date: parseDate(dateEl.value),
      time: timeEl.value,
      guests: +guestsEl.value,
      area: (form.querySelector('input[name="area"]:checked') || {}).value || "",
      occasion: (form.querySelector('input[name="occasion"]:checked') || {}).value || "",
      name: nameEl.value.trim(),
      phone: phoneEl.value.trim(),
      notes: notesEl.value.trim()
    };
  }
  function guestsLabel(n) { return n + (n === MAX_GUESTS ? "+" : "") + (n === 1 ? " guest" : " guests"); }

  function updateSummary() {
    var v = values();
    if (!v.date || !v.time) {
      summaryText.textContent = "Choose a date and time to see your booking summary.";
      return;
    }
    summaryText.innerHTML = "<strong>" + longDate(v.date) + " at " + v.time + "</strong><br>" +
      guestsLabel(v.guests) + " · " + v.area + (v.occasion ? " · " + v.occasion : "");
  }

  function buildMessage(v) {
    var lines = [
      "Hello Atithi! I'd like to reserve a table.",
      "",
      "Date: " + longDate(v.date),
      "Time: " + v.time,
      "Guests: " + guestsLabel(v.guests),
      "Seating: " + v.area
    ];
    if (v.occasion) lines.push("Occasion: " + v.occasion);
    lines.push("", "Name: " + v.name, "Phone: " + v.phone);
    if (v.notes) lines.push("Requests: " + v.notes);
    return lines.join("\n");
  }

  function showErrors(list) {
    var ul = errorSummary.querySelector("ul");
    ul.innerHTML = list.map(function (e) {
      return '<li><a href="#' + e.id + '">' + e.msg + "</a></li>";
    }).join("");
    errorSummary.hidden = false;
    errorSummary.focus();
  }
  errorSummary.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    var el = doc.getElementById(a.getAttribute("href").slice(1));
    el.focus();
    el.scrollIntoView({ block: "center" });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var checks = [
      { ok: checkDate(), id: "res-date", err: "date-err" },
      { ok: checkTime(), id: "res-time", err: "time-err" },
      { ok: checkName(), id: "res-name", err: "name-err" },
      { ok: checkPhone(), id: "res-phone", err: "phone-err" }
    ];
    var bad = checks.filter(function (c) { return !c.ok; }).map(function (c) {
      return { id: c.id, msg: doc.getElementById(c.err).textContent };
    });
    if (bad.length) { showErrors(bad); return; }
    errorSummary.hidden = true;

    var v = values();
    var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(buildMessage(v));
    window.open(url, "_blank", "noopener");

    doc.getElementById("done-wa").href = url;
    doc.getElementById("done-summary").innerHTML = "<strong>" + longDate(v.date) + " at " + v.time + "</strong> · " +
      guestsLabel(v.guests) + " · " + v.area;
    form.hidden = true;
    done.hidden = false;
    done.focus();
    done.scrollIntoView({ block: "start" });
  });

  doc.getElementById("done-edit").addEventListener("click", function () {
    done.hidden = true;
    form.hidden = false;
    dateEl.focus();
  });

  buildSlots();
  setGuests(2);
})();
