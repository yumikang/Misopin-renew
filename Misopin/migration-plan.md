# 미소핀 웹사이트 마이그레이션 마스터플랜 (개정판)

## 프로젝트 개요

### 현재 상황
- **기술 스택**: 정적 HTML/CSS/JS + GSAP 3.9.0
- **파일 규모**: 550MB, 71개 웹 파일, 33개 CSS 파일
- **핵심 문제**: 
  - CSS 충돌 (217개 !important)
  - GSAP pin-spacer와 header positioning 충돌
  - 여백/헤더 중복 패딩 문제
  - 이미지 비최적화
- **배포 환경**: Vercel 정적 호스팅

### 목표
- **단기**: "절대 안 깨지는" 중간 납품 (48시간)
- **장기**: React/Next.js 기반 현대적 웹사이트로 전환

---

## Phase 1: "절대 안 깨지는" 중간 납품 (48시간)

### Day 1 (5시간)

#### 1. 전역 통합 CSS 규칙 적용 (30분)
기존 emergency-header-fix.css를 완전 교체하여 모든 충돌 제거

```css
/* global-header.css - 전 페이지 공통 */
:root { 
  --header-height: 64px; 
}

/* 헤더 안정화 - sticky로 변경하여 충돌 제거 */
#header, .header {
  position: sticky !important;
  top: 0; left: 0; right: 0;
  z-index: 9999;
  background: #fff;
  will-change: transform;
  transition: background 0.3s ease;
}

/* GSAP pin-spacer 충돌 완전 제거 */
body { padding-top: 0 !important; }
.pin-spacer { height: 0 !important; margin: 0 !important; }

/* 섹션 간격 전역 통일 */
.section, section, .bd_bg, .j_ttl_s, .section-padding {
  padding-top: clamp(32px, 6vh, 72px);
  padding-bottom: clamp(32px, 6vh, 72px);
  margin-top: 0 !important;
}

/* 네비게이션 레이아웃 안정화 */
.menu_list {
  display: flex;
  gap: 40px;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu_list li a {
  color: #333;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  padding: 5px 0;
}

/* 스크롤 시 헤더 변화 */
#header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.12);
}

/* pin이 꼭 필요한 섹션만 예외 허용 */
.section--keeps-pin + .pin-spacer { 
  height: auto !important; 
}
```

**장점**:
- 기존 페이지별 보정 CSS/JS 삭제 가능
- 헤더-본문 간격이 전부 균일해짐
- 모바일 햄버거 메뉴도 안정화
- GSAP pin-spacer와 header positioning 충돌 완전 해결

#### 2. 전 페이지 QA 검증 (1시간)
- **모바일**: iOS Safari, Android Chrome
- **데스크톱**: Chrome, Safari, Firefox
- **체크포인트**:
  - 헤더 중복 여백 없음
  - SNS/Doctor 섹션 띠·중첩 없음
  - 푸터가 따라오지 않음
  - 각 페이지 첫 섹션이 헤더에 자연스럽게 붙음

#### 3. 즉효 성능 최적화 (2시간)
```bash
# Hero/대표 섹션 이미지 WebP 변환
"scripts": {
  "img:opt": "sharp-cli 'public/raw/**/*.{jpg,png}' --resize 2000 --webp -o 'public/images'"
}
```

- **이미지 최적화**: Hero 섹션 10장 우선 WebP 변환 + loading="lazy"
- **폰트 최적화**: font-display: swap 적용
- **스크립트 정리**: console.log 제거 + defer/async 정리

#### 4. 보안 취약점 수정 (1.5시간)
- **innerHTML → textContent 변경**: mi_about.html:800,824 / index.html:1588,1602
- **HTTP → HTTPS 링크 수정**: 4개 파일
- **XSS 방지 처리**: 사용자 입력 검증 강화

### Day 2 (8시간)

#### 1. 성능 최적화 완료 (3시간)
- CSS 최소화 및 사용하지 않는 스타일 제거
- JavaScript 번들 최적화
- 이미지 lazy loading 전체 적용
- Core Web Vitals 체크 (CLS/INP 측정)

