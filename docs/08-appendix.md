# 8 · 부록

NERV 백서의 참조 자료입니다. **용어집**, **45 에이전트 전체 인벤토리**, **인벤토리 검증 스크립트**,
**캐릭터 ↔ 에반게리온 모티프 매핑**을 한 곳에 모았습니다.

> 본 부록은 시스템 *구조*만 기술합니다. 진행 중인 연구의 데이터·결과·예산 실액·참가자 정보는 포함하지 않습니다.
> 모델 배지: <span class="badge opus">Opus 4.8</span> <span class="badge sonnet">Sonnet 4.6</span> <span class="badge haiku">Haiku 4.5</span> ·
> <span class="badge codex">Codex 위임</span> = gpt-5.5 강제 위임 단계 보유.

---

## 8.1 · 용어집

| 용어 | 뜻 |
|------|----|
| **NERV** | 1인 연구실(PI)의 학술 연구를 자동화·증폭하는 45개 에이전트 멀티에이전트 시스템. 에반게리온의 특무기관 *NERV*가 모티프. |
| **MAGI** | 3대 LLM(Claude · Gemini · GPT)의 **합의** 시스템. 에반게리온의 3대 슈퍼컴퓨터(멜기오르·발타자르·카스파)에서 따왔다. 단일 모델의 편향을 다른 두 모델의 교차검증으로 보정한다. |
| **MAGI Gate** | 역할 간 데이터 교환(핸드오프)에 대한 **자율 교차검증 게이트**. 핸드오프 종류에 따라 검증 강도를 L0(로그만)~L3(3 LLM Full Council)로 차등 적용하도록 설계된 계약. |
| **MAGI Patrol** | 시스템을 정기적으로 자동 순찰하며 설정·문서·코드·스키마·위키 등의 **정합성 이상을 탐지**하는 메커니즘. 이상이 없으면 무음(無音)이 정상이다. |
| **Handoff Schema** | 7개 캐릭터(역할) 사이에 주고받는 데이터의 **표준 교환 규격**. 필수 필드·소비자·검증 등급을 정의해 역할 간 결합을 느슨하게 유지한다. |
| **Codex (gpt-5.5)** | OpenAI 계열 LLM. 종합·분류·요약 같은 자연어 생성 단계를 위임받아 GPT 쿼터를 활용한다. 파일 I/O·인용 검증 등 결정론적 단계는 위임하지 않는다. |
| **Antigravity / agy (Gemini)** | Google Gemini 계열을 호출하는 CLI(`agy`). MAGI 합의 시 세 번째 관점(발타자르)을 제공한다. |
| **launchd** | macOS의 표준 작업 스케줄러. NERV의 정기 작업(순찰·요약·백업·리포트 등)은 `com.nerv.*` 형태의 launchd 잡으로 등록되어 자동 실행된다. |
| **서브에이전트(Subagent)** | `.claude/agents/` 에 정의된 단일 책임 Claude 에이전트. 한 가지 작업(요약·분석·작성 등)을 수행하며 캐릭터(역할)가 소유한다. NERV에는 38개가 있다. |
| **Python 파이프라인** | 서브에이전트가 아니라 `scripts/`에서 실행되는 결정론적 Python 처리기. 문서 변환·API 조회 등 LLM이 불필요하거나 부적합한 작업을 담당한다. NERV에는 7개가 있다. |
| **Knowledge Wiki** | 여러 논문에 걸친 개념을 교차 정리해 **지식을 복리로 축적**하는 위키(카파시 LLM-Wiki 패턴). 새 자료 수집 시 기존 페이지를 역방향으로 갱신한다. |
| **발행-구독(Publish-Subscribe)** | 한 역할(주로 레이)이 산출한 지식을 공유 디렉토리에 **발행**하면, 수신을 선언한 다른 역할들이 **구독**해 가져가는 데이터 공유 모델. 트리거 기반으로 동작한다. |
| **Codex 강제 위임** | 특정 단계에서 Codex 호출을 **선택이 아닌 필수**로 지정한 정책. 가용 시 반드시 위임하고, CLI 미설치·타임아웃 등 시스템 오류일 때만 원래 모델로 폴백한다. |

---

## 8.2 · 45 에이전트 전체 인벤토리

NERV는 **38개 Claude 서브에이전트 + 7개 Python 파이프라인 = 45개**로 구성됩니다.
각 에이전트는 7명의 캐릭터(역할) 중 하나가 소유합니다.

