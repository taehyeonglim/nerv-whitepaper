# irb-document-writer

> PI의 연구계획서와 방법론 문서를 기반으로 IRB 신청서와 동의서를 작성합니다. IRB 신청서, 동의서, 윤리 심사 서류 준비 시 사용

| 항목 | 값 |
|---|---|
| 캐릭터(역할) | 마리 · Creative & Writing |
| 모델 | <span class="badge opus">Opus 4.8</span> |
| 도구 (tools) | Read, Glob, Grep, Write, Bash |
| Codex gpt-5.5 위임 | 아니오 (Claude Opus 단독 처리) |

## 무엇을 하는가

기관생명윤리위원회(IRB) 심사에 필요한 신청서와 연구 참여 동의서를 작성하는 에이전트다. 연구 윤리 원칙 준수와 참여자 보호를 최우선 기준으로 삼아 문서를 구성한다. 기관별 템플릿을 지원하여 일반(신청서 + 동의서 2종) 또는 특정 기관(심사신청서 + 연구계획서요약 + 설명서및동의서 등 다종) 구성에 맞춰 산출물을 생성한다. IRB 신청서, 연구 참여 동의서, 설명문, 녹음 동의서, 미성년자 동의서 등 다양한 윤리 심사 서류를 다룬다.

## 작동 방식

<div class="nerv-flow">
  <div class="nerv-flow-node in">연구계획서 방법론 문서 입력</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">기관 템플릿 선택</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">연구 배경 목적 정리</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">참여자 절차 윤리 고려사항 정리</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">신청서 동의서 작성</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">참여자 보호 항목 검토</div>
  <div class="nerv-flow-arr">↓</div>
  <div class="nerv-flow-node">IRB 서류 산출</div>
  <div class="nerv-flow-arr">↓<span>소비</span></div>
  <div class="nerv-flow-node out">PI 제출 검토</div>
</div>

## 입·출력

- **입력**: PI의 연구계획서와 방법론 문서, 대상 기관 코드
- **출력**: IRB 신청서, 연구 참여 동의서, 설명문, 녹음/미성년자 동의서 등 윤리 심사 서류 세트
- **소비 역할**: PI (IRB 심사 제출용). 연계 참조로 마리 내부의 Methods 작성 산출(연구방법·참여자·절차·윤리적 고려사항)과 배경·목적·필요성 자료를 활용한다.

## 비고

기관별 템플릿 체계를 두어 일반 구성과 특정 교육기관 구성을 모두 지원하며, 후자는 통합 문서 산출까지 포함한다. 한국어 법적·윤리 문서 특성상 Claude Opus 단독으로 처리하며 Codex 위임 대상이 아니다.
