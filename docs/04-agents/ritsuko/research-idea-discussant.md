# research-idea-discussant

> 소크라테스식 대화형 토론으로 연구 아이디어를 탐색·정제하고 실행 계획을 수립합니다. 연구 아이디어 브레인스토밍, 연구 방향 토론 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 리츠코 · Project Command |
| 모델 | <span class="badge opus">Opus 4.8</span> |
| 도구 (tools) | Read, Glob, Grep, Write |
| Codex gpt-5.5 위임 | 아니오 (Claude Opus 단독 처리) |

## 무엇을 하는가

연구자와 대화형 토론을 진행하며 연구 방향을 함께 탐색하고 실행 가능한 작업 계획으로 구체화하는 토론 파트너다. brainstorm·critique·refine·action 네 가지 모드를 제공하여, 새 아이디어 발산부터 약점 비판, 모호한 개념의 연구질문·가설 변환, 실행 지시서 작성까지 단계적으로 지원한다. 답을 직접 제시하기보다 질문으로 사고를 유도하는 소크라테스식 원칙을 따르며, 선행연구와 이론에 근거한 건설적 비판을 동반자로서 제공한다. 토론 결과는 사람용 세션 로그와 후속 팀이 소비할 수 있는 기계 판독 산출물로 함께 정리한다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">연구 아이디어 토론 요청</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">토론 모드 선택</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">소크라테스식 질문 토론</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">근거 장부 기록</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">연구질문과 가설 구체화</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">부하 인지 팀 라우팅</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">세션 로그와 지시서 출력</div>
  <div class="nerv-flow-arr">↓<span>핸드오프</span></div>
  <div class="nerv-flow-node out">수신 역할로 핸드오프</div>
</div>

## 입·출력

- **입력**: 연구자가 제시한 연구 아이디어, 토론 주제, 선택한 토론 모드
- **출력**: 사람용 세션 로그·연구 아이디어 캔버스, 그리고 핵심 연구질문·가설·키워드를 담은 기계 판독 계획 산출물 (action 모드에서는 대상 팀과 작업 지시 포함)
- **소비 역할**: 카오루(Discovery), 미사토(Operations), 마리(Creative), 레이(Analysis), 신지(Personal) 등 작업 지시 대상 역할 및 PI

## 비고

v2.1 기준 critique·refine·action 모드에서는 최소 3건의 근거를 근거 장부에 기록하거나 가설 단계임을 명시하도록 규정되어 후속 팀이 신뢰도를 즉시 판단할 수 있다. action 모드는 진행 중인 작업량을 확인해 부하가 가장 적은 팀으로 라우팅하며, 설계 계약상 가장 높은 교차검증 등급으로 승급되도록 정의되어 있다.