### Claude 서브에이전트 (38)

| 캐릭터 | 에이전트 | 모델 | 종류 | 기능 |
|--------|----------|------|------|------|
| 리츠코 | research-idea-discussant | <span class="badge opus">Opus</span> | Claude | 소크라틱 연구 아이디어 토론 |
| 리츠코 | research-timeline-tracker | <span class="badge opus">Opus</span> | Claude | 프로젝트 일정 추적 |
| 리츠코 | budget-manager | <span class="badge sonnet">Sonnet</span> | Claude | 연구비 예산 관리 |
| 리츠코 | github-import-evaluator | <span class="badge opus">Opus</span> <span class="badge codex">Codex</span> | Claude | GitHub 저장소 도입 평가 |
| 리츠코 | agent-installer | <span class="badge haiku">Haiku</span> | Claude | 외부 서브에이전트 자동 설치 |
| 레이 | paper-summarizer | <span class="badge haiku">Haiku</span> <span class="badge codex">Codex</span> | Claude | 논문 요약 |
| 레이 | methodology-analyzer | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 방법론 분석 |
| 레이 | keyword-tagger | <span class="badge haiku">Haiku</span> <span class="badge codex">Codex</span> | Claude | 키워드/태그 추천 |
| 레이 | note-linker | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 자동 백링크 생성 |
| 레이 | wiki-compounder | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 위키 역방향 갱신(지식 복리) |
| 레이 | library-health-monitor | <span class="badge haiku">Haiku</span> | Claude | 라이브러리 정합성 감시 |
| 레이 | reading-explainer | <span class="badge opus">Opus</span> | Claude | 단일 논문 통독 Reading Brief |
| 아스카 | academic-style-checker | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 학술 문체/일관성 검사 |
| 아스카 | research-gap-identifier | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 연구 갭 식별 |
| 아스카 | reviewer-response-helper | <span class="badge opus">Opus</span> | Claude | R&R 재투고 응대 |
| 아스카 | qualitative-data-analyzer | <span class="badge sonnet">Sonnet</span> | Claude | 질적 데이터 주제 분석 |
| 카오루 | related-paper-finder | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 관련 논문 탐색 |
| 카오루 | citation-network-explorer | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 인용 네트워크 분석 |
| 카오루 | research-trend-analyzer | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 연구 동향 분석 |
| 카오루 | deep-researcher | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 심층 자료 탐색 |
| 카오루 | daily-paper-recommender | <span class="badge sonnet">Sonnet</span> | Claude | 매일 논문 큐레이션 |
| 카오루 | paper-code-auditor | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 논문-코드 정합성 감사 |
| 카오루 | source-comparator | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 다중 소스 비교 매트릭스 |
| 카오루 | paper-citation-auditor | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 원고 인용 정합성 감사 |
| 카오루 | paper-data-verifier | <span class="badge sonnet">Sonnet</span> | Claude | 원고 통계 수치 감사 |
| 마리 | intro-writer | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 서론/문헌리뷰 작성 |
| 마리 | methods-writer | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | Methods 섹션 작성 |
| 마리 | results-writer | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | Results 섹션 작성 |
| 마리 | discussion-writer | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | Discussion 섹션 작성 |
| 마리 | abstract-generator | <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> | Claude | 초록/결론 생성 |
| 마리 | irb-document-writer | <span class="badge opus">Opus</span> | Claude | IRB 신청서/동의서 작성 |
| 신지 | lecture-content-synthesizer | <span class="badge sonnet">Sonnet</span> | Claude | 자료 → 강의 내러티브 변환 |
| 신지 | lecture-web-researcher | <span class="badge sonnet">Sonnet</span> | Claude | 강의 주제 웹 자료 검색 |
| 신지 | lecture-slide-maker | <span class="badge opus">Opus</span> | Claude | 강의용 HTML 슬라이드 덱 |
| 신지 | narration-script-writer | <span class="badge opus">Opus</span> | Claude | 나레이션 대본 작성 |
| 신지 | imotions-expert | <span class="badge sonnet">Sonnet</span> | Claude | iMotions 센서/지표 전문가 조회 |
| 신지 | lecture-content-designer | <span class="badge opus">Opus</span> | Claude | 강의 콘텐츠 설계 오케스트레이터 |
| 신지 | image-generator | <span class="badge sonnet">Sonnet</span> | Claude | OAuth 프록시 이미지 생성 |

**모델 분포**: Opus 4.8 × 9 · Sonnet 4.6 × 25 · Haiku 4.5 × 4 = **38**.

### Python 파이프라인 (7)

서브에이전트가 아니라 `scripts/`에서 실행되는 결정론적 처리기입니다. 문서 변환·API 조회·외부 발굴 등
LLM 추론보다 결정론이 적합한 작업을 담당합니다.

| 캐릭터 | 파이프라인 | 모델 | 종류 | 기능 |
|--------|------------|------|------|------|
| 미사토 | pipeline-orchestrator | — | Python | 문서처리 파이프라인 오케스트레이션 |
| 미사토 | pdf-to-markdown | — | Python | PDF → Markdown 변환(GPU 가속) |
| 미사토 | conversion-quality-checker | — | Python | 변환 품질 검사 |
| 미사토 | doi-resolver | — | Python | DOI 조회/매칭(KCI 폴백 포함) |
| 미사토 | citation-extractor | — | Python | 참고문헌 추출 |
| 미사토 | figure-table-extractor | — | Python | 그림/표 추출 + 본문 링크 정합 |
| 리츠코 | github-hunter | — | Python | 외부 GitHub 자산 발굴·평가 오케스트레이터 |

> github-hunter는 7단계 Python 오케스트레이터로, 일부 단계에서 Claude/Codex를 호출하지만
> 실행 단위 자체는 서브에이전트가 아닌 **Python 파이프라인**으로 분류됩니다.

**합계**: 38 Claude 서브에이전트 + 7 Python 파이프라인 = **45 에이전트**.

---

## 8.3 · 인벤토리 검증

카운트 드리프트(문서·정의·설정 간 숫자 불일치)는 다음 스크립트로 자동 감지합니다.

```bash
python3 scripts/check_agent_inventory.py
```

이 스크립트는 아래 세 출처를 교차 대조하고, 하나라도 어긋나면 비정상 종료(exit ≠ 0)합니다.

- `.claude/agents/*.md` — 실행 가능한 Claude 서브에이전트 정의
- `Agents/{캐릭터}/*/SKILL.md` — 캐릭터별 문서
- `CLAUDE.md` / 설정 파일의 카운트 선언

정상일 때 출력 예:

```text
Operational total: 45
  ritsuko: 5  misato: 6  rei: 7  asuka: 4  kaoru: 9  mari: 6  shinji: 7
Inventory OK — all cross-references and doc counts consistent.
```

> Python 파이프라인 7개는 설정 파일의 SSOT(단일 진실 원천)에 별도로 등재되며,
> 서브에이전트 38과 합산해 운영 총계 45를 산출합니다.

---

## 8.4 · 캐릭터 ↔ 에반게리온 모티프

NERV의 7개 역할은 *신세기 에반게리온*의 인물에서 이름을 따왔습니다. 캐릭터의 작중 성격이
담당 도메인의 톤과 느슨하게 대응합니다(예: 분석·지식의 레이 = 과묵·정밀).

| 캐릭터 | 에반게리온 모티프 | NERV 역할 도메인 |
|--------|------------------|------------------|
| **리츠코** | 아카기 리츠코 | Project Command — 기획·일정·예산·도입 평가 |
| **미사토** | 카츠라기 미사토 | Operations — 문서처리 파이프라인 운영 |
| **레이** | 아야나미 레이 | Analysis & Knowledge — 분석·요약·지식 관리 |
| **아스카** | 소류 아스카 랑그레이 | Quality & Review — 품질·문체·리뷰 응대 |
| **카오루** | 나기사 카오루 | Discovery & Insight — 탐색·인용 네트워크·동향 |
| **마리** | 마키나미 마리 일러스트리어스 | Creative & Writing — 논문 섹션·초록·IRB 작성 |
| **신지** | 이카리 신지 | Personal & Learning — 강의·교안·전문가 조회 |

또한 3대 LLM은 *MAGI* 슈퍼컴퓨터에 대응합니다 — **멜기오르(Claude)**, **발타자르(Gemini)**,
**카스파(GPT/Codex)** — 세 시스템의 교차검증이 NERV 자율 운영의 신뢰 기반입니다.

---

> **상위 장으로**: [목차](index.md) · [4 · 서브에이전트 레퍼런스](04-agents/index.md) · [7 · 모델 전략](07-model-strategy.md)
