![](../assets/img/banner-operations.png)

# 교차 시스템 / 품질 게이트

NERV의 모든 에이전트는 산출물을 내놓을 때 동일한 품질 규칙을 따른다. 어떤 역할이 만든 결과든 같은 척도로 점수가 매겨지고, 같은 임계값과 비교되며, 작업의 단계에 따라 정해진 정책이 적용된다. 이렇게 시스템 전체를 가로지르는 공통 게이트가 있기 때문에, 에이전트가 늘어나도 품질 기준이 흩어지지 않는다.

## 점수 스케일

모든 품질 점수는 **0.0 ~ 1.0 범위로 정규화**한다. 10점 척도나 100점 척도는 사용하지 않는다. 척도를 하나로 통일해야 서로 다른 메트릭을 한 표 안에서 직접 비교할 수 있고, 임계값 판정 로직도 단일하게 유지된다.

## 임계값 표

각 품질 메트릭에는 통과해야 할 최소값이 정해져 있다. 산출물의 점수가 해당 메트릭의 최소값에 미치지 못하면 게이트가 작동한다.

| 메트릭 | 최소값 | 의미 |
|--------|--------|------|
| `conversion_quality` | 0.7 | 문서 변환 품질 |
| `doi_confidence` | 0.8 | DOI 매칭 신뢰도 |
| `style_score` | 0.8 | 학술 문체 점수 |
| `relevance` | 0.7 | 검색 결과 관련성 |
| `reproducibility` | 0.6 | 재현성 점수 |
| `thematic_saturation` | 0.7 | 주제 포화도 |
| `coding_reliability` | 0.7 | 코딩 신뢰도 |
| `triangulation_coverage` | 0.6 | 삼각검증 커버리지 |

신뢰도가 중요한 메트릭(DOI 매칭, 학술 문체)은 0.8로 더 엄격하게, 탐색적 성격이 강한 메트릭(재현성, 삼각검증 커버리지)은 0.6으로 다소 완화하여 균형을 맞췄다.

## 3계층 정책

같은 점수라도 작업이 어느 단계에 있느냐에 따라 처리 방식이 달라진다. 초기 탐색에서는 관대하게, 최종 출판에서는 엄격하게 다루는 3계층 구조다.

| 단계 | 정책 | 설명 |
|------|------|------|
| `explore` (탐색) | `warn_and_continue` | 품질 미달 시 경고만 남기고 계속 진행 |
| `produce` (생산) | `warn_and_flag` | 품질 미달 시 경고와 함께 `manual_review` 플래그 설정 |
| `publish` (출판) | `block` | 품질 미달 시 차단 |

탐색 단계에서는 아이디어를 빠르게 펼치는 것이 우선이라 경고 후 계속 진행하고, 생산 단계에서는 사람이 다시 들여다볼 수 있도록 검토 플래그를 남기며, 출판 단계에서는 기준에 미달하는 산출물이 바깥으로 나가지 못하도록 아예 차단한다.

## 게이트 적용 흐름

<div class="nerv-flow">
  <div class="nerv-flow-node in">에이전트 산출물 생성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">작업 단계 판정</div>
  <div class="nerv-flow-arr">↓<span>단계별 분기</span></div>
  <div class="nerv-flow-split">
    <div class="nerv-flow-split-head">작업 단계 분기</div>
    <div class="nerv-flow-split-paths">
      <div class="nerv-flow-path">
        <span class="nerv-flow-tag">explore 탐색</span>
        <div class="nerv-flow-node">임계값 비교</div>
        <div class="nerv-flow-split">
          <div class="nerv-flow-split-head">통과/미달</div>
          <div class="nerv-flow-split-paths">
            <div class="nerv-flow-path">
              <span class="nerv-flow-tag">미달</span>
              <div class="nerv-flow-node">경고 후 계속 진행</div>
            </div>
            <div class="nerv-flow-path">
              <span class="nerv-flow-tag">통과</span>
              <div class="nerv-flow-node out">정상 통과</div>
            </div>
          </div>
        </div>
      </div>
      <div class="nerv-flow-path">
        <span class="nerv-flow-tag">produce 생산</span>
        <div class="nerv-flow-node">임계값 비교</div>
        <div class="nerv-flow-split">
          <div class="nerv-flow-split-head">통과/미달</div>
          <div class="nerv-flow-split-paths">
            <div class="nerv-flow-path">
              <span class="nerv-flow-tag">미달</span>
              <div class="nerv-flow-node">manual_review 플래그 설정</div>
            </div>
            <div class="nerv-flow-path">
              <span class="nerv-flow-tag">통과</span>
              <div class="nerv-flow-node out">정상 통과</div>
            </div>
          </div>
        </div>
      </div>
      <div class="nerv-flow-path">
        <span class="nerv-flow-tag">publish 출판</span>
        <div class="nerv-flow-node">임계값 비교</div>
        <div class="nerv-flow-split">
          <div class="nerv-flow-split-head">통과/미달</div>
          <div class="nerv-flow-split-paths">
            <div class="nerv-flow-path">
              <span class="nerv-flow-tag">미달</span>
              <div class="nerv-flow-node">차단</div>
            </div>
            <div class="nerv-flow-path">
              <span class="nerv-flow-tag">통과</span>
              <div class="nerv-flow-node out">정상 통과</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="nerv-flow-conv">▼ ▼ ▼</div>
  <div class="nerv-flow-node out">정상 통과 (G 수렴)</div>
</div>

에이전트가 산출물을 만들면 먼저 작업 단계가 판정되고, 그 단계에 맞는 임계값과 비교한다. 점수가 임계값을 넘으면 정상 통과한다. 미달한 경우 탐색 단계에서는 경고 후 계속 진행하고, 생산 단계에서는 검토 플래그를 달아 사람의 확인을 유도하며, 출판 단계에서는 산출물을 차단한다. 단계가 뒤로 갈수록 게이트가 단단해지는 구조가 NERV 품질 관리의 뼈대다.
