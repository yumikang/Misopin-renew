# 📋 미소핀의원 사이트맵 분석 문서

## 🏥 프로젝트 개요
- **사이트명**: 미소핀의원
- **슬로건**: The best luxury CLINIC
- **기술 스택**: 정적 HTML + jQuery + CSS
- **디자인 시스템**: 1450px 그리드, 브라운 테마 (#9F988C)

---

## 🗺️ 사이트맵 구조

### 1. 메인 페이지
```
📍 index.html (홈)
├── 메인 배너 (main_banner)
├── 섹션1 (inc01) - 주요 시술 소개
├── 섹션2 (inc02) - 서비스 카테고리
├── 섹션3 (inc03) - 특별 프로모션
├── 섹션4 (inc04) - 병원 소개
└── 섹션5 (inc05) - 연락처/위치
```

### 2. 페이지 계층 구조

#### 🏢 **1차 메뉴 (7개 카테고리)**

##### 1️⃣ 미소핀 소개
- `/about.html` - 병원 소개
- `/board-page.html` - 공지 및 이벤트
  - `/board-notice.html` - 공지사항
  - `/board-event.html` - 이벤트
  - `/board-detail.html` - 게시글 상세

##### 2️⃣ 주름/보톡스
- `/dist/botox.html` - 보톡스
- `/dist/jeomin.html` - 제오민

##### 3️⃣ 볼륨/리프팅
- `/dist/filler.html` - 필러
- `/dist/skinbooster.html` - 스킨부스터
- `/dist/lifting.html` - 리프팅

##### 4️⃣ 피부케어
- `/dist/acne.html` - 여드름치료
- `/dist/peeling.html` - 필링

##### 5️⃣ 제거시술
- `/dist/mole.html` - 점
- `/dist/milia.html` - 비립종
- `/dist/tattoo.html` - 문신제거

##### 6️⃣ 바디케어
- `/dist/hair-removal.html` - 제모
- `/dist/diet.html` - 다이어트

##### 7️⃣ 상담 예약
- `/calendar-page.html` - 온라인 상담

### 3. 공통 컴포넌트

#### 🎨 **헤더 구조**
```html
<header id="sh_hd">
├── 로고 영역
├── 메인 네비게이션 (7개 메뉴)
├── 서브 메뉴 (드롭다운)
└── 이벤트 배너 링크
```

#### 🎨 **푸터 구조**
```html
<footer>
├── 병원 정보
│   ├── 병원명
│   ├── 대표자
│   ├── 사업자번호
│   └── 주소
├── 연락처
│   ├── 전화번호
│   └── 이메일
├── 진료시간
└── SNS 링크
```

#### 🎨 **퀵메뉴**
- `/quickmenu.html` - 플로팅 퀵메뉴
  - 카톡 상담
  - 전화 상담
  - 오시는 길
  - TOP 버튼

### 4. 템플릿 구조
```
/templates/master/
├── header.html - PC 헤더
├── header-responsive.html - 모바일 헤더
├── footer.html - PC 푸터
├── footer-responsive.html - 모바일 푸터
├── mobile-menu.html - 모바일 메뉴
├── quickmenu.html - 퀵메뉴
├── sub-banner.html - 서브페이지 배너
└── treatment-content.html - 시술 콘텐츠 템플릿
```

### 5. 시술 페이지 구조 (/dist/)
모든 시술 페이지는 동일한 템플릿 구조:
```
시술 페이지 템플릿
├── 서브 배너
├── 시술 개요
├── 효과 및 장점
├── 시술 과정
├── 주의사항
└── Before/After 갤러리
```

### 6. CSS 아키텍처
```
/css/
├── vendor/ - 외부 라이브러리
│   ├── default.css
│   ├── swiper.min.css
│   ├── aos.css
│   └── font-awesome.min.css
├── components/ - 컴포넌트별 스타일
│   ├── top_menu.css
│   ├── quickmenu.css
│   ├── main_banner.css
│   ├── inc01.css (섹션1)
│   ├── inc02.css (섹션2)
│   ├── inc03.css (섹션3)
│   ├── inc04.css (섹션4)
│   └── inc05.css (섹션5)
├── grid-system-1450.css - 그리드 시스템
└── button-styles.css - 버튼 스타일
```

### 7. JavaScript 구조
```
/js/
├── vendor/ - 외부 라이브러리
│   ├── jquery-3.7.1.min.js
│   ├── jquery-migrate-3.4.1.min.js
│   ├── jquery-ui.js
│   ├── swiper.min.js
│   └── aos.js
├── components/ - 컴포넌트 스크립트
│   └── top_menu.js
├── common.js - 공통 함수
├── wrest.js - 유틸리티
└── mobile-nav.js - 모바일 네비게이션
```

---

## 📊 페이지별 섹션 구조

### 메인 페이지 (index.html) 섹션 분석

#### **섹션 1 (inc01)** - 주요 시술 슬라이드
- Swiper 슬라이드
- 시술 이미지 + 설명
- CTA 버튼

#### **섹션 2 (inc02)** - 서비스 그리드
- 6개 주요 서비스 카드
- 호버 효과
- 아이콘 + 텍스트

#### **섹션 3 (inc03)** - 프로모션
- 이벤트 배너
- 할인 정보
- 예약 유도 CTA

#### **섹션 4 (inc04)** - 병원 소개
- 의료진 소개
- 병원 특징
- 장비 소개

#### **섹션 5 (inc05)** - Contact
- 위치 정보
- 진료 시간
- 연락처
- 지도

---

## 🔄 CMS 연동 포인트

### 편집 가능한 영역 (data-cms-section)

#### 1. **글로벌 요소**
- `data-cms-section="logo"` - 로고 이미지
- `data-cms-section="header-menu"` - 메뉴 구조
- `data-cms-section="footer-info"` - 푸터 정보
- `data-cms-section="quick-menu"` - 퀵메뉴 항목

#### 2. **메인 페이지**
- `data-cms-section="main-banner"` - 메인 배너 슬라이드
- `data-cms-section="service-grid"` - 서비스 카드
- `data-cms-section="promotion"` - 프로모션 배너
- `data-cms-section="doctor-intro"` - 의료진 소개
- `data-cms-section="contact-info"` - 연락처 정보

#### 3. **시술 페이지**
- `data-cms-section="treatment-title"` - 시술명
- `data-cms-section="treatment-desc"` - 시술 설명
- `data-cms-section="treatment-process"` - 시술 과정
- `data-cms-section="treatment-gallery"` - Before/After 갤러리
- `data-cms-section="treatment-price"` - 가격 정보

#### 4. **게시판**
- `data-cms-section="board-list"` - 게시글 목록
- `data-cms-section="board-content"` - 게시글 내용
- `data-cms-section="event-banner"` - 이벤트 배너

---

## 📱 반응형 디자인 구조

### 브레이크포인트
- **Desktop**: 1450px (기본)
- **Tablet**: 768px - 1449px
- **Mobile**: 767px 이하

### 모바일 전용 요소
- 햄버거 메뉴
- 모바일 네비게이션 드로어
- 터치 기반 슬라이더
- 축소된 퀵메뉴

---

## 📝 파일 통계

- **HTML 파일**: 28개
- **CSS 파일**: 59개
- **JavaScript 파일**: 18개
- **이미지 폴더**: /img/, /images/
- **총 페이지**: 약 20개 고유 페이지

---

## 🎯 웹빌더 구현 우선순위

### Phase 1 (필수)
1. 메인 페이지 텍스트 편집
2. 이미지 업로드/변경
3. 연락처 정보 수정

### Phase 2 (중요)
1. 시술 페이지 콘텐츠 편집
2. 게시판 관리
3. 이벤트 배너 관리

### Phase 3 (선택)
1. 메뉴 구조 편집
2. SEO 메타데이터
3. 다국어 지원

---

## 💾 문서 정보
- **작성일**: 2025-09-19
- **버전**: 1.0
- **작성자**: Claude Code Assistant
- **용도**: CMS 웹빌더 구현을 위한 사이트 구조 분석