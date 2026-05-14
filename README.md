# 🦒 그린이 목늘리기

스페이스바를 연타해서 그리디 마스코트인 기린 **'그린이'**의 목을 늘려  
세종대학교 시계탑의 종을 울리는 게임!

🔗 **플레이하기:** https://greedy-team.github.io/Greenie-neck-stretch/

---

## 🎮 게임 개요

- **목표:** 제한 시간 15초 안에 스페이스바를 연타하여 그린이의 목을 빠르게 위로 늘리세요!
- **배경:** 세종대학교 시계탑 안에 진짜 기린이 살고 있다는 전설... 이 전설의 진실을 확인해보세요!
- **포인트:**  
  - 스페이스바 입력에 따라 그린이의 목이 **위아래로 번갈아가며 늘어남**
  - **100회 입력 달성 시 종 🔔 이 울리고 성공!**
  - 자신의 기록을 **랭킹에 등록**할 수 있어요.

---

## ⏱️ 게임 방식

1. 시작 시 **영문 대문자/숫자 4자리 ID** 입력 (소문자는 자동으로 대문자 변환)
2. `스페이스바`를 누르면 게임 시작
3. **15초 내에 100번 누르면 성공**
4. 성공 시 결과 타임 + 랭킹 등록
5. `R` 키를 누르면 게임을 다시 시작할 수 있어요

---

## 🖼️ 게임 화면 예시

![게임 플레이 화면](./screenshot.png)

---

## ⚙️ 로컬 실행 방법

이 프로젝트는 **Node.js와 npm이 설치된 환경**에서 실행됩니다.


### 1. 저장소 클론
```sh
git clone https://github.com/greedy-team/Greenie-neck-stretch.git
cd Greenie-neck-stretch
```


### 2. 패키지 설치
```sh
npm install
```


### 3. 환경 변수 설정
`.env.example`을 복사해서 `.env`를 만들고 백엔드 API base URL을 채워 넣으세요.
```sh
cp .env.example .env
```
```env
# .env
REACT_APP_API_BASE_URL=https://your-api-url-here.com
```
> 운영 배포 시에는 GitHub Actions secret(`REACT_APP_API_BASE_URL`)에서 값이 주입됩니다.


### 4. 개발 서버 실행
```sh
npm start
```

---

## 📁 프로젝트 구조

```
src/
├── Giraffe.jsx                  # 메인 게임 컨테이너
├── components/                  # UI 컴포넌트
│   ├── StartModal.jsx
│   ├── GameOverModal.jsx
│   ├── Hud.jsx
│   ├── RankingTable.jsx
│   ├── SceneLayer.jsx
│   ├── GiraffeSprite.jsx
│   └── Particles.jsx
└── game/
    ├── constants.js             # 게임 상수 (시간/목표/크기 등)
    ├── sceneObjects.js          # 배경/타워/기린 위치 계산
    ├── api.js                   # 점수 제출 / 랭킹 조회
    └── hooks/                   # 게임 로직 훅
        ├── useGameTimer.js
        ├── useKeyboardInput.js
        ├── useParticles.js
        └── useScreenShake.js
```

---

## 🚀 배포

`main` 브랜치에 push하면 [GitHub Actions 워크플로우](.github/workflows/deploy.yml)가 자동으로 빌드 후 GitHub Pages에 배포합니다.