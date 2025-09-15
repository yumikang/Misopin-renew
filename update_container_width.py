#!/usr/bin/env python3
import os
import re
import glob

# dist 폴더의 모든 HTML 파일 찾기
dist_files = glob.glob('/Users/dongeuncheon/Downloads/blee-project/Misopin-renew/dist/*.html')

updated_count = 0
for file_path in dist_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 원본 내용 저장
    original_content = content

    # treatment-container의 max-width를 1450px로 변경
    # 여러 패턴 처리
    patterns = [
        # 인라인 스타일에서 max-width: 1200px
        (r'\.treatment-container\s*{\s*max-width:\s*1200px', '.treatment-container {\n        max-width: 1450px'),
        # 다른 형식들
        (r'\.treatment-container\s*{\s*max-width:\s*\d+px', '.treatment-container {\n        max-width: 1450px'),
        # container 클래스도 확인
        (r'\.container\s*{\s*max-width:\s*1200px', '.container {\n        max-width: 1450px'),
    ]

    for pattern, replacement in patterns:
        content = re.sub(pattern, replacement, content)

    # 변경사항이 있으면 파일 저장
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {os.path.basename(file_path)}")
        updated_count += 1
    else:
        print(f"No changes needed: {os.path.basename(file_path)}")

print(f"\n총 {updated_count}개 파일 업데이트 완료")