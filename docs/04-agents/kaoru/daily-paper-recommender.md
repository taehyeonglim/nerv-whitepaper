# daily-paper-recommender

> 매일 진행 중인 연구 프로젝트에 가장 도움이 될 논문 1편을 큐레이션합니다. 일일 논문 추천, 프로젝트별 관련 논문 큐레이션 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 카오루 · Discovery & Insight |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep |
| Codex gpt-5.5 위임 | 아니오 (Claude Sonnet 단독 처리) |

## 무엇을 하는가
매일 활성 연구 프로젝트의 맥락을 분석하여, 후보 논문 중 가장 가치 있는 1편을 선택하고 추천 이유를 생성합니다. Python 백엔드가 수집·점수화한 상위 후보 논문과 활성 프로젝트 프로파일을 입력받아, 최종 1편을 골라 추천 내러티브를 만듭니다. 연구 갭 해소, 새로운 방법론·관점, 즉시 활용 가능성, 교차 프로젝트 인사이트를 선택 기준으로 삼고, 최근 추천 이력과 겹치는 주제는 회피합니다. 후보 메타데이터는 임의로 수정하지 않으며, 모든 후보의 관련성이 낮은 날에는 추천을 비워 두는 정책을 따릅니다.

## 작동 방식
<div class="nerv-flow">
  <div class="nerv-flow-node in">일일 트리거 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">후보 논문 메타데이터 분석</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">활성 프로젝트 연구 갭 대조</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">최근 추천 이력 중복 확인</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">최적 1편 선택과 추천 내러티브 생성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">추천 결과 산출</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">레이 · 마리 · 아스카 · 신지 소비</div>
</div>

## 입·출력
- **입력**: 상위 후보 논문 목록(제목·저자·초록·점수·최적합 프로젝트), 활성 프로젝트 프로파일(키워드·연구 갭), 선택적으로 최근 추천 이력
- **출력**: 선택된 논문 1편과 추천 이유, 핵심 인사이트, 추천 태그, 읽기 우선순위, 프로젝트별 연관성 설명(모두 적합하지 않으면 추천 없음 반환)
- **소비 역할**: literature_discovery_output 핸드오프를 통해 레이·마리·아스카·신지, 그리고 PI

## 비고
선택은 주어진 후보 범위 안에서만 이루어지며, 후보 메타데이터(제목·저자·DOI·저널)를 변경하거나 추가하지 않는 할루시네이션 방지 규칙을 따릅니다. 추천 논문은 지식 관리 파이프라인을 거쳐 자동으로 노트화·등록되며, 외부 동기화가 설정되지 않은 환경에서도 로컬 처리만으로 정상 동작합니다.
