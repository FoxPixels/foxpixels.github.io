// 简约导航功能
        document.addEventListener('DOMContentLoaded', function() {
            // 导航元素
            const navLinks = document.querySelectorAll('.menu a');
            const sections = document.querySelectorAll('section[id]');
            
            // 导航点击事件
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // 平滑滚动
                        window.scrollTo({
                            top: targetSection.offsetTop - 40,
                            behavior: 'smooth'
                        });
                        
                        // 更新active状态
                        updateActiveNav(targetId);
                    }
                });
            });
            
            // 更新active状态函数
            function updateActiveNav(targetId) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    }
                });
            }
            
            // 滚动监听
            function onScroll() {
                let scrollY = window.pageYOffset;
                
                sections.forEach(section => {
                    const sectionHeight = section.offsetHeight;
                    const sectionTop = section.offsetTop - 100;
                    const sectionId = '#' + section.getAttribute('id');
                    
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        updateActiveNav(sectionId);
                    }
                });
            }
            
            // 添加滚动监听
            window.addEventListener('scroll', onScroll);
            
            // 表单提交
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('消息已发送，我们会尽快回复您。');
                    this.reset();
                });
            }
        });
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