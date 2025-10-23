/**
 * 예약 한도 체크 및 잔여 인원 표시 모듈
 * API: GET /api/public/reservations/availability
 */

// API 클라이언트 인스턴스 생성 함수
function getAPIClient() {
  if (typeof MisopinAPI !== 'undefined') {
    return new MisopinAPI();
  }
  // Fallback
  return null;
}

// 시술 타입 한글명 매핑
const SERVICE_TYPE_NAMES = {
  'WRINKLE_BOTOX': '주름 보톡스',
  'VOLUME_LIFTING': '볼륨 리프팅',
  'SKIN_CARE': '피부 관리',
  'REMOVAL_PROCEDURE': '제거 시술',
  'BODY_CARE': '바디 케어',
  'OTHER_CONSULTATION': '기타 상담'
};

/**
 * 예약 가능 여부 체크
 * @param {string} date - YYYY-MM-DD 형식
 * @param {string} serviceType - ServiceType enum
 * @returns {Promise<Object>} availability 정보
 */
async function checkReservationAvailability(date, serviceType) {
  try {
    const api = getAPIClient();
    if (!api) {
      console.warn('MisopinAPI not available');
      return {
        available: true,
        remaining: 999,
        level: 'available',
        message: '예약 가능합니다.'
      };
    }

    const url = `/public/reservations/availability?date=${date}&serviceType=${serviceType}`;
    console.log('Checking availability:', api.baseURL + url);

    const data = await api.fetchAPI(url);
    console.log('Availability response:', data);

    return data;
  } catch (error) {
    console.error('Error checking availability:', error);
    // 에러 시 기본값 반환 (제한 없음)
    return {
      available: true,
      remaining: 999,
      level: 'available',
      message: '예약 가능합니다.'
    };
  }
}

/**
 * 잔여 인원 표시 UI 업데이트
 * @param {Object} availability - API 응답 데이터
 * @param {string} serviceTypeName - 시술명
 */
function updateAvailabilityUI(availability, serviceTypeName) {
  // 기존 표시 제거
  const existingDisplay = document.getElementById('availability-display');
  if (existingDisplay) {
    existingDisplay.remove();
  }

  // 새 표시 영역 생성
  const display = document.createElement('div');
  display.id = 'availability-display';
  display.className = 'availability-display';

  // 상태에 따른 스타일 클래스
  let statusClass = '';
  let iconClass = '';

  if (availability.level === 'full') {
    statusClass = 'status-full';
    iconClass = 'fa-times-circle';
  } else if (availability.level === 'limited') {
    statusClass = 'status-limited';
    iconClass = 'fa-exclamation-circle';
  } else {
    statusClass = 'status-available';
    iconClass = 'fa-check-circle';
  }

  display.className += ` ${statusClass}`;

  // HTML 구성
  display.innerHTML = `
    <div class="availability-content">
      <div class="availability-icon">
        <i class="fa ${iconClass}"></i>
      </div>
      <div class="availability-info">
        <div class="service-name">${serviceTypeName}</div>
        <div class="availability-message">${availability.message}</div>
        ${availability.remaining < 999 ? `
          <div class="remaining-count">
            <span class="label">일일 최대 예약:</span>
            <span class="count">${availability.limit}명</span>
            <span class="separator">|</span>
            <span class="label">잔여:</span>
            <span class="count remaining">${availability.remaining}명</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // 진료 항목 select 아래에 삽입
  const serviceSelect = document.getElementById('sh_service');
  if (serviceSelect && serviceSelect.parentElement) {
    serviceSelect.parentElement.appendChild(display);
  }

  // 예약 버튼 상태 업데이트
  updateSubmitButton(availability.available);
}

/**
 * 예약 버튼 활성화/비활성화
 * @param {boolean} available - 예약 가능 여부
 */
function updateSubmitButton(available) {
  const submitButtons = document.querySelectorAll('.sbm_btn');

  submitButtons.forEach(button => {
    if (available) {
      button.disabled = false;
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
      button.title = '';
    } else {
      button.disabled = true;
      button.style.opacity = '0.5';
      button.style.cursor = 'not-allowed';
      button.title = '선택한 날짜는 예약이 마감되었습니다.';
    }
  });
}

/**
 * 날짜 형식 변환 (YYYYMMDD → YYYY-MM-DD)
 * @param {string} dateStr - YYYYMMDD 형식
 * @returns {string} YYYY-MM-DD 형식
 */
