/* NERV 백서 — Mermaid 플로우차트 전체화면 뷰어 (v2)
 * - 컨테이너 가정 없이 mermaid 고유 신호로 다이어그램 탐지 (id^="mermaid" / aria-roledescription / .mermaid svg)
 * - 비동기 렌더를 MutationObserver + 재시도 폴링으로 포착
 * - 각 다이어그램에 전체화면 버튼 + 클릭으로 열기
 * - 오버레이: ＋/－ 줌 버튼 · 스크롤 줌 · 드래그 이동 · Esc/✕/배경클릭 닫기
 * 외부 의존성 없음. */
(function () {
  "use strict";

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function tbtn(label, aria) {
    var b = el("button", "nerv-mm-tbtn"); b.type = "button";
    b.setAttribute("aria-label", aria); b.textContent = label; return b;
  }

  function diagramSvgs(root) {
    var nodes = (root || document).querySelectorAll(
      '.mermaid svg, svg[aria-roledescription], svg[id^="mermaid"], svg[id*="mermaid-"]'
    );
    var out = [], seen = [];
    for (var i = 0; i < nodes.length; i++) {
      var s = nodes[i];
      if (seen.indexOf(s) === -1) { seen.push(s); out.push(s); }
    }
    return out;
  }

  function hostOf(svg) { return (svg.closest && svg.closest(".mermaid")) || svg.parentElement; }

  /* ── 전체화면 오버레이 ── */
  function openFullscreen(svg) {
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

    ov.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoom(e.deltaY < 0 ? 1.12 : 1 / 1.12);
    }, { passive: false });

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

    function destroy() {
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

    // 툴바가 아니고, 드래그(이동)가 아니었던 단순 클릭이면 닫는다
    ov.addEventListener("click", function (e) {
      if (e.target.closest(".nerv-mm-toolbar")) return;
      if (!moved) destroy();
    });

    fit();
  }

  /* ── 다이어그램에 버튼/클릭 부착 ── */
  function enhance() {
    var svgs = diagramSvgs(document);
    for (var i = 0; i < svgs.length; i++) {
      (function (svg) {
        var host = hostOf(svg);
        if (!host || host.getAttribute("data-mmzoom") === "1") return;
        host.setAttribute("data-mmzoom", "1");
        host.classList.add("nerv-mm-host");

        var btn = el("button", "nerv-mm-fsbtn"); btn.type = "button";
        btn.setAttribute("aria-label", "전체화면으로 보기");
        btn.title = "전체화면";
        btn.textContent = "⛶";
        btn.addEventListener("click", function (e) { e.stopPropagation(); e.preventDefault(); openFullscreen(svg); });
        host.appendChild(btn);

        host.addEventListener("click", function (e) {
          if (e.target.closest(".nerv-mm-fsbtn")) return;
          if (e.target.closest("a")) return;
          var s = host.querySelector("svg") || svg;
          openFullscreen(s);
        });
      })(svgs[i]);
    }
  }

  function boot() {
    enhance();
    // mermaid는 비동기 렌더 → DOM 변화 관찰 + 재시도 폴링으로 확실히 포착
    if (window.MutationObserver) {
      var raf = 0;
      var obs = new MutationObserver(function () {
        if (raf) return;
        raf = requestAnimationFrame(function () { raf = 0; enhance(); });
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }
    var n = 0;
    var iv = setInterval(function () { enhance(); if (++n > 30) clearInterval(iv); }, 500); // 최대 15초
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
