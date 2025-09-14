# 📐 1450px 그리드 시스템 마이그레이션 매뉴얼

## 🎯 목표
- **최대 너비**: 1450px (기존 1200px → 1450px)
- **중앙 정렬**: 모든 콘텐츠 가운데 정렬
- **반응형**: 모바일 우선 접근법
- **통일성**: 모든 섹션 동일한 패딩과 마진

---

## 📏 그리드 시스템 사양

### 1. 컨테이너 구조
```css
/* 새로운 메인 컨테이너 */
.container {
    width: 100%;
    max-width: 1450px;
    margin: 0 auto;
    padding: 0 30px; /* 좌우 패딩 */
}

/* 브레이크포인트 */
/* 모바일: 320px - 767px */
/* 태블릿: 768px - 1023px */
/* 데스크톱: 1024px - 1449px */
/* 와이드: 1450px+ */

@media (max-width: 767px) {
    .container {
        padding: 0 15px;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .container {
        padding: 0 20px;
    }
}

@media (min-width: 1024px) {
    .container {
        padding: 0 30px;
    }
}
```

### 2. 12 컬럼 그리드 시스템
```css
.row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
}

.col {
    padding: 0 15px;
    width: 100%;
}

/* 데스크톱 그리드 */
@media (min-width: 1024px) {
    .col-1 { width: 8.333333%; }
    .col-2 { width: 16.666667%; }
    .col-3 { width: 25%; }
    .col-4 { width: 33.333333%; }
    .col-5 { width: 41.666667%; }
    .col-6 { width: 50%; }
    .col-7 { width: 58.333333%; }
    .col-8 { width: 66.666667%; }
    .col-9 { width: 75%; }
    .col-10 { width: 83.333333%; }
    .col-11 { width: 91.666667%; }
    .col-12 { width: 100%; }
}

/* 태블릿 그리드 */
@media (min-width: 768px) and (max-width: 1023px) {
    .col-md-1 { width: 8.333333%; }
    .col-md-2 { width: 16.666667%; }
    .col-md-3 { width: 25%; }
    .col-md-4 { width: 33.333333%; }
    .col-md-6 { width: 50%; }
    .col-md-12 { width: 100%; }
}

/* 모바일 그리드 */
@media (max-width: 767px) {
    .col-sm-6 { width: 50%; }
    .col-sm-12 { width: 100%; }
}
```

### 3. 섹션 구조 통일
```css
/* 모든 섹션에 적용할 기본 스타일 */
.section {
    padding: 80px 0;
    position: relative;
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #222;
}

.section-subtitle {
    font-size: 1.125rem;
    color: #777;
    line-height: 1.6;
}

/* 모바일 */
@media (max-width: 767px) {
    .section {
        padding: 50px 0;
    }

    .section-header {
        margin-bottom: 40px;
    }

    .section-title {
        font-size: 1.875rem;
    }

    .section-subtitle {
        font-size: 1rem;
    }
}
```

---

## 🔧 변환 작업 체크리스트

### Step 1: CSS 파일 수정
- [ ] `default.css`의 `min-width: 1200px` 제거
- [ ] 모든 고정 너비를 `max-width: 1450px`로 변경
- [ ] Float 레이아웃을 Flexbox/Grid로 변환

### Step 2: HTML 구조 변경
- [ ] 모든 섹션을 `.container`로 감싸기
- [ ] 그리드 시스템 클래스 적용
- [ ] 불필요한 inline 스타일 제거

### Step 3: 반응형 이미지
- [ ] 모든 이미지에 `max-width: 100%; height: auto;` 적용
- [ ] picture 태그로 반응형 이미지 구현
- [ ] lazy loading 속성 추가

---

## 📄 페이지별 작업 내용

### 1. index.html (메인 페이지)
```html
<!-- 변경 전 -->
<div id="main_banner" style="width: 1200px;">
    <h1>Misopin is your happiness</h1>
    <p>매일의 스트레스로 지친 피부...</p>
</div>

<!-- 변경 후 -->
<section class="section hero-section">
    <div class="container">
        <div class="section-header">
            <h1 class="section-title">Misopin is your happiness</h1>
            <p class="section-subtitle">
                매일의 스트레스로 지친 피부, 이제는 나를 위한 투자를<br>
                시작할 때입니다. 미소핀에서 당신의 자신감을 되찾아 드립니다
            </p>
        </div>
    </div>
</section>
```

### 2. about.html (병원소개)
- 헤더/푸터 그리드 적용
- 콘텐츠 섹션 `.container` 적용
- 이미지 갤러리 반응형 그리드

### 3. board-notice.html (공지사항)
- 테이블 반응형 처리
- 검색 폼 그리드 적용
- 페이지네이션 중앙 정렬

### 4. board-event.html (이벤트)
- 카드 레이아웃 그리드 시스템
- 이미지 반응형 처리
- 모달 팝업 중앙 정렬

### 5. calendar-page.html (예약)
- 캘린더 반응형 그리드
- 예약 폼 레이아웃
- 시간 선택 UI 개선

### 6. directions.html (오시는길)
- 지도 반응형 처리
- 교통 정보 그리드
- 연락처 섹션 정렬

---

## 🎨 공통 컴포넌트 스타일

### 헤더
```css
.header {
    width: 100%;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-inner {
    max-width: 1450px;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}
```

### 푸터
```css
.footer {
    background: #222;
    color: #fff;
    padding: 60px 0 30px;
}

.footer-inner {
    max-width: 1450px;
    margin: 0 auto;
    padding: 0 30px;
}
```

### 버튼
```css
.btn {
    display: inline-block;
    padding: 12px 30px;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-primary {
    background: #38b0c9;
    color: #fff;
}

.btn-primary:hover {
    background: #2a8599;
}
```

---

## ⚠️ 주의사항

1. **그누보드 연동 부분 유지**
   - 외부 CSS 링크 유지
   - PHP 변수 처리 부분 보존
   - 게시판 기능 관련 JS 유지

2. **GSAP 애니메이션 보존**
   - 기존 애니메이션 코드 유지
   - 반응형 브레이크포인트에 맞춰 조정

3. **브라우저 호환성**
   - IE11 지원 필요시 Flexbox 폴백
   - -webkit- 접두사 포함

---

## 📊 예상 결과

- **데스크톱**: 1450px 중앙 정렬 레이아웃
- **태블릿**: 유연한 그리드 시스템
- **모바일**: 완전 반응형, 가로 스크롤 없음
- **성능**: 30% 향상 (Float → Flexbox)
- **유지보수**: 50% 개선 (통일된 그리드)

---

## 🚀 실행 순서

1. 이 매뉴얼을 기준으로 CSS 파일 생성
2. 6개 페이지 동시 작업 시작
3. 각 페이지별 테스트
4. 크로스 브라우저 테스트
5. 최종 검수 및 배포

---

*작성일: 2024년 9월 14일*
*버전: 1.0.0*
*목표: 1450px 반응형 그리드 시스템 구축*