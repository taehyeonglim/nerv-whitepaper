# lecture-slide-maker

> 강의·워크숍 콘텐츠를 교육용 HTML 슬라이드 덱으로 디자인합니다. 특별강의, 교수법 특강, 워크숍 슬라이드 제작 시 사용.

!!! warning "보관됨 — 강의 도메인 종료 (2026-06-21)"
    NERV는 2026-06-21부로 강의 콘텐츠 제작 도메인을 더 이상 운영하지 않는다. 이 에이전트는 정의가 보존된 채 **비활성** 상태이며, 강의 작업은 NERV 외부에서 별도로 진행된다.

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 신지 · Personal & Learning |
| 모델 | <span class="badge opus">Opus 4.8</span> |
| 도구 (tools) | Read, Glob, Grep, Write, Edit, Bash |
| Codex gpt-5.5 위임 | 아니오 (Claude Opus 단독 처리) |

## 무엇을 하는가

강의 콘텐츠 Markdown을 입력받아, 교수학적 흐름과 청중 참여를 살린 HTML 슬라이드 덱으로 재구성하는 교육 슬라이드 디자이너입니다. 3종 디자인 템플릿(carbon·ios·material) 중 강의 맥락에 맞는 것을 선택하고, 강의 유형(세미나·강의·워크숍)에 따라 슬라이드 수와 섹션 구분을 자동 배분합니다. 활동 지시, 청중 질문·투표, 쉬는 시간, 그룹 활동 같은 교육 전용 패턴을 추가해 90분 이상 강의의 인지 부하와 주의력 곡선을 고려한 리듬을 설계합니다. 발표용 덱과 핸드아웃 인쇄용 덱을 함께 산출합니다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">강의 콘텐츠 마크다운 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">청중과 시간 구성 확인</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">콘텐츠 정독 후 시간 배분 추출</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">슬라이드 수와 섹션 구성 선언</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">템플릿 선택 후 인프라 복사</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">발표용 덱 작성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">핸드아웃 인쇄용 덱 작성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">검증 후 요약</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">슬라이드 덱 산출</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">PI 강의 활용</div>
</div>

## 입·출력

- **입력**: 강의 콘텐츠 Markdown 경로(상위 설계자 lecture-content-designer 출력 또는 직접 작성된 교안), 강의 유형·템플릿·목표 슬라이드 수·언어·발표자 노트 옵션
- **출력**: 발표용 HTML 덱(Deck.html), 핸드아웃 PDF용 덱(Deck-print.html), 디자인 인프라 파일(스테이지 스크립트·스타일·폰트), 사용법과 강의 시간표를 담은 README
- **소비 역할**: PI(강의·워크숍 진행), 상위 설계자 lecture-content-designer(교안 설계 → 시각화 연계)

## 비고

iOS 템플릿이 강의 맥락에서 기본 권장됩니다(청중 친근도·시각적 에너지). 강의 유형별로 90분마다 쉬는 시간 또는 섹션 전환을 자동 확보하고, 섹션당 청중 상호작용 질문을 1개 이상 배치하는 품질 기준을 둡니다. Python·video·TTS 파이프라인 의존을 제거한 HTML-first 구조이며, 폰트는 로컬 번들로 오프라인 동작합니다. 자매 에이전트 research-slide-maker와 디자인 시스템을 공유하되 교육 전용 슬라이드 패턴이 추가됩니다.
