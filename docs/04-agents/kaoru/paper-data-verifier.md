# paper-data-verifier

> 학술 원고의 통계 수치 정합성 감사 — F-stat / p-value / β / η² / d_z / α / N / % 등을 raw 분석 산출물과 1:1 cross-check. Phase 1 결정론만 사용, LLM 호출은 paraphrase 단계에만.

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 카오루 · Discovery & Insight |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep, Bash, Write |
| Codex gpt-5.5 위임 | 아니오 (Claude Sonnet 단독 처리) |

## 무엇을 하는가

paper-data-verifier는 작성된 학술 원고 본문에 등장하는 통계 수치(F-통계량, p-값, 회귀계수 β, 효과크기 η²·d_z, 신뢰도 α, 표본 수 N, 백분율 등)를 추출해, 원본 분석 산출물의 ground truth와 한 건씩 대조하는 정합성 감사 에이전트다. 수치 검증은 Python 정규식과 데이터클래스 기반 결정론 로직으로만 수행하며, LLM은 표현 일치(paraphrase) 판단 단계에서만 제한적으로 사용한다. 다중 종속변수 모호성, 수식어 오인, 신뢰구간 오해 등 거짓 양성을 차단하는 가드를 갖춰 원고 안의 수치 오기를 안정적으로 짚어낸다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">원고와 ground truth 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">통계 수치 정규식 추출</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">ground truth 산출물 매칭</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">종속변수 이름 추론</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">거짓 양성 가드 적용</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">수치 1대1 대조 검증</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">claims와 verifications 산출</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">레이 마리 아스카 소비</div>
</div>

## 입·출력
- **입력**: 검증 대상 학술 원고, 참고문헌 목록, 그리고 대조 기준이 되는 원본 통계 산출물(ground truth) 경로
- **출력**: 추출된 수치 주장 목록(claims)과 건별 검증 결과(verifications, numerical-claim 유형) 레코드
- **소비 역할**: 레이(분석·지식), 마리(작성), 아스카(품질·검토) 및 PI — 원고의 통계 정합성을 점검할 때 활용

## 비고

2026-05-23 v1.0으로 신설된 카오루 paper-verifier 인프라 중 통계 수치 담당 에이전트다. 동일 시점에 도입된 paper-citation-auditor(인용 정합성)와 짝을 이룬다. 수치 재계산은 전부 결정론(Python)으로 처리하고, 의미적 표현 일치 판단에서만 LLM을 호출하는 설계 원칙을 따른다. 원본 데이터는 read-only로 강제되어 검증 과정에서 변경되지 않으며, 임계값 미달을 재해석으로 우회하거나 검증 범위를 좁혀 통과시키는 안티패턴을 명시적으로 차단한다.
