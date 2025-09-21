/**
 * Misopin CMS API Client
 * Used for fetching data from the CMS backend
 */

class MisopinAPI {
  constructor() {
    // Configure API base URL
    this.baseURL = this.getAPIBaseURL();
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Get API base URL based on environment
   */
  getAPIBaseURL() {
    // Check if we're in development or production
    const hostname = window.location.hostname;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // Development - CMS running on port 3001 (changed due to port conflict)
      return 'http://localhost:3001/api';
    } else if (hostname === 'misopin-renew.vercel.app') {
      // Production - Use CMS Vercel domain
      return 'https://misopin-cms.vercel.app/api';
    } else if (hostname === 'misopin.com' || hostname === 'www.misopin.com') {
      // Future production domain
      return 'https://misopin-cms.vercel.app/api';
    } else {
      // Fallback to relative URL
      return '/api';
    }
  }

  /**
   * Fetch with error handling
   */
  async fetchAPI(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get board posts (notices and events)
   * @param {string} type - 'NOTICE' or 'EVENT' (optional)
   * @param {number} limit - Number of posts to fetch
   * @param {number} offset - Offset for pagination
   */
  async getBoardPosts(type = null, limit = 10, offset = 0) {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString()
    });

    if (type) {
      params.append('type', type);
    }

    return this.fetchAPI(`/public/board-posts?${params}`);
  }

  /**
   * Get active popups
   */
  async getPopups() {
    console.log('Fetching popups from:', this.baseURL + '/public/popups');
    return this.fetchAPI('/public/popups');
  }

  /**
   * Submit reservation
   * @param {Object} reservationData - Reservation form data
   */
  async submitReservation(reservationData) {
    return this.fetchAPI('/public/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData)
    });
  }

  /**
   * Get page content by slug
   * @param {string} slug - Page slug
   */
  async getPageContent(slug) {
    return this.fetchAPI(`/public/pages/${slug}`);
  }
}

// Create global instance
const misopinAPI = new MisopinAPI();

// Helper functions for easy integration
const MisopinHelpers = {
  /**
   * Format date to Korean format
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  },

  /**
   * Render board posts to HTML
   */
  renderBoardPosts(posts, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = posts.map(post => `
      <div class="board-item" data-id="${post.id}">
        <div class="board-header">
          <span class="board-type board-type-${post.board_type.toLowerCase()}">
            ${post.board_type === 'NOTICE' ? '공지' : '이벤트'}
          </span>
          ${post.is_pinned ? '<span class="board-pinned">📌</span>' : ''}
          <h3 class="board-title">${post.title}</h3>
        </div>
        <p class="board-excerpt">${post.excerpt || ''}</p>
        <div class="board-meta">
          <span class="board-author">${post.author}</span>
          <span class="board-date">${this.formatDate(post.created_at)}</span>
          <span class="board-views">조회 ${post.view_count}</span>
        </div>
      </div>
    `).join('');
  },

  /**
   * Show popup
   */
  showPopup(popup) {
    // Check if popup was already shown today
    const todayClosedPopups = JSON.parse(localStorage.getItem('closedPopups') || '{}');
    const today = new Date().toDateString();

    if (todayClosedPopups[popup.id] === today) {
      return; // Skip if already closed today
    }

    const popupHTML = `
      <div class="popup-overlay" id="popup-${popup.id}" data-type="${popup.display_type}">
        <div class="popup-container popup-${popup.display_type.toLowerCase()} popup-${popup.position.toLowerCase()}">
          <div class="popup-header">
            <h3 class="popup-title">${popup.title}</h3>
            <button class="popup-close" onclick="MisopinHelpers.closePopup('${popup.id}')">✕</button>
          </div>
          <div class="popup-content">
            ${popup.image_url ? `<img src="${popup.image_url}" alt="${popup.title}" />` : ''}
            <p>${popup.content}</p>
            ${popup.link_url ? `<a href="${popup.link_url}" class="popup-link" target="_blank">자세히 보기</a>` : ''}
          </div>
          <div class="popup-footer">
            <button onclick="MisopinHelpers.closePopup('${popup.id}', true)">오늘 하루 보지 않기</button>
            <button onclick="MisopinHelpers.closePopup('${popup.id}')">닫기</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);
  },

  /**
   * Close popup
   */
  closePopup(popupId, todayClose = false) {
    const popup = document.getElementById(`popup-${popupId}`);
    if (popup) {
      popup.remove();
    }

    if (todayClose) {
      const todayClosedPopups = JSON.parse(localStorage.getItem('closedPopups') || '{}');
      todayClosedPopups[popupId] = new Date().toDateString();
      localStorage.setItem('closedPopups', JSON.stringify(todayClosedPopups));
    }
  },

  /**
   * Initialize popups on page load
   */
  async initPopups() {
    console.log('Initializing popups...');
    try {
      const popups = await misopinAPI.getPopups();
      console.log('Fetched popups:', popups);

      if (!popups || popups.length === 0) {
        console.log('No active popups found');
        return;
      }

      // Sort by priority and show popups
      popups.forEach((popup, index) => {
        console.log(`Showing popup ${index + 1}:`, popup);
        setTimeout(() => {
          this.showPopup(popup);
        }, index * 1000); // Stagger popup display
      });
    } catch (error) {
      console.error('Failed to load popups:', error);
    }
  },

  /**
   * Load board posts into container
   */
  async loadBoardPosts(type = null, containerSelector = '#board-posts') {
    try {
      const data = await misopinAPI.getBoardPosts(type);
      this.renderBoardPosts(data.posts, containerSelector);
    } catch (error) {
      console.error('Failed to load board posts:', error);
      const container = document.querySelector(containerSelector);
      if (container) {
        container.innerHTML = '<p class="error">게시글을 불러올 수 없습니다.</p>';
      }
    }
  }
};

// Auto-initialize popups when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    MisopinHelpers.initPopups();
  });
} else {
  MisopinHelpers.initPopups();
}