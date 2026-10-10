(function () {
  "use strict";

  var WA_NUMBER = "260967970640";
  var STORE_KEY = "atithi-order-v1";
  var doc = document;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function kwacha(n) { return "K" + n.toLocaleString("en-ZM"); }
  function icon(id, cls) { return '<svg class="icon ' + (cls || "") + '" aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* Active nav link while scrolling (header itself is handled by site.js) */
  var navLinks = $$(".primary-nav ul a");
  if ("IntersectionObserver" in window) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + en.target.id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) {
      var s = $(a.getAttribute("href"));
      if (s) sectionObs.observe(s);
    });
  }

  /* ---------- Menu ---------- */
  var MENU = window.ATITHI_MENU || [];
  var itemsById = {};
  var tabsEl = $("#menu-tabs");
  var panelsEl = $("#menu-panels");

  // itemsById holds everything that can be ordered: one entry per dish,
  // or one per size for items with options (e.g. wine by glass / bottle).
  MENU.forEach(function (cat) {
    cat.groups.forEach(function (g, gi) {
      g.items.forEach(function (it, ii) {
        it.id = cat.id + "-" + gi + "-" + ii;
        if (it.options) {
          it.options.forEach(function (opt, k) {
            opt.id = it.id + "~" + k;
            itemsById[opt.id] = { name: it.name + " (" + opt.label.toLowerCase() + ")", price: opt.price, btn: opt.label };
          });
        } else {
          itemsById[it.id] = { name: it.name, price: it.price, btn: "Add" };
        }
      });
    });
  });

  /* Drink illustrations — small inline SVGs drawn from each drink's `art` */
  var artSeq = 0;
  var GLASSES = {
    martini: { glass: "M22 40H98L60 90Z", top: 46, stem: [59, 90, 46], base: 140 },
    coupe: { glass: "M18 42H102Q100 80 60 82Q20 80 18 42Z", top: 48, stem: [59, 82, 54], base: 140 },
    hurricane: { glass: "M38 22Q30 56 44 78Q52 92 48 108Q46 118 54 122H66Q74 118 72 108Q68 92 76 78Q90 56 82 22Z", top: 34, stem: [58, 122, 16], base: 140 },
    highball: { glass: "M34 30H86L82 138Q82 142 78 142H42Q38 142 38 138Z", top: 44, stem: null, base: 0 }
  };
  function garnishSVG(type, x, y) {
    switch (type) {
      case "lime":
      case "lemon":
      case "orange": {
        var c = { lime: ["#9ccc3c", "#e6f7b0"], lemon: ["#f5d43b", "#fff6c2"], orange: ["#f59e0b", "#ffe2b0"] }[type];
        return '<g transform="translate(' + x + " " + y + ')"><circle r="13" fill="' + c[0] + '"/><circle r="10" fill="' + c[1] + '"/>' +
          '<path d="M0-10V10M-10 0H10M-7-7L7 7M7-7L-7 7" stroke="' + c[0] + '" stroke-width="1.2"/></g>';
      }
      case "cherry":
        return '<g transform="translate(' + x + " " + y + ')"><path d="M0-4Q4-18 14-22" stroke="#4d7c0f" stroke-width="2" fill="none"/><circle r="8" fill="#dc2626"/><circle cx="-3" cy="-3" r="2.2" fill="#fff" fill-opacity=".6"/></g>';
      case "strawberry":
        return '<g transform="translate(' + x + " " + y + ')"><path d="M-11-6Q0-12 11-6Q10 8 0 16Q-10 8-11-6Z" fill="#e11d48"/>' +
          '<path d="M-9-7L-4-13L0-8L4-13L9-7Z" fill="#65a30d"/><g fill="#fde68a"><circle cx="-4" cy="0" r="1"/><circle cx="3" cy="-1" r="1"/><circle cx="0" cy="6" r="1"/><circle cx="-5" cy="7" r="1"/><circle cx="5" cy="6" r="1"/></g></g>';
      case "pineapple":
        return '<g transform="translate(' + x + " " + y + ')"><path d="M-12 8L0-10L12 8Z" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>' +
          '<path d="M-3-10Q-8-22-4-26Q0-18 0-10Q2-22 8-24Q6-16 3-10Z" fill="#16a34a"/></g>';
      case "mint":
        return '<g transform="translate(' + x + " " + y + ')"><path d="M0 0Q-14-6-12-20Q2-16 0 0Z" fill="#22c55e"/><path d="M0 0Q12-10 16-22Q2-22 0 0Z" fill="#16a34a"/><path d="M0 0Q-2-14 2-26Q8-12 0 0Z" fill="#4ade80"/></g>';
      default:
        return "";
    }
  }
  function drinkSVG(art, label) {
    var g = GLASSES[art.glass] || GLASSES.highball;
    var n = ++artSeq;
    var clip = "dc" + n, grad = "dg" + n;
    var s = '<svg viewBox="0 0 120 150" role="img" aria-label="' + esc(label) + '" focusable="false"><defs>' +
      '<clipPath id="' + clip + '"><path d="' + g.glass + '"/></clipPath>' +
      '<linearGradient id="' + grad + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + art.color + '"/><stop offset="1" stop-color="' + (art.color2 || art.color) + '"/></linearGradient></defs>' +
      '<rect x="0" y="' + g.top + '" width="120" height="110" fill="url(#' + grad + ')" clip-path="url(#' + clip + ')"/>';
    if (art.glass === "highball") {
      s += '<g clip-path="url(#' + clip + ')" fill="#fff" fill-opacity=".28"><rect x="42" y="52" width="16" height="16" rx="3" transform="rotate(-8 50 60)"/><rect x="62" y="70" width="16" height="16" rx="3" transform="rotate(10 70 78)"/><rect x="46" y="90" width="15" height="15" rx="3"/></g>' +
        '<g fill="#fff" fill-opacity=".5"><circle cx="52" cy="118" r="1.6"/><circle cx="66" cy="110" r="1.2"/><circle cx="72" cy="126" r="1.4"/></g>' +
        '<path d="M70 44L84 8" stroke="#e8c987" stroke-width="3" stroke-linecap="round"/>';
    }
    s += '<path d="' + g.glass + '" fill="#fff" fill-opacity=".05" stroke="#fff" stroke-opacity=".75" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M' + (art.glass === "highball" ? "40 40V128" : art.glass === "hurricane" ? "42 32Q38 56 48 74" : "34 46L52 70") + '" stroke="#fff" stroke-opacity=".35" stroke-width="2.5" stroke-linecap="round" fill="none"/>';
    if (g.stem) s += '<rect x="' + g.stem[0] + '" y="' + g.stem[1] + '" width="2.5" height="' + (g.base - g.stem[1]) + '" fill="#fff" fill-opacity=".75"/>';
    if (g.base) s += '<ellipse cx="60" cy="' + g.base + '" rx="22" ry="4" fill="#fff" fill-opacity=".75"/>';
    if (art.rim) s += '<g fill="#fff">' + [22, 32, 42, 52, 62, 72, 82, 92].map(function (x) { return '<circle cx="' + x + '" cy="42" r="1.8"/>'; }).join("") + "</g>";
    var gx = art.glass === "highball" ? 88 : art.glass === "hurricane" ? 84 : 96;
    var gy = art.glass === "highball" ? 34 : art.glass === "hurricane" ? 24 : 40;
    if (art.garnish === "mint") { gx = 54; gy = 34; }
    s += garnishSVG(art.garnish, gx, gy);
    return s + "</svg>";
  }

  function addButton(id, label, aria) {
    return '<button type="button" class="add-btn" data-add="' + id + '" aria-label="' + esc(aria) + '">' +
      icon("i-plus") + '<span class="add-label">' + esc(label) + "</span></button>";
  }

  function renderDrinkCard(it) {
    // A photo (img) is preferred; the drawn illustration (art) is the fallback.
    var visual = it.img
      ? '<img src="' + it.img + '" alt="' + esc(it.name) + '" loading="lazy" decoding="async">'
      : (it.art ? drinkSVG(it.art, "Illustration of a " + it.name) : "");
    var glow = it.art ? ' style="--glow:' + it.art.color2 + '"' : "";
    var head = '<div class="mi-head"><h4 class="mi-name">' + esc(it.name) + "</h4>" +
      (it.options ? "" : '<span class="mi-dots" aria-hidden="true"></span><span class="mi-price">' + kwacha(it.price) + "</span>") + "</div>";
    var actions = it.options
      ? '<div class="opt-btns">' + it.options.map(function (opt) {
          return addButton(opt.id, opt.label + " · " + kwacha(opt.price), "Add a " + opt.label.toLowerCase() + " of " + it.name + " to order");
        }).join("") + "</div>"
      : addButton(it.id, "Add", "Add " + it.name + " to order");
    return '<li class="drink-card' + (it.img ? " has-photo" : "") + '"' + glow + ">" +
      '<div class="drink-art">' + visual + "</div>" +
      '<div class="drink-body">' + head +
      (it.desc ? '<p class="mi-desc">' + esc(it.desc) + "</p>" : "") +
      actions + "</div></li>";
  }

  function renderMenu() {
    tabsEl.innerHTML = MENU.map(function (cat, i) {
      return '<button type="button" class="menu-tab" role="tab" id="tab-' + cat.id + '" aria-controls="panel-' + cat.id +
        '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(cat.label) + "</button>";
    }).join("");

    panelsEl.innerHTML = MENU.map(function (cat, i) {
      var cols = cat.groups.length > 1 ? " cols-2" : "";
      return '<div class="menu-panel" role="tabpanel" id="panel-' + cat.id + '" aria-labelledby="tab-' + cat.id + '" tabindex="0"' + (i === 0 ? "" : " hidden") + ">" +
        (cat.note ? '<p class="menu-panel-note">' + esc(cat.note) + "</p>" : "") +
        '<div class="menu-groups' + cols + '">' +
        cat.groups.map(function (g) {
          var list = cat.layout === "cards"
            ? '<ul class="drink-grid">' + g.items.map(renderDrinkCard).join("") + "</ul>"
            : '<ul class="menu-items">' + g.items.map(renderItem).join("") + "</ul>";
          return '<section class="menu-group"><h3>' + esc(g.title) + "</h3>" + list + "</section>";
        }).join("") +
        "</div>" +
        (cat.footnote ? '<p class="menu-footnote">' + esc(cat.footnote) + "</p>" : "") +
        "</div>";
    }).join("");
  }

  function renderItem(it) {
    var tags = it.veg ? ' <span class="mi-tags"><span class="tag tag-veg"><span class="veg-dot" aria-hidden="true"></span>Veg</span></span>' : "";
    if (it.options) {
      return '<li class="menu-item has-options"><div class="mi-main"><div class="mi-head"><span class="mi-name">' + esc(it.name) + tags + "</span></div>" +
        (it.desc ? '<p class="mi-desc">' + esc(it.desc) + "</p>" : "") +
        '<div class="opt-btns">' + it.options.map(function (opt) {
          return addButton(opt.id, opt.label + " · " + kwacha(opt.price), "Add a " + opt.label.toLowerCase() + " of " + it.name + " to order");
        }).join("") + "</div></div></li>";
    }
    return '<li class="menu-item">' +
      '<div class="mi-main"><div class="mi-head"><span class="mi-name">' + esc(it.name) + tags +
      '</span><span class="mi-dots" aria-hidden="true"></span><span class="mi-price">' + kwacha(it.price) + "</span></div>" +
      (it.desc ? '<p class="mi-desc">' + esc(it.desc) + "</p>" : "") + "</div>" +
      addButton(it.id, "Add", "Add " + it.name + " to order") +
      "</li>";
  }

  renderMenu();

  // Signature drinks in the Bar Arena section
  var barDrinks = $("#bar-drinks");
  if (barDrinks) {
    var showcase = [];
    MENU.forEach(function (cat) { cat.groups.forEach(function (g) { g.items.forEach(function (it) { if (it.showcase && it.art) showcase.push(it); }); }); });
    barDrinks.innerHTML = showcase.map(renderDrinkCard).join("");
  }

  var tabs = $$(".menu-tab", tabsEl);
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      $("#" + t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
    // scroll only the tab strip horizontally — never the page
    var left = tab.offsetLeft - (tabsEl.clientWidth - tab.offsetWidth) / 2;
    tabsEl.scrollTo({ left: left, behavior: reduceMotion ? "auto" : "smooth" });
  }
  tabsEl.addEventListener("click", function (e) {
    var t = e.target.closest(".menu-tab");
    if (t) selectTab(t, false);
  });
  tabsEl.addEventListener("keydown", function (e) {
    var i = tabs.indexOf(doc.activeElement);
    if (i < 0) return;
    var next = null;
    if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
    else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === "Home") next = tabs[0];
    else if (e.key === "End") next = tabs[tabs.length - 1];
    if (next) { e.preventDefault(); selectTab(next, true); }
  });

  /* ---------- Order basket ---------- */
  var order = {};
  try { order = JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {}; } catch (e) { order = {}; }
  Object.keys(order).forEach(function (id) { if (!itemsById[id] || !(order[id] > 0)) delete order[id]; });

  var orderBar = $("#order-bar");
  var waFloat = $("#wa-float");
  var dialog = $("#order-dialog");
  var listEl = $("#order-list");
  var form = $("#order-form");
  var toastEl = $("#toast");
  var toastTimer;

  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(order)); } catch (e) { /* storage unavailable */ } }
  function count() { return Object.keys(order).reduce(function (s, id) { return s + order[id]; }, 0); }
  function total() { return Object.keys(order).reduce(function (s, id) { return s + order[id] * itemsById[id].price; }, 0); }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 3000);
  }

  function syncUI() {
    var c = count();
    orderBar.hidden = c === 0;
    waFloat.classList.toggle("is-hidden", c > 0);
    $("#order-count").textContent = c;
    $("#order-total").textContent = kwacha(total());
    $("#order-sum").textContent = kwacha(total());
    $(".order-bar-btn").setAttribute("aria-label", "View order: " + c + " item" + (c === 1 ? "" : "s") + ", " + kwacha(total()));

    $$(".add-btn").forEach(function (b) {
      var id = b.getAttribute("data-add");
      var q = order[id] || 0;
      var entry = itemsById[id];
      var base = entry.btn === "Add" ? "Add" : entry.btn + " · " + kwacha(entry.price);
      b.classList.toggle("in-order", q > 0);
      b.querySelector(".add-label").innerHTML = q > 0
        ? (entry.btn === "Add" ? "Added" : esc(entry.btn)) + ' <span class="qty">×' + q + "</span>"
        : esc(base);
      b.setAttribute("aria-label", q > 0 ? "Add another " + entry.name + " (" + q + " in order)" : "Add " + entry.name + " to order");
    });

    var ids = Object.keys(order);
    listEl.innerHTML = ids.length ? ids.map(function (id) {
      var it = itemsById[id];
      return '<li class="order-row"><div><div class="or-name">' + esc(it.name) + '</div><div class="or-price">' +
        kwacha(it.price) + " each · " + kwacha(it.price * order[id]) + "</div></div>" +
        '<div class="stepper"><button type="button" data-dec="' + id + '" aria-label="Remove one ' + esc(it.name) + '">' + icon("i-minus") +
        '</button><output aria-live="polite">' + order[id] + '</output><button type="button" data-inc="' + id + '" aria-label="Add one ' + esc(it.name) + '">' + icon("i-plus") +
        "</button></div></li>";
    }).join("") : '<li class="order-empty">Your order is empty. Add dishes from the menu.</li>';
  }

  function change(id, delta) {
    order[id] = (order[id] || 0) + delta;
    if (order[id] <= 0) delete order[id];
    save();
    syncUI();
  }

  doc.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (b) {
      var id = b.getAttribute("data-add");
      change(id, 1);
      toast(itemsById[id].name + " added to your order");
      return;
    }
    // links like "See all cocktails" open the matching menu tab
    var link = e.target.closest("[data-open-tab]");
    if (link) {
      var t = $("#tab-" + link.getAttribute("data-open-tab"));
      if (t) selectTab(t, false);
    }
  });

  listEl.addEventListener("click", function (e) {
    var inc = e.target.closest("[data-inc]");
    var dec = e.target.closest("[data-dec]");
    if (inc) change(inc.getAttribute("data-inc"), 1);
    if (dec) {
      change(dec.getAttribute("data-dec"), -1);
      if (count() === 0) closeDialog(dialog);
    }
  });

  function openDialog(d) {
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
  }
  function closeDialog(d) {
    if (typeof d.close === "function") d.close(); else d.removeAttribute("open");
  }
  $$("dialog").forEach(function (d) {
    d.addEventListener("click", function (e) {
      if (e.target === d || e.target.closest("[data-close]")) closeDialog(d);
    });
  });

  $("#order-open").addEventListener("click", function () { openDialog(dialog); });
  $("#order-clear").addEventListener("click", function () {
    order = {};
    save();
    syncUI();
    closeDialog(dialog);
    toast("Order cleared");
  });

  var nameInput = form.elements.name;
  var nameErr = $("#name-err");
  function validateName() {
    var ok = nameInput.value.trim().length > 1;
    nameInput.setAttribute("aria-invalid", String(!ok));
    nameErr.textContent = ok ? "" : "Please enter your name so we know who the order is for.";
    return ok;
  }
  nameInput.addEventListener("blur", function () { if (nameInput.value) validateName(); });
  nameInput.addEventListener("input", function () { if (nameInput.getAttribute("aria-invalid") === "true") validateName(); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!count()) { toast("Add a dish first"); return; }
    if (!validateName()) { nameInput.focus(); return; }
    var mode = form.elements.mode.value;
    var notes = form.elements.notes.value.trim();
    var lines = ["Hello Atithi! I'd like to place an order (" + mode + "):", ""];
    Object.keys(order).forEach(function (id) {
      var it = itemsById[id];
      lines.push("• " + order[id] + " × " + it.name + " — " + kwacha(it.price * order[id]));
    });
    lines.push("", "Estimated total: " + kwacha(total()), "Name: " + nameInput.value.trim());
    if (notes) lines.push("Notes: " + notes);
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });

  syncUI();

  /* ---------- Lightbox ---------- */
  var lightbox = $("#lightbox");
  var lbImg = $("#lightbox-img");
  var lastTrigger = null;
  $("#gallery-grid").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-full]");
    if (!b) return;
    lastTrigger = b;
    var img = b.querySelector("img");
    lbImg.src = b.getAttribute("data-full");
    lbImg.alt = img.alt;
    openDialog(lightbox);
  });
  lightbox.addEventListener("close", function () { if (lastTrigger) lastTrigger.focus(); });

  /* ---------- Open / closed status (Zambia time, UTC+2) ---------- */
  var statusEl = $("#open-status");
  function updateStatus() {
    var now = new Date();
    var cat = new Date(now.getTime() + (now.getTimezoneOffset() + 120) * 60000);
    var day = cat.getDay(); // 0 Sun … 1 Mon
    var mins = cat.getHours() * 60 + cat.getMinutes();
    var open = day !== 1 && mins >= 600 && mins < 1320;
    var text;
    if (open) text = "Open now · kitchen closes at 22:00";
    else if (day === 1) text = "Closed today · we open Tuesday at 10:00";
    else if (mins < 600) text = "Closed now · opens today at 10:00";
    else text = (day === 0 ? "Closed now · opens Tuesday at 10:00" : "Closed now · opens tomorrow at 10:00");
    statusEl.textContent = text;
    statusEl.className = "open-status " + (open ? "is-open" : "is-closed");
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- Animations ---------- */
  // Highlights ribbon: duplicate the items so the CSS marquee loops seamlessly
  var ribbon = $(".highlights");
  if (ribbon) {
    var track = $(".highlights-track", ribbon);
    $$("li", track).forEach(function (li) {
      var copy = li.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });
    ribbon.classList.add("is-marquee");
  }

  // Stats count up from zero the first time they scroll into view
  var counters = $$("[data-count]");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        countObs.unobserve(en.target);
        var el = en.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var dec = +(el.getAttribute("data-decimals") || 0);
        var start = null;
        var dur = 1400;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min(1, (ts - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(dec);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { el.textContent = (0).toFixed(+(el.getAttribute("data-decimals") || 0)); countObs.observe(el); });
  }

  // Gentle parallax on the Bar Arena photo
  var para = $$("[data-parallax]");
  if (para.length && !reduceMotion) {
    var ticking = false;
    function parallax() {
      ticking = false;
      var vh = window.innerHeight;
      para.forEach(function (box) {
        var r = box.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1 … 1
        box.style.setProperty("--py", (progress * -8).toFixed(1) + "px");
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
    }, { passive: true });
    parallax();
  }
})();
