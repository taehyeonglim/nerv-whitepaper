/* NERV 백서 — 다이어그램 전체화면 뷰어 (HTML/CSS 다이어그램용)
 * 대상: .nerv-flow (에이전트 플로우) · .nerv-arch (아키텍처 레이어)
 * light DOM이라 복제(clone)로 오버레이에 띄운다(닫힌 shadow였던 Mermaid와 달리 단순).
 * 각 다이어그램에 ⛶ 버튼 + 다이어그램 클릭 → 전체화면(＋/－/⤢ 줌 · 스크롤 · 드래그 · Esc/✕). */
(function () {
  "use strict";

  var DIAG = { boot: false, enhanced: 0, opened: 0 };
  try { window.__nervMm = DIAG; } catch (e) {}
  function log(m) { try { console.log("[nerv-dz] " + m); } catch (e) {} }
  function el(t, c) { var n = document.createElement(t); if (c) n.className = c; return n; }
  function tbtn(l, a) { var b = el("button", "nerv-mm-tbtn"); b.type = "button"; b.setAttribute("aria-label", a); b.textContent = l; return b; }

  var SEL = ".nerv-flow, .nerv-arch";

  function openFullscreen(src) {
    if (!src || src.closest(".nerv-mm-overlay")) return;
    DIAG.opened++;

    var ov = el("div", "nerv-mm-overlay");
    var stage = el("div", "nerv-mm-stage");
    var clone = src.cloneNode(true);
    var b = clone.querySelector && clone.querySelector(".nerv-mm-fsbtn"); if (b) b.parentNode.removeChild(b);
    clone.classList.add("nerv-mm-cloned");
    clone.style.margin = "0"; clone.style.maxWidth = "none"; clone.style.width = "auto";
    stage.appendChild(clone);
    ov.appendChild(stage);

    var bar = el("div", "nerv-mm-toolbar");
    var bIn = tbtn("＋", "확대"), bOut = tbtn("－", "축소"), bFit = tbtn("⤢", "맞춤"), bClose = tbtn("✕", "닫기");
    bar.appendChild(bIn); bar.appendChild(bOut); bar.appendChild(bFit); bar.appendChild(bClose);
    ov.appendChild(bar);
    var hint = el("div", "nerv-mm-hint");
    hint.textContent = "스크롤 또는 ＋－: 확대·축소 · 드래그: 이동 · 클릭/Esc/✕: 닫기";
    ov.appendChild(hint);

    document.body.appendChild(ov);
    document.body.classList.add("nerv-mm-open");

    var baseScale = 1, scale = 1, tx = 0, ty = 0;
    function apply() { stage.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")"; }
    function zoom(f) { scale = Math.min(14, Math.max(0.1, scale * f)); apply(); }
    function fit() { scale = baseScale; tx = 0; ty = 0; apply(); }

    if (window.requestAnimationFrame) {
      requestAnimationFrame(function () {
        var hr = clone.getBoundingClientRect(), sr = stage.getBoundingClientRect();
        var f = (hr.width && hr.height) ? Math.min(sr.width / hr.width, sr.height / hr.height) * 0.96 : 1;
        baseScale = (f > 0 && isFinite(f)) ? f : 1; scale = baseScale; apply();
      });
    }

    bIn.addEventListener("click", function (e) { e.stopPropagation(); zoom(1.25); });
    bOut.addEventListener("click", function (e) { e.stopPropagation(); zoom(1 / 1.25); });
    bFit.addEventListener("click", function (e) { e.stopPropagation(); fit(); });
    bClose.addEventListener("click", function (e) { e.stopPropagation(); destroy(); });
    ov.addEventListener("wheel", function (e) { e.preventDefault(); zoom(e.deltaY < 0 ? 1.12 : 1 / 1.12); }, { passive: false });

    var dragging = false, moved = false, sx = 0, sy = 0;
    stage.addEventListener("mousedown", function (e) { dragging = true; moved = false; sx = e.clientX - tx; sy = e.clientY - ty; stage.classList.add("grabbing"); e.preventDefault(); });
    ov.addEventListener("mousemove", function (e) { if (!dragging) return; var nx = e.clientX - sx, ny = e.clientY - sy; if (Math.abs(nx - tx) > 3 || Math.abs(ny - ty) > 3) moved = true; tx = nx; ty = ny; apply(); });
    ov.addEventListener("mouseup", function () { dragging = false; stage.classList.remove("grabbing"); });

    function destroy() { ov.remove(); document.body.classList.remove("nerv-mm-open"); document.removeEventListener("keydown", onKey); }
    function onKey(e) {
      if (e.key === "Escape") destroy();
      else if (e.key === "+" || e.key === "=") zoom(1.25);
      else if (e.key === "-" || e.key === "_") zoom(1 / 1.25);
      else if (e.key === "0") fit();
    }
    document.addEventListener("keydown", onKey);
    ov.addEventListener("click", function (e) { if (e.target.closest(".nerv-mm-toolbar")) return; if (!moved) destroy(); });
  }

  function enhance() {
    var nodes = document.querySelectorAll(SEL);
    for (var i = 0; i < nodes.length; i++) {
      var d = nodes[i];
      if (d.closest(".nerv-mm-wrap") || d.closest(".nerv-mm-overlay")) continue;
      var wrap = el("div", "nerv-mm-wrap");
      d.parentNode.insertBefore(wrap, d);
      wrap.appendChild(d);
      var btn = el("button", "nerv-mm-fsbtn");
      btn.type = "button"; btn.title = "전체화면으로 보기"; btn.setAttribute("aria-label", "전체화면으로 보기"); btn.innerHTML = "⛶";
      (function (dd) { btn.addEventListener("click", function (e) { e.stopPropagation(); e.preventDefault(); openFullscreen(dd); }); })(d);
      wrap.appendChild(btn);
      DIAG.enhanced++;
    }
    if (DIAG.enhanced && !DIAG._logged) { DIAG._logged = true; log(DIAG.enhanced + " diagram(s) ready — 클릭 또는 ⛶ 버튼으로 전체화면"); }
  }

  document.addEventListener("click", function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest(".nerv-mm-overlay")) return;
    if (t.closest(".nerv-mm-fsbtn")) return;
    if (t.closest("a")) return;
    var d = t.closest(".nerv-flow, .nerv-arch");
    if (d && !d.closest(".nerv-mm-overlay")) openFullscreen(d);
  });

  function boot() {
    DIAG.boot = true; log("boot");
    enhance();
    if (window.MutationObserver) {
      var raf = 0;
      new MutationObserver(function () { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; enhance(); }); }).observe(document.body, { childList: true, subtree: true });
    }
    var n = 0;
    var iv = setInterval(function () { enhance(); if (++n > 20) clearInterval(iv); }, 500);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
