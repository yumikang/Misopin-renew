#!/usr/bin/env python3
import os
import glob

# 블로그 상세 페이지 파일들 찾기
blog_files = glob.glob('/Users/dongeuncheon/blee_project/Misopin/blog-details-*.html')

for file_path in blog_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. 메인 네비게이션 메뉴 폰트 두께 변경 (600 -> 400)
    old_main_menu = """    font-size: 17px !important;  /* 16px -> 17px로 증가 */
    font-weight: 400 !important;  /* 500 -> 400으로 변경 */"""
    
    new_main_menu = """    font-size: 17px !important;  /* 16px -> 17px로 증가 */
    font-weight: 400 !important;  /* 메인 메뉴 폰트 두께 400 */"""
    
    # 2. 하위메뉴 호버 효과에서 font-weight 제거
    old_hover = """    color: #97b3d8 !important;
    -webkit-text-fill-color: #97b3d8 !important;
    background-color: transparent !important;
    text-decoration: none !important;
    font-weight: 800 !important;
    outline: none !important;"""
    
    new_hover = """    color: #97b3d8 !important;
    -webkit-text-fill-color: #97b3d8 !important;
    background-color: transparent !important;
    text-decoration: none !important;
    outline: none !important;"""
    
    # 변경 적용
    modified = False
    
    if old_main_menu in content:
        content = content.replace(old_main_menu, new_main_menu)
        modified = True
    
    if old_hover in content:
        content = content.replace(old_hover, new_hover)
        modified = True
    
    if modified:
        # 파일 저장
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {os.path.basename(file_path)}")
    else:
        print(f"No changes needed in: {os.path.basename(file_path)}")