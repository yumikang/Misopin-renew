# 미소핀 의원 React 마이그레이션 플랜

## 프로젝트 개요

### 현재 상황
- **기존**: 3개 HTML 페이지 (메인, 게시판, 달력예약)
- **목표**: 13개 페이지 React 웹사이트 + 예약 시스템 + 어드민

### 최종 메뉴 구조
```
미소핀의원 (index.html)
├── 미소핀 소개
│   ├── 병원 소개 (about.html)
│   └── 공지 및 이벤트 (notice.html)
├── 주름/보톡스
│   ├── 보톡스 (blog-details-1.html)
│   └── 제오민 (blog-details-2.html)
├── 볼륨/리프팅
│   ├── 필러 (blog-details-3.html)
│   ├── 스킨부스터 (blog-details-4.html)
│   └── 리프팅 (blog-details-5.html)
├── 피부케어
│   ├── 여드름치료 (blog-details-6.html)
│   └── 필링 (blog-details-7.html)
├── 제거시술
│   ├── 점 (blog-details-8.html)
│   ├── 비립종 (blog-details-9.html)
│   └── 문신제거 (blog-details-10.html)
├── 바디케어
│   ├── 제모 (blog-details-11.html)
│   └── 다이어트 (blog-details-12.html)
└── 상담 예약 (contact.html)
```

## Phase 1: 의존성 문제 해결

### 1.1 외부 의존성 현황 분석
#### JavaScript 라이브러리 (6개)
- jQuery 1.8.3 → React hooks로 대체
- jQuery UI → react-datepicker
- Swiper.js → swiper/react
- AOS → framer-motion
- Feather Icons → react-feather
- Font Awesome → react-icons

#### CSS 라이브러리 (3개)
- Font Awesome CSS → react-icons
- Swiper CSS → swiper/css
- AOS CSS → framer-motion (불필요)

#### 외부 서비스 (3개)
- Google Maps iframe → @googlemaps/react-wrapper
- 카카오톡 연동 → 카카오 SDK
- 인스타그램 연동 → 직접 구현

### 1.2 폰트 시스템
- 웹폰트 사용 (별도 제공 예정)
- Google Fonts Early Access 제거
- 로컬 폰트 파일 다운로드 불필요

