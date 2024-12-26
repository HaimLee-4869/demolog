# Haimovie 🎥
https://haimlee-4869.github.io/haimoive/

--- 

Haimovie는 TMDB API를 활용하여 인기 영화, 애니메이션, 다큐멘터리를 검색하고 위시리스트로 관리할 수 있는 Netflix 스타일의 프론트엔드 웹 애플리케이션입니다.

---

## 📋 프로젝트 기본 정보

- **프로젝트 이름**: Haimoive
- **목적**: 사용자 맞춤형 영화 추천과 위시리스트 관리 제공
- **주요 기능**:
  - TMDB API 기반 영화 검색 및 데이터 표시
  - 무한 스크롤(Infinite Scroll) 및 테이블 뷰(Table View) 지원
  - 사용자 인증 (로그인/회원가입)
  - 위시리스트 관리 (추가/제거)
  - 반응형 디자인 지원
  - 서비스 이용 약관 확인 및 동의 절차

---

## 🛠️ 기술 스택

### 프론트엔드
- **React.js**: 컴포넌트 기반 UI 개발
- **Redux Toolkit**: 상태 관리
- **React Query**: 데이터 패칭 및 캐싱
- **Axios**: HTTP 요청
- **React Router**: 라우팅
- **React Toastify**: 알림 메시지
- **Tailwind CSS 및 Custom CSS**: 스타일링
- **GitHub Actions**: CI/CD를 위한 자동화 배포

---

## 🚀 설치 및 실행 가이드

### 요구사항

Node.js: >= 16.0
npm 또는 yarn

### 설치
1. 프로젝트 클론
   ```bash
   git clone https://github.com/username/haimoive.git
   cd haimoive
2. 의존성 설치
### `npm install`
3. 환경 변수 설정
    .env 파일을 생성하고 TMDB API 키를 추가합니다.
    REACT_APP_TMDB_API_KEY=your_tmdb_api_key
4. 실행
### `npm start`
    애플리케이션은 기본적으로 http://localhost:3000에서 실행됩니다.

### `npm run build`

---

## 📂 프로젝트 구조

```bash
src
├── components         # 재사용 가능한 컴포넌트
│   ├── Banner         # 배너 컴포넌트
│   ├── Header         # 헤더 컴포넌트
│   ├── Home           # 홈 화면 관련 컴포넌트
│   ├── InfiniteScroll # 무한 스크롤 구현 컴포넌트
│   ├── LoadingSpinner # 로딩 스피너 컴포넌트
│   ├── MovieCard      # 영화 카드 컴포넌트
│   ├── MovieGrid      # 영화 그리드 뷰 컴포넌트
│   ├── MovieTable     # 영화 테이블 뷰 컴포넌트
│   ├── ProtectedRoute # 인증 보호 라우트 컴포넌트
│   ├── Search         # 검색 바 및 검색 결과 컴포넌트
│   ├── SignIn         # 로그인 및 회원가입 컴포넌트
│   └── Wishlist       # 위시리스트 관리 컴포넌트
├── hook               # 커스텀 훅
│   ├── useAuth        # 인증 관련 훅
│   ├── useFetch       # 데이터 패칭 훅
│   └── ...
├── services           # 서비스 로직
│   ├── Auth.js        # 인증 서비스
│   ├── Url.js         # API URL 관리
│   └── ...
├── store              # Redux 상태 관리
│   ├── slices         # Redux 슬라이스
│   │   ├── authSlice.js       # 인증 상태 관리 슬라이스
│   │   └── wishlistSlice.js   # 위시리스트 상태 관리 슬라이스
│   └── store.js       # Redux 스토어 설정
├── styles             # 글로벌 스타일
│   ├── global.css     # 전역 스타일
│   └── ...
├── utils              # 유틸리티 함수
│   └── formatDate.js  # 날짜 포맷팅 함수
├── views              # 주요 화면
│   ├── Home           # 홈 화면
│   │   ├── HomePopular     # 인기 영화 화면
│   │   ├── HomeWishlist    # 위시리스트 화면
│   │   ├── MainHome        # 메인 홈 화면
│   │   └── ...
│   ├── Search         # 검색 화면
│   │   ├── HomeSearch      # 검색 결과 화면
│   │   └── ...
├── App.js             # 애플리케이션 진입점
├── index.js           # ReactDOM 렌더링
├── Router.js          # 라우터 설정
└── ...

---

## 💻 개발 가이드

### 📋 코딩 컨벤션

1. **JS/JSX 스타일**
   - ESLint 및 Prettier 규칙 준수
   - 코드 일관성을 유지하기 위해 필수적으로 사용

2. **CSS 스타일링**
   - Tailwind CSS를 우선 사용
   - 추가적인 커스터마이징이 필요한 경우 Custom CSS 작성

3. **컴포넌트**
   - 기능 단위로 컴포넌트 분리
   - 재사용성을 고려하여 설계 및 구현

---

### 📝 Git 커밋 메시지 규칙

- **형식**: `<태그>: <작업 내용>`
- **태그 종류**
  - `feat`: 새로운 기능 추가
  - `fix`: 버그 수정
  - `docs`: 문서 수정
  - `style`: 코드 스타일 수정 (기능 수정 없음)
  - `refactor`: 코드 리팩토링
  - `test`: 테스트 코드 추가/수정
  - `chore`: 기타 변경 사항
- **예시**
  - `feat: 검색 기능 추가`
  - `fix: 영화 데이터 로드 오류 해결`

---

### 🔀 브랜치 전략

- **브랜치 구조**
  - `main`: 배포 가능한 안정 버전
  - `develop`: 개발 중인 버전
  - `feature/xxx`: 기능 개발용 브랜치 (예: `feature/add-search-bar`)

---

### 🔄 PR 템플릿

```markdown
## 작업 내용
- [ ] 작업 내용을 요약합니다.

## 변경 사항
- 주요 변경 사항을 작성합니다.

## 테스트
- 테스트 방법과 결과를 작성합니다.

## 기타
- 관련된 이슈나 추가적으로 참고할 내용을 작성합니다.

---
### 🛠️ 이슈 등록 방법

#### 이슈 제목
- **형식**: `[카테고리] 이슈 제목`
- **예시**: `[Bug] 영화 데이터가 로드되지 않음`

---

#### 이슈 내용 템플릿

```markdown
## 문제점
- 발생한 문제를 명확히 설명

## 기대 동작
- 문제 해결 후 기대되는 동작 설명

## 재현 방법
1. 발생하는 상황 설명
2. 단계별로 작성

## 관련 스크린샷 (가능한 경우)
- 문제를 보여주는 스크린샷 첨부

---

### 📖 추가 문서 링크
- [TMDB API](https://www.themoviedb.org/)
