#!/usr/bin/env python3
import re

# 모든 블로그 상세 페이지 파일 목록
blog_files = [
    'blog-details-1.html',
    'blog-details-2.html', 
    'blog-details-3.html',
    'blog-details-4.html',
    'blog-details-5.html',
    'blog-details-6.html',
    'blog-details-7.html'
]

# 궁극의 CSS - 모든 가능한 호버 효과 제거 및 높은 특이도
ultimate_css = """
/* ===== 하위메뉴 호버 효과 완전 제거 - 궁극의 버전 ===== */

/* 1. 모든 가능한 선택자로 밑줄/테두리 제거 */
body .main_menu .sub-menu li a,
body .main_menu .sub-menu li a:link,
body .main_menu .sub-menu li a:visited,
body .main_menu .sub-menu li a:hover,
body .main_menu .sub-menu li a:focus,
body .main_menu .sub-menu li a:active,
body #header .main_menu .sub-menu li a,
body #header .main_menu .sub-menu li a:hover,
body .header .main_menu .sub-menu li a,
body .header .main_menu .sub-menu li a:hover,
body div.main_menu ul.sub-menu li a,
body div.main_menu ul.sub-menu li a:hover {
    text-decoration: none !important;
    text-decoration-line: none !important;
    text-decoration-style: initial !important;
    text-decoration-color: transparent !important;
    text-decoration-thickness: 0 !important;
    text-underline-offset: 0 !important;
    text-underline-position: unset !important;
    border: 0 !important;
    border-bottom: 0 !important;
    border-bottom-width: 0 !important;
    border-bottom-style: none !important;
    border-bottom-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
    text-shadow: none !important;
}

/* 2. ::before와 ::after 의사 요소 완전 제거 */
body .main_menu .sub-menu li a::before,
body .main_menu .sub-menu li a::after,
body .main_menu .sub-menu li a:hover::before,
body .main_menu .sub-menu li a:hover::after,
body #header .main_menu .sub-menu li a::before,
body #header .main_menu .sub-menu li a::after,
body #header .main_menu .sub-menu li a:hover::before,
body #header .main_menu .sub-menu li a:hover::after {
    display: none !important;
    content: none !important;
    visibility: hidden !important;
    width: 0 !important;
    height: 0 !important;
    opacity: 0 !important;
    border: none !important;
    background: none !important;
}

/* 3. 링크 스타일 초기화 및 호버 색상만 변경 */
body .main_menu .sub-menu li a {
    position: relative !important;
    display: flex !important;
    align-items: center !important;
    padding: 0.6rem 1rem !important;
    margin: 2px !important;
    font-size: 17px !important;
    font-weight: 400 !important;
    line-height: 1.25 !important;
    color: var(--foreground, #2a2a2a) !important;
    -webkit-text-fill-color: var(--foreground, #2a2a2a) !important;
    background: transparent !important;
    background-color: transparent !important;
    border-radius: calc(var(--radius, 0.5rem) - 2px) !important;
    transition: color 0.15s ease !important;
    cursor: pointer !important;
}

/* 4. 호버 시 색상만 변경 */
body .main_menu .sub-menu li a:hover,
body .main_menu .sub-menu li a:focus,
body #header .main_menu .sub-menu li a:hover,
body #header .main_menu .sub-menu li a:focus {
    color: #97b3d8 !important;
    -webkit-text-fill-color: #97b3d8 !important;
    background: transparent !important;
    background-color: transparent !important;
    text-decoration: none !important;
    border: none !important;
    border-bottom: none !important;
    outline: none !important;
    box-shadow: none !important;
    text-shadow: none !important;
}

/* 5. 부모 요소를 통한 제거 */
body .main_menu .sub-menu li:hover a,
body #header .main_menu .sub-menu li:hover a {
    text-decoration: none !important;
    border-bottom: none !important;
}

/* 6. 링크의 모든 상태에서 밑줄 제거 */
body .main_menu .sub-menu a,
body .main_menu .sub-menu a:any-link,
body #header .main_menu .sub-menu a,
body #header .main_menu .sub-menu a:any-link {
    text-decoration: none !important;
    border-bottom: none !important;
}

/* 7. 더 높은 특이도로 오버라이드 */
body#body .main_menu .sub-menu li a,
body#body .main_menu .sub-menu li a:hover,
html body .main_menu .sub-menu li a,
html body .main_menu .sub-menu li a:hover {
    text-decoration: none !important;
    border-bottom: 0 none transparent !important;
}

/* 8. !important로 모든 텍스트 장식 관련 속성 재정의 */
.main_menu .has-sub .sub-menu li a,
.main_menu .has-sub .sub-menu li a:hover,
.main_menu .has-sub .sub-menu li a:focus,
.main_menu .has-sub .sub-menu li a:active {
    text-decoration: none !important;
    text-decoration-line: none !important;
    text-decoration-color: transparent !important;
    text-decoration-style: none !important;
    text-decoration-thickness: 0 !important;
    -webkit-text-decoration: none !important;
    -moz-text-decoration: none !important;
}

/* 9. 인라인 스타일 수준의 특이도 */
.main_menu .sub-menu li a[href],
.main_menu .sub-menu li a[href]:hover {
    text-decoration: none !important;
    border-bottom: 0 !important;
}

/* 10. 미디어 쿼리를 통한 추가 오버라이드 */
@media all {
    body .main_menu .sub-menu li a,
    body .main_menu .sub-menu li a:hover {
        text-decoration: none !important;
        border-bottom: none !important;
    }
}
"""

def update_blog_file(filename):
    try:
        # 파일 읽기
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 이전에 추가한 CSS 제거 (있다면)
        patterns_to_remove = [
            r'/\* 하위메뉴 호버 효과 완전 제거.*?\*/',
            r'/\* ===== 하위메뉴 호버 효과 완전 제거.*?@media all \{[^}]*\}\s*\}\s*',
        ]
        
        for pattern in patterns_to_remove:
            content = re.sub(pattern, '', content, flags=re.DOTALL)
        
        # </style> 태그 찾기
        style_close_pattern = r'</style>'
        
        if style_close_pattern in content:
            # 마지막 </style> 태그 찾기
            last_style_pos = content.rfind('</style>')
            if last_style_pos != -1:
                # 궁극의 CSS 추가
                new_content = content[:last_style_pos] + ultimate_css + content[last_style_pos:]
                
                # 파일 저장
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                print(f"✅ {filename} 업데이트 완료")
                return True
            else:
                print(f"⚠️ {filename}에서 </style> 태그를 찾을 수 없음")
                return False
        else:
            print(f"⚠️ {filename}에서 style 태그를 찾을 수 없음")
            return False
    
    except Exception as e:
        print(f"❌ {filename} 처리 중 오류: {e}")
        return False

# 모든 파일 업데이트
print("🔧 하위메뉴 호버 효과 궁극의 제거 시작...")
print("=" * 50)

success_count = 0
for file in blog_files:
    if update_blog_file(file):
        success_count += 1

print("=" * 50)
print(f"✨ 작업 완료: {success_count}/{len(blog_files)} 파일 업데이트됨")
print("\n💡 팁: 브라우저 캐시를 지우고 새로고침(Ctrl+F5)하세요!")