// 分页切换 + 刷新保留当前页
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    // 从 URL hash 或 localStorage 恢复页面
    function getSavedPage() {
        // 优先使用 URL hash
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            return hash;
        }
        // 其次使用 localStorage
        const saved = localStorage.getItem('currentPage');
        if (saved && document.getElementById(saved)) {
            return saved;
        }
        return 'home';
    }

    // 切换到指定页面
    function switchTo(pageId) {
        // 更新页面显示
        pages.forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 更新导航高亮
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === pageId) {
                item.classList.add('active');
            }
        });

        // 保存状态
        localStorage.setItem('currentPage', pageId);
        window.location.hash = pageId;

        // 滚动到顶部
        window.scrollTo(0, 0);
    }

    // 导航点击
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            switchTo(pageId);
        });
    });

    // 监听 hash 变化（浏览器前进/后退）
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            switchTo(hash);
        }
    });

    // 初始化：恢复保存的页面
    const initialPage = getSavedPage();
    switchTo(initialPage);
});

// 复制IP
function copyIP() {
    const ip = document.getElementById('server-ip').textContent;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(ip).then(function() {
            showCopyFeedback();
        }).catch(function() {
            fallbackCopy(ip);
        });
    } else {
        fallbackCopy(ip);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('复制失败', err);
    }

    document.body.removeChild(textarea);
}

function showCopyFeedback() {
    const btn = document.querySelector('.md-btn');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span class="btn-icon">✓</span><span class="btn-text">已复制</span>';
    btn.style.background = 'var(--secondary)';
    btn.style.color = '#fff';

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.color = '';
    }, 2000);
}

// 指令搜索
function filterCommands() {
    const searchInput = document.getElementById('cmd-search');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.cmd-card');

    cards.forEach(card => {
        const cmd = card.getAttribute('data-cmd').toLowerCase();
        const desc = card.getAttribute('data-desc').toLowerCase();

        if (searchTerm === '' || cmd.includes(searchTerm) || desc.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}