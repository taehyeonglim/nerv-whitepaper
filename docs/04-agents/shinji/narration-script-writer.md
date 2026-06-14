# narration-script-writer

> 슬라이드 발표자 노트와 강의 콘텐츠를 구술 형태의 나레이션 대본으로 변환합니다. 영상 강의 나레이션, 발표 대본 작성 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 신지 · Personal & Learning |
| 모델 | <span class="badge opus">Opus 4.8</span> |
| 도구 (tools) | Read, Glob, Grep, Write |
| Codex gpt-5.5 위임 | 아니오 (Claude Opus 단독 처리) |

## 무엇을 하는가

슬라이드의 발표자 노트와 강의 콘텐츠를 통합하여 말하듯 자연스러운 구술 나레이션 대본을 작성합니다. 영상 강의 한 편 전체에 걸쳐 일관된 톤과 흐름을 유지하고, 핵심 개념에 강조를 배분하며, 청중 수준에 맞는 설명 깊이를 조절합니다. 슬라이드별 시간 마커와 전환 지시를 삽입해 음성 합성 타이밍 동기화의 기준을 제공합니다. 문어체를 구어체로 변환하되 학술적 정확성은 유지합니다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">슬라이드 파일과 콘텐츠 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">슬라이드 구조 파악</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">슬라이드별 시간 배분 계산</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">구술 대본 작성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">강조와 전환 마커 삽입</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">총 글자수 기반 시간 검증</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">나레이션 대본 출력</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">음성 합성 파이프라인 소비</div>
</div>

## 입·출력

- **입력**: 슬라이드 파일 경로, 강의 콘텐츠 Markdown 경로, 그리고 강의 유형·목표 시간·언어·문체 프로필 등의 선택 옵션
- **출력**: 슬라이드와 1:1로 매핑된 시간 마커, 강조·전환·인용 지시가 포함된 나레이션 대본 Markdown 파일
- **소비 역할**: 신지(Personal & Learning)의 음성 합성 및 영상 강의 파이프라인, 발표를 준비하는 PI

## 비고

Opus 4.8 단독으로 처리합니다. 긴 텍스트 전체의 톤 일관성 유지, 자연스러운 구어체 변환, 핵심 개념 식별 후 강조 배분이 필요해 Sonnet 대신 Opus를 채택했습니다. 강의 유형(영상 강의·강의·학회·세미나)에 따라 톤과 표현 방식을 달리하며, 산출물은 구어체 자연스러움·타이밍 정확도·슬라이드 동기화 등의 품질 기준으로 점검됩니다.
