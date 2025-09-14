# 📱 모바일 반응형 구현 가이드 (실전 코드)

## 🎯 즉시 적용 가능한 모바일 최적화 코드

### 1. 향상된 모바일 헤더 구현

```html
<!-- mobile-header.html -->
<header class="mobile-header" id="mobileHeader">
  <div class="mobile-header-inner">
    <!-- 로고 -->
    <div class="mobile-logo">
      <a href="/">
        <img src="img/misopin-logo.svg" alt="미소핀의원" height="40">
      </a>
    </div>

    <!-- 햄버거 메뉴 -->
    <button class="hamburger-menu" id="hamburgerMenu" aria-label="메뉴 열기">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- 빠른 연락 버튼 -->
    <a href="tel:02-1234-5678" class="mobile-quick-call" aria-label="전화 걸기">
      <i class="fas fa-phone"></i>
    </a>
  </div>

  <!-- 프로그레스 바 (스크롤 진행률) -->
  <div class="scroll-progress" id="scrollProgress"></div>
</header>

<!-- 모바일 슬라이드 메뉴 -->
<nav class="mobile-nav" id="mobileNav">
  <div class="mobile-nav-header">
    <h2>메뉴</h2>
    <button class="close-menu" id="closeMenu" aria-label="메뉴 닫기">
      <i class="fas fa-times"></i>
    </button>
  </div>

  <ul class="mobile-nav-list">
    <li class="has-submenu">
      <button class="nav-item-toggle">병원소개 <i class="fas fa-chevron-down"></i></button>
      <ul class="submenu">
        <li><a href="/about">인사말</a></li>
        <li><a href="/doctors">의료진 소개</a></li>
        <li><a href="/facilities">시설 안내</a></li>
        <li><a href="/directions">오시는 길</a></li>
      </ul>
    </li>
    <li class="has-submenu">
      <button class="nav-item-toggle">진료과목 <i class="fas fa-chevron-down"></i></button>
      <ul class="submenu">
        <li><a href="/treatments/botox">보톡스</a></li>
        <li><a href="/treatments/filler">필러</a></li>
        <li><a href="/treatments/lifting">리프팅</a></li>
        <li><a href="/treatments/skinbooster">스킨부스터</a></li>
      </ul>
    </li>
    <li><a href="/board-notice">공지사항</a></li>
    <li><a href="/board-event">이벤트</a></li>
    <li><a href="/calendar-page">예약</a></li>
  </ul>

  <!-- 모바일 메뉴 하단 정보 -->
  <div class="mobile-nav-footer">
    <div class="clinic-hours">
      <h3>진료시간</h3>
      <p>평일: 10:00 - 19:00</p>
      <p>토요일: 10:00 - 15:00</p>
      <p>일요일/공휴일: 휴진</p>
    </div>
    <div class="social-links">
      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="#" aria-label="Naver Blog"><i class="fas fa-blog"></i></a>
      <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
    </div>
  </div>
</nav>

<!-- 오버레이 -->
<div class="mobile-nav-overlay" id="navOverlay"></div>
```

### 2. 최적화된 모바일 CSS

