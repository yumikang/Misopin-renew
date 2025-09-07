#!/usr/bin/env python3
import os
import glob

# 블로그 상세 페이지 파일들 찾기
blog_files = glob.glob('/Users/dongeuncheon/blee_project/Misopin/blog-details-*.html')

for file_path in blog_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 하위메뉴 호버 효과를 간단히 색상 변경만 하도록 수정
    old_hover = """.sub-menu li a:hover,
.sub-menu li a:focus {
    color: #97b3d8 !important;
    -webkit-text-fill-color: #97b3d8 !important;
    background-color: transparent !important;
    text-decoration: none !important;
    outline: none !important;
}"""
    
    # 배경색 변경과 패딩 효과 제거, 색상만 변경
    new_hover = """.sub-menu li a:hover,
.sub-menu li a:focus {
    color: #97b3d8 !important;
    -webkit-text-fill-color: #97b3d8 !important;
    background-color: transparent !important;
    text-decoration: none !important;
    outline: none !important;
    padding-left: 1rem !important;  /* 패딩 유지 (변경 없음) */
}"""
    
    if old_hover in content:
        content = content.replace(old_hover, new_hover)
        
        # 파일 저장
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated: {os.path.basename(file_path)}")
    else:
        print(f"Style not found in: {os.path.basename(file_path)}")