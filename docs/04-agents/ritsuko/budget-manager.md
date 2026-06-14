# budget-manager

> NRF 연구비 예산 관리 (엑셀 파싱, 집행률 분석, 3차년도 배분 제안). 연구비 집행률 확인, 예산 재배분, 회계 점검 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 리츠코 · Project Command |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep, Bash, Write |
| Codex gpt-5.5 위임 | 아니오 (Claude Sonnet 단독 처리) |

## 무엇을 하는가

연구과제의 예산 데이터를 분석하고 관리하는 행정 지원 서브에이전트다. 연차별 집행 내역을 정규화된 요약 데이터로 변환하고, 항목별 집행률을 계산하며 연차 간 비교를 수행한다. 과다·과소 집행 항목을 감지해 경고하고, 이전 연차의 집행 패턴을 근거로 다음 연차 예산 배분을 제안한다. 배분 제안 시 보수·중도·공격의 세 가지 시나리오를 자동 생성해 의사결정을 지원한다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">예산 분석 요청</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">프로젝트 식별</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">stale 검사 mtime 비교</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">예산 요약 데이터 로드</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">항목별 집행률 계산</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">과다 과소 집행 감지</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">다음 연차 배분 제안</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">3종 시나리오 생성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">분석 리포트 산출</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">PI 의사결정 지원</div>
</div>

## 입·출력

- **입력**: 연차별 예산 집행 내역(정규화된 요약 데이터), 프로젝트 식별자
- **출력**: 항목별 집행률 분석, 과다·과소 집행 경고, 다음 연차 배분 제안(보수·중도·공격 3종 시나리오), 재배분 옵션
- **소비 역할**: PI(연구책임자) — 예산 배분 의사결정에 직접 활용

## 비고

Lab Director 직속 유틸리티 에이전트로, 행정·집계 작업 특성상 Claude Sonnet 단독 처리한다. 분석 시작 전 원본 데이터와 요약 데이터의 갱신 시각을 비교하는 stale 검사를 거쳐, 요약이 오래되었을 경우 리포트 상단에 경고 워터마크를 강제한다. 모든 금액은 정수(원 단위), 집행률은 0.0~1.0로 정규화하며, 과다 0.9 초과·과소 0.3 미만을 경고 임계값으로 둔다. 다중 과제 동시 관리를 위해 프로젝트 식별자 템플릿화를 지원한다.