```css
/* mobile-optimized.css */

/* ===== CSS 변수 정의 ===== */
:root {
  /* 색상 */
  --primary: #38b0c9;
  --primary-dark: #2a8599;
  --secondary: #ff506a;
  --text-dark: #222;
  --text-light: #777;
  --bg-light: #f8f9fa;
  --border: #e0e0e0;

  /* 크기 */
  --header-height: 60px;
  --bottom-nav-height: 60px;
  --border-radius: 8px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* 그림자 */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.16);
}

/* ===== 모바일 헤더 스타일 ===== */
.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: white;
  box-shadow: var(--shadow-sm);
  z-index: 1000;
  transition: var(--transition);
}

.mobile-header.scrolled {
  box-shadow: var(--shadow-md);
}

.mobile-header.hidden {
  transform: translateY(-100%);
}

.mobile-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px;
}

.mobile-logo img {
  height: 36px;
  width: auto;
}

/* 햄버거 메뉴 애니메이션 */
.hamburger-menu {
  position: relative;
  width: 28px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-menu span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--text-dark);
  border-radius: 2px;
  transition: var(--transition);
}

.hamburger-menu span:nth-child(1) {
  top: 0;
}

.hamburger-menu span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-menu span:nth-child(3) {
  bottom: 0;
}

.hamburger-menu.active span:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.hamburger-menu.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-menu.active span:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

/* 빠른 전화 버튼 */
.mobile-quick-call {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: var(--transition);
}

.mobile-quick-call:active {
  transform: scale(0.95);
  background: var(--primary-dark);
}

/* 스크롤 프로그레스 바 */
.scroll-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--primary);
  transition: width 0.1s linear;
  width: 0;
}

/* ===== 모바일 네비게이션 메뉴 ===== */
.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 85%;
  max-width: 320px;
  height: 100vh;
  background: white;
  z-index: 1002;
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-nav.active {
  right: 0;
  box-shadow: -4px 0 24px rgba(0,0,0,0.2);
}

.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--border);
}

.mobile-nav-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-dark);
}

.close-menu {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-light);
  cursor: pointer;
}

/* 모바일 메뉴 리스트 */
.mobile-nav-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.mobile-nav-list > li {
  border-bottom: 1px solid var(--border);
}

.mobile-nav-list a,
.nav-item-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  color: var(--text-dark);
  text-decoration: none;
  font-size: 16px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: var(--transition);
}

.mobile-nav-list a:active,
.nav-item-toggle:active {
  background: var(--bg-light);
}

.nav-item-toggle i {
  transition: transform 0.3s ease;
}

.nav-item-toggle.active i {
  transform: rotate(180deg);
}

/* 서브메뉴 */
.submenu {
  display: none;
  background: var(--bg-light);
  padding: 0;
  margin: 0;
  list-style: none;
}

.submenu.active {
  display: block;
}

.submenu a {
  padding-left: 40px;
  font-size: 15px;
  color: var(--text-light);
}

/* 모바일 메뉴 푸터 */
.mobile-nav-footer {
  padding: 20px;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.clinic-hours {
  margin-bottom: 20px;
}

.clinic-hours h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.clinic-hours p {
  font-size: 13px;
  color: var(--text-light);
  margin: 4px 0;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-links a {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);
  color: var(--text-light);
  border-radius: 50%;
  text-decoration: none;
  transition: var(--transition);
}

.social-links a:active {
  background: var(--primary);
  color: white;
  transform: scale(0.95);
}

/* 오버레이 */
.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* ===== 모바일 하단 네비게이션 ===== */
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--bottom-nav-height);
  background: white;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 999;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  padding-bottom: env(safe-area-inset-bottom);
}

.mobile-bottom-nav a {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-light);
  font-size: 11px;
  padding: 8px 4px;
  transition: var(--transition);
  position: relative;
}

.mobile-bottom-nav a.active {
  color: var(--primary);
}

.mobile-bottom-nav a.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: var(--primary);
  border-radius: 0 0 3px 3px;
}

.mobile-bottom-nav a i {
  font-size: 20px;
  margin-bottom: 4px;
}

/* 활성 상태 애니메이션 */
@keyframes bottomNavActive {
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

.mobile-bottom-nav a:active {
  animation: bottomNavActive 0.2s ease;
}

/* ===== 모바일 콘텐츠 조정 ===== */
@media (max-width: 768px) {
  body {
    padding-top: var(--header-height);
    padding-bottom: var(--bottom-nav-height);
  }

  /* 메인 콘텐츠 패딩 */
  .main-content {
    padding: 16px;
  }

  /* 섹션 간격 */
  section {
    padding: 40px 16px;
  }

  /* 타이틀 크기 조정 */
  h1 {
    font-size: 28px;
    line-height: 1.3;
  }

  h2 {
    font-size: 24px;
    line-height: 1.3;
  }

  h3 {
    font-size: 20px;
    line-height: 1.4;
  }

  /* 버튼 모바일 최적화 */
  .btn {
    min-height: 48px;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: var(--border-radius);
    width: 100%;
    max-width: none;
  }

  /* 카드 레이아웃 */
  .card-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* 이미지 반응형 */
  img {
    max-width: 100%;
    height: auto;
  }

  /* 테이블 모바일 최적화 */
  table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* 폼 요소 최적화 */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="password"],
  textarea,
  select {
    width: 100%;
    min-height: 48px;
    padding: 12px;
    font-size: 16px; /* iOS 줌 방지 */
    border: 1px solid var(--border);
    border-radius: var(--border-radius);
  }
}

/* ===== 터치 최적화 ===== */
@media (hover: none) and (pointer: coarse) {
  /* 터치 디바이스에서만 적용 */

  /* 터치 타겟 최소 크기 보장 */
  a, button, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }

  /* 호버 효과 제거 */
  a:hover, button:hover {
    background: inherit;
  }

  /* 탭 하이라이트 제거 */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  /* 스크롤 바운스 효과 (iOS) */
  .scroll-container {
    -webkit-overflow-scrolling: touch;
  }
}

/* ===== 가로 모드 대응 ===== */
@media (max-width: 768px) and (orientation: landscape) {
  .mobile-header {
    height: 50px;
  }

  .mobile-bottom-nav {
    height: 50px;
  }

  body {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  section {
    padding: 30px 16px;
  }
}

/* ===== 다크 모드 지원 ===== */
@media (prefers-color-scheme: dark) {
  :root {
    --text-dark: #f0f0f0;
    --text-light: #b0b0b0;
    --bg-light: #2a2a2a;
    --border: #404040;
  }

  .mobile-header,
  .mobile-nav,
  .mobile-bottom-nav {
    background: #1a1a1a;
  }

  .mobile-nav-overlay {
    background: rgba(0, 0, 0, 0.8);
  }
}

/* ===== 접근성 개선 ===== */
/* 포커스 스타일 */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* 스크린 리더 전용 텍스트 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 모션 감소 선호 사용자 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. 향상된 모바일 JavaScript

```javascript
// mobile-enhanced.js

