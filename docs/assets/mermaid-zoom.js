/* NERV 백서 — Mermaid 플로우차트 클릭 → 전체화면 확대/이동 뷰어
 * 외부 의존성 없음. mermaid는 비동기 렌더이므로 document 위임 클릭으로 처리한다. */
(function () {
  "use strict";

  function openFullscreen(svg) {
    var ov = document.createElement("div");
    ov.className = "nerv-mm-overlay";

    var stage = document.createElement("div");
    stage.className = "nerv-mm-stage";

    var clone = svg.cloneNode(true);
    // viewBox는 보존하고 width/height만 100%로 → preserveAspectRatio 기본값이 stage에 맞춰 비율 유지 확대
    clone.removeAttribute("style");
    clone.setAttribute("width", "100%");
    clone.setAttribute("height", "100%");
    clone.style.width = "100%";
    clone.style.height = "100%";
    clone.style.maxWidth = "none";
    stage.appendChild(clone);
    ov.appendChild(stage);

    var closeBtn = document.createElement("button");
    closeBtn.className = "nerv-mm-close";
    closeBtn.setAttribute("aria-label", "닫기");
    closeBtn.innerHTML = "✕";
    ov.appendChild(closeBtn);

    var hint = document.createElement("div");
    hint.className = "nerv-mm-hint";
    hint.textContent = "스크롤: 확대·축소 · 드래그: 이동 · 클릭/Esc/✕: 닫기";
    ov.appendChild(hint);

    document.body.appendChild(ov);
    document.body.classList.add("nerv-mm-open");

    var scale = 1, tx = 0, ty = 0;
    var dragging = false, moved = false, sx = 0, sy = 0;

    function apply() {
      stage.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
    }

    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      var f = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      scale = Math.min(8, Math.max(0.5, scale * f));
      apply();
    }, { passive: false });

    stage.addEventListener("mousedown", function (e) {
      dragging = true; moved = false;
      sx = e.clientX - tx; sy = e.clientY - ty;
      stage.classList.add("grabbing");
      e.preventDefault();
    });
    ov.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      var nx = e.clientX - sx, ny = e.clientY - sy;
      if (Math.abs(nx - tx) > 3 || Math.abs(ny - ty) > 3) moved = true;
      tx = nx; ty = ny; apply();
    });
    ov.addEventListener("mouseup", function () {
      dragging = false; stage.classList.remove("grabbing");
    });

    function destroy() {
      ov.remove();
      document.body.classList.remove("nerv-mm-open");
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) { if (e.key === "Escape") destroy(); }

    document.addEventListener("keydown", onKey);
    closeBtn.addEventListener("click", function (e) { e.stopPropagation(); destroy(); });
    // 드래그(이동)가 아니었던 단순 클릭이면 어디를 눌러도 닫는다
    ov.addEventListener("click", function () { if (!moved) destroy(); });

    apply();
  }

  document.addEventListener("click", function (e) {
    var m = e.target.closest && e.target.closest(".mermaid");
    if (!m) return;
    if (e.target.closest("a")) return;            // 다이어그램 내 링크는 가로채지 않음
    var svg = m.querySelector("svg");
    if (!svg) return;                              // 아직 렌더 전이면 무시
    openFullscreen(svg);
  });
})();
