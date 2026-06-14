/* NERV 백서 — Mermaid 플로우차트 전체화면 뷰어 (v3, robust)
 * - 위임(delegated) 클릭: enhance 타이밍/컨테이너와 무관하게 다이어그램 클릭 시 항상 열림
 * - 항상 보이는 ⛶ 전체화면 버튼 (호버 시 더 진하게)
 * - 넓은 탐지: id*=mermaid / aria-roledescription / class*=flowchart / .mermaid 내부
 * - MutationObserver + 20초 폴링으로 비동기 렌더 포착
 * - 오버레이: ＋/－ 줌 · ⤢ 맞춤 · ✕ 닫기 · 스크롤 줌 · 드래그 이동 · Esc
 * - window.__nervMm + console 로그로 진단 가능
 * 외부 의존성 없음. */
(function () {
  "use strict";

  var DIAG = { boot: false, enhanced: 0, opened: 0 };
  try { window.__nervMm = DIAG; } catch (e) {}
  function log(m) { try { console.log("[nerv-mm] " + m); } catch (e) {} }

  function el(t, c) { var n = document.createElement(t); if (c) n.className = c; return n; }
  function tbtn(l, a) { var b = el("button", "nerv-mm-tbtn"); b.type = "button"; b.setAttribute("aria-label", a); b.textContent = l; return b; }

  var EXCLUDE = ".md-header, .md-sidebar, .md-nav, .md-footer, .md-tabs, .md-search, button, .md-icon, .twemoji, .nerv-mm-overlay";
  function isDiagram(svg) {
    if (!svg || !svg.tagName || svg.tagName.toLowerCase() !== "svg") return false;
    if (svg.closest && svg.closest(EXCLUDE)) return false;
    var id = svg.id || "";
    var cls = (svg.getAttribute && svg.getAttribute("class")) || "";
    return id.indexOf("mermaid") !== -1
      || (svg.hasAttribute && svg.hasAttribute("aria-roledescription"))
      || cls.indexOf("flowchart") !== -1
      || (svg.closest && !!svg.closest(".mermaid"));
  }
  function diagramSvgs() {
    var all = document.getElementsByTagName("svg"), out = [];
    for (var i = 0; i < all.length; i++) if (isDiagram(all[i])) out.push(all[i]);
    return out;
  }
  function hostOf(svg) { return (svg.closest && svg.closest(".mermaid")) || svg.parentElement; }

  /* ── 전체화면 오버레이 ── */
  function openFullscreen(svg) {
    if (!svg) return;
    DIAG.opened++;
    var ov = el("div", "nerv-mm-overlay");
    var stage = el("div", "nerv-mm-stage");

    var clone = svg.cloneNode(true);
    clone.removeAttribute("style");
    clone.setAttribute("width", "100%");
    clone.setAttribute("height", "100%");
    clone.style.width = "100%";
    clone.style.height = "100%";
    clone.style.maxWidth = "none";
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

    var scale = 1, tx = 0, ty = 0;
    function apply() { stage.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")"; }
    function zoom(f) { scale = Math.min(12, Math.max(0.3, scale * f)); apply(); }
    function fit() { scale = 1; tx = 0; ty = 0; apply(); }

    bIn.addEventListener("click", function (e) { e.stopPropagation(); zoom(1.25); });
    bOut.addEventListener("click", function (e) { e.stopPropagation(); zoom(1 / 1.25); });
    bFit.addEventListener("click", function (e) { e.stopPropagation(); fit(); });
    bClose.addEventListener("click", function (e) { e.stopPropagation(); destroy(); });

    ov.addEventListener("wheel", function (e) { e.preventDefault(); zoom(e.deltaY < 0 ? 1.12 : 1 / 1.12); }, { passive: false });

    var dragging = false, moved = false, sx = 0, sy = 0;
    stage.addEventListener("mousedown", function (e) {
      dragging = true; moved = false; sx = e.clientX - tx; sy = e.clientY - ty;
      stage.classList.add("grabbing"); e.preventDefault();
    });
    ov.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      var nx = e.clientX - sx, ny = e.clientY - sy;
      if (Math.abs(nx - tx) > 3 || Math.abs(ny - ty) > 3) moved = true;
      tx = nx; ty = ny; apply();
    });
    ov.addEventListener("mouseup", function () { dragging = false; stage.classList.remove("grabbing"); });

    function destroy() { ov.remove(); document.body.classList.remove("nerv-mm-open"); document.removeEventListener("keydown", onKey); }
    function onKey(e) {
      if (e.key === "Escape") destroy();
      else if (e.key === "+" || e.key === "=") zoom(1.25);
      else if (e.key === "-" || e.key === "_") zoom(1 / 1.25);
      else if (e.key === "0") fit();
    }
    document.addEventListener("keydown", onKey);
    ov.addEventListener("click", function (e) {
      if (e.target.closest(".nerv-mm-toolbar")) return;
      if (!moved) destroy();
    });

    fit();
  }

  /* ── 다이어그램에 항상 보이는 버튼 부착 ── */
  function enhance() {
    var svgs = diagramSvgs();
    for (var i = 0; i < svgs.length; i++) {
      var svg = svgs[i], host = hostOf(svg);
      if (!host || host.getAttribute("data-mmzoom") === "1") continue;
      host.setAttribute("data-mmzoom", "1");
      host.classList.add("nerv-mm-host");
      var btn = el("button", "nerv-mm-fsbtn");
      btn.type = "button"; btn.title = "전체화면으로 보기"; btn.setAttribute("aria-label", "전체화면으로 보기");
      btn.innerHTML = "⛶";
      (function (s) {
        btn.addEventListener("click", function (e) { e.stopPropagation(); e.preventDefault(); openFullscreen(s); });
      })(svg);
      host.appendChild(btn);
      DIAG.enhanced++;
    }
    if (DIAG.enhanced && !DIAG._logged) { DIAG._logged = true; log(DIAG.enhanced + " diagram(s) ready — 클릭 또는 ⛶ 버튼으로 전체화면"); }
  }

  /* ── 위임 클릭: enhance 타이밍과 무관하게 항상 동작 ── */
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest(".nerv-mm-overlay")) return;     // 오버레이 내부는 자체 처리
    if (t.closest(".nerv-mm-fsbtn")) return;       // 버튼은 자체 핸들러
    if (t.closest("a")) return;
    var svg = t.closest("svg");
    if (svg && isDiagram(svg)) { openFullscreen(svg); return; }
    var host = t.closest(".mermaid, [data-mmzoom]");
    if (host) { var s = host.querySelector("svg"); if (s) openFullscreen(s); }
  });

  function boot() {
    DIAG.boot = true; log("boot");
    enhance();
    if (window.MutationObserver) {
      var raf = 0;
      new MutationObserver(function () {
        if (raf) return;
        raf = requestAnimationFrame(function () { raf = 0; enhance(); });
      }).observe(document.body, { childList: true, subtree: true });
    }
    var n = 0;
    var iv = setInterval(function () { enhance(); if (++n > 40) clearInterval(iv); }, 500); // 최대 20초
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