#### 2. QA 체크리스트 기반 검증 (3시간)
**완수 정의 (DoD)**:
- 모바일에서 헤더 중복 여백 없음
- SNS/Doctor 섹션 띠·중첩 없음
- 푸터가 따라오지 않음
- 각 페이지 첫 섹션이 헤더에 자연스럽게 붙음
- 전체 페이지 네비게이션 정상 작동
- 폼 제출 기능 정상 작동

#### 3. SEO 및 접근성 기본 점검 (2시간)
- 메타데이터 보완
- alt 태그 추가
- ARIA 레이블 기본 점검
- 키보드 내비게이션 확인

---

## Phase 2: React/Next.js 마이그레이션 (3-4주)

### Week 1: 설계 및 환경 구축

#### 기술 스택 선정 (개정)
```json
{
  "framework": "Next.js 15.5.2",
  "language": "TypeScript",
  "styling": "Tailwind CSS + CSS Modules",
  "animation": "Framer Motion + 부분 GSAP",
  "deployment": "Vercel",
  "cms": "로컬 MDX → Supabase 전환"
}
```

#### 디자인 시스템 구축 (개정)
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: { 
      brand: '#333333', 
      ink: '#697684', 
      bg: '#F4F8FC' 
    },
    spacing: { 
      'safe': 'env(safe-area-inset-top)',
      'header': '64px'
    },
    fontFamily: { 
      sans: ['SuisseIntl', 'system-ui', 'sans-serif'] 
    }
  }
}
```

#### URL 마이그레이션 전략 (신규)
```javascript
// next.config.js
const redirects = async () => {
  return [
    {
      source: '/mi_about.html',
      destination: '/about',
      permanent: true,
    },
    {
      source: '/blog-details-1.html',
      destination: '/treatments/botox',
      permanent: true,
    },
    {
      source: '/blog-details-2.html',
      destination: '/treatments/zeomin',
      permanent: true,
    },
    // ... 전체 URL 매핑
  ]
}
```

#### 이미지 파이프라인 자동화 (신규)
```
/public/images/ 구조:
├── hero/        # 2000px, webp
├── cards/       # 1200px, webp  
├── thumbs/      # 640px, webp
└── og/          # 1200x630, webp
```

### Week 2: 핵심 컴포넌트 구현

#### 1. 레이아웃 컴포넌트 (2일)

**Header 컴포넌트 (개정)**
```typescript
// components/layout/Header.tsx
import { motion, useScroll, useTransform } from 'framer-motion'

export function Header() {
  const { scrollY } = useScroll()
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255,255,255,1)', 'rgba(255,255,255,0.95)']
  )
  
  return (
    <motion.header
      className="sticky top-0 z-50"
      style={{ backgroundColor: headerBg }}
    >
      <Navigation />
    </motion.header>
  )
}
```

#### 2. 애니메이션 시스템 (개정) (1.5일)

**GSAP → Framer Motion 전환 전략**
```typescript
// lib/animations.ts
// 필요한 인터랙션만 Framer Motion으로
export const letterAnimation = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -90 
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: "easeOut"
    }
  })
}

// 복잡한 Timeline은 지연 로드
export const loadGSAP = async () => {
  if (typeof window !== 'undefined') {
    const { gsap } = await import('gsap')
    return gsap
  }
}
```

#### 3. 이미지 최적화 시스템 (0.5일)

**Next.js Image 컴포넌트**
```typescript
// components/ui/OptimizedImage.tsx
import Image from 'next/image'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export function OptimizedImage({ src, alt, width, height, priority }: OptimizedImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder="blur"
        blurDataURL="/blur-placeholder.jpg"
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </motion.div>
  )
}
```

### Week 3: 페이지별 구현

#### 1. 콘텐츠 모델 설계 (신규) (1일)
```typescript
// types/content.ts
interface Treatment {
  slug: string
  title: string
  summary: string
  body: string // MDX
  thumbnail: string
  gallery: string[]
  tags: string[]
  order: number
  seo: {
    title: string
    description: string
  }
}

