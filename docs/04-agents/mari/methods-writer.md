# methods-writer

> PRISMA, 실험 설계 등 연구 방법론에 맞는 Methods 섹션을 작성합니다. Methods 섹션 초안 작성, PRISMA/스코핑/실험 방법론 기술 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 마리 · Creative & Writing |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep, Write, Bash |
| Codex gpt-5.5 위임 | 예 — Codex 본문 + Python 결정론 검증 + Claude 의미 검증 (영문 Tier 1) |

## 무엇을 하는가

연구 설계에 맞춰 논문의 Methods 섹션 초안을 작성하는 글쓰기 에이전트다. 체계적 문헌 연구(PRISMA 2020), 스코핑 리뷰(PRISMA-ScR), 실험 연구(모수·비모수 검정) 등 방법론 유형별로 표준 구조를 따라 APA 7판 형식으로 기술한다. 실험 연구의 경우 참가자·도구·절차·설계·데이터 분석으로 이어지는 섹션 골격과 검정력 분석을 포함해 재현 가능한 수준의 서술을 생성한다. 인용은 사전 추출된 인용 풀 범위 안에서만 사용하도록 제약해 출처가 불확실한 인용을 방지한다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">연구 설계 입력 + 방법론 유형</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">인용 풀 추출 및 사전 점검</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">프롬프트 구성 - 인용 allowlist + 문체 가이드</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-split">
    <div class="nerv-flow-split-head">Codex 위임 분기</div>
    <div class="nerv-flow-split-paths">
      <div class="nerv-flow-path"><span class="nerv-flow-tag codex">본문 생성</span><div class="nerv-flow-node codex">Codex gpt-5.5 가 Methods 초안 작성</div></div>
      <div class="nerv-flow-path"><span class="nerv-flow-tag">검증 잔류</span><div class="nerv-flow-node">Python 결정론 인용 검증</div></div>
    </div>
  </div>
  <div class="nerv-flow-conv">▼ ▼</div>
  <div class="nerv-flow-node">Python 결정론 인용 검증</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">Claude 의미 검증 및 문체 패스</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">Methods 섹션 + 검증 메타데이터</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node out">아스카 품질검토 · 리츠코 · PI</div>
</div>

## 입·출력

- **입력**: 연구 설계·변수·분석 방법 정보, 방법론 유형(PRISMA / 스코핑 / 실험), 분석 옵션, 언어 옵션, 사전 추출된 인용 풀
- **출력**: 방법론 유형별 표준 구조를 따른 Methods 섹션 초안과 인용·의미 검증 메타데이터
- **소비 역할**: 아스카(Quality & Review)의 품질 검토, 리츠코(Project Command), 그리고 PI

## 비고

Tier 1 강제 위임 에이전트로, 결정론적 구조(PRISMA·실험 설계 템플릿) 특성상 본문 생성은 Codex(gpt-5.5)가 담당하고 Claude는 인용·의미 검증과 한국어 문체 패스만 수행한다. 영문(`--lang en`)은 Codex 단일 패스 후 Python 검증 + Claude 의미 검증 별도 패스로, 한국어(`--lang ko`)는 검증과 문체 패스를 묶어 처리한다. Codex CLI 미설치·타임아웃·인용 풀 공백 등 시스템 오류 시에만 Claude 직접 처리로 폴백하며, 효율성 판단에 의한 회피는 금지된다. 각 처리 단계 사이의 산출물 변경(drift)을 해시로 추적해 검증 일관성을 보장한다.
