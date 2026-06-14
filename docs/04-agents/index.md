# 서브에이전트 레퍼런스 (38 전수)

NERV의 **38개 Claude 서브에이전트**를 캐릭터별로 전수 수록합니다. 각 페이지는 한 줄 요약,
메타 표(역할·모델·tools·Codex 위임), **작동 방식 HTML 플로우 다이어그램**, 입·출력 계약, 비고로 구성됩니다.

> 미사토의 6개 문서처리 모듈은 서브에이전트가 아니라 **Python 파이프라인**이므로
> [5 · Python 파이프라인](../05-pipelines.md)에서 다룹니다.
> 모델 배지: <span class="badge opus">Opus 4.8</span> <span class="badge sonnet">Sonnet 4.6</span> <span class="badge haiku">Haiku 4.5</span> ·
> <span class="badge codex">Codex 위임</span> = gpt-5.5 강제 위임 단계 보유.

## 리츠코 · Project Command (5)

- [research-idea-discussant](ritsuko/research-idea-discussant.md) <span class="badge opus">Opus</span> — 소크라틱 연구 아이디어 토론
- [research-timeline-tracker](ritsuko/research-timeline-tracker.md) <span class="badge opus">Opus</span> — YAML 기반 프로젝트 일정 추적
- [budget-manager](ritsuko/budget-manager.md) <span class="badge sonnet">Sonnet</span> — 연구비 예산 관리
- [github-import-evaluator](ritsuko/github-import-evaluator.md) <span class="badge opus">Opus</span> <span class="badge codex">Codex</span> — GitHub 저장소 도입 평가
- [agent-installer](ritsuko/agent-installer.md) <span class="badge haiku">Haiku</span> — 외부 서브에이전트 자동 설치 plumbing

## 레이 · Analysis & Knowledge (7)

- [paper-summarizer](rei/paper-summarizer.md) <span class="badge haiku">Haiku</span> <span class="badge codex">Codex</span> — 논문 요약
- [methodology-analyzer](rei/methodology-analyzer.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 방법론 5-프레임워크 분석
- [keyword-tagger](rei/keyword-tagger.md) <span class="badge haiku">Haiku</span> <span class="badge codex">Codex</span> — 키워드/태그 추천
- [note-linker](rei/note-linker.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — Obsidian 자동 백링크
- [wiki-compounder](rei/wiki-compounder.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 위키 역방향 갱신(지식 복리)
- [library-health-monitor](rei/library-health-monitor.md) <span class="badge haiku">Haiku</span> — Library 정합성 감시
- [reading-explainer](rei/reading-explainer.md) <span class="badge opus">Opus</span> — 단일 논문 통독 Reading Brief

## 아스카 · Quality & Review (4)

- [academic-style-checker](asuka/academic-style-checker.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 학술 문체/일관성 검사
- [research-gap-identifier](asuka/research-gap-identifier.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 연구 갭 식별
- [reviewer-response-helper](asuka/reviewer-response-helper.md) <span class="badge opus">Opus</span> — R&R 재투고 파이프라인
- [qualitative-data-analyzer](asuka/qualitative-data-analyzer.md) <span class="badge sonnet">Sonnet</span> — 질적 데이터 주제 분석

## 카오루 · Discovery & Insight (9)

- [related-paper-finder](kaoru/related-paper-finder.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 키워드/DOI 관련 논문 탐색
- [citation-network-explorer](kaoru/citation-network-explorer.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 인용 네트워크 분석
- [research-trend-analyzer](kaoru/research-trend-analyzer.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 연구 동향 분석
- [deep-researcher](kaoru/deep-researcher.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 심층 자료 탐색(intelligence 레이어)
- [daily-paper-recommender](kaoru/daily-paper-recommender.md) <span class="badge sonnet">Sonnet</span> — 매일 프로젝트별 논문 큐레이션
- [paper-code-auditor](kaoru/paper-code-auditor.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 논문-코드 정합성 감사
- [source-comparator](kaoru/source-comparator.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 다중 소스 비교 매트릭스
- [paper-citation-auditor](kaoru/paper-citation-auditor.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 학술 원고 인용 정합성 감사
- [paper-data-verifier](kaoru/paper-data-verifier.md) <span class="badge sonnet">Sonnet</span> — 학술 원고 통계 수치 감사

## 마리 · Creative & Writing (6)

- [intro-writer](mari/intro-writer.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 서론/문헌리뷰 작성
- [methods-writer](mari/methods-writer.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — Methods 섹션 작성
- [results-writer](mari/results-writer.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — Results 섹션 작성
- [discussion-writer](mari/discussion-writer.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — Discussion 섹션 작성
- [abstract-generator](mari/abstract-generator.md) <span class="badge sonnet">Sonnet</span> <span class="badge codex">Codex</span> — 초록/결론 생성
- [irb-document-writer](mari/irb-document-writer.md) <span class="badge opus">Opus</span> — IRB 신청서/동의서 작성

## 신지 · Personal & Learning (7)

- [lecture-content-synthesizer](shinji/lecture-content-synthesizer.md) <span class="badge sonnet">Sonnet</span> — 자료 → 강의 내러티브 변환
- [lecture-web-researcher](shinji/lecture-web-researcher.md) <span class="badge sonnet">Sonnet</span> — 강의 주제 웹 자료 검색
- [lecture-slide-maker](shinji/lecture-slide-maker.md) <span class="badge opus">Opus</span> — 강의용 HTML 슬라이드 덱
- [narration-script-writer](shinji/narration-script-writer.md) <span class="badge opus">Opus</span> — 나레이션 대본 작성
- [imotions-expert](shinji/imotions-expert.md) <span class="badge sonnet">Sonnet</span> — iMotions 센서/지표 전문가
- [lecture-content-designer](shinji/lecture-content-designer.md) <span class="badge opus">Opus</span> — 강의 콘텐츠 설계 오케스트레이터
- [image-generator](shinji/image-generator.md) <span class="badge sonnet">Sonnet</span> — gpt-image OAuth 프록시 이미지 생성

---

**모델 분포**: Opus 4.8 × 9 · Sonnet 4.6 × 25 · Haiku 4.5 × 4 = 38.
전체 인벤토리 표는 [부록](../09-appendix.md), 검증은 `python3 scripts/check_agent_inventory.py`.
