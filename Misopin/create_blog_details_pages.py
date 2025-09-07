#!/usr/bin/env python3
import shutil
import re

# 페이지 정보 정의
pages = {
    8: {
        'title': '점',
        'subtitle': '깨끗하고 매끈한 피부',
        'category': '제거시술'
    },
    9: {
        'title': '비립종',
        'subtitle': '작은 좁쌀 여드름 제거',
        'category': '제거시술'
    },
    10: {
        'title': '문신제거',
        'subtitle': '깨끗한 피부로 새출발',
        'category': '제거시술'
    },
    11: {
        'title': '제모',
        'subtitle': '매끈하고 깨끗한 피부',
        'category': '바디케어'
    },
    12: {
        'title': '다이어트',
        'subtitle': '건강한 체형 관리',
        'category': '바디케어'
    }
}

def create_blog_detail_page(page_num, page_info):
    """blog-details-7.html을 복제하여 새로운 페이지 생성"""
    
    # HTML 파일 읽기
    with open('blog-details-7.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 제목 변경
    content = re.sub(
        r'<title>미소핀의원 : The best luxury CLINIC 시술소개 - 필링</title>',
        f'<title>미소핀의원 : The best luxury CLINIC 시술소개 - {page_info["title"]}</title>',
        content
    )
    
    # CSS 파일 링크 변경
    content = re.sub(
        r'<link rel="stylesheet" href="blog-details-7-custom\.css">',
        f'<link rel="stylesheet" href="blog-details-{page_num}-custom.css">',
        content
    )
    
    # 메인 타이틀 변경 (j_ttl_s 섹션)
    content = re.sub(
        r'<div class="h3 t_split">필링<span class="br">각질 제거와 피부 재생을 위한 전문 케어</span></div>',
        f'<div class="h3 t_split">{page_info["title"]}<span class="br">{page_info["subtitle"]}</span></div>',
        content
    )
    
    # 배경 이미지 경로 변경 (선택적 - 나중에 각 페이지별 이미지로 교체 가능)
    # 현재는 그대로 두되, 나중에 각 페이지별 이미지가 준비되면 변경
    
    # 새 HTML 파일 저장
    output_filename = f'blog-details-{page_num}.html'
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {output_filename} 생성 완료")
    
    # CSS 파일 복사
    css_source = 'blog-details-7-custom.css'
    css_dest = f'blog-details-{page_num}-custom.css'
    
    # CSS 파일 읽기
    with open(css_source, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # CSS 파일 저장 (현재는 동일한 내용, 나중에 각 페이지별로 수정 가능)
    with open(css_dest, 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    print(f"✅ {css_dest} 생성 완료")

# 모든 페이지 생성
print("🔧 블로그 상세 페이지 생성 시작...")
print("=" * 50)

for page_num, page_info in pages.items():
    print(f"\n📄 페이지 {page_num} 생성 중...")
    create_blog_detail_page(page_num, page_info)

print("\n" + "=" * 50)
print("✨ 모든 페이지 생성 완료!")
print("\n📝 생성된 페이지:")
for page_num, page_info in pages.items():
    print(f"  - blog-details-{page_num}.html: {page_info['category']} > {page_info['title']}")
    print(f"  - blog-details-{page_num}-custom.css")