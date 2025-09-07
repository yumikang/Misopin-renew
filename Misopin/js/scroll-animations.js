/* ========================================
   고성능 스크롤 애니메이션 시스템
   생성일: 2025-09-06
   목적: 60fps 부드러운 스크롤 효과
   ======================================== */

(function() {
    'use strict';
    
    // 성능 최적화를 위한 변수
    let ticking = false;
    let lastScrollY = 0;
    let scrollDirection = 'up';
    
    // DOM 요소 캐싱
    const header = document.querySelector('.header-area-2, #header');
    const body = document.body;
    
    // 스크롤 진행률 바 생성
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // ========================================
    // 헤더 스크롤 애니메이션
    // ========================================
    function updateHeader() {
        const scrollY = window.scrollY;
        const scrollPercent = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // 스크롤 진행률 업데이트
        progressBar.style.width = scrollPercent + '%';
        
        // 스크롤 방향 감지
        if (scrollY > lastScrollY && scrollY > 100) {
            scrollDirection = 'down';
        } else if (scrollY < lastScrollY) {
            scrollDirection = 'up';
        }
        
        // 헤더 상태 업데이트
        if (scrollY > 80) {
            header.classList.add('scrolled');
            
            // 스크롤 다운 시 헤더 숨기기 (옵션)
            if (scrollDirection === 'down' && scrollY > 300) {
                header.classList.add('hide-header');
                header.classList.remove('show-header');
            } else {
                header.classList.remove('hide-header');
                header.classList.add('show-header');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('hide-header');
            header.classList.add('show-header');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    // requestAnimationFrame을 사용한 성능 최적화
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    // ========================================
    // Intersection Observer - 요소 등장 애니메이션
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // 순차적 애니메이션을 위한 지연
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.animationDelay = delay + 'ms';
                
                // 한 번만 실행되도록 관찰 중지
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // ========================================
    // 애니메이션 CSS 동적 삽입
    // ========================================
    function injectAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Fade In 애니메이션 */
            .fade-in-up {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .fade-in-up.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            /* Slide In 애니메이션 */
            .slide-in-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .slide-in-left.animate-in {
                opacity: 1;
                transform: translateX(0);
            }
            
            .slide-in-right {
                opacity: 0;
                transform: translateX(50px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .slide-in-right.animate-in {
                opacity: 1;
                transform: translateX(0);
            }
            
            /* Scale In 애니메이션 */
            .scale-in {
                opacity: 0;
                transform: scale(0.9);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .scale-in.animate-in {
                opacity: 1;
                transform: scale(1);
            }
            
            /* Parallax 효과 */
            .parallax {
                transition: transform 0.1s linear;
                will-change: transform;
            }
            
            /* 모바일 최적화 */
            @media (max-width: 768px) {
                .fade-in-up,
                .slide-in-left,
                .slide-in-right,
                .scale-in {
                    transition-duration: 0.5s;
                }
            }
            
            /* 성능 모드 */
            @media (prefers-reduced-motion: reduce) {
                .fade-in-up,
                .slide-in-left,
                .slide-in-right,
                .scale-in,
                .parallax {
                    transition: none !important;
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========================================
    // Parallax 효과
    // ========================================
    let parallaxElements = [];
    
    function updateParallax() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // ========================================
    // 애니메이션 요소 자동 감지 및 클래스 추가
    // ========================================
    function prepareAnimationElements() {
        // 섹션별로 애니메이션 클래스 자동 추가
        const sections = document.querySelectorAll('section, .section, .container');
        sections.forEach((section, index) => {
            if (!section.classList.contains('fade-in-up') && 
                !section.classList.contains('slide-in-left') && 
                !section.classList.contains('slide-in-right')) {
                section.classList.add('fade-in-up');
                section.dataset.delay = index * 100; // 순차적 지연
            }
        });
        
        // 이미지에 scale-in 효과
        const images = document.querySelectorAll('img:not(.logo img)');
        images.forEach((img, index) => {
            img.classList.add('scale-in');
            img.dataset.delay = index * 50;
        });
        
        // 텍스트 요소에 fade-in-up 효과
        const textElements = document.querySelectorAll('h1, h2, h3, p');
        textElements.forEach((element, index) => {
            if (!element.closest('.header')) { // 헤더 내부 요소 제외
                element.classList.add('fade-in-up');
                element.dataset.delay = index * 30;
            }
        });
        
        // Parallax 요소 찾기
        parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            element.classList.add('parallax');
        });
    }
    
    // ========================================
    // 애니메이션 요소 관찰 시작
    // ========================================
    function startObserving() {
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .slide-in-left, .slide-in-right, .scale-in'
        );
        
        animatedElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }
    
    // ========================================
    // 초기화
    // ========================================
    function init() {
        // 애니메이션 스타일 삽입
        injectAnimationStyles();
        
        // 애니메이션 요소 준비
        prepareAnimationElements();
        
        // 관찰 시작
        startObserving();
        
        // 이벤트 리스너
        window.addEventListener('scroll', () => {
            requestTick();
            
            // Parallax 업데이트 (throttled)
            if (parallaxElements.length > 0) {
                requestAnimationFrame(updateParallax);
            }
        }, { passive: true });
        
        // 초기 상태 설정
        updateHeader();
        
        console.log('✨ 스크롤 애니메이션 시스템 활성화');
    }
    
    // DOM 로드 완료 시 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // ========================================
    // 퍼블릭 API (디버깅용)
    // ========================================
    window.ScrollAnimations = {
        refresh: function() {
            prepareAnimationElements();
            startObserving();
        },
        disable: function() {
            document.querySelectorAll('.animate-in').forEach(el => {
                el.classList.remove('animate-in');
            });
        },
        enable: init
    };
})();