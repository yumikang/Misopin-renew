#!/usr/bin/env python3
import os
import glob

# 블로그 상세 페이지 파일들 찾기
blog_files = glob.glob('/Users/dongeuncheon/blee_project/Misopin/blog-details-*.html')

for file_path in blog_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 드롭다운 화살표 CSS 제거
    arrow_css = """/* 드롭다운 화살표 표시 */
.has-sub > a::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.5rem;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid currentColor;
    transition: transform 0.2s ease;
}

.has-sub:hover > a::after {
    transform: rotate(180deg);
}"""
    
    # 화살표 CSS를 주석 처리
    commented_css = """/* 드롭다운 화살표 표시 - 제거됨
.has-sub > a::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.5rem;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid currentColor;
    transition: transform 0.2s ease;
}

.has-sub:hover > a::after {
    transform: rotate(180deg);
}
*/"""
    
    if arrow_css in content:
        new_content = content.replace(arrow_css, commented_css)
        
        # 파일 저장
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated: {os.path.basename(file_path)}")
    else:
        print(f"Arrow CSS not found in: {os.path.basename(file_path)}")