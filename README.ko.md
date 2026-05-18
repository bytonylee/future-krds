# Future KRDS Skill

[English](./README.md) | [한국어](./README.ko.md)

![Version](https://img.shields.io/badge/version-0.1.0-333333?style=flat-square)
![KRDS UIUX](https://img.shields.io/badge/KRDS_UIUX-v1.1.0-0057B8?style=flat-square)
![Components](https://img.shields.io/badge/components-74%2F74-0F7B3A?style=flat-square)
![Similarity](https://img.shields.io/badge/similarity-100%25-0F7B3A?style=flat-square)
[![License](https://img.shields.io/badge/license-KRDS_terms_%2B_ISC-yellow?style=flat-square)](./LICENSE)

바로가기: [소개](#소개) | [KRDS란?](#krds란) | [포함된 스킬](#포함된-스킬) |
[설치](#설치) | [사용법](#사용법) | [실험 페이지](#실험-페이지) |
[라이선스](#라이선스)

Future KRDS Skill은 KRDS 기준에 맞는 웹사이트와 앱 화면을 만들기 위한
Codex 스킬 묶음이자 검증 하네스입니다. KRDS HTML Component Kit를 단순히
복사해 쓰는 데서 끝내지 않고, 기획 → 변환 → 개선 → 검증의 반복 가능한
작업 흐름으로 정리합니다.

이 저장소에는 실제 실험 결과도 포함되어 있습니다. `experiment/handsoap-site`에
있는 핸드솝 랜딩 페이지는 KRDS 컴포넌트 참조를 모두 추적하고, KRDS 홈페이지
구조와 로컬 검증 규칙을 기준으로 점수를 확인하도록 만들어졌습니다.

## 소개

Future KRDS Skill은 세 가지 스킬과 하나의 하드닝 시스템으로 구성됩니다.

1. **`krds-plan`**: 빈 상태에서 웹사이트나 앱 화면의 KRDS 설계를 시작합니다.
2. **`krds-transform`**: 기존 웹사이트/앱을 KRDS UIUX 규칙에 맞게 구조와 테마를 바꿉니다.
3. **`krds-improve`**: 결과물이 KRDS 규칙에 맞는지 점검하고, 통과할 때까지 개선합니다.

하드닝 방식은 [`desloppify`](https://github.com/peteromallet/desloppify)의
품질 루프 아이디어를 KRDS에 맞게 바꾼 것입니다. 즉, 스캔하고, 점수를 내고,
부족한 부분을 고치고, 다시 검증합니다. 다만 이 저장소의 점수는 일반적인
코드 품질이 아니라 KRDS 구조, 컴포넌트 커버리지, 접근성 규칙에 초점을 둡니다.

## KRDS란?

KRDS는 **Korea Design System**의 약자입니다. 대한민국 디지털 정부 서비스가
일관된 사용자 경험과 접근성, 사용성을 갖추도록 돕는 디자인 시스템입니다.
공공 웹사이트와 앱에서 반복해서 쓰이는 스타일, 컴포넌트, 패턴, 디자인 토큰,
HTML/CSS/JavaScript 예제를 제공합니다.

참고 자료:

- KRDS 공식 사이트: [krds.go.kr](https://www.krds.go.kr)
- KRDS 소개: [KRDS 소개](https://www.krds.go.kr/html/site/utility/utility_01.html)
- 영문 소개: [About KRDS](https://www.krds.go.kr/html/eng/utility/utility_01.html)
- KRDS HTML Component Kit 저장소: [KRDS-uiux/krds-uiux](https://github.com/KRDS-uiux/krds-uiux)
- KRDS HTML 컴포넌트: [컴포넌트 요약](https://www.krds.go.kr/html/site/component/component_summary.html)
- KRDS 저작권 안내: [저작권](https://www.krds.go.kr/html/site/utility/utility_06.html)

상위 `krds-uiux` 패키지는 KRDS 디자인 시스템을 적용하기 위한 HTML Component
Kit입니다. 현재 패키지 메타데이터 기준 버전은 `1.1.0`, 라이선스 표기는
`ISC`이며, 상위 README에는 대한민국 디지털 정부 디자인 시스템(KRDS)의
이용약관을 따른다고 안내되어 있습니다.

## 포함된 스킬

### `krds-plan`

새 화면을 만들기 전에 사용합니다. 페이지/앱 상태, KRDS 컴포넌트 매핑,
접근성 기준, 수정 파일 범위, 검증 명령을 먼저 정리합니다.

### `krds-transform`

이미 존재하는 웹사이트나 앱이 있을 때 사용합니다. 기능과 주요 식별자는
유지하면서 구조, 클래스, 테마 방향을 KRDS에 맞춥니다.

### `krds-improve`

초기 구현 이후에 사용합니다. 점수 스크립트와 규칙 체크를 실행하고,
부족한 부분을 고친 뒤 다시 검증합니다.

## 저장소 구조

- `skills/krds-plan`: 새 KRDS 페이지/앱을 위한 설계 스킬
- `skills/krds-transform`: 기존 화면을 KRDS로 전환하는 스킬
- `skills/krds-improve`: KRDS 규칙 준수 여부를 높이는 개선 스킬
- `scripts/`: 빌드, 점수 계산, 컴포넌트 커버리지, 통합 검증 스크립트
- `experiment/handsoap-site`: 생성된 핸드솝 랜딩 페이지
- `reports/experiment`: 검증 결과와 스크린샷
- `assets/krds`: 검증과 예시에 쓰는 KRDS UIUX 로컬 미러
- `references/krds`: KRDS 참조용 로컬 미러
- `resources/krds`: 매니페스트와 검증 관련 메모

## 설치

### Codex 스킬로 설치

이 저장소를 받은 뒤 아래 명령을 실행합니다.

```bash
mkdir -p ~/.codex/skills
cp -R skills/krds-plan ~/.codex/skills/
cp -R skills/krds-transform ~/.codex/skills/
cp -R skills/krds-improve ~/.codex/skills/
```

복사 후 Codex를 다시 시작하면 스킬이 보입니다.

### GitHub에서 설치

이 저장소가 `bytonylee/future-krds`로 공개되어 있다면 아래처럼 설치합니다.

```bash
npx skills add bytonylee/future-krds
```

Git URL을 직접 사용할 수도 있습니다.

```bash
npx skills add https://github.com/bytonylee/future-krds.git
```

### KRDS UIUX 패키지 설치

실제 애플리케이션 프로젝트에서 상위 KRDS 패키지가 필요하다면 별도로 설치합니다.

```bash
npm install krds-uiux
```

이 저장소는 검증과 예시를 위해 KRDS 미러를 포함하지만, 실제 서비스에서는
공식 KRDS 문서와 패키지 안내를 우선 확인해야 합니다.

## 사용법

### 새 KRDS 페이지 설계

```text
$krds-plan
핸드솝 판매자를 위한 한국어 공공형 랜딩 페이지를 만들어줘.
빈 상태에서 시작하고, 내용을 KRDS 컴포넌트에 매핑한 뒤 검증 기준까지 정리해줘.
```

### 기존 사이트를 KRDS로 전환

```text
$krds-transform
이 제품 페이지는 기능은 괜찮지만 디자인이 일반적이야.
콘텐츠와 폼 동작은 유지하고, 구조와 테마를 KRDS UIUX 규칙에 맞게 바꿔줘.
```

### KRDS 구현 개선

```text
$krds-improve
이 웹사이트를 KRDS 컴포넌트 규칙, 접근성 기준, 유사도 점수로 점검해줘.
실패한 규칙이 없어지고 점수가 95를 넘을 때까지 개선해줘.
```

### 전체 작업 예시

```text
krds-plan, krds-transform, krds-improve를 모두 사용해줘.
assets/krds/html/code의 모든 KRDS 컴포넌트 참조를 쓰는 실험용 핸드솝 랜딩 페이지를 만들어줘.
https://www.krds.go.kr/html/site/index.html 과 비교해서 점수가 95를 넘고 실패 규칙이 없어질 때까지 반복해줘.
```

## 실험 페이지

현재 실험 결과는 아래에 있습니다.

- 페이지: [`experiment/handsoap-site/index.html`](./experiment/handsoap-site/index.html)
- 스타일: [`experiment/handsoap-site/styles.css`](./experiment/handsoap-site/styles.css)
- 최종 점수: [`reports/experiment/final-score.json`](./reports/experiment/final-score.json)
- 컴포넌트 커버리지: [`reports/experiment/component-coverage-check.json`](./reports/experiment/component-coverage-check.json)
- 스크린샷: [`reports/experiment/screenshots/handsoap-header-to-footer.png`](./reports/experiment/screenshots/handsoap-header-to-footer.png)

빌드와 검증:

```bash
node scripts/build-handsoap-experiment.mjs
node scripts/verify-krds-component-coverage.mjs
node scripts/krds-similarity.mjs experiment/handsoap-site/index.html
node scripts/validate-krds.mjs
```

전체 하드닝 루프:

```bash
node scripts/krds-desloppify.mjs
```

현재 검증 결과:

- KRDS 컴포넌트 참조 커버리지: `74/74`
- 유사도 점수: `100`
- 기준 점수: `>95`
- 실패 규칙: `0`

## 라이선스

이 저장소는 비공식 서드파티 스킬과 검증 하네스입니다. KRDS 공식 프로젝트가
아닙니다.

KRDS 관련 에셋과 참조 자료는 상위
[KRDS-uiux/krds-uiux](https://github.com/KRDS-uiux/krds-uiux) 저장소와
공식 [KRDS 웹사이트](https://www.krds.go.kr)를 기준으로 합니다. 상위 패키지
메타데이터에는 `ISC`가 표기되어 있고, 상위 README에는 대한민국 디지털 정부
디자인 시스템(KRDS)의 이용약관을 따른다고 안내되어 있습니다. 자세한 내용은
[LICENSE](./LICENSE)와 공식 [KRDS 저작권 안내](https://www.krds.go.kr/html/site/utility/utility_06.html)를 확인하세요.

[맨 위로](#future-krds-skill)