class MobileEnhancement {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileDetection();
    this.setupHeader();
    this.setupNavigation();
    this.setupBottomNav();
    this.setupTouchGestures();
    this.setupLazyLoading();
    this.setupPerformanceOptimization();
  }

  // 모바일 감지
  setupMobileDetection() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    this.isAndroid = /Android/i.test(navigator.userAgent);

    // 디바이스 정보를 body에 클래스로 추가
    if (this.isMobile) document.body.classList.add('is-mobile');
    if (this.isIOS) document.body.classList.add('is-ios');
    if (this.isAndroid) document.body.classList.add('is-android');
  }

  // 헤더 스크롤 효과
  setupHeader() {
    const header = document.getElementById('mobileHeader');
    const scrollProgress = document.getElementById('scrollProgress');
    let lastScroll = 0;
    let ticking = false;

    const updateHeader = () => {
      const currentScroll = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (currentScroll / maxScroll) * 100;

      // 스크롤 프로그레스 업데이트
      if (scrollProgress) {
        scrollProgress.style.width = `${scrollPercent}%`;
      }

      // 헤더 숨김/표시
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }

      // 스크롤 상태 클래스
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  // 네비게이션 메뉴
  setupNavigation() {
    const hamburger = document.getElementById('hamburgerMenu');
    const nav = document.getElementById('mobileNav');
    const overlay = document.getElementById('navOverlay');
    const closeBtn = document.getElementById('closeMenu');
    const submenus = document.querySelectorAll('.nav-item-toggle');

    // 메뉴 열기/닫기
    const toggleMenu = (open) => {
      if (open) {
        hamburger?.classList.add('active');
        nav?.classList.add('active');
        overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        hamburger?.classList.remove('active');
        nav?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    hamburger?.addEventListener('click', () => toggleMenu(true));
    closeBtn?.addEventListener('click', () => toggleMenu(false));
    overlay?.addEventListener('click', () => toggleMenu(false));

    // 서브메뉴 토글
    submenus.forEach(button => {
      button.addEventListener('click', () => {
        const submenu = button.nextElementSibling;
        const isOpen = submenu.classList.contains('active');

        // 다른 서브메뉴 닫기
        document.querySelectorAll('.submenu.active').forEach(menu => {
          if (menu !== submenu) {
            menu.classList.remove('active');
            menu.previousElementSibling.classList.remove('active');
          }
        });

        // 현재 서브메뉴 토글
        if (isOpen) {
          submenu.classList.remove('active');
          button.classList.remove('active');
        } else {
          submenu.classList.add('active');
          button.classList.add('active');
        }
      });
    });

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav?.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }

  // 하단 네비게이션
  setupBottomNav() {
    const bottomNavLinks = document.querySelectorAll('.mobile-bottom-nav a');
    const currentPath = window.location.pathname;

    bottomNavLinks.forEach(link => {
      // 현재 페이지 표시
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }

      // 햅틱 피드백 (지원되는 경우)
      link.addEventListener('click', () => {
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      });
    });
  }

  // 터치 제스처
  setupTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const nav = document.getElementById('mobileNav');

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeX = touchEndX - touchStartX;
      const swipeY = touchEndY - touchStartY;

      // 수평 스와이프가 수직보다 큰 경우만 처리
      if (Math.abs(swipeX) > Math.abs(swipeY)) {
        // 왼쪽에서 오른쪽 스와이프 (메뉴 열기)
        if (swipeX > 100 && touchStartX < 50) {
          document.getElementById('hamburgerMenu')?.click();
        }

        // 오른쪽에서 왼쪽 스와이프 (메뉴 닫기)
        if (swipeX < -100 && nav?.classList.contains('active')) {
          document.getElementById('closeMenu')?.click();
        }
      }
    };

    // Pull to refresh
    let pullStart = 0;
    let pullMove = 0;

    document.addEventListener('touchstart', (e) => {
      if (window.scrollY === 0) {
        pullStart = e.touches[0].pageY;
      }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (pullStart > 0) {
        pullMove = e.touches[0].pageY - pullStart;

        if (pullMove > 0 && window.scrollY === 0) {
          // Pull to refresh 표시
          document.body.style.transform = `translateY(${Math.min(pullMove / 3, 100)}px)`;
        }
      }
    }, { passive: true });

    document.addEventListener('touchend', () => {
      if (pullMove > 150 && window.scrollY === 0) {
        // 새로고침 실행
        location.reload();
      } else {
        // 원위치
        document.body.style.transform = '';
      }

      pullStart = 0;
      pullMove = 0;
    }, { passive: true });
  }

  // Lazy Loading
  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;

            // 이미지 로드
            img.src = img.dataset.src;

            // srcset 처리
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }

            // 로드 완료 후 클래스 추가
            img.addEventListener('load', () => {
              img.classList.add('loaded');
            });

            // data 속성 제거
            delete img.dataset.src;
            delete img.dataset.srcset;

            // 옵저버 해제
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // 폴백: 모든 이미지 즉시 로드
      images.forEach(img => {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      });
    }
  }

  // 성능 최적화
  setupPerformanceOptimization() {
    // Passive event listeners
    const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'scroll'];
    passiveEvents.forEach(event => {
      document.addEventListener(event, () => {}, { passive: true });
    });

    // 디바운스된 리사이즈 핸들러
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // 리사이즈 완료 후 처리
        this.handleResize();
      }, 250);
    });

    // 입력 지연 최적화
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      let debounceTimer;

      input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          // 입력 처리
          this.handleInput(input);
        }, 300);
      });
    });

    // 불필요한 리플로우 방지
    const batchDOM = (callback) => {
      requestAnimationFrame(() => {
        callback();
      });
    };

    // 예시: DOM 업데이트 배치 처리
    window.batchDOM = batchDOM;
  }

  // 리사이즈 핸들러
  handleResize() {
    const width = window.innerWidth;

    // 태블릿/데스크톱으로 전환 시 모바일 메뉴 닫기
    if (width > 768) {
      document.getElementById('closeMenu')?.click();
    }

    // 뷰포트 높이 업데이트 (iOS 대응)
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // 입력 핸들러
  handleInput(input) {
    // 입력 검증 등
    console.log('Input changed:', input.value);
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  new MobileEnhancement();
});

