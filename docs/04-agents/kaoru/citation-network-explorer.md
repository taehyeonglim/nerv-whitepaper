# citation-network-explorer

> 논문 간 인용 관계를 탐색하여 핵심 논문과 연구 클러스터를 분석합니다. 인용 네트워크 매핑, 핵심 논문 발굴 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 카오루 · Discovery & Insight |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep, Bash, WebSearch, WebFetch |
| Codex gpt-5.5 위임 | 예 — 네트워크 지표 → 자연어 보고서 종합 |

## 무엇을 하는가

시드 논문을 기준으로 인용·피인용 관계를 추적하여 연구 분야의 핵심 논문, 연구 계보, 학술적 영향력을 파악합니다. PageRank·Betweenness Centrality 등의 중심성 지표와 클러스터링을 결정론적으로 계산하고, 그 결과를 자연어 보고서로 종합합니다. 논문 메타데이터는 외부 학술 API 응답에서만 가져오며 임의로 생성하지 않습니다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">시드 논문 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">학술 API 인용 데이터 수집</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">네트워크 그래프 빌드</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">중심성 지표 계산</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">클러스터링 · 핵심 논문 선정</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">JSON 결과 직렬화</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-split">
    <div class="nerv-flow-split-head">Codex 위임 분기</div>
    <div class="nerv-flow-split-paths">
      <div class="nerv-flow-path"><span class="nerv-flow-tag codex">gpt-5.5 위임</span><div class="nerv-flow-node codex">자연어 보고서 종합</div></div>
      <div class="nerv-flow-path"><span class="nerv-flow-tag">Sonnet 잔류</span><div class="nerv-flow-node">할루시네이션 검증</div></div>
    </div>
  </div>
  <div class="nerv-flow-arr">↓<span>합류</span></div>
  <div class="nerv-flow-node">Markdown 보고서 산출</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">소비 역할 전달</div>
</div>

## 입·출력

- **입력**: 시드 논문 식별자와 탐색 옵션(깊이, 방향, 최대 노드 수, 상위 N개)
- **출력**: 인용 네트워크 통계·클러스터·핵심 논문 목록 JSON과 자연어 Markdown 보고서
- **소비 역할**: 레이(Analysis & Knowledge), 마리(Creative & Writing), 아스카(Quality & Review)

## 비고

v2.0(Sprint A)에서 중심성 계산 등 결정론 단계를 Python 오케스트레이터로 이관하고, 본 에이전트는 결과 종합과 검증만 담당하도록 정리했습니다. 종합 단계는 Codex gpt-5.5에 강제 위임하며, CLI 미설치·타임아웃 등 시스템 오류 시에만 본 에이전트가 직접 종합하는 fallback을 둡니다. 모든 논문 메타데이터는 API 응답 기반으로만 사용하는 할루시네이션 방지 정책을 따릅니다.
