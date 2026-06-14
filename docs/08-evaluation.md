# 8 · 시스템 평가 (Capability Assessment)

NERV는 **스스로를 평가하는 메커니즘을 내장한 시스템**입니다 — 주기적 종합 자가평가(`nerv-evaluate`), 24시간 [MAGI 순찰](06-systems/magi-patrol.md), 일일 메타 감사(silent-fail-monitor). 이 장은 그 정신을 백서에 옮겨, NERV의 **역량을 정의된 루브릭으로 수치화**한 자가 평가입니다.

!!! warning "읽기 전에 — 이건 자가 평가다"
    아래 점수는 **외부 표준 벤치마크가 아니라**, 정의된 루브릭에 시스템의 실제 산출물·인벤토리·운영 이력을 대조한 **내부 자가 평가**입니다(§8.3 방법론). 강점은 높게, 미성숙한 곳은 솔직하게 매겼습니다 — 자화자찬이 아니라 **신뢰 가능한 평가**를 목표로 합니다(§8.4 한계).

## 8.1 종합 스코어카드

<div class="nerv-eval">
  <div class="nerv-eval-hero">
    <div class="nerv-eval-score">84<small> / 100</small></div>
    <span class="nerv-eval-grade">A−</span>
    <span class="nerv-eval-label">프로덕션급 1인 운영 연구 자동화 시스템 · 8개 차원 가중 평균</span>
  </div>
  <div class="nerv-eval-rows">
    <div class="nerv-eval-row">
      <div class="nerv-eval-dim">규모 · 생애주기 커버리지<small>45 에이전트 · 7 역할 · 전주기</small></div>
      <div class="nerv-eval-track"><div class="nerv-eval-fill hi" style="width:92%"></div></div>
      <div class="nerv-eval-num">92</div>
    </div>
    <div class="nerv-eval-row">
      <div class="nerv-eval-dim">멀티-LLM 오케스트레이션<small>Claude+Codex+Gemini · 강제위임 16</small></div>
      <div class="nerv-eval-track"><div class="nerv-eval-fill hi" style="width:90%"></div></div>
      <div class="nerv-eval-num">90</div>
    </div>
    <div class="nerv-eval-row">
      <div class="nerv-eval-dim">자동화 깊이<small>42 launchd 잡 · 일·주 자율 파이프라인</small></div>
      <div class="nerv-eval-track"><div class="nerv-eval-fill hi" style="width:88%"></div></div>
      <div class="nerv-eval-num">88</div>
    </div>
    <div class="nerv-eval-row">
      <div class="nerv-eval-dim">자가 평가 · 메타인지<small>nerv-evaluate · 메타 감사 · 6축 트래커</small></div>
      <div class="nerv-eval-track"><div class="nerv-eval-fill hi" style="width:87%"></div></div>
      <div class="nerv-eval-num">87</div>
    </div>
    <div class="nerv-eval-row">
      <div class="nerv-eval-dim">품질 보증 · 교차검증<small>8 정규화 임계값 · 3계층 게이트 · MAGI</small></div>
      <div class="nerv-eval-track"><div class="nerv-eval-fill hi" style="width:85%"></div></div>
      <div class="nerv-eval-num">85</div>
    </div>
    <div class="nerv-eval-row">
      <div class="nerv-eval-dim">관측가능성 · 운영성숙도<small>대시보드 · 능력치 트래커 · 운영채널</small></div>
      <div class="nerv-eval-track"><div class="nerv-eval-fill" style="width:82%"></div></div>
      <div class="nerv-eval-num">82</div>
    </div>
    <div class="nerv-eval-row">
      <div class="nerv-eval-dim">회복탄력성 · 자가치유<small>silent-fail · 24h 순찰 · Resilience v2</small></div>
      <div class="nerv-eval-track"><div class="nerv-eval-fill" style="width:80%"></div></div>
      <div class="nerv-eval-num">80</div>
    </div>
    <div class="nerv-eval-row">
      <div class="nerv-eval-dim">지식 복리 · 기억<small>file-per-fact 메모리 · 위키 (일부 동면)</small></div>
      <div class="nerv-eval-track"><div class="nerv-eval-fill lo" style="width:66%"></div></div>
      <div class="nerv-eval-num">66</div>
    </div>
  </div>
</div>

## 8.2 차원별 근거

| 차원 | 점수 | 근거 (하드 넘버) |
|------|:---:|------|
| **규모 · 생애주기 커버리지** | 92 | **45 에이전트**(38 Claude 서브에이전트 + 7 Python 파이프라인)를 **7 캐릭터**가 도메인별로 소유. 문헌 발굴 → 문서 처리 → 분석 → 작성 → 검토 → 출판의 연구 **전(全) 생애주기**를 덮음. 빈 구간이 거의 없음. |
| **멀티-LLM 오케스트레이션** | 90 | **3대 LLM**(Claude Opus/Sonnet/Haiku · Codex gpt-5.5 · Antigravity Gemini)을 작업 성격별로 배정. **16개 에이전트**는 종합·분류 단계를 Codex로 **강제 위임**, 파일 I/O·인용 검증은 Claude 잔류 — 모델별 강점을 살린 하이브리드. MAGI 3-LLM 합의로 교차검증. |
| **자동화 깊이** | 88 | **42개 launchd 잡**이 일·주 단위로 자율 실행 — 논문 추천·전문가 다이제스트·라이브러리 점검·백업·카드뉴스·웹툰·CV 동기화 등. cron 모델까지 분산 배정. PI 개입 없이 도는 파이프라인 다수. |
| **자가 평가 · 메타인지** | 87 | `nerv-evaluate`로 시스템 건강도·운영 drift·학습 velocity를 **정기 종합 평가**(가장 최근 종합 등급 **B+**). silent-fail-monitor가 "잡 자체가 안 돎"까지 잡는 **메타 감사**(일 23:55). **6축 능력치 트래커**로 자기 성능을 시계열 기록. 시스템이 자기를 감사한다. |
| **품질 보증 · 교차검증** | 85 | 모든 품질 점수 **0.0–1.0 정규화**, **8개 임계값**(변환·DOI·문체·관련성·재현성 등) 운영. **3계층 게이트**(explore=경고, produce=플래그, publish=차단). paper-verifier 2종이 학술 원고의 인용·통계 수치를 결정론으로 교차검증. |
| **관측가능성 · 운영성숙도** | 82 | Lab Director **대시보드** + **6축 능력치 트래커** + Discord 운영 채널 + 구조화 로그로 상태를 상시 가시화. 잡 신규 등록 SOP·인벤토리 SSOT 검증 스크립트로 drift 자동 감지. |
| **회복탄력성 · 자가치유** | 80 | silent-fail wrapper(19 잡) + 일일 메타 모니터 + **24h MAGI 순찰**(9 루트) + **Resilience v2**(5 active rule, pre-commit/SessionStart 훅) + fail-loud 재시도 가드. 과거 대량 plist 손상 사고를 4-Phase로 복구한 이력 — 사고 대응 절차가 실전 검증됨. |
| **지식 복리 · 기억** | 66 | file-per-fact 메모리(세션 간 지속)와 Karpathy 패턴 Knowledge Wiki **인프라는 구축**됨. 단, 위키 **compounding은 현재 동면**(4개 근본원인으로 non-viable 판정·정지) — 복리 축적의 실효성은 아직 미완. **솔직한 약점**. |

## 8.3 방법론

- **척도**: 각 차원 0–100. 80+ = 강점(성숙), 70–79 = 작동하나 개선 여지, 70 미만 = 미성숙/제약.
- **근거**: 점수는 **시스템의 실제 인벤토리·산출물·운영 이력**(CLAUDE.md SSOT, launchd 인벤토리, 자가평가 등급 이력, 사고/복구 기록)에 루브릭을 대조해 산정. 추정치가 아니라 **검증 가능한 사실** 기반.
- **종합**: 8개 차원 평균(균등 가중) = **83.75 → 84 (A−)**.
- **무엇이 아닌가**: 외부 표준 벤치마크·제3자 감사·정량 성능 측정(latency/throughput)이 **아님**. "정의된 루브릭에 의한 역량 자가 평가"로 한정해 읽어야 함.

## 8.4 정직한 한계

평가의 신뢰도를 위해, 점수를 낮추는 요인을 명시합니다.

- **단일 머신 · 1인 운영**: Mac mini 단일 노드에서 1인(PI)을 위해 동작 — HA/이중화·멀티테넌시 없음. 머신이 죽으면 전체가 멈춤.
- **일부 컴포넌트 동면**: 위키 compounding 동결(non-viable), **MAGI Gate 자동 executor 미구현**(`enabled:false`, 설계 계약으로만 존재) — 자율 핸드오프 게이트는 아직 미가동.
- **외부 벤치마크 부재**: 표준 데이터셋·제3자 비교가 없어 절대 성능을 객관 수치로 주장할 수 없음.
- **평가자 편향 가능성**: 시스템 운영자(PI)와 동일 주체가 평가 — 부분 완화책은 `nerv-evaluate`의 **MAGI 3-LLM 교차검토**지만, 완전한 독립 감사는 아님.
- **능력치 트래커 사각지대**: 6축 메트릭이 일부 임팩트 신호를 0으로 반영하는 등 측정 한계 존재.

## 8.5 한 줄 평

> NERV는 **1인 연구실을 위한 프로덕션급 연구 자동화 시스템**으로, **규모·멀티-LLM 오케스트레이션·자가 평가**에서 특히 강하다(90+). 자기를 감사하고 회복하는 운영 성숙도를 갖췄으나, **지식 복리의 실효화**와 **단일 머신 의존**이 다음 성장 지점이다. 종합 **A− (84/100)** — 자화자찬이 아니라, 한계까지 드러낸 평가다.

---

> 운영 건강도 자가평가의 실제 메커니즘은 [6 · 교차 시스템](06-systems/magi-patrol.md)을, 전체 인벤토리는 [9 · 부록](09-appendix.md)을 참고하세요.
