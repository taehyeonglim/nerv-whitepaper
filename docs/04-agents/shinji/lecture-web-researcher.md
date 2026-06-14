# lecture-web-researcher

> 강의 주제에 관한 웹 기반 자료(뉴스, 블로그, 기술 문서, 정부 보고서, 영상 자료)를 검색하고 구조화합니다. 강의 주제 웹 리서치, 비학술 자료 수집 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 신지 · Personal & Learning |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep, WebSearch, WebFetch |
| Codex gpt-5.5 위임 | 아니오 (Claude Sonnet 단독 처리) |

## 무엇을 하는가

강의 주제와 관련된 웹 기반 비학술 자료를 검색하여 강의 콘텐츠의 실질적 풍부함을 높입니다. 학술 논문 검색을 보완하여 뉴스 기사, 블로그 포스트, 기술 문서, 정부/기관 보고서, 강연/영상 자료 등을 국내외 다양한 소스에서 수집합니다. 수집한 자료는 관련성·신뢰도·최신성으로 점수화하여 종합 정렬하고, 각 자료마다 강의에서의 활용 포인트를 제안합니다. 최종 결과는 후속 교안 설계 단계에서 바로 쓸 수 있는 구조화된 Markdown으로 출력합니다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">강의 주제와 키워드 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">입력 파라미터 검증</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">검색 전략 수립</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">웹 검색 1차 수행</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">본문 내용 2차 수집</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">관련성 신뢰도 최신성 점수화</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">종합 점수 정렬과 관련성 게이트</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">소스 유형별 구조화 Markdown 출력</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">신지 강의 설계 단계 소비</div>
</div>

## 입·출력

- **입력**: 강의 주제, 검색 키워드 목록, 대상 청중, 그리고 선택적으로 언어 선호도·최신성 필터·소스 유형·최대 수집 건수·저장 경로
- **출력**: 소스 유형별로 그룹핑되고 관련성·신뢰도·최신성 점수가 매겨진 웹 자료 목록 Markdown. 각 자료의 요약과 강의 활용 포인트, 핵심 인사이트 요약, 추천 활용 방안을 포함
- **소비 역할**: 신지(Personal & Learning)의 강의 콘텐츠 설계 단계에서 활용되며, 강의 교안·내러티브 구성의 입력 자료로 쓰임

## 비고

학술 논문 검색 경로를 보완하는 비학술 자료 수집 전담 에이전트입니다. 모든 점수는 0.0~1.0으로 정규화되며, 자료별 최소 관련성 게이트와 소스 다양성·최신성·신뢰도 기준을 적용합니다. Codex 위임 없이 Claude Sonnet 단독으로 처리합니다.