interface Doctor {
  name: string
  title: string
  image: string
  credentials: string[]
  description: string
}
```

#### 2. 홈페이지 구현 (2일)
```typescript
// app/page.tsx
import { Hero } from '../components/sections/Hero'
import { Services } from '../components/sections/Services'
import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Contact />
    </main>
  )
}
```

#### 3. 동적 라우팅 구현 (2일)
```typescript
// app/treatments/[slug]/page.tsx
interface TreatmentPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  // 모든 시술 페이지 사전 생성
  return treatments.map((treatment) => ({
    slug: treatment.slug,
  }))
}

export default function TreatmentPage({ params }: TreatmentPageProps) {
  const treatment = getTreatmentBySlug(params.slug)
  
  return (
    <div className="pt-header">
      <TreatmentHero treatment={treatment} />
      <TreatmentDetails treatment={treatment} />
    </div>
  )
}
```

### Week 4: 통합 테스트 및 배포

#### 1. 성능 최적화 (2일)
- 번들 크기 분석 (<200KB gzipped 목표)
- 이미지 lazy loading 최적화
- 폰트 최적화 (next/font 활용)
- 코드 분할 전략

#### 2. SEO 최적화 (1일)
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: '미소핀의원 - Premium Anti-aging Clinic',
    template: '%s | 미소핀의원'
  },
  description: '미소가 피어나는 곳, 미소핀의원에서 건강한 아름다움을 경험하세요',
  keywords: ['피부과', '보톡스', '필러', '리프팅', '미소핀의원'],
  openGraph: {
    title: '미소핀의원',
    description: '미소가 피어나는 곳, 미소핀의원',
    url: 'https://misopin.com',
    siteName: '미소핀의원',
    images: ['/og-image.jpg'],
    locale: 'ko_KR',
    type: 'website',
  },
}
```

#### 3. 배포 및 도메인 연결 (2일)
```javascript
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path", 
      "permanent": true
    }
  ]
}
```

---

## Phase 3: 고도화 및 CMS 연동 (추가 2주)

### Week 5: 고급 기능 구현

#### 1. 예약 시스템 (3일)
```typescript
// components/BookingForm.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BookingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto"
    >
      <AnimatePresence mode="wait">
        {step === 1 && <PersonalInfo />}
        {step === 2 && <TreatmentSelection />}
        {step === 3 && <DateTimeSelection />}
        {step === 4 && <Confirmation />}
      </AnimatePresence>
    </motion.form>
  )
}
```

#### 2. 관리자 대시보드 (2일)
```typescript
// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="p-6">
      <BookingManagement />
      <ContentManagement />
      <AnalyticsDashboard />
    </div>
  )
}
```

### Week 6: CMS 연동 및 최종 마무리

#### 1. Headless CMS 연동 (3일)
```typescript
// lib/cms.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getTreatments() {
  const { data, error } = await supabase
    .from('treatments')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}
```

#### 2. 테스트/릴리스 전략 (신규) (2일)
```
브랜치 전략:
├── main (운영)
├── release (스테이징)  
└── feat/* (기능 개발)

PR 체크리스트:
- Lighthouse CI (모바일 90+)
- ESLint 통과
- TypeScript 컴파일 성공
- 빌드 성공
```

---

## 현실화된 위험 요소 및 대응 방안

### 기술적 위험

#### 1. 현재 사이트 CSS 충돌 잔존
**대응**: Phase 1의 "전역 1장 규칙"으로 베이스 라인 정리
```css
/* global-header.css로 모든 충돌 원인 제거 */
- sticky positioning으로 변경
- pin-spacer 억제
- 섹션 간격 통일
```

#### 2. GSAP 의존 애니메이션 완전 이관 난이도
**대응**: 필수만 Framer Motion, 나머지는 지연 임포트/서브셋 유지
```typescript
// 중간 절충안
const complexAnimation = async () => {
  const { gsap } = await import('gsap')
  // 복잡한 타임라인만 GSAP 사용
}
```