function formatDate(dateStr) {
  if (!dateStr || dateStr.length !== 8) {
    return '';
  }

  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);

  return `${year}-${month}-${day}`;
}

/**
 * 예약 가능 여부 확인 (시술 + 날짜 모두 선택되었을 때)
 */
async function checkAndUpdateAvailability() {
  const serviceSelect = document.getElementById('sh_service');
  const dateInput = document.getElementById('sh_checkday');

  if (!serviceSelect || !dateInput) {
    console.warn('Required form elements not found');
    return;
  }

  const serviceType = serviceSelect.value;
  const dateStr = dateInput.value; // YYYYMMDD 형식

  // 둘 다 선택되어야 체크
  if (!serviceType || !dateStr) {
    // 기존 표시 제거
    const existingDisplay = document.getElementById('availability-display');
    if (existingDisplay) {
      existingDisplay.remove();
    }
    // 버튼 활성화
    updateSubmitButton(true);
    return;
  }

  // 날짜 형식 변환
  const formattedDate = formatDate(dateStr);
  if (!formattedDate) {
    console.error('Invalid date format:', dateStr);
    return;
  }

  // API 호출
  const availability = await checkReservationAvailability(formattedDate, serviceType);

  // UI 업데이트
  const serviceTypeName = SERVICE_TYPE_NAMES[serviceType] || serviceType;
  updateAvailabilityUI(availability, serviceTypeName);
}

/**
 * 예약 제출 전 최종 검증
 * @returns {Promise<boolean>} 제출 가능 여부
 */
async function validateBeforeSubmit() {
  const serviceSelect = document.getElementById('sh_service');
  const dateInput = document.getElementById('sh_checkday');

  if (!serviceSelect || !dateInput) {
    return true; // 요소 없으면 통과
  }

  const serviceType = serviceSelect.value;
  const dateStr = dateInput.value;

  if (!serviceType || !dateStr) {
    return true; // 선택 안 되어 있으면 통과 (다른 유효성 검사에서 처리)
  }

  const formattedDate = formatDate(dateStr);
  const availability = await checkReservationAvailability(formattedDate, serviceType);

  if (!availability.available) {
    alert(availability.message || '해당 날짜는 예약이 마감되었습니다.');
    return false;
  }

  if (availability.level === 'limited') {
    const confirm = window.confirm(
      `${availability.message}\n\n계속 진행하시겠습니까?`
    );
    return confirm;
  }

  return true;
}

/**
 * 기존 submitReservation 함수 래핑
 */
let originalSubmitReservation = null;

function wrapSubmitReservation() {
  // 기존 함수 저장
  if (typeof window.submitReservation === 'function') {
    originalSubmitReservation = window.submitReservation;
  }

  // 새 함수로 교체
  window.submitReservation = async function(event) {
    console.log('Wrapped submitReservation called');

    if (event && event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }

    // 한도 체크
    const canSubmit = await validateBeforeSubmit();
    if (!canSubmit) {
      return false;
    }

    // 원래 함수 실행
    if (originalSubmitReservation) {
      return originalSubmitReservation(event);
    }

    return false;
  };
}

/**
 * 이벤트 리스너 등록
 */
function initReservationLimitCheck() {
  console.log('Initializing reservation limit check...');

  // 시술 선택 이벤트
  const serviceSelect = document.getElementById('sh_service');
  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      console.log('Service type changed:', serviceSelect.value);
      checkAndUpdateAvailability();
    });
  }

  // 날짜 선택 이벤트 - selectday 함수 래핑
  if (typeof window.selectday === 'function') {
    const originalSelectday = window.selectday;
    window.selectday = function(...args) {
      console.log('selectday called with args:', args);

      // 원래 함수 실행
      const result = originalSelectday.apply(this, args);

      // 날짜가 설정되면 체크 실행 (약간의 지연)
      setTimeout(() => {
        checkAndUpdateAvailability();
      }, 100);

      return result;
    };
  }

  // submitReservation 함수 래핑
  wrapSubmitReservation();

  console.log('Reservation limit check initialized');
}

// DOM 로드 후 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReservationLimitCheck);
} else {
  initReservationLimitCheck();
}

// jQuery ready 이벤트도 처리
if (typeof jQuery !== 'undefined') {
  jQuery(document).ready(function() {
    // jQuery ready에서도 한 번 더 초기화 시도
    setTimeout(initReservationLimitCheck, 500);
  });
}
