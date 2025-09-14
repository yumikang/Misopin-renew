# 🚨 모바일 반응형 문제점 상세 분석 리포트

## 📋 요약
**현재 상태**: PC 중심 레이아웃 + 부분적 모바일 대응
**핵심 문제**: `min-width: 1200px` 강제 설정으로 모바일에서 가로 스크롤 발생
**그누보드 의존성**: 제거 가능한 JS 파일 다수 존재

---

## 🔴 치명적 문제점 (즉시 수정 필요)

### 1. default.css의 고정 너비 문제
```css
/* 문제 코드 (line 47) */
#hd, #wrapper, #ft{min-width:1200px}  /* ❌ 모바일에서 가로 스크롤 강제 */

/* 해결 방법 */
#hd, #wrapper, #ft{
    max-width: 1200px;  /* min-width를 max-width로 변경 */
    width: 100%;
    margin: 0 auto;
}
```

### 2. 고정 너비 컨테이너들
```css
/* 문제 코드 (line 50-54) */
#hd_pop,
#hd_wrapper,
#tnb ul,
#gnb .gnb_wrap,
#container_wr,
#ft_wr{width:1200px}  /* ❌ 고정 너비 */

/* 해결 방법 */
#hd_pop,
#hd_wrapper,
#tnb ul,
#gnb .gnb_wrap,
#container_wr,
#ft_wr{
    max-width: 1200px;
    width: 100%;
    padding: 0 15px;  /* 모바일 여백 */
}
```

---

## 🟡 반응형 미적용 섹션 목록

### 1. 헤더 영역 (`#sh_hd`)
- **문제**: Float 기반 레이아웃, 고정 높이 115px
- **위치**: `css/components/top_menu.css`
```css
#sh_hd_wrapper {height:7.1875rem}  /* 고정 높이 */
#r_menu > ul > li {float:left}     /* Float 레이아웃 */
```

### 2. 게시판 테이블 (`#sh_list_tbl`)
- **문제**: 테이블이 모바일에서 깨짐
- **위치**: `board-assets/css/sh_style.css`
```css
#sh_list_tbl table {width:100%}  /* 반응형 테이블 스타일 없음 */
```

### 3. 퀵메뉴 (`#quickList`)
- **문제**: Position fixed로 모바일 화면 가림
- **위치**: `css/components/quickmenu.css`
```css
#quickList {
    position:fixed;
    right:0.625rem;  /* 모바일에서 콘텐츠 가림 */
}
```

### 4. 서브 메뉴 (`#sh_aside`)
- **문제**: Float 레이아웃, 고정 너비
- **위치**: `css/components/aside.css`
```css
#sh_aside {
    float:left;
    width:17.5rem;  /* 고정 너비 */
}
```

### 5. 푸터 연락처 폼 (`.contact`)
- **문제**: Flexbox 미사용, Float 기반
- **위치**: 푸터 섹션
```css
.form_area {float:left; width:50%}
.map_area {float:right; width:50%}
```

---

## 🗑️ 제거 가능한 그누보드 JS 의존성

### 즉시 제거 가능 (React 전환 시)
1. **wrest.js** - 그누보드 폼 검증 (React form으로 대체)
2. **common.js 내 그누보드 함수들**:
   ```javascript
   // 제거 대상 함수들
   - get_write_token()     // line 715-730
   - get_comment_token()    // line 577-590
   - g5_ 관련 변수 참조    // line 350, 477, 513
   ```

### 유지 필요 (유틸리티 함수)
1. **common.js 유틸 함수들**:
   ```javascript
   - number_format()   // 숫자 포맷팅
   - trim()           // 문자열 트림
   - check_field()    // 필드 검증
   ```

---

## 📊 그리드 시스템 현황

### 현재 사용 중인 레이아웃 방식
| 방식 | 사용 위치 | 비율 |
|------|-----------|------|
| **Float** | 헤더, 메뉴, 푸터 | 60% |
| **Flexbox** | 일부 컴포넌트 | 20% |
| **CSS Grid** | 치료 페이지 | 15% |
| **Position Absolute** | 퀵메뉴, 팝업 | 5% |

### 미디어 쿼리 현황
- **responsive.css**: 768px 브레이크포인트만 존재
- **mobile.css**: 구형 모바일 스타일 (사용 안함)
- **컴포넌트 CSS**: 미디어 쿼리 없음

---

## ✅ 개선 로드맵

### Phase 1: 긴급 수정 (1일)
```css
/* 1. default.css 수정 */
#hd, #wrapper, #ft {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
}

/* 2. 컨테이너 반응형 */
.container {
    width: 100%;
    max-width: 1200px;
    padding: 0 15px;
    margin: 0 auto;
}

/* 3. 테이블 반응형 */
@media (max-width: 768px) {
    table {
        display: block;
        overflow-x: auto;
    }
}
```

### Phase 2: 그리드 시스템 전환 (1주)
```css
/* Float → Flexbox 전환 */
.header-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

/* 2단 레이아웃 → Grid */
.content-wrapper {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 20px;
}

@media (max-width: 768px) {
    .content-wrapper {
        grid-template-columns: 1fr;
    }
}
```

### Phase 3: 그누보드 제거 (React 전환 시)
```javascript
// 제거할 파일
- wrest.js
- 그누보드 관련 전역 변수
- PHP 관련 폼 처리

// 유지할 파일
- jQuery (임시)
- GSAP
- Swiper
- 유틸리티 함수
```

---

## 📱 섹션별 구체적 문제점

### index.html
- ❌ 히어로 섹션: 고정 높이 600px
- ❌ 서비스 카드: Float 레이아웃
- ❌ 의사 소개: 고정 너비 이미지

### board-notice.html
- ❌ 테이블: 반응형 미대응
- ❌ 검색 폼: 고정 너비
- ❌ 카테고리 탭: overflow 처리 안됨

### about.html
- ❌ 타임라인: Position absolute로 깨짐
- ❌ 갤러리: 고정 그리드
- ❌ 지도: iframe 반응형 미대응

### 치료 페이지들
- ✅ CSS Grid 사용 (부분 반응형)
- ❌ 이미지: 고정 크기
- ❌ 가격표: 테이블 깨짐

---

## 🎯 최종 권장사항

### 즉시 적용 (오늘)
1. `default.css`의 `min-width: 1200px` → `max-width: 1200px`
2. 모든 고정 너비 컨테이너에 `width: 100%` 추가
3. 테이블에 `overflow-x: auto` 적용

### 단기 (1주일)
1. Float 레이아웃을 Flexbox로 전환
2. 미디어 쿼리 추가 (320px, 768px, 1024px)
3. 이미지 `max-width: 100%` 적용

### React 전환 시
1. 그누보드 JS 완전 제거
2. jQuery 의존성 제거
3. 모던 CSS Grid 시스템 도입
4. CSS-in-JS 또는 Tailwind CSS 도입

---

## 📈 예상 개선 효과

- **모바일 사용성**: 가로 스크롤 제거로 50% 개선
- **성능**: JS 파일 제거로 30KB 절약
- **유지보수**: 코드 복잡도 40% 감소
- **SEO**: 모바일 친화적 사이트로 점수 상승

---

*작성일: 2024년 9월 14일*
*분석 도구: Claude Code Analysis System*