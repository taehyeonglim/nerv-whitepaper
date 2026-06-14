# imotions-expert

> iMotions 멀티모달 생체신호 플랫폼 전문가 (센서/지표/연구설계 조회). iMotions 센서 설정, 생체신호 지표, 시선추적 실험 설계 질문 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 신지 · Personal & Learning |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, WebSearch, WebFetch |
| Codex gpt-5.5 위임 | 아니오 (Claude Sonnet 단독 처리) |

## 무엇을 하는가

iMotions 멀티모달 생체신호 연구 플랫폼에 대한 전문 조언을 제공하는 조회형 에이전트다. 센서 설정, 연구 변수에서 측정 지표로의 매핑, 연구 설계와 관련된 자연어 질의를 받아 의미적으로 해석한 뒤 답변을 생성한다. 시선추적, 표정 분석, 음성 분석 등 보유 센서를 우선으로 추천하고, 미보유 센서에 대해서는 자기보고나 보유 센서 조합 같은 대안을 함께 제시한다. 답변은 내부 지식 기반을 먼저 참조하고, 부족한 경우 웹 검색으로 최신 문서와 논문을 보충한다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">사용자 자연어 질의</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">질의 의미 해석</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">KB 파일 목록 스캔</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">관련 파일 매칭과 읽기</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">보유 모듈 제약 적용</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-split">
    <div class="nerv-flow-split-head">KB 충분한가</div>
    <div class="nerv-flow-split-paths">
      <div class="nerv-flow-path"><span class="nerv-flow-tag">예</span></div>
      <div class="nerv-flow-path"><span class="nerv-flow-tag">아니오</span><div class="nerv-flow-node">웹 검색으로 보충</div><div class="nerv-flow-arr">↓</div></div>
    </div>
  </div>
  <div class="nerv-flow-conv">▼ ▼</div>
  <div class="nerv-flow-node">자연어 답변 생성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">expert_system_output 산출</div>
  <div class="nerv-flow-arr">↓<span>전달</span></div>
  <div class="nerv-flow-node out">마리 · 레이 · 리츠코로 전달</div>
</div>

## 입·출력

- **입력**: 센서 설정, 측정 지표 해석, 시선추적 등 실험 설계에 관한 사용자 자연어 질의
- **출력**: 추천 센서 조합, 측정 계획, 자기보고 보완안, 실험 설계를 담은 자문 결과 (`expert_system_output`)
- **소비 역할**: 마리 (Creative & Writing), 레이 (Analysis & Knowledge), 리츠코 (Project Command)

## 비고

기능 자체는 Claude Sonnet 단독으로 처리하며 Codex 위임 대상이 아니다. 별도의 주간 지식 갱신 잡이 연동되어 있어, 최신 관련 논문 요약을 지식 기반의 논문 디렉토리에 주기적으로 보충한다(주 1회). 본 에이전트의 작업은 키워드 색인 조회가 아니라 자연어 질의를 의미적으로 매핑해 연구 맥락에 맞는 답변을 생성하는 의미 기반 Q&A로 분류되어, 결정론적 코드 대체 대신 LLM 처리로 유지된다.
