# 미소핀의원 CMS 연동 가이드

## 📋 개요

정적 HTML 사이트와 Next.js CMS를 연결하여 동적 콘텐츠를 표시하는 완전한 솔루션입니다.

## 🚀 빠른 시작

### 1. CMS 서버 실행

```bash
cd misopin-cms
npm run dev
```

CMS가 `http://localhost:3004`에서 실행됩니다.

### 2. 정적 페이지에 라이브러리 추가

```html
<!DOCTYPE html>
<html>
<head>
    <!-- CMS 연동 스타일 -->
    <link rel="stylesheet" href="css/misopin-cms.css">
</head>
<body>
    <!-- 콘텐츠 -->

    <!-- CMS 연동 스크립트 (</body> 직전에 추가) -->
    <script src="js/misopin-cms.js"></script>
</body>
</html>
```

### 3. 게시판 목록 표시

```html
<!-- HTML -->
<div id="notice-board">공지사항 로딩 중...</div>
<div id="event-board">이벤트 로딩 중...</div>

<script>
// 공지사항 표시
misopinCMS.renderBoardList('notice-board', {
    type: 'NOTICE',
    limit: 5
});

// 이벤트 표시
misopinCMS.renderBoardList('event-board', {
    type: 'EVENT',
    limit: 3
});
</script>
```

## 🔗 API 엔드포인트

### 공개 API (인증 불필요)

| 엔드포인트 | 설명 | 파라미터 |
|------------|------|----------|
| `GET /api/public/pages` | 전체 페이지 목록 | - |
| `GET /api/public/pages?slug=about` | 특정 페이지 조회 | `slug` |
| `GET /api/public/board-posts` | 전체 게시글 목록 | `type`, `limit`, `page` |
| `GET /api/public/board-posts?type=NOTICE` | 공지사항 목록 | `type=NOTICE` |
| `GET /api/public/board-posts?type=EVENT` | 이벤트 목록 | `type=EVENT` |
| `GET /api/public/popups` | 활성 팝업 목록 | - |

### 사용 예시

```javascript
// 공지사항 5개 가져오기
const notices = await misopinCMS.getBoardPosts({
    type: 'NOTICE',
    limit: 5
});

// 특정 페이지 가져오기
const aboutPage = await misopinCMS.getPage('about');

// 활성 팝업 표시
misopinCMS.showPopups();
```

## 🎨 주요 기능

### 1. 자동 팝업 시스템
- 페이지 로드 시 CMS에서 설정한 팝업 자동 표시
- "오늘 하루 보지 않기" 기능 (24시간)
- 반응형 팝업 디자인

### 2. 게시판 통합
- 공지사항/이벤트 자동 분류
- 페이지네이션 자동 생성
- 반응형 목록 디자인
- 조회수, 작성일 표시

### 3. 캐싱 시스템
- 5분 TTL 자동 캐싱
- 네트워크 요청 최소화
- 성능 최적화

### 4. 반응형 디자인
- 모바일/태블릿/데스크톱 대응
- 터치 친화적 인터페이스

## 📱 실제 적용 예시

### index.html에 공지사항 섹션 추가

```html
<!-- 기존 HTML 구조 유지 -->
<section class="notice-section">
    <div class="container">
        <h2>📢 공지사항</h2>
        <div id="main-notices"></div>
        <div class="text-center">
            <a href="board-notice.html" class="btn">더보기</a>
        </div>
    </div>
</section>

<script>
// 메인 페이지에 최신 공지사항 3개 표시
misopinCMS.renderBoardList('main-notices', {
    type: 'NOTICE',
    limit: 3
});
</script>
```

### board-notice.html 완전 동적화

```html
<!-- 기존 정적 목록을 동적으로 교체 -->
<div class="board-container">
    <div id="notice-list">로딩 중...</div>
</div>

<script>
// 전체 공지사항 페이지네이션과 함께 표시
misopinCMS.renderBoardList('notice-list', {
    type: 'NOTICE',
    limit: 10,
    page: 1
});
</script>
```

## ⚙️ 고급 설정

### CMS 클라이언트 설정

```javascript
// 커스텀 설정으로 CMS 클라이언트 생성
const customCMS = new MisopinCMS({
    baseURL: 'https://your-cms-domain.com',  // 프로덕션 URL
    cacheTimeout: 10 * 60 * 1000             // 10분 캐시
});
```

### 에러 처리

```javascript
try {
    const posts = await misopinCMS.getBoardPosts({type: 'NOTICE'});
    // 성공 처리
} catch (error) {
    console.error('데이터 로딩 실패:', error);
    // 에러 UI 표시
}
```

### 커스텀 렌더링

```javascript
// 수동으로 데이터를 가져와서 커스텀 렌더링
const posts = await misopinCMS.getBoardPosts({type: 'EVENT'});
if (posts.success) {
    const container = document.getElementById('custom-events');
    container.innerHTML = posts.data.map(post => `
        <div class="event-card">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        </div>
    `).join('');
}
```

## 🔧 배포 고려사항

### 프로덕션 환경 설정

1. **CMS 서버 배포**
   ```bash
   cd misopin-cms
   npm run build
   npm start
   ```

2. **JavaScript 설정 업데이트**
   ```javascript
   // js/misopin-cms.js에서 baseURL 변경
   const misopinCMS = new MisopinCMS({
       baseURL: 'https://cms.misopin.com'  // 실제 CMS 도메인
   });
   ```

3. **CORS 설정 확인**
   - CMS에서 정적 사이트 도메인 허용 설정

### 성능 최적화

- CDN을 통한 정적 자산 배포
- 이미지 최적화 및 lazy loading
- Service Worker를 통한 오프라인 지원

## 🎯 다음 단계

1. **데모 페이지 확인**: `cms-integration-demo.html` 열어서 테스트
2. **기존 페이지 적용**: 원하는 정적 페이지에 라이브러리 추가
3. **커스터마이징**: CSS 스타일 및 JavaScript 동작 수정
4. **프로덕션 배포**: CMS 서버 배포 후 설정 업데이트

## ❓ 문제해결

### CMS 연결 실패
- CMS 서버가 실행 중인지 확인
- 포트 번호 확인 (기본: 3004)
- 브라우저 개발자 도구에서 네트워크 오류 확인

### 데이터가 표시되지 않음
- CMS에서 콘텐츠가 "발행됨" 상태인지 확인
- 브라우저 캐시 초기화
- API 응답 확인

### 스타일 문제
- `css/misopin-cms.css` 파일 경로 확인
- 기존 CSS와의 충돌 확인
- 반응형 브레이크포인트 조정

---

이제 정적 사이트와 CMS가 완벽하게 연동됩니다! 🎉