/* Review tracker: theme toggle, site search, findings explorer. No dependencies. */
(function () {
  "use strict";
  var root = document.body.dataset.root || "./";
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function inline(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<code>$1</code>"); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- theme ---------- */
  var themeBtn = document.getElementById("theme");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var cur = document.documentElement.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store("theme", next);
  });

  /* ---------- site search ---------- */
  var input = document.getElementById("search"), box = document.getElementById("search-results");
  var index = window.SEARCH_INDEX || [];
  function runSearch() {
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) { box.hidden = true; return; }
    var terms = q.split(/\s+/), hits = [];
    index.forEach(function (p) {
      var t = p.t.toLowerCase(), x = p.x.toLowerCase(), score = 0;
      for (var i = 0; i < terms.length; i++) {
        var inT = t.indexOf(terms[i]) >= 0, inX = x.indexOf(terms[i]) >= 0;
        if (!inT && !inX) return;
        score += (inT ? 5 : 0) + (inX ? 1 : 0);
      }
      var at = x.indexOf(terms[0]), snip = at < 0 ? p.x.slice(0, 120) : p.x.slice(Math.max(0, at - 50), at + 90);
      hits.push({ p: p, s: score, snip: snip });
    });
    hits.sort(function (a, b) { return b.s - a.s; });
    var re = new RegExp("(" + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "gi");
    box.innerHTML = hits.slice(0, 20).map(function (h) {
      return '<a href="' + root + h.p.u + '">' + esc(h.p.t).replace(re, "<mark>$1</mark>") +
        '<span class="snip">…' + esc(h.snip).replace(re, "<mark>$1</mark>") + '…</span></a>';
    }).join("") || '<a class="muted">No results</a>';
    box.hidden = false;
  }
  if (input) {
    input.addEventListener("input", runSearch);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { box.hidden = true; input.blur(); }
      if (e.key === "Enter") { var a = box.querySelector("a[href]"); if (a) location.href = a.href; }
    });
    document.addEventListener("click", function (e) { if (!box.contains(e.target) && e.target !== input) box.hidden = true; });
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") { e.preventDefault(); input.focus(); }
    });
  }

  /* ---------- findings explorer ---------- */
  var table = document.getElementById("ftable");
  if (!table || !window.FINDINGS) return;
  var FINDINGS = window.FINDINGS, STATUSES = window.STATUSES, KEY = "findings-edits-v1";
  var SEV = { critical: 0, major: 1, minor: 2 };
  var edits = {};
  try { edits = JSON.parse(store(KEY) || "{}"); } catch (e) { edits = {}; }
  var filters = { doc: "", severity: "", tag: "", status: "", q: "" }, sortKey = "severity", sortDir = 1;

  function cur(f) { var e = edits[f.id] || {}; return { status: e.status || f.status, note: e.note != null ? e.note : (f.note || "") }; }
  function isEdited(f) { var e = edits[f.id]; return e && ((e.status && e.status !== f.status) || (e.note != null && e.note !== (f.note || ""))); }

  function readHash() {
    var h = location.hash.slice(1);
    h.split("&").forEach(function (kv) { var p = kv.split("="); if (p[0] in filters) filters[p[0]] = decodeURIComponent(p[1] || ""); });
    document.querySelectorAll("#filters [data-f]").forEach(function (el) { el.value = filters[el.dataset.f]; });
  }
  function writeHash() {
    var h = Object.keys(filters).filter(function (k) { return filters[k]; })
      .map(function (k) { return k + "=" + encodeURIComponent(filters[k]); }).join("&");
    history.replaceState(null, "", h ? "#" + h : location.pathname);
  }

  function render() {
    var q = filters.q.toLowerCase();
    var rows = FINDINGS.filter(function (f) {
      var c = cur(f);
      if (filters.doc && f.doc !== filters.doc) return false;
      if (filters.severity && f.severity !== filters.severity) return false;
      if (filters.tag && f.tags.indexOf(filters.tag) < 0) return false;
      if (filters.status && c.status !== filters.status) return false;
      if (q) {
        var hay = [f.id, f.location, f.claim, f.problem, f.source, c.note].join(" ").toLowerCase();
        if (q.split(/\s+/).some(function (t) { return hay.indexOf(t) < 0; })) return false;
      }
      return true;
    });
    rows.sort(function (a, b) {
      var va, vb;
      if (sortKey === "severity") { va = SEV[a.severity]; vb = SEV[b.severity]; }
      else if (sortKey === "status") { va = STATUSES.indexOf(cur(a).status); vb = STATUSES.indexOf(cur(b).status); }
      else { va = a.id; vb = b.id; }
      return (va < vb ? -1 : va > vb ? 1 : a.id < b.id ? -1 : 1) * sortDir;
    });
    table.tBodies[0].innerHTML = rows.map(function (f) {
      var c = cur(f);
      var segs = f.segments.length ? f.segments.map(function (s) {
        return '<a href="' + esc(s.u) + '" title="' + esc(s.t) + '">seg ' + s.n + "</a>"; }).join(" ")
        : '<span class="muted">document-level</span>';
      return '<tr id="' + f.id + '"' + (isEdited(f) ? ' class="edited"' : "") + ">" +
        "<td>" + esc(f.id) + "</td>" +
        '<td><span class="sev sev-' + f.severity + '">' + f.severity + "</span></td>" +
        "<td>" + f.tags.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join(" ") + "</td>" +
        '<td><select data-id="' + f.id + '" aria-label="Status of ' + f.id + '">' + STATUSES.map(function (s) {
          return "<option" + (s === c.status ? " selected" : "") + ">" + s + "</option>"; }).join("") + "</select></td>" +
        '<td class="loc">' + esc(f.source) + "<br><span class=\"muted\">" + esc(f.location) + "</span><br>" + segs + "</td>" +
        '<td class="prob">' + (f.claim ? '<span class="claim">Claim: ' + inline(f.claim) + "</span>" : "") + inline(f.problem) + "</td>" +
        '<td><input class="note" data-id="' + f.id + '" value="' + esc(c.note) + '" placeholder="note…" aria-label="Note for ' + f.id + '"></td></tr>';
    }).join("");
    document.getElementById("count").textContent = rows.length + " of " + FINDINGS.length + " findings";
    var n = FINDINGS.filter(isEdited).length, dirty = document.getElementById("dirty");
    dirty.hidden = !n; dirty.textContent = n + " unsaved local edit" + (n === 1 ? "" : "s") + " — export to keep";
  }

  function setEdit(id, field, value) {
    edits[id] = edits[id] || {}; edits[id][field] = value;
    store(KEY, JSON.stringify(edits));
  }
  table.addEventListener("change", function (e) {
    var id = e.target.dataset.id; if (!id) return;
    setEdit(id, e.target.tagName === "SELECT" ? "status" : "note", e.target.value);
    render();
  });
  table.tHead.addEventListener("click", function (e) {
    var k = e.target.dataset.sort; if (!k) return;
    sortDir = sortKey === k ? -sortDir : 1; sortKey = k; render();
  });
  document.getElementById("filters").addEventListener("input", function (e) {
    var k = e.target.dataset.f; if (!k) return;
    filters[k] = e.target.value; writeHash(); render();
  });

  document.getElementById("export").addEventListener("click", function () {
    var out = {};
    FINDINGS.forEach(function (f) {
      var c = cur(f), e = edits[f.id];
      out[f.id] = { status: c.status, note: c.note, updated: e ? new Date().toISOString().slice(0, 10) : (f.updated || "") };
    });
    var blob = new Blob([JSON.stringify(out, null, 1) + "\n"], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "status.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  document.getElementById("reset").addEventListener("click", function () {
    edits = {}; store(KEY, null); render();
  });

  readHash();
  render();
  var m = location.hash.match(/q=([A-Za-z0-9-]+)/);
  if (m) { var row = document.getElementById(m[1]); if (row) { row.scrollIntoView({ block: "center" }); row.classList.add("flash"); } }
  window.addEventListener("hashchange", function () { readHash(); render(); });
})();