### 1.3 색상 시스템 통합
#### 기존 문제점
- 원본 템플릿 블루 색상 잔재 (#253dbe, #1a30a7, #556ada)
- 회색 계열 혼재 (#e7e7e7, #f0f0f0, #f5f5f5, #f8f8f8)
- 텍스트 색상 불일치 (#333, #666, #646464)

#### 해결 방안
- CSS 변수 시스템으로 통일
- 미소핀 브랜드 색상 체계 확립
- 외부 CSS 오버라이드 제거

## Phase 2: React 프로젝트 구조 설계

### 2.1 프로젝트 생성
```bash
npx create-react-app misopin-clinic
cd misopin-clinic
```

### 2.2 의존성 설치
```bash
npm install \
  react-router-dom \
  swiper \
  framer-motion \
  react-feather \
  react-icons \
  react-datepicker \
  @googlemaps/react-wrapper \
  styled-components
```

### 2.3 프로젝트 구조
```
misopin-clinic/
├── public/
│   ├── fonts/           # 웹폰트 파일들
│   └── images/          # 이미지 에셋들
├── src/
│   ├── components/
│   │   ├── layout/      # Header, Footer, Navigation, QuickMenu
│   │   ├── common/      # Button, Card, Modal, Slider
│   │   └── pages/       # 페이지별 컴포넌트
│   ├── styles/
│   │   ├── base/        # 기본 스타일 (reset, typography, layout)
│   │   ├── components/  # 컴포넌트별 스타일
│   │   └── utils/       # 애니메이션, 유틸리티
│   ├── hooks/           # 커스텀 훅
│   ├── services/        # API 호출
│   ├── utils/           # 유틸리티 함수
│   └── data/            # 메뉴 구성, 시술 정보
```

### 2.4 디자인 시스템
#### CSS 변수 시스템
```css
:root {
  /* 미소핀 브랜드 컬러 */
  --misopin-primary: #9F988C;
  --misopin-primary-dark: #87857E;
  --misopin-accent: #EFEDE5;
  
  /* 시스템 컬러 */
  --text-primary: #2C2C2C;
  --text-secondary: #555555;
  --bg-primary: #FFFFFF;
  --border-primary: #E0E0E0;
}
```

#### 컴포넌트 기반 스타일
- Button, Card, Form, Modal 등 재사용 컴포넌트
- 반응형 그리드 시스템
- 애니메이션 시스템

## Phase 3: 개발 전략

### 3.1 템플릿 기반 접근
#### TreatmentTemplate
- 11개 시술 페이지 공통 구조
- 제목, 설명, 가격, 전후사진 섹션
- 관련 시술 추천

#### Layout 컴포넌트
- Header, Footer, QuickMenu 공통화
- SubBanner 통일
- 네비게이션 자동 생성

### 3.2 데이터 중심 설계
```javascript
// menuConfig.js
export const menuConfig = {
  main: [
    {
      id: 'intro',
      title: '미소핀 소개',
      subMenus: [
        { title: '병원 소개', component: 'About' },
        { title: '공지 및 이벤트', component: 'Notice' }
      ]
    },
    // ... 다른 메뉴들
  ]
};
```

### 3.3 라우터 자동 생성
- 메뉴 구성에서 라우트 자동 생성
- 컴포넌트 동적 로딩
- 코드 스플리팅 적용

## Phase 4: 개발 단계별 계획

### Day 1-2: 기반 구축
- [ ] React 프로젝트 생성
- [ ] 의존성 설치 및 설정
- [ ] 디자인 시스템 CSS 작성
- [ ] 기본 레이아웃 구조

### Day 3-4: 레이아웃 컴포넌트
- [ ] Header 컴포넌트 (네비게이션 포함)
- [ ] Footer 컴포넌트
- [ ] QuickMenu 컴포넌트
- [ ] SubBanner 컴포넌트
- [ ] 반응형 스타일 적용

### Day 5-6: 템플릿 및 라우팅
- [ ] TreatmentTemplate 완성
- [ ] 메뉴 구성 데이터 작성
- [ ] 라우터 설정 및 자동 생성
- [ ] 11개 시술 페이지 빠른 생성

### Day 7-8: 핵심 페이지
- [ ] 메인 페이지 (슬라이더, 이벤트 섹션)
- [ ] About 페이지
- [ ] Notice/게시판 페이지

### Day 9-10: 예약 시스템
- [ ] 달력 컴포넌트 (react-datepicker)
- [ ] 예약 폼 컴포넌트
- [ ] 예약 상태 관리
- [ ] 폼 검증 시스템

### Day 11-12: 어드민 패널
- [ ] 어드민 레이아웃
- [ ] 예약 관리 인터페이스
- [ ] 게시물 관리
- [ ] 통계 대시보드

### Day 13-14: 완성 및 최적화
- [ ] 전체 기능 테스트
- [ ] 성능 최적화
- [ ] SEO 설정
- [ ] 배포 준비

## Phase 5: 기술 스택 정리

### 프론트엔드
- **프레임워크**: React 18
- **라우팅**: React Router v6
- **스타일링**: CSS Modules + CSS 변수
- **애니메이션**: Framer Motion
- **아이콘**: React Feather, React Icons
- **슬라이더**: Swiper React
- **날짜 선택**: React DatePicker
- **지도**: Google Maps React Wrapper

### 개발 도구
- **번들러**: Create React App (Webpack)
- **CSS 전처리**: Sass (선택적)
- **코드 품질**: ESLint, Prettier
- **버전 관리**: Git

### 배포
- **호스팅**: Netlify/Vercel (정적 호스팅)
- **도메인**: 기존 도메인 연결
- **CDN**: 자동 제공

## 성공 기준

### 기능적 요구사항
- [ ] 13개 페이지 완전 구현
- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 예약 시스템 동작
- [ ] 어드민 패널 기본 기능
- [ ] 외부 의존성 0% (폰트 제외)

### 성능 요구사항
- [ ] 초기 로딩 시간 < 3초
- [ ] Lighthouse 점수 90+ (Performance, SEO)
- [ ] 모바일 최적화
- [ ] 브라우저 호환성 (Chrome, Safari, Firefox)

### 유지보수성
- [ ] 컴포넌트 재사용률 80%+
- [ ] 일관된 코딩 스타일
- [ ] 문서화 완료
- [ ] 확장 가능한 구조

## 리스크 및 대응책

### 기술적 리스크
- **React 학습 곡선**: 단계별 접근, 템플릿 우선 활용
- **외부 API 연동**: 테스트 환경 우선 구축
- **반응형 이슈**: 모바일 퍼스트 접근

### 일정적 리스크
- **개발 지연**: 우선순위 기반 MVP 접근
- **요구사항 변경**: 유연한 컴포넌트 구조 설계
- **테스트 부족**: 단계별 검증 프로세스

## 다음 액션 아이템

### 즉시 실행 (오늘)
1. React 프로젝트 생성
2. 의존성 패키지 설치
3. 기본 디렉토리 구조 생성
4. CSS 변수 시스템 적용

### 이번 주
1. 레이아웃 컴포넌트 완성
2. 라우팅 시스템 구축
3. 첫 번째 시술 페이지 완성
4. 반응형 테스트

### 다음 주
1. 모든 페이지 기본 구조 완성
2. 예약 시스템 개발 시작
3. 어드민 패널 기획
4. 성능 최적화 시작