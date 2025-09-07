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

# 추가할 CSS - 모든 가능한 호버 효과 제거
additional_css = """
/* 하위메뉴 호버 효과 완전 제거 - 최종 버전 */
.sub-menu li a::before,
.sub-menu li a::after,
.main_menu .sub-menu li a::before,
.main_menu .sub-menu li a::after {
    display: none !important;
    content: none !important;
}

.sub-menu li a,
.main_menu .sub-menu li a {
    position: relative !important;
    text-decoration: none !important;
    border: none !important;
    border-bottom: none !important;
    box-shadow: none !important;
    text-shadow: none !important;
}

.sub-menu li a:hover,
.sub-menu li a:focus,
.sub-menu li a:active,
.main_menu .sub-menu li a:hover,
.main_menu .sub-menu li a:focus,
.main_menu .sub-menu li a:active {
    color: #97b3d8 !important;
    -webkit-text-fill-color: #97b3d8 !important;
    background: transparent !important;
    background-color: transparent !important;
    text-decoration: none !important;
    border: none !important;
    border-bottom: none !important;
    box-shadow: none !important;
    text-shadow: none !important;
    outline: none !important;
    padding-left: 1rem !important;
}

/* 모든 pseudo-element 제거 */
.sub-menu li:hover a::before,
.sub-menu li:hover a::after,
.main_menu .sub-menu li:hover a::before,
.main_menu .sub-menu li:hover a::after {
    display: none !important;
    content: none !important;
    width: 0 !important;
    height: 0 !important;
}

/* text-decoration 관련 모든 속성 제거 */
.sub-menu li a,
.sub-menu li a:hover,
.main_menu .sub-menu li a,
.main_menu .sub-menu li a:hover {
    text-decoration: none !important;
    text-decoration-line: none !important;
    text-decoration-style: none !important;
    text-decoration-color: transparent !important;
    text-underline-offset: 0 !important;
    text-underline-position: none !important;
}

/* 링크 밑줄 관련 모든 가능한 속성 제거 */
.sub-menu a,
.sub-menu a:link,
.sub-menu a:visited,
.sub-menu a:hover,
.sub-menu a:active,
.main_menu .sub-menu a,
.main_menu .sub-menu a:link,
.main_menu .sub-menu a:visited,
.main_menu .sub-menu a:hover,
.main_menu .sub-menu a:active {
    text-decoration: none !important;
    border-bottom: 0 !important;
    border-bottom-width: 0 !important;
    border-bottom-style: none !important;
    border-bottom-color: transparent !important;
}
"""

def update_blog_file(filename):
    try:
        # 파일 읽기
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # </style> 태그 찾기
        style_close_pattern = r'</style>'
        
        # 마지막 </style> 태그 직전에 CSS 추가
        if style_close_pattern in content:
            # 이미 추가된 CSS가 있는지 확인
            if "하위메뉴 호버 효과 완전 제거 - 최종 버전" not in content:
                # 마지막 </style> 태그 찾기
                last_style_pos = content.rfind('</style>')
                if last_style_pos != -1:
                    # CSS 추가
                    new_content = content[:last_style_pos] + additional_css + content[last_style_pos:]
                    
                    # 파일 저장
                    with open(filename, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    print(f"✅ {filename} 업데이트 완료")
                    return True
                else:
                    print(f"⚠️ {filename}에서 </style> 태그를 찾을 수 없음")
                    return False
            else:
                print(f"ℹ️ {filename}는 이미 업데이트됨")
                return True
        else:
            print(f"⚠️ {filename}에서 style 태그를 찾을 수 없음")
            return False
    
    except Exception as e:
        print(f"❌ {filename} 처리 중 오류: {e}")
        return False

# 모든 파일 업데이트
print("🔧 하위메뉴 호버 효과 완전 제거 시작...")
print("=" * 50)

success_count = 0
for file in blog_files:
    if update_blog_file(file):
        success_count += 1

print("=" * 50)
print(f"✨ 작업 완료: {success_count}/{len(blog_files)} 파일 업데이트됨")