// 서비스 워커 등록 (PWA)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => console.log('ServiceWorker registered'))
    .catch(error => console.log('ServiceWorker registration failed:', error));
}
```

### 4. GSAP 모바일 최적화

```javascript
// gsap-mobile-optimization.js

document.addEventListener('DOMContentLoaded', () => {
  // 모바일 체크
  const isMobile = window.innerWidth <= 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 모션 감소 선호 시 GSAP 비활성화
  if (prefersReducedMotion) {
    gsap.globalTimeline.pause();
    return;
  }

  // 모바일 최적화 설정
  if (isMobile) {
    // GPU 가속 강제
    gsap.config({
      force3D: true,
      nullTargetWarn: false
    });

    // 단순화된 히어로 애니메이션
    gsap.timeline()
      .from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
      .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .from('.hero-cta', {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.2');

    // 스크롤 트리거 최적화
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 40
    });

    // 요소 페이드인 (Intersection Observer 활용)
    const fadeElements = document.querySelectorAll('.fade-in');

    fadeElements.forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    // 카운터 애니메이션
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);

      gsap.from(counter, {
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          once: true
        },
        textContent: 0,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        onUpdate: function() {
          counter.textContent = Math.ceil(this.targets()[0].textContent);
        }
      });
    });

  } else {
    // 데스크톱에서는 기존 애니메이션 유지
    // 기존 GSAP 코드
  }

  // 성능 모니터링
  if (window.performance && window.performance.measure) {
    ScrollTrigger.addEventListener('refresh', () => {
      performance.mark('ScrollTrigger-refresh-end');
      performance.measure('ScrollTrigger-refresh', 'ScrollTrigger-refresh-start', 'ScrollTrigger-refresh-end');

      const measure = performance.getEntriesByName('ScrollTrigger-refresh')[0];
      if (measure && measure.duration > 100) {
        console.warn('ScrollTrigger refresh took', measure.duration, 'ms');
      }
    });
  }
});
```

### 5. 서비스 워커 (PWA)

```javascript
// sw.js - 서비스 워커

