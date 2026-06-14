# lecture-content-designer

> 조사 자료를 교수학적 강의 콘텐츠로 변환하는 오케스트레이터. 강의 설계, 커리큘럼 기획, 교육 콘텐츠 구성 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 신지 · Personal & Learning |
| 모델 | <span class="badge opus">Opus 4.8</span> |
| 도구 (tools) | Read, Glob, Grep, Write, Bash |
| Codex gpt-5.5 위임 | 아니오 (Claude Opus 단독 처리) |

## 무엇을 하는가

학술 연구 자료와 주제 조사 결과를 교수학적으로 설계된 강의 콘텐츠로 변환하는 오케스트레이터다. 특별강의·워크숍·세미나·정규 수업·동영상 강좌 등 강의 유형에 맞춰 핵심 개념을 추출하고 학습 목표를 설계한다. 자료 수집과 섹션별 콘텐츠 작성은 다른 강의 서브에이전트에 위임하며, 전체 구성과 흐름을 통제한다. 교수학적 흐름·청중 적합성·개념 명료성 등 품질 기준을 충족하도록 결과를 검증한다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">강의 주제 입력과 유형 지정</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">서브에이전트 병렬 자료 수집</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">핵심 개념 추출과 관계 맵 구성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">학습 목표 설계</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">강의 구성안 설계와 타이밍 검증</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">섹션별 콘텐츠 위임</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">시각 자료 계획 수립</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">강의 콘텐츠 산출</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">PI · 마리 · 레이 · 리츠코</div>
</div>

## 입·출력

- **입력**: 강의 주제와 강의 유형 지정, 청중 수준, 조사 대상 학술 자료
- **출력**: 교수학적으로 설계된 강의 구성안과 섹션별 콘텐츠, 시각 자료 계획, 동영상 강좌의 경우 커리큘럼 기획안과 차시별 콘텐츠
- **소비 역할**: PI, 마리(Creative & Writing), 레이(Analysis & Knowledge), 리츠코(Project Command)

## 비고

다른 강의 서브에이전트(자료 조사·콘텐츠 합성 등)를 호출하는 오케스트레이터 성격의 에이전트다. 동영상 강좌 유형에서는 전체 커리큘럼을 기획하는 Series 모드와 차시별 콘텐츠 및 나레이션 대본을 만드는 Episode 모드를 별도로 지원한다. 강의 구성 단계에서 타이밍을 ±15% 범위로 검증한다.
