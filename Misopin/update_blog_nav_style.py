#!/usr/bin/env python3
import re

# mi_about.html과 동일한 네비게이션 스타일
nav_styles = """
/* 인덱스 페이지와 동일한 네비게이션 스타일 */

/* 헤더 배경 스타일 - 인덱스와 동일 */
#header {
    background: #fff !important;
    border-bottom: 1px solid #e5e5e5 !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05) !important;
}

/* header_b 클래스 오버라이드 - 블로그 페이지용 */
#header.header_b {
    background: #fff !important;
    border-bottom: 1px solid #e5e5e5 !important;
}

/* 헤더 높이 증가 */
#header .header_in {
    padding-top: 28px !important;
    padding-bottom: 28px !important;
}

/* 메뉴 리스트 스타일 - 인덱스와 동일 */
.menu_list {
    display: flex;
    gap: 40px;
    align-items: center;
}

.menu_list li {
    list-style: none;
    position: relative;
}

/* 메뉴 링크 기본 스타일 - 폰트 크기 증가 */
.menu_list li a,
.menu_list li a:link,
.menu_list li a:visited {
    color: #2a2a2a !important;
    -webkit-text-fill-color: #2a2a2a !important;
    font-size: 17px !important;
    font-weight: 400 !important;
    text-decoration: none !important;
    transition: color 0.3s ease !important;
    opacity: 1 !important;
    background: none !important;
    mix-blend-mode: normal !important;
    filter: none !important;
    display: block !important;
    padding: 14px 22px !important;
    line-height: 1 !important;
}

/* 메뉴 호버 스타일 */
.menu_list li a:hover,
.menu_list li a:active {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
    opacity: 1 !important;
}

/* 로고를 검은색으로 변경 */
.header .logo img,
#header .logo img {
    filter: brightness(0) saturate(100%) !important;
    -webkit-filter: brightness(0) saturate(100%) !important;
}

/* 버거 버튼 색상 - 인덱스와 동일 */
.burger_btn span, 
.burger_btn span:before, 
.burger_btn span:after {
    background: #2a2a2a !important;
}

/* 호버 영역 확장을 위한 가상 요소 */
.has-sub::before {
    content: '';
    position: absolute;
    top: 100%;
    left: -20px;
    right: -20px;
    height: 20px;
    z-index: 999;
}

.sub-menu {
    position: absolute !important;
    top: calc(100% + 0.2rem) !important;
    left: 50% !important;
    transform: translateX(-50%) translateY(-8px) !important;
    min-width: 200px !important;
    background: var(--popover) !important;
    border: 1px solid var(--border) !important;
    border-radius: var(--radius) !important;
    padding: 10px !important;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
    z-index: 1000 !important;
}

.has-sub:hover .sub-menu {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateX(-50%) translateY(0) !important;
}

/* shadcn/ui 스타일 서브메뉴 아이템 */
.sub-menu li {
    margin: 0 !important;
    padding: 0 !important;
}

.sub-menu li a,
.sub-menu li a:link,
.sub-menu li a:visited {
    color: var(--foreground) !important;
    -webkit-text-fill-color: var(--foreground) !important;
    display: flex !important;
    align-items: center !important;
    padding: 0.6rem 1rem !important;
    text-decoration: none !important;
    border-radius: calc(var(--radius) - 2px) !important;
    margin: 2px !important;
    font-size: 17px !important;
    font-weight: 400 !important;
    line-height: 1.25 !important;
    transition: all 0.15s ease !important;
    cursor: pointer !important;
    position: relative !important;
}

.sub-menu li a:hover,
.sub-menu li a:focus {
    color: #97b3d8 !important;
    -webkit-text-fill-color: #97b3d8 !important;
    background-color: transparent !important;
    text-decoration: none !important;
    outline: none !important;
    padding-left: 1rem !important;
}

.sub-menu li a:active {
    background-color: transparent !important;
    transform: scale(0.98) !important;
}

/* 부드러운 진입 애니메이션 */
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-8px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
    }
}

.has-sub:hover .sub-menu {
    animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* 하위메뉴 호버 효과 완전 제거 */
body .main_menu .sub-menu li a,
body .main_menu .sub-menu li a:hover {
    text-decoration: none !important;
    border-bottom: none !important;
}

/* 모든 pseudo-element 제거 */
.sub-menu li a::before,
.sub-menu li a::after,
.main_menu .sub-menu li a::before,
.main_menu .sub-menu li a::after {
    display: none !important;
    content: none !important;
}
"""

def update_blog_navigation():
    """blog.html의 네비게이션 스타일 업데이트"""
    
    try:
        # blog.html 파일 읽기
        with open('blog.html', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # </style> 태그 찾기 - 첫 번째 스타일 섹션에 추가
        style_end_pos = content.find('</style>')
        
        if style_end_pos != -1:
            # 이미 네비게이션 스타일이 있는지 확인
            if "인덱스 페이지와 동일한 네비게이션 스타일" not in content[:style_end_pos]:
                # 스타일 추가
                new_content = content[:style_end_pos] + "\n" + nav_styles + "\n" + content[style_end_pos:]
                
                # 파일 저장
                with open('blog.html', 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                print("✅ blog.html 네비게이션 스타일 업데이트 완료")
                print("  - 헤더 배경: 흰색, 테두리 추가")
                print("  - 로고: 검은색으로 변경")
                print("  - 메뉴 폰트: 17px, 400 weight")
                print("  - 드롭다운: shadcn/ui 스타일")
                print("  - 하위메뉴 호버: 색상만 변경 (밑줄 제거)")
            else:
                print("ℹ️ blog.html에 이미 네비게이션 스타일이 적용되어 있습니다.")
        else:
            print("⚠️ blog.html에서 </style> 태그를 찾을 수 없습니다.")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        return False

# 실행
if __name__ == "__main__":
    print("🔧 blog.html 네비게이션 스타일 업데이트 시작...")
    print("=" * 50)
    
    if update_blog_navigation():
        print("\n✨ 작업 완료!")
        print("\n📝 적용된 스타일:")
        print("  - mi_about.html과 동일한 네비게이션 스타일")
        print("  - shadcn/ui 드롭다운 메뉴")
        print("  - 통일된 폰트 크기와 색상")
    else:
        print("\n❌ 작업 실패")