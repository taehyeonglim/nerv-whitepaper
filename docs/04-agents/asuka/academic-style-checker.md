# academic-style-checker

> 학술 논문의 문체, 일관성, 교차 섹션 정합성을 검토합니다. 투고 전 문체 검토, 섹션 간 일관성 확인 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 아스카 · Quality & Review |
| 모델 | <span class="badge sonnet">Sonnet 4.6</span> |
| 도구 (tools) | Read, Glob, Grep, Bash |
| Codex gpt-5.5 위임 | 예 — 영문 학술 문체 개선 제안 종합 (한국어는 Claude 유지) |

## 무엇을 하는가

학술 논문의 문법, 맞춤법, 학술 문체, 명확성, 용어 일관성, 인용 형식을 검토하고 개선점을 제안합니다. Python 정량 분석과 LLM 정성 분석을 결합한 하이브리드 방식으로 동작하며, 문장 길이·수동태 비율·비격식 표현·용어 일관성 같은 측정값을 먼저 산출한 뒤 문맥에 맞는 수정안과 대안 문장을 제시합니다. 선택적으로 Introduction부터 Methods, Results, Conclusion까지 연구 목적·연구 질문·변수명·분석 방법·약어가 섹션 간에 일관되는지 교차 검증합니다. 영문과 한국어 학술 경어체를 모두 지원합니다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">논문 마크다운 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">정량 분석 측정값 산출</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">언어 판정 영문 또는 한국어</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-split">
    <div class="nerv-flow-split-head">Codex 위임 분기</div>
    <div class="nerv-flow-split-paths">
      <div class="nerv-flow-path"><span class="nerv-flow-tag codex">gpt-5.5 위임</span><div class="nerv-flow-node codex">Codex gpt-5.5 문체 개선 제안 종합</div></div>
      <div class="nerv-flow-path"><span class="nerv-flow-tag">Claude 잔류</span><div class="nerv-flow-node">Claude 학술 경어체 검토</div></div>
    </div>
  </div>
  <div class="nerv-flow-arr">↓<span>합류</span></div>
  <div class="nerv-flow-node">교차 섹션 일관성 검증 선택</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">스타일 리뷰 리포트 생성</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">소비 역할 마리 리츠코 PI</div>
</div>

## 입·출력

- **입력**: Markdown 형식의 논문 파일. 언어·엄격도 옵션과 교차 섹션 일관성 검증·자동 교정 제안 플래그를 선택할 수 있습니다.
- **출력**: 이슈 요약(Critical/Major/Minor), 섹션·카테고리별 수정 제안, 문체 통계표, 그리고 선택 시 0.0~1.0 정규화된 일관성 점수와 교차 섹션 검증 매트릭스를 담은 스타일 리뷰 리포트.
- **소비 역할**: 글쓰기를 담당하는 마리, 프로젝트를 총괄하는 리츠코, 그리고 PI.

## 비고

정량 분석 단계는 JSON 출력을 사용해 LLM 입력 파싱 안정성을 확보하고 환각을 방지합니다(v2.0). 영문 입력의 정성 분석은 Codex gpt-5.5로 강제 위임되며, 한국어 학술 경어체 검토는 Claude의 강점이라 본 에이전트가 직접 처리합니다. 위임은 codex CLI 미설치·타임아웃 등 시스템 오류 시에만 본 에이전트 직접 처리로 폴백합니다.
