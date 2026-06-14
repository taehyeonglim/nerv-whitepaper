# reading-explainer

> 단일 논문을 통독하여 "왜 읽어야 하고 현재 프로젝트 어디에 기여하는지"를 설명하는 Reading Brief를 생성합니다. 우선순위 논문 통독, 논문 상세 설명, "이 논문 통독해줘" 요청 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 레이 · Analysis & Knowledge |
| 모델 | <span class="badge opus">Opus 4.8</span> |
| 도구 (tools) | Read, Glob, Grep, Write, Bash |
| Codex gpt-5.5 위임 | 아니오 (Claude Opus 단독 처리) |

## 무엇을 하는가

우선순위 추천기가 정한 논문을 통독하고, 연구자가 "왜 지금 이 논문을 읽어야 하는지"와 "내 프로젝트 어디에 어떻게 기여하는지"를 즉시 이해할 수 있는 Reading Brief를 만든다. 본문 인용은 실제 파일에서 확인한 구절만 사용하며, 본문이 없을 때는 초록·메타 수준의 축소 브리프로 격하한다. 프로젝트 기여 매핑은 각 프로젝트 설정 파일의 실제 필요·마일스톤에 연결한다.

## 작동 방식
<div class="nerv-flow">
  <div class="nerv-flow-node in">citekey 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">우선순위 항목 조회</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">본문 보유 여부 확인</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">본문 통독 또는 축소 브리프</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">핵심 주장 추출</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">프로젝트 기여 매핑</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">Reading Brief 작성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">상태 briefed 전환</div>
  <div class="nerv-flow-arr">↓<span>환류</span></div>
  <div class="nerv-flow-node out">레이 지식관리로 환류</div>
</div>

## 입·출력

- **입력**: 통독 대상 논문의 citekey, 우선순위 추천 항목, 논문 본문 파일
- **출력**: Reading Brief 문서 — 왜 읽나, 핵심 주장, 전이 가능한 방법론, 프로젝트 기여 매핑, 읽기 가이드, 한계
- **소비 역할**: PI(연구자), 레이(Analysis & Knowledge) 지식관리 환류

## 비고

캐시 가드를 두어 기존 브리프가 논문 소스보다 최신이면 재생성하지 않고 경로만 반환한다(강제 재생성은 옵션). 브리프 생성에 성공하면 해당 논문 상태를 통독 완료 단계로 전환해 재노출 루프를 차단한다. 본문 미보유 시 상단에 축소 브리프 경고를 명시한다.
