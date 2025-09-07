#!/usr/bin/env python3
import os
import glob

# 블로그 상세 페이지 파일들 찾기
blog_files = glob.glob('/Users/dongeuncheon/blee_project/Misopin/blog-details-*.html')

for file_path in blog_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 서브메뉴 스타일 찾아서 교체
    old_style = """    font-size: 20px !important;
    font-weight: 700 !important;"""
    
    new_style = """    font-size: 17px !important;
    font-weight: 400 !important;"""
    
    if old_style in content:
        new_content = content.replace(old_style, new_style)
        
        # 파일 저장
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated: {os.path.basename(file_path)}")
    else:
        print(f"Style not found in: {os.path.basename(file_path)}")