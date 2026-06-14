# 7 캐릭터(역할)

NERV의 모든 에이전트는 **7명의 캐릭터** 중 하나에 소속됩니다. 캐릭터는 곧 **역할(role)**이며,
각 캐릭터는 고유한 Discord Webhook으로 디스패치되고 명확한 도메인을 책임집니다.
이 "캐릭터=역할 소유" 모델은 40여 개 에이전트를 인지적으로 다룰 수 있는 7개 묶음으로 조직합니다.

<div class="nerv-grid" markdown>

<div class="nerv-card" markdown>
[![리츠코](../assets/characters/avatars/ritsuko.jpg)](ritsuko.md)
**[리츠코](ritsuko.md)**
<span class="role">Project Command</span>
</div>

<div class="nerv-card" markdown>
[![미사토](../assets/characters/avatars/misato.jpg)](misato.md)
**[미사토](misato.md)**
<span class="role">Operations</span>
</div>

<div class="nerv-card" markdown>
[![레이](../assets/characters/avatars/rei.jpg)](rei.md)
**[레이](rei.md)**
<span class="role">Analysis & Knowledge</span>
</div>

<div class="nerv-card" markdown>
[![아스카](../assets/characters/avatars/asuka.jpg)](asuka.md)
**[아스카](asuka.md)**
<span class="role">Quality & Review</span>
</div>

<div class="nerv-card" markdown>
[![카오루](../assets/characters/avatars/kaoru.jpg)](kaoru.md)
**[카오루](kaoru.md)**
<span class="role">Discovery & Insight</span>
</div>

<div class="nerv-card" markdown>
[![마리](../assets/characters/avatars/mari.jpg)](mari.md)
**[마리](mari.md)**
<span class="role">Creative & Writing</span>
</div>

<div class="nerv-card" markdown>
[![신지](../assets/characters/avatars/shinji.jpg)](shinji.md)
**[신지](shinji.md)**
<span class="role">Personal & Learning</span>
</div>

</div>

## 역할 매트릭스

| 캐릭터 | 에반게리온 | 역할 | Webhook | 소유 에이전트 |
|--------|-----------|------|---------|-------------|
| **[리츠코](ritsuko.md)** | 아카기 리츠코 | Project Command | `ritsuko` | 5 Claude + 1 Python |
| **[미사토](misato.md)** | 카츠라기 미사토 | Operations | `misato` | 6 Python 파이프라인 |
| **[레이](rei.md)** | 아야나미 레이 | Analysis & Knowledge | `rei` | 7 Claude |
| **[아스카](asuka.md)** | 소류 아스카 랑그레이 | Quality & Review | `asuka` | 4 Claude |
| **[카오루](kaoru.md)** | 나기사 카오루 | Discovery & Insight | `kaoru` | 9 Claude |
| **[마리](mari.md)** | 마키나미 마리 | Creative & Writing | `mari` | 6 Claude + 1 skill |
| **[신지](shinji.md)** | 이카리 신지 | Personal & Learning | `shinji` | 7 Claude |

> 캐릭터 간 데이터 교환은 [Handoff Schema](../06-systems/handoff.md)로 정의되며,
> 발행-구독 모델(레이 → `Research/.shared/`)과 [MAGI Gate](../06-systems/magi-gate.md) 교차검증이 결합됩니다.
