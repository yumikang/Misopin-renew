#!/usr/bin/env python3
import re
import os

# 업데이트할 모든 HTML 파일 목록
html_files = [
    'index.html',
    'mi_about.html',
    'blog.html',
    'contact.html',
    'blog-details-1.html',
    'blog-details-2.html',
    'blog-details-3.html',
    'blog-details-4.html',
    'blog-details-5.html',
    'blog-details-6.html',
    'blog-details-7.html',
    'blog-details-8.html',
    'blog-details-9.html',
    'blog-details-10.html',
    'blog-details-11.html',
    'blog-details-12.html'
]

# 링크 매핑
link_mappings = {
    # 제거시술 메뉴
    r'<a href="#">점</a>': '<a href="blog-details-8.html">점</a>',
    r'<a href="#">비립종</a>': '<a href="blog-details-9.html">비립종</a>',
    r'<a href="#">문신제거</a>': '<a href="blog-details-10.html">문신제거</a>',
    
    # 바디케어 메뉴
    r'<a href="#">제모</a>': '<a href="blog-details-11.html">제모</a>',
    r'<a href="#">다이어트</a>': '<a href="blog-details-12.html">다이어트</a>'
}

def update_nav_links(filename):
    """HTML 파일의 네비게이션 링크 업데이트"""
    
    if not os.path.exists(filename):
        print(f"⚠️ {filename} 파일이 존재하지 않습니다.")
        return False
    
    try:
        # 파일 읽기
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 변경 사항 카운트
        changes_made = 0
        
        # 각 링크 매핑 적용
        for old_link, new_link in link_mappings.items():
            # 정규식으로 찾아서 교체
            pattern = re.escape(old_link)
            if re.search(pattern, content):
                content = re.sub(pattern, new_link, content)
                changes_made += 1
        
        # 변경사항이 있으면 파일 저장
        if changes_made > 0:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ {filename}: {changes_made}개 링크 업데이트 완료")
            return True
        else:
            print(f"ℹ️ {filename}: 업데이트할 링크 없음 (이미 완료됨)")
            return True
    
    except Exception as e:
        print(f"❌ {filename} 처리 중 오류: {e}")
        return False

# 메인 실행
print("🔧 네비게이션 메뉴 링크 업데이트 시작...")
print("=" * 50)

success_count = 0
total_files = len(html_files)

for file in html_files:
    if update_nav_links(file):
        success_count += 1

print("=" * 50)
print(f"✨ 작업 완료: {success_count}/{total_files} 파일 업데이트")

# 업데이트 내역 요약
print("\n📝 링크 연결 내역:")
print("  제거시술:")
print("    - 점 → blog-details-8.html")
print("    - 비립종 → blog-details-9.html")
print("    - 문신제거 → blog-details-10.html")
print("  바디케어:")
print("    - 제모 → blog-details-11.html")
print("    - 다이어트 → blog-details-12.html")