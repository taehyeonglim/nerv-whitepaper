# 7 · 모델 전략

NERV는 작업의 성격에 따라 **서로 다른 등급의 모델을 의도적으로 배정**합니다.
오케스트레이션·고급 생성에는 강한 모델을, 구조화 추출·결정론적 plumbing에는 가벼운 모델을 쓰고,
종합·분류처럼 GPT 계열이 강한 단계는 **Codex(gpt-5.5)에 강제 위임**합니다.
파일 I/O·인용 검증·할루시네이션 방지처럼 정확성이 핵심인 단계는 Claude에 그대로 둡니다.

> 모델 배지: <span class="badge opus">Opus 4.8</span> <span class="badge sonnet">Sonnet 4.6</span> <span class="badge haiku">Haiku 4.5</span> ·
> <span class="badge codex">Codex 위임</span> = gpt-5.5 강제 위임 단계 보유.

!!! note "한눈에"
    - **모델 3종 배정** — Opus 4.8 × 9(오케스트레이터/고급 생성) · Sonnet 4.6 × 25(NLG/추론) · Haiku 4.5 × 4(구조화 추출/plumbing)
    - **Codex 강제 위임 16** — 종합/분류 단계만 gpt-5.5에 MUST delegate, 정확성 단계는 Claude 잔류
    - **멀티-LLM 합의** — MAGI 시스템이 Claude + Codex(gpt-5.5) + Antigravity(Gemini) 3대 LLM을 교차 검증에 활용
    - **유지 영역 4종** — 한국어 법적 문서·정밀 HTML/CSS·다회차 reasoning·영문 정중 톤은 Claude 강점이라 위임하지 않음

---

## 7.1 모델 배정 원칙

NERV의 38개 Claude 서브에이전트는 작업 성격에 따라 3개 모델 등급으로 나뉩니다.

| 등급 | 모델 | 개수 | 적용 기준 | 대표 사례 |
|------|------|:---:|-----------|-----------|
| **상급** | <span class="badge opus">Opus 4.8</span> | 9 | 오케스트레이션 · 다회차 reasoning · 고급 생성 | 토론 파트너, 일정 추적, 콘텐츠 설계 오케스트레이터, IRB 문서 |
| **중급** | <span class="badge sonnet">Sonnet 4.6</span> | 25 | 자연어 생성(NLG) · 분석 · 추론 중심 | 방법론 분석, 학술 문체 검사, 논문 탐색, 섹션 작성 |
| **경량** | <span class="badge haiku">Haiku 4.5</span> | 4 | 구조화 추출 · 결정론적 plumbing | 논문 요약, 키워드 태깅, 라이브러리 건강 감시, 에이전트 설치 |

**경량(Haiku 4.5) 배정 4개** — 출력이 구조화되어 있거나 결정론적 처리가 핵심인 작업입니다.

| 에이전트 | 소유 캐릭터 | 기능 |
|----------|-----------|------|
| `paper-summarizer` | 레이 | 논문 요약(구조화 추출) |
| `keyword-tagger` | 레이 | 키워드/태그 추천(taxonomy 매핑) |
| `library-health-monitor` | 레이 | 라이브러리 정합성 감시 + 리포트(구조화 출력) |
| `agent-installer` | 리츠코 | 외부 서브에이전트 자동 설치 plumbing(결정론적) |

> 설계 원칙: 모델 등급은 **능력 과잉을 줄이고 비용을 작업에 맞추는** 수단입니다.
> 구조화 추출에 상급 모델을 쓰지 않고, 다회차 오케스트레이션에 경량 모델을 쓰지 않습니다.
> 분포 검증: `python3 scripts/check_agent_inventory.py` (인벤토리 SSOT).

---

## 7.2 Codex(gpt-5.5) 강제 위임 16개

GPT 쿼터를 적극 활용하기 위해, 다음 **16개 에이전트는 특정 단계의 Codex 위임이 강제(MUST delegate)** 입니다.
"선택적 위임"이 아니라, 해당 단계에서는 codex가 가용한 한 **반드시** 호출합니다.

**역할 분담 원칙**

- **Claude 잔류** — 파일 I/O, 인용 추출·검증, 할루시네이션 방지(정확성이 핵심인 단계)
- **Codex 위임** — 종합·분류·랭킹·자연어 보고서 생성(GPT 계열이 강한 단계)
- **Fallback** — codex CLI 미설치·타임아웃 등 시스템 오류 시에만 Claude로 폴백 허용

### 캐릭터별 16개 목록

| 캐릭터 | 개수 | 에이전트 | Codex 위임 단계(요약) |
|--------|:---:|----------|-----------------------|
| **레이** | 5 | `paper-summarizer` | TL;DR · 문제/동기 · 강점/한계 자연어 종합 |
| | | `keyword-tagger` | 본문 → kebab-case taxonomy 의미 매핑 + 계층 태그 |
| | | `note-linker` | 노트 간 의미적 유사도 평가 + 링크 후보 랭킹 |
| | | `wiki-compounder` | 3+편 교차 개념 종합 + 모순 감지 |
| | | `methodology-analyzer` | 5-프레임워크 분석 + 비교 매트릭스 종합 |
| **카오루** | 5 | `related-paper-finder` | 다수 후보 관련성 스코어링 + Top-N 종합 |
| | | `citation-network-explorer` | 네트워크 지표 → 자연어 보고서 종합 |
| | | `research-trend-analyzer` | 다년도 트렌드 자연어 보고서 종합 |
| | | `source-comparator` | 다중 소스 비교 매트릭스 + 합의/불일치 종합 |
| | | `paper-code-auditor` | 논문 수치 클레임 ↔ 공개 코드 매칭 검증 |
| **아스카** | 2 | `academic-style-checker` | 영문 학술 문체 개선 제안 종합(한국어는 Claude) |
| | | `research-gap-identifier` | 6-유형 갭 분류 + Feasibility×Impact 매트릭스 |
| **리츠코** | 1 | `github-import-evaluator` | 저장소 코드 스타일/구조 정합성 진단 |
| **마리(영문)** | 3 | `methods-writer` | 영문 Methods 본문 생성(Python 결정론 + Claude 의미 검증 병행) |
| | | `results-writer` | 영문 Results 본문 생성(동일 하이브리드 검증) |
| | | `abstract-generator` | 영문 초록 본문 생성(동일 하이브리드 검증) |
| | | **합계** | **5 + 5 + 2 + 1 + 3 = 16** |

> 마리의 위임은 **영문 트랙 한정**입니다. 한국어 작성은 PI 문체 학습이 핵심이라 별도 처리하며,
> 글쓰기 에이전트의 한국어 법적/윤리 문서는 위임하지 않습니다(§7.5 참조).

---

## 7.3 Codex 호출 표준 패턴

NERV에서 Codex 위임은 다음 표준 패턴으로 호출합니다.

```bash
codex exec --sandbox read-only --skip-git-repo-check \
  -c model_reasoning_effort="medium" -
```

- `--sandbox read-only` — 읽기 전용 샌드박스(파일 수정 불가, 종합·분류 단계에 적합)
- `--skip-git-repo-check` — 임의 작업 디렉터리에서 호출 가능
- `-c model_reasoning_effort="medium"` — 추론 강도 medium
- 끝의 `-` — 프롬프트를 stdin으로 전달
- 모델 미지정 시 기본값은 **gpt-5.5** 입니다.

---

## 7.4 멀티-LLM 합의 (MAGI)

NERV의 자율 교차검증 시스템 **MAGI**는 3대 LLM을 병렬로 활용해 단일 모델의 편향을 줄입니다.

| LLM | 역할(코드네임) | 비고 |
|-----|---------------|------|
| **Claude**(Opus 4.8) | 의장(Chairman) · 합의 도출 | 추론·종합 주도 |
| **Codex**(gpt-5.5) | 교차 검토자 | 코드/설정·수치 관점 |
| **Antigravity**(Gemini) | 교차 검토자(BALTHASAR) | 제3의 관점 |

- 정기 순찰은 비용 최적화를 위해 **Claude + Codex 2대**, 일일 종합 점검은 **3대 Full Council**로 운영합니다.
- 익명 cross-review 후 의장(Claude)이 합의문을 도출하는 3단계 구조입니다.
- 단일 LLM의 만장일치가 곧 진실은 아니라는 전제 위에서, **서로 다른 모델 계열**을 의도적으로 섞습니다.

---

## 7.5 유지 영역 (위임하지 않는 작업)

다음 4종은 Claude의 강점이 분명해 **Codex 위임을 하지 않습니다**.

| 작업 | 담당 에이전트 | 위임하지 않는 이유 |
|------|--------------|---------------------|
| 한국어 법적/윤리 문서 | `irb-document-writer`(마리) | IRB 신청서·동의서의 한국어 법적·윤리 문체 |
| 정밀 강의 슬라이드 | `lecture-slide-maker`(신지) | HTML/CSS 디자인 패턴 정밀 생성 |
| 나레이션 대본 | `narration-script-writer`(신지) | 구술체 대본의 정밀 생성 |
| 다회차 연구 토론 | `research-idea-discussant`(리츠코) | 소크라틱 다회차 reasoning |
| 영문 정중 응대 | `reviewer-response-helper`(아스카) | R&R 재투고의 영문 정중 톤 |

> 원칙: **위임은 "GPT가 더 잘하는 종합/분류 단계"에 한정**하고,
> 한국어 문체·정밀 디자인·다회차 추론·정중한 영문 응대처럼 Claude가 강한 영역은 그대로 둡니다.

---

## 요약

- **모델 3종 배정** — Opus 4.8 × 9 · Sonnet 4.6 × 25 · Haiku 4.5 × 4로, 능력 과잉 없이 작업에 맞춰 비용을 조절합니다.
- **Codex 강제 위임 16** — 정확성 단계(파일 I/O·인용 검증·할루시네이션 방지)는 Claude, 종합/분류 단계는 gpt-5.5에 MUST delegate.
- **멀티-LLM 합의** — MAGI가 Claude + Codex + Antigravity(Gemini) 3대 LLM을 교차검증에 활용해 단일 모델 편향을 완화합니다.
- **유지 영역 4종** — Claude 강점 영역(한국어 법적 문서·정밀 디자인·다회차 추론·영문 정중 톤)은 위임 대상에서 제외합니다.
