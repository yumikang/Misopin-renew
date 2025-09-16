/**
 * Misopin CMS JavaScript Client
 * CMS와 정적 페이지를 연결하는 클라이언트 라이브러리
 */

class MisopinCMS {
  constructor(config = {}) {
    this.baseURL = config.baseURL || 'http://localhost:3004';
    this.apiBase = `${this.baseURL}/api/public`;
    this.cache = new Map();
    this.cacheTimeout = config.cacheTimeout || 5 * 60 * 1000; // 5분
  }

  // 캐시 확인
  _getCached(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  // 캐시 저장
  _setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // API 요청 헬퍼
  async _request(endpoint) {
    try {
      const response = await fetch(`${this.apiBase}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`CMS API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // 페이지 관련 API
  async getPages() {
    const cacheKey = 'pages';
    const cached = this._getCached(cacheKey);
    if (cached) return cached;

    const result = await this._request('/pages');
    this._setCache(cacheKey, result);
    return result;
  }

  async getPage(slug) {
    const cacheKey = `page-${slug}`;
    const cached = this._getCached(cacheKey);
    if (cached) return cached;

    const result = await this._request(`/pages?slug=${encodeURIComponent(slug)}`);
    this._setCache(cacheKey, result);
    return result;
  }

  // 게시판 관련 API
  async getBoardPosts(options = {}) {
    const params = new URLSearchParams();
    if (options.type) params.append('type', options.type);
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.page) params.append('page', options.page.toString());

    const cacheKey = `board-${params.toString()}`;
    const cached = this._getCached(cacheKey);
    if (cached) return cached;

    const result = await this._request(`/board-posts?${params.toString()}`);
    this._setCache(cacheKey, result);
    return result;
  }

  // 팝업 관련 API
  async getActivePopups() {
    const cacheKey = 'popups';
    const cached = this._getCached(cacheKey);
    if (cached) return cached;

    const result = await this._request('/popups');
    this._setCache(cacheKey, result);
    return result;
  }

  // 팝업 표시 헬퍼
  async showPopups() {
    try {
      const popups = await this.getActivePopups();
      if (popups.success && popups.data.length > 0) {
        popups.data.forEach(popup => this._displayPopup(popup));
      }
    } catch (error) {
      console.error('Failed to show popups:', error);
    }
  }

  _displayPopup(popup) {
    // 이미 표시된 팝업인지 확인 (localStorage 사용)
    const popupKey = `popup-${popup.id}`;
    const dismissed = localStorage.getItem(popupKey);
    if (dismissed) return;

    // 팝업 HTML 생성
    const popupHTML = `
      <div id="popup-${popup.id}" class="cms-popup" style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${popup.width || 400}px;
        height: ${popup.height || 300}px;
        background: white;
        border: 2px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        padding: 20px;
        font-family: Arial, sans-serif;
      ">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
          <h3 style="margin: 0; color: #333;">${popup.title}</h3>
          <button onclick="MisopinCMS.dismissPopup('${popup.id}')" style="
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #666;
          ">×</button>
        </div>
        <div style="height: calc(100% - 80px); overflow-y: auto;">
          ${popup.imageUrl ? `<img src="${popup.imageUrl}" style="max-width: 100%; height: auto; margin-bottom: 10px;">` : ''}
          <div>${popup.content}</div>
        </div>
        <div style="text-align: center; margin-top: 15px;">
          <button onclick="MisopinCMS.dismissPopup('${popup.id}')" style="
            padding: 8px 16px;
            background: #007cba;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          ">닫기</button>
        </div>
      </div>
    `;

    // 백드롭 생성
    const backdrop = document.createElement('div');
    backdrop.id = `popup-backdrop-${popup.id}`;
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 9999;
    `;
    backdrop.onclick = () => this.dismissPopup(popup.id);

    // DOM에 추가
    document.body.appendChild(backdrop);
    document.body.insertAdjacentHTML('beforeend', popupHTML);
  }

  // 팝업 닫기 (전역에서 호출 가능하도록)
  static dismissPopup(popupId) {
    const popup = document.getElementById(`popup-${popupId}`);
    const backdrop = document.getElementById(`popup-backdrop-${popupId}`);

    if (popup) popup.remove();
    if (backdrop) backdrop.remove();

    // 오늘 하루 보지 않기 (24시간)
    const dismissUntil = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem(`popup-${popupId}`, dismissUntil.toString());
  }

  // 게시판 목록을 HTML 요소에 렌더링
  async renderBoardList(containerId, options = {}) {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container element #${containerId} not found`);
        return;
      }

      container.innerHTML = '<div class="loading">게시글을 불러오는 중...</div>';

      const result = await this.getBoardPosts(options);

      if (!result.success || !result.data.length) {
        container.innerHTML = '<div class="no-posts">등록된 게시글이 없습니다.</div>';
        return;
      }

      const postsHTML = result.data.map(post => `
        <div class="board-item" data-id="${post.id}">
          <h3 class="board-title">${post.title}</h3>
          <div class="board-meta">
            <span class="board-type">${post.boardType === 'NOTICE' ? '공지사항' : '이벤트'}</span>
            <span class="board-author">작성자: ${post.author}</span>
            <span class="board-date">${new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
            <span class="board-views">조회수: ${post.viewCount}</span>
          </div>
          <div class="board-content">${this._truncateHTML(post.content, 100)}</div>
        </div>
      `).join('');

      container.innerHTML = `<div class="board-list">${postsHTML}</div>`;

      // 페이지네이션 추가
      if (result.pagination && result.pagination.totalPages > 1) {
        this._renderPagination(container, result.pagination, options);
      }

    } catch (error) {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '<div class="error">게시글을 불러오는 중 오류가 발생했습니다.</div>';
      }
    }
  }

  // HTML 텍스트 자르기
  _truncateHTML(html, length) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  // 페이지네이션 렌더링
  _renderPagination(container, pagination, options) {
    const { page, totalPages } = pagination;
    let paginationHTML = '<div class="pagination">';

    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === page;
      paginationHTML += `
        <button class="page-btn ${isActive ? 'active' : ''}"
                onclick="misopinCMS.renderBoardList('${container.id}', {...${JSON.stringify(options)}, page: ${i}})">
          ${i}
        </button>
      `;
    }

    paginationHTML += '</div>';
    container.insertAdjacentHTML('beforeend', paginationHTML);
  }
}

// 팝업 닫기 함수를 전역에 노출
window.MisopinCMS = MisopinCMS;

// 전역 인스턴스 생성 (즉시 사용 가능)
window.misopinCMS = new MisopinCMS();

// DOM 로드 완료 시 팝업 자동 표시
document.addEventListener('DOMContentLoaded', () => {
  window.misopinCMS.showPopups();
});