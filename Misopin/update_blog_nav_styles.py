#!/usr/bin/env python3
import os
import glob

# 업데이트된 네비게이션 스타일
updated_nav_styles = """/* 인덱스 페이지와 동일한 네비게이션 스타일 */

/* 헤더 배경 스타일 - 인덱스와 동일 */
#header {
    background: #fff !important;
    border-bottom: 1px solid #e5e5e5 !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05) !important;
}

/* header_b 클래스 오버라이드 - 블로그 상세 페이지용 */
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
    font-size: 17px !important;  /* 16px -> 17px로 증가 */
    font-weight: 400 !important;  /* 500 -> 400으로 변경 */
    text-decoration: none !important;
    transition: color 0.3s ease !important;
    opacity: 1 !important;
    background: none !important;
    mix-blend-mode: normal !important;
    filter: none !important;
    display: block !important;
    padding: 14px 22px !important;  /* 패딩 추가로 클릭 영역 확대 */
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
    filter: brightness(0) saturate(100%) !important;  /* SVG를 검은색으로 변환 */
    -webkit-filter: brightness(0) saturate(100%) !important;
}

/* 상담예약 버튼 스타일 - 인덱스와 동일 */
.book_a_treatment .bat_lnk {
    background: #333 !important;
    color: #fff !important;
    padding: 10px 24px !important;
    border-radius: 25px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    text-decoration: none !important;
    display: inline-block !important;
    transition: background 0.3s ease !important;
}

.book_a_treatment .bat_lnk:hover {
    background: #555 !important;
    color: #fff !important;
}

/* 버거 버튼 색상 - 인덱스와 동일 */
.burger_btn span, 
.burger_btn span:before, 
.burger_btn span:after {
    background: #2a2a2a !important;
}"""

# 블로그 상세 페이지 파일들 찾기
blog_files = glob.glob('/Users/dongeuncheon/blee_project/Misopin/blog-details-*.html')

for file_path in blog_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 기존 네비게이션 스타일 섹션 찾아서 교체
    start_marker = '/* 인덱스 페이지와 동일한 네비게이션 스타일 */'
    end_marker = '/* 사이드 메뉴 드롭다운 스타일 */'
    
    if start_marker in content and end_marker in content:
        # 시작과 끝 위치 찾기
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        
        # 기존 스타일 섹션을 새로운 스타일로 교체
        new_content = content[:start_idx] + updated_nav_styles + '\n\n' + content[end_idx:]
        
        # 파일 저장
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated: {os.path.basename(file_path)}")
    else:
        print(f"Markers not found in: {os.path.basename(file_path)}")