# lecture-content-synthesizer

> 학술 연구 자료를 교수학적 강의용 내러티브로 변환합니다. 연구 자료를 강의 내러티브로 변환할 때 사용

!!! warning "보관됨 — 강의 도메인 종료 (2026-06-21)"
    NERV는 2026-06-21부로 강의 콘텐츠 제작 도메인을 더 이상 운영하지 않는다. 이 에이전트는 정의가 보존된 채 **비활성** 상태이며, 강의 작업은 NERV 외부에서 별도로 진행된다.

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 신지 · Personal & Learning |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep, WebSearch, WebFetch, Write |
| Codex gpt-5.5 위임 | 아니오 (Claude Sonnet 단독 처리) |

## 무엇을 하는가

학술 논문, 동향 분석, 기술 문서 등의 연구 자료를 분석하여 강의에 적합한 교수학적 내러티브로 변환합니다. 학술적 어조 대신 청중이 이해하고 적용할 수 있는 강의용 콘텐츠를 생성하며, 핵심 개념을 청중 수준에 맞는 설명·비유·실생활 예시로 재구성합니다. 개념 간 논리적 흐름을 교수학적 스캐폴딩으로 구성하고, 발표자용 Speaker Notes까지 작성합니다. 선택 모드에서는 동일한 콘텐츠를 녹화용 강의 대본으로도 산출합니다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">강의 주제와 섹션 정보 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">연구 자료 로드</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">핵심 개념 분석</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">교수학적 변환 비유와 예시</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">내러티브 구성 도입부터 전환까지</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">Speaker Notes 작성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">마크다운 강의 콘텐츠 저장</div>
  <div class="nerv-flow-arr">↓<span>전달</span></div>
  <div class="nerv-flow-node out">신지 후속 강의 에이전트로 전달</div>
</div>

## 입·출력

- **입력**: 강의 주제, 섹션 정보(제목·핵심 개념·할당 시간), 참조할 연구 자료 경로 목록, 청중 수준(beginner/intermediate/advanced), 선택적으로 청중 특성과 출력 경로
- **출력**: 섹션별 강의용 내러티브 마크다운(도입·핵심 개념·비유·예시·시각 자료 계획·전환·Speaker Notes). 선택 모드에서는 시간 마커가 부여된 녹화용 강의 대본
- **소비 역할**: 신지(Personal & Learning) 내부의 후속 강의 제작 에이전트 — 슬라이드 제작·나레이션 대본·강의 설계 단계에서 활용

## 비고

Claude Sonnet 단독으로 처리하며 Codex 강제위임 대상이 아닙니다. 기본 모드는 강의 내러티브 생성이고, `--output-type narration_script` 옵션을 지정하면 녹화용 대본(분당 약 150단어 기준, 시간 마커와 슬라이드 번호 정합)을 산출하는 이중 산출 구조를 가집니다.
