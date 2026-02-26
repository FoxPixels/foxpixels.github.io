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