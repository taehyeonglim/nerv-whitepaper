# results-writer

> 통계 분석 결과를 APA 7판 형식의 Results 섹션으로 변환합니다. Results 섹션 작성, APA 7판 형식의 통계 결과 기술 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 마리 · Creative & Writing |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep, Write, Bash |
| Codex gpt-5.5 위임 | 예 — Codex 본문 + Python 결정론 검증 + Claude 의미 검증 (영문 Tier 1) |

## 무엇을 하는가

통계 소프트웨어의 출력(검정통계량, 자유도, p값, 효과 크기)을 APA 7판 보고 형식의 Results 섹션 문장과 기술통계 표로 변환합니다. t-검정, 분산분석, 상관, 회귀 같은 모수 검정과 Mann-Whitney, Wilcoxon, Kruskal-Wallis, Friedman 같은 비모수 검정을 모두 지원합니다. 효과 크기에 small/medium/large 해석 기준을 적용하고, 해석은 배제한 채 발견 사실만 과거 시제로 보고합니다. 입력에 등재된 수치만 본문에 사용하는 No-New-Numbers 규칙을 작성 전 과정에서 강제합니다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">통계 trace 가설 변수명 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">인용 풀 추출</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">No-New-Numbers 헤더 prepend</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-split">
    <div class="nerv-flow-split-head">Codex gpt-5.5 위임</div>
    <div class="nerv-flow-split-paths">
      <div class="nerv-flow-path"><span class="nerv-flow-tag codex">본문 생성</span><div class="nerv-flow-node codex">Codex가 APA 본문 작성</div><div class="nerv-flow-arr">↓</div><div class="nerv-flow-node">Python 인용 검증</div></div>
      <div class="nerv-flow-path"><span class="nerv-flow-tag">검증 잔류</span><div class="nerv-flow-node">Claude 결정론 의미 검증</div></div>
    </div>
  </div>
  <div class="nerv-flow-conv">▼ ▼</div>
  <div class="nerv-flow-node">수치 1대1 매칭 점검</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">Results 섹션 + stat trace 산출</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">아스카 리츠코 소비</div>
</div>

## 입·출력

- **입력**: 통계 분석 결과(검정통계량·자유도·p값·효과 크기), 기술통계(M/SD 또는 Mdn/IQR), 연구 가설/질문, 변수명, 보고 언어 옵션
- **출력**: APA 7판 형식의 Results 섹션(Preliminary/Main/Additional Analyses 구조 + 기술통계 표), 별도 stat trace 부속 산출물
- **소비 역할**: 아스카(Quality & Review)의 문체·품질 검토, 리츠코(Project Command)의 원고 취합 및 PI

## 비고

영문 Tier 1로 분류되어 본문 생성은 Codex gpt-5.5에 강제 위임하고 Claude는 검증만 담당합니다. APA 통계 보고가 결정론적 구조라는 전제에 따른 배치이며, 위임 후에도 No-New-Numbers 규칙(입력에 없는 수치 생성·정밀화·파생 효과 크기 임의 삽입 금지)이 절대 우선합니다. Codex 미설치·타임아웃 등 시스템 오류나 검증 반복 실패 시에만 Claude 직접 처리로 폴백하며, 효율성 판단에 의한 위임 회피는 금지됩니다. 인용 무결성 프로토콜(식별자 fabrication 금지, 인용-참고문헌 1:1 매칭)도 함께 적용됩니다.
