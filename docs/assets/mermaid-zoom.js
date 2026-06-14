/* NERV 백서 — Mermaid 전체화면 뷰어 (v5, Material closed-shadow 대응)
 * 핵심: Material for MkDocs는 mermaid SVG를 <div class="mermaid">의 *닫힌 Shadow DOM*에 렌더한다.
 *   → 외부에서 .mermaid svg 를 읽을 수 없고, 클릭 이벤트는 호스트로 retarget된다.
 * 해법: svg를 복제하는 대신 *호스트 요소를 통째로 오버레이로 이동*(shadow는 요소와 함께 이동) → 닫힌 shadow도 그대로 보인다. 닫을 때 원위치로 복귀.
 * - 버튼은 wrap(라이트 DOM)에 두어야 보임(shadow 호스트의 라이트 자식은 slot이 없어 렌더 안 됨)
 * - 위임 클릭(retarget된 호스트) + ⛶ 버튼 + 툴바(＋－⤢✕) + 스크롤 줌 + 드래그
 * 외부 의존성 없음. window.__nervMm + console 진단. */
(function () {
  "use strict";

  var DIAG = { boot: false, enhanced: 0, opened: 0 };
  try { window.__nervMm = DIAG; } catch (e) {}
  function log(m) { try { console.log("[nerv-mm] " + m); } catch (e) {} }
  function el(t, c) { var n = document.createElement(t); if (c) n.className = c; return n; }
  function tbtn(l, a) { var b = el("button", "nerv-mm-tbtn"); b.type = "button"; b.setAttribute("aria-label", a); b.textContent = l; return b; }

  // 렌더된 mermaid 호스트인지: 라이트 DOM이 비어있고(소스가 shadow로 들어감) 레이아웃 박스가 있음.
  // 또는 standalone mermaid(라이트 svg)도 허용.
  function isRenderedHost(h) {
    if (!h || h.closest(".nerv-mm-wrap") || h.closest(".nerv-mm-overlay")) return false;
    if (h.querySelector && h.querySelector("svg")) return true;          // light-DOM svg
    if ((h.textContent || "").trim() !== "") return false;               // 아직 소스 텍스트 = 렌더 전
    return (h.offsetWidth > 0 || h.offsetHeight > 0);                     // shadow 렌더가 크기를 줌
  }

  function openFullscreen(host) {
    if (!host || host.closest(".nerv-mm-overlay")) return;
    DIAG.opened++;

    var ov = el("div", "nerv-mm-overlay");
    var stage = el("div", "nerv-mm-stage");
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

    // 호스트를 오버레이로 이동(shadow DOM은 요소와 함께 이동)
    var ph = document.createComment("nerv-mm-ph");
    host.parentNode.insertBefore(ph, host);
    var savedStyle = host.getAttribute("style") || "";
    host.classList.add("nerv-mm-moved");
    host.style.margin = "0"; host.style.maxWidth = "none"; host.style.width = "auto";
    stage.appendChild(host);

    var baseScale = 1, scale = 1, tx = 0, ty = 0;
    function apply() { stage.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")"; }
    function zoom(f) { scale = Math.min(14, Math.max(0.1, scale * f)); apply(); }
    function fit() { scale = baseScale; tx = 0; ty = 0; apply(); }

    if (window.requestAnimationFrame) {
      requestAnimationFrame(function () {
        var hr = host.getBoundingClientRect(), sr = stage.getBoundingClientRect();
        var f = (hr.width && hr.height) ? Math.min(sr.width / hr.width, sr.height / hr.height) * 0.95 : 1;
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

    function destroy() {
      host.classList.remove("nerv-mm-moved");
      if (savedStyle) host.setAttribute("style", savedStyle); else host.removeAttribute("style");
      if (ph.parentNode) ph.parentNode.replaceChild(host, ph);   // 원위치 복귀
      ov.remove(); document.body.classList.remove("nerv-mm-open");
      document.removeEventListener("keydown", onKey);
    }
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
    var all = document.querySelectorAll(".mermaid");
    for (var i = 0; i < all.length; i++) {
      var host = all[i];
      if (host.closest(".nerv-mm-wrap") || host.closest(".nerv-mm-overlay")) continue;
      if (!isRenderedHost(host)) continue;
      var wrap = el("div", "nerv-mm-wrap");
      host.parentNode.insertBefore(wrap, host);
      wrap.appendChild(host);
      var btn = el("button", "nerv-mm-fsbtn");
      btn.type = "button"; btn.title = "전체화면으로 보기"; btn.setAttribute("aria-label", "전체화면으로 보기"); btn.innerHTML = "⛶";
      (function (h) { btn.addEventListener("click", function (e) { e.stopPropagation(); e.preventDefault(); openFullscreen(h); }); })(host);
      wrap.appendChild(btn);
      DIAG.enhanced++;
    }
    if (DIAG.enhanced && !DIAG._logged) { DIAG._logged = true; log(DIAG.enhanced + " diagram(s) ready — 클릭 또는 ⛶ 버튼으로 전체화면"); }
  }

  // 위임 클릭: 닫힌 shadow라 다이어그램 클릭 시 e.target이 .mermaid 호스트로 retarget됨
  document.addEventListener("click", function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest(".nerv-mm-overlay")) return;
    if (t.closest(".nerv-mm-fsbtn")) return;
    if (t.closest("a")) return;
    var host = t.closest(".mermaid");
    if (host && !host.closest(".nerv-mm-overlay")) openFullscreen(host);
  });

  function boot() {
    DIAG.boot = true; log("boot");
    enhance();
    if (window.MutationObserver) {
      var raf = 0;
      new MutationObserver(function () { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; enhance(); }); }).observe(document.body, { childList: true, subtree: true });
    }
    var n = 0;
    var iv = setInterval(function () { enhance(); if (++n > 40) clearInterval(iv); }, 500);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