const CACHE_NAME = 'misopin-v1';
const urlsToCache = [
  '/',
  '/css/mobile-optimized.css',
  '/js/mobile-enhanced.js',
  '/img/misopin-logo.svg',
  '/offline.html'
];

// 설치
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 활성화
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 있으면 캐시 반환
        if (response) {
          return response;
        }

        // 네트워크 요청
        return fetch(event.request).then(response => {
          // 유효한 응답이 아니면 반환
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 응답 복제 (캐시 저장용)
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // 오프라인 페이지 반환
        return caches.match('/offline.html');
      })
  );
});
```

---

## 📱 즉시 적용 가능한 체크리스트

### 1단계: 기본 설정 (30분)
- [ ] 모든 HTML에 viewport 메타 태그 추가
- [ ] mobile-optimized.css 파일 생성 및 연결
- [ ] mobile-enhanced.js 파일 생성 및 연결

### 2단계: 헤더/네비게이션 (1시간)
- [ ] 모바일 헤더 HTML 구조 적용
- [ ] 햄버거 메뉴 구현
- [ ] 슬라이드 네비게이션 구현
- [ ] 터치 제스처 추가

### 3단계: 콘텐츠 최적화 (2시간)
- [ ] 이미지 lazy loading 적용
- [ ] 반응형 이미지 구현
- [ ] 폰트 크기 및 터치 타겟 조정
- [ ] 테이블 모바일 최적화

### 4단계: 성능 개선 (2시간)
- [ ] Critical CSS 인라인화
- [ ] JavaScript 번들 최적화
- [ ] 이미지 압축 및 WebP 변환
- [ ] 서비스 워커 구현

### 5단계: 테스트 및 검증 (1시간)
- [ ] 실제 디바이스 테스트
- [ ] Lighthouse 성능 측정
- [ ] 크로스 브라우저 테스트
- [ ] 접근성 검사

---

## 🎯 예상 결과

이 가이드를 따라 구현하면:
- **모바일 성능 점수**: 90점 이상
- **접근성 점수**: 95점 이상
- **SEO 점수**: 100점
- **베스트 프랙티스**: 95점 이상

완전한 모바일 최적화된 웹사이트로 전환됩니다!

---

*작성일: 2024년 9월 14일*
*버전: 1.0.0*