#### 3. SEO 손실 (경로 변경)
**대응**: 
- 사전 리다이렉트 맵 준비
- sitemap 자동 생성  
- Search Console 재색인 요청

### 성능 위험

#### 4. 이미지/동영상 대용량
**대응**: 변환 스크립트로 단계별 최적화
```bash
"scripts": {
  "img:opt": "sharp-cli 'public/raw/**/*.{jpg,png}' --resize 2000 --webp -o 'public/images'"
}
```

---

## 수정된 성공 지표 (KPI)

### 기술적 지표 (현실화)
- **Lighthouse 점수**: 90+ (특히 Performance)
- **Core Web Vitals**: 
  - LCP < 2.5초
  - FID < 100ms  
  - CLS < 0.1
- **번들 크기**: 라우트별 <200KB (gzipped)

### 사용자 경험 지표
- **페이지 로드 시간**: < 3초
- **모바일 사용성**: 95+점
- **접근성 점수**: AA 등급 달성

### 비즈니스 지표
- **SEO 순위**: 주요 키워드 유지
- **전환율**: 현재 대비 20% 향상
- **유지보수 시간**: 현재 대비 70% 단축

---

## 최종 체크리스트 (간소화)

### Phase 1 (48시간)
- [ ] global-header.css 1장 삽입(전 페이지)
- [ ] header sticky + 섹션 패딩 통일
- [ ] pin-spacer 높이 0 + 섹션 개별 보정 삭제  
- [ ] Hero 10장 WebP + lazy, 폰트 swap
- [ ] console.log 제거, 스크립트 defer/async
- [ ] 모바일 QA: 헤더·띠·푸터 따라오기 없음
- [ ] 보안 취약점 수정 (innerHTML, HTTP→HTTPS)

### Phase 2 (3-4주)
- [ ] Next 앱 초기화(TS+Tailwind)
- [ ] tokens → tailwind theme 확장
- [ ] Header/Section/CTA/Card 베이스 컴포넌트
- [ ] 이미지 파이프라인 / Blur placeholder
- [ ] redirects/sitemap/robots
- [ ] 필요 애니메이션 Framer로 치환, 나머지 gsap 코드 분할
- [ ] URL 리다이렉트 매핑 완료
- [ ] 성능 최적화 (번들 분석)

### Phase 3 (2주)
- [ ] 예약 시스템 구현
- [ ] 관리자 대시보드 구축
- [ ] CMS 연동 (Supabase)
- [ ] 최종 성능 최적화
- [ ] 테스트/배포 파이프라인 구축

---

## 결론

**핵심 개선사항**:

1. **전역 1장 규칙**: sticky positioning + pin-spacer 억제로 모든 CSS 충돌 해결
2. **URL 마이그레이션 전략**: 체계적인 리다이렉트 매핑으로 SEO 손실 방지  
3. **이미지 파이프라인**: 자동화된 최적화 워크플로우
4. **GSAP 전환 전략**: 단계적 접근으로 리스크 최소화
5. **현실적 KPI**: 달성 가능한 성능 목표 설정

이 개정된 마스터플랜은 **"48시간 내 안정 납품"**을 확실히 보장하면서, **4주 내 현대화 전환**으로 매끄럽게 이어지는 실행 가능한 로드맵입니다.

핵심 개선사항:

전역 1장 규칙 (global-header.css): sticky positioning + pin-spacer 억제로 모든 CSS 충돌을 근본적으로 해결
URL 마이그레이션 전략: 체계적인 리다이렉트 매핑으로 SEO 손실 방지
이미지 파이프라인 자동화: 구조화된 폴더 시스템과 변환 스크립트
GSAP 전환 전략: 단계적 접근으로 리스크 최소화
현실적 KPI: 달성 가능한 성능 목표 설정

특히 Phase 1의 전역 1장 규칙이 현재 CSS 충돌의 90%를 해결할 핵심 솔루션입니다.
position: fixed → sticky 변경과 pin-spacer 억제만으로도 헤더/여백/띠 문제가 모두 해결될 것입니다.