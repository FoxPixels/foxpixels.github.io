(function() {
            'use strict';

            // ----- 检测浏览器 (只区分 Firefox / 其他) -----
            function detectBrowser() {
                const ua = navigator.userAgent.toLowerCase();
                // 只有 Firefox 走冷色主题，其他全部走 Chrome 暖色
                if (ua.includes('firefox')) {
                    return 'firefox';
                }
                // 其他所有浏览器 (Chrome, Edge, Opera, Safari, 等等) 都归为 chrome 风格
                return 'chrome';
            }

            // ----- 获取元素 -----
            const body = document.body;
            const nameEl = document.getElementById('name');
            const badge = document.getElementById('badge');

            // ----- 显示映射 -----
            const map = {
                chrome: { name: 'Chrome / 其他', label: 'Chrome 风格' },
                firefox: { name: 'Firefox', label: 'Firefox 专属' }
            };

            // ----- 执行 -----
            function init() {
                const browser = detectBrowser();
                // 应用主题类: 'theme-chrome' 或 'theme-firefox'
                body.className = 'theme-' + browser;

                // 更新显示
                const info = map[browser] || map.chrome;
                nameEl.textContent = info.name;
                badge.textContent = `✅ ${info.label}`;

                console.log(`[自动换色] 检测到: ${browser} → 应用类: theme-${browser}`);
            }

            // 启动
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }
        })();