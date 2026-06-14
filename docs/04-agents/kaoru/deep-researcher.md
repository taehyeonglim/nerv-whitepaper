# deep-researcher

> 심층적이고 광범위한 자료 탐색을 수행합니다 (Python 파이프라인 + 지능 레이어). 특정 주제의 종합적 심층 조사가 필요할 때 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 카오루 · Discovery & Insight |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep, WebSearch, WebFetch, Write, Bash |
| Codex gpt-5.5 위임 | 예 — 공유 intelligence 레이어 semantic_rerank + synthesize (Codex gpt-5.5 fail-soft — 비가용 시 휴리스틱 강등) |

## 무엇을 하는가

특정 주제에 대한 심층적이고 광범위한 자료 탐색을 수행하여 구조화된 리포트를 생성한다. 다중 학술 소스를 병렬로 검색해 후보를 폭넓게 수집한 뒤, 의미 관련성 재채점으로 주제 의도에 맞지 않는 결과를 걸러내고, 초록 나열이 아닌 주제별 종합·합의/불일치·연구 갭 형태로 통독한다. 모든 논문 메타데이터는 검색 API 응답에서만 가져오며, DOI는 출력 전 외부 조회로 유효성을 검증해 할루시네이션을 차단한다. 검색·제외 범위와 신뢰도를 명시하는 커버리지 정직성 원칙을 따른다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">주제 입력 및 탐색 깊이 지정</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">다중 소스 병렬 검색 over-retrieve</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">의미 관련성 재채점</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">DOI 유효성 검증</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-split">
    <div class="nerv-flow-split-head">Codex 위임 분기</div>
    <div class="nerv-flow-split-paths">
      <div class="nerv-flow-path"><span class="nerv-flow-tag codex">gpt-5.5 위임</span><div class="nerv-flow-node codex">Codex gpt-5.5 의미 재채점과 통독</div></div>
      <div class="nerv-flow-path"><span class="nerv-flow-tag">Claude 잔류</span><div class="nerv-flow-node">Claude 메타데이터 추출과 할루시네이션 가드</div></div>
    </div>
  </div>
  <div class="nerv-flow-arr">↓<span>합류</span></div>
  <div class="nerv-flow-node">커버리지 매니페스트 결정론 생성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">구조화 리포트 출력</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">소비 역할 레이 마리 아스카 신지</div>
</div>

## 입·출력

- **입력**: 조사 주제(토픽), 선택적 탐색 깊이(shallow/medium/deep), 선택적 연도 범위
- **출력**: 섹션별 구조화 리포트 — executive summary / 영향력 논문 / 최신 논문 / 동향 종합 / 연구 갭 + 참고문헌. 커버리지 매니페스트(검색·제외 범위·재채점 모드·신뢰도)와 온토픽 희소 시 근접 후보(near_matches) 포함
- **소비 역할**: 레이(분석·지식), 마리(작성), 아스카(품질·검토), 신지(개인·학습) — `literature_discovery_output` 핸드오프 경유

## 비고

related-paper-finder와 공유하는 intelligence 레이어(semantic_rerank · synthesize · coverage_manifest)를 통해 의미 재채점과 종합을 수행한다. Codex gpt-5.5는 fail-soft 모드로 호출되며, 비가용 시 휴리스틱으로 우아하게 강등한다. 과거 외부 플러그인 위임 경로는 deprecated 처리되어 Python 파이프라인으로 단일화되었다(2026-06-11). 리포트 검증은 기본 실행이며, 검증 샘플은 전체 논문의 50% 이상을 요구한다.
