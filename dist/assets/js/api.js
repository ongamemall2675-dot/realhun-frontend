/**
 * 혜화72 스마트 오피스 - 공통 API 모듈
 * n8n 웹훅 연결 및 유틸리티 함수
 */

const H72_API = {
    // n8n 웹훅 베이스 URL
    N8N_BASE: 'https://n8n.hyehwa72.org/webhook',
    
    // RAG API 베이스 URL
    RAG_BASE: 'https://rag.hyehwa72.org',

    /**
     * n8n 웹훅 호출
     * @param {string} endpoint - 웹훅 경로 (예: '/economy-script')
     * @param {object} data - 전송할 데이터
     * @returns {Promise<object>} 응답 데이터
     */
    async callN8N(endpoint, data) {
        try {
            const response = await fetch(`${this.N8N_BASE}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('[H72_API] n8n 호출 실패:', error);
            throw error;
        }
    },

    /**
     * RAG API 호출
     * @param {string} endpoint - API 경로
     * @param {object} options - fetch 옵션
     */
    async callRAG(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.RAG_BASE}${endpoint}`, {
                headers: { 'Content-Type': 'application/json' },
                ...options
            });
            return await response.json();
        } catch (error) {
            console.error('[H72_API] RAG 호출 실패:', error);
            throw error;
        }
    },

    /**
     * 서버 상태 확인
     * @param {string} server - 'n8n' 또는 'rag'
     */
    async checkHealth(server) {
        const url = server === 'n8n' ? this.N8N_BASE : this.RAG_BASE;
        try {
            const response = await fetch(`${url}/health`, { method: 'GET' });
            return response.ok;
        } catch {
            return false;
        }
    }
};

/**
 * 토스트 알림 표시
 */
const Toast = {
    container: null,
    
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },
    
    show(message, type = 'info', duration = 3000) {
        this.init();
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const colors = {
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fas ${icons[type]}" style="color: ${colors[type]}"></i>
            <span>${message}</span>
        `;
        
        this.container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    success(msg) { this.show(msg, 'success'); },
    error(msg) { this.show(msg, 'error'); },
    warning(msg) { this.show(msg, 'warning'); },
    info(msg) { this.show(msg, 'info'); }
};

/**
 * 로딩 상태 관리
 */
const Loading = {
    show(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.dataset.originalContent = element.innerHTML;
            element.innerHTML = '<div class="spinner"></div>';
            element.disabled = true;
        }
    },
    
    hide(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element && element.dataset.originalContent) {
            element.innerHTML = element.dataset.originalContent;
            element.disabled = false;
        }
    }
};

/**
 * 날짜/시간 포맷
 */
const DateUtil = {
    format(date, format = 'YYYY-MM-DD HH:mm') {
        const d = new Date(date);
        const pad = n => String(n).padStart(2, '0');
        
        return format
            .replace('YYYY', d.getFullYear())
            .replace('MM', pad(d.getMonth() + 1))
            .replace('DD', pad(d.getDate()))
            .replace('HH', pad(d.getHours()))
            .replace('mm', pad(d.getMinutes()));
    },
    
    relative(date) {
        const diff = Date.now() - new Date(date).getTime();
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (mins < 1) return '방금 전';
        if (mins < 60) return `${mins}분 전`;
        if (hours < 24) return `${hours}시간 전`;
        return `${days}일 전`;
    }
};

// 전역 등록
window.H72_API = H72_API;
window.Toast = Toast;
window.Loading = Loading;
window.DateUtil = DateUtil;
