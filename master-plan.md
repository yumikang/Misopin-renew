⏺ 🎯 마스터 템플릿 시스템 구축 계획

  📁 프로젝트 구조

  clinic/
  ├── templates/
  │   ├── master/
  │   │   ├── header.html         # 헤더만 (네비게이션 포함)
  │   │   ├── footer.html         # 푸터만 (연락처 정보)
  │   │   └── quickmenu.html      # 퀵메뉴만
  │   ├── treatment-master.html   # 시술 페이지 마스터
  │   ├── basic-master.html       # 일반 페이지 마스터
  │   └── main-master.html        # 메인 페이지 마스터
  ├── contents/
  │   ├── treatments/
  │   │   ├── botox.html         # 보톡스 컨텐츠만
  │   │   ├── xeomin.html        # 제오민 컨텐츠만
  │   │   └── ... (11개 시술)
  │   ├── about.html              # 병원소개 컨텐츠
  │   └── notice.html             # 공지사항 컨텐츠
  ├── build/
  │   ├── build-pages.js          # 페이지 조합 스크립트
  │   └── config.json             # 페이지 설정 데이터
  └── output/                     # 최종 생성된 HTML 파일들
      ├── index.html
      ├── botox.html
      └── ... (모든 완성 페이지)

  🔧 구현 단계

  Phase 1: 템플릿 분리 (오늘)

  1. header.html 생성
  <!-- templates/master/header.html -->
  <header id="sh_hd">
      <div id="top_nav_wrap">
          <div id="top_logo">
              <a href="/"><img src="img/미소핀로고.svg" alt="미소핀의원" style="height: 50px;" 
  /></a>
          </div>
          <nav id="r_menu">
              <ul id="top_nav">
                  <li class="list01">
                      <a class="list" href="about.html">미소핀 소개</a>
                      <ul class="sub_ul1">
                          <li><a href="about.html">병원 소개</a></li>
                          <li><a href="notice.html">공지 및 이벤트</a></li>
                      </ul>
                  </li>
                  <!-- 모든 네비게이션 메뉴 -->
              </ul>
          </nav>
          <a class="event" href="notice.html">12월 이벤트 확인하기</a>
      </div>
  </header>

  2. footer.html 생성
  <!-- templates/master/footer.html -->
  <footer id="sh_ft">
      <div id="sh_ft_wrapper">
          <div class="contact">
              <!-- 연락처 폼 -->
          </div>
          <div class="bottom">
              <ul class="info_box">
                  <li>
                      <div class="number">061-277-1001</div>
                  </li>
                  <!-- 진료시간, 주소 등 -->
              </ul>
          </div>
          <div class="copy">
              <p>© MISOPIN CLINIC. ALL RIGHTS RESERVED.</p>
          </div>
      </div>
  </footer>

  Phase 2: 마스터 템플릿 생성

  treatment-master.html
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <title>{{PAGE_TITLE}} - 미소핀의원</title>
      <link rel="stylesheet" href="css/core/variables.css">
      <link rel="stylesheet" href="css/layout/header.css">
      <link rel="stylesheet" href="css/layout/footer.css">
      <link rel="stylesheet" href="css/pages/treatment.css">
  </head>
  <body>
      <!-- HEADER_START -->
      {{HEADER}}
      <!-- HEADER_END -->

      <main class="treatment-page">
          <section class="sub-banner">
              <h1>{{TREATMENT_TITLE}}</h1>
              <p>{{TREATMENT_CATEGORY}}</p>
          </section>

          <!-- CONTENT_START -->
          {{CONTENT}}
          <!-- CONTENT_END -->
      </main>

      <!-- FOOTER_START -->
      {{FOOTER}}
      <!-- FOOTER_END -->

      <!-- QUICKMENU_START -->
      {{QUICKMENU}}
      <!-- QUICKMENU_END -->
  </body>
  </html>

  Phase 3: 빌드 스크립트

  build-pages.js
  const fs = require('fs');
  const path = require('path');

  // 템플릿 로드
  const header = fs.readFileSync('templates/master/header.html', 'utf8');
  const footer = fs.readFileSync('templates/master/footer.html', 'utf8');
  const quickmenu = fs.readFileSync('templates/master/quickmenu.html', 'utf8');

  // 설정 파일 로드
  const config = JSON.parse(fs.readFileSync('build/config.json', 'utf8'));

  // 각 페이지 생성
  config.pages.forEach(page => {
      // 마스터 템플릿 선택
      const masterTemplate = fs.readFileSync(
          `templates/${page.template}-master.html`,
          'utf8'
      );

      // 컨텐츠 로드
      const content = fs.readFileSync(
          `contents/${page.content}`,
          'utf8'
      );

      // 템플릿 치환
      let html = masterTemplate
          .replace('{{HEADER}}', header)
          .replace('{{FOOTER}}', footer)
          .replace('{{QUICKMENU}}', quickmenu)
          .replace('{{CONTENT}}', content)
          .replace('{{PAGE_TITLE}}', page.title)
          .replace('{{TREATMENT_TITLE}}', page.treatmentTitle || '')
          .replace('{{TREATMENT_CATEGORY}}', page.category || '');

      // 파일 저장
      fs.writeFileSync(`output/${page.output}`, html);
      console.log(`✅ Generated: ${page.output}`);
  });

  console.log('🎉 All pages generated successfully!');

  config.json
  {
    "pages": [
      {
        "template": "treatment",
        "content": "treatments/botox.html",
        "output": "botox.html",
        "title": "보톡스",
        "treatmentTitle": "보톡스",
        "category": "주름/보톡스"
      },
      {
        "template": "treatment",
        "content": "treatments/xeomin.html",
        "output": "xeomin.html",
        "title": "제오민",
        "treatmentTitle": "제오민",
        "category": "주름/보톡스"
      }
      // ... 11개 시술 페이지
    ]
  }

  Phase 4: 실행 방법

  개발 중:
  # 페이지 빌드
  node build/build-pages.js

  # 헤더 수정 후 재빌드
  # 1. templates/master/header.html 수정
  # 2. node build/build-pages.js 실행
  # 3. 모든 페이지에 자동 반영!

  수동 작업 (스크립트 없이):
  1. treatment-master.html 복사
  2. {{HEADER}} 부분에 header.html 내용 붙여넣기
  3. {{CONTENT}} 부분에 해당 시술 내용 붙여넣기
  4. {{FOOTER}} 부분에 footer.html 내용 붙여넣기
  5. 다른 이름으로 저장 (예: botox.html)

  🎯 장점

  1. 중앙 관리: 헤더/푸터 한 곳에서 관리
  2. 일관성: 모든 페이지 구조 통일
  3. 효율성: 새 페이지 추가 5분
  4. React 준비: 컴포넌트 구조와 유사
  5. 유지보수: 수정사항 일괄 적용

  📅 일정

  - 오늘: 헤더/푸터 분리, 마스터 템플릿 생성
  - 내일: 11개 시술 컨텐츠 작성, 빌드 스크립트 구현
  - 모레: 테스트 및 최적화

 