// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PROGRESS BAR ANIMATION ON SCROLL
// ============================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card, .experience-item, .project-card, .education-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// ANIMATE PROGRESS BARS WHEN VISIBLE
// ============================================
const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.progress');
            if (progress) {
                progress.style.animation = 'none';
                setTimeout(() => {
                    progress.style.animation = 'fillProgress 1.5s ease forwards';
                }, 100);
            }
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(el => {
    progressObserver.observe(el);
});

// ============================================
// ADD ACTIVE STATE TO NAVIGATION ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-item').forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement.classList.contains('btn')) {
        document.activeElement.click();
    }
});

// ============================================
// SMOOTH PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// ADD MISSING FILL PROGRESS ANIMATION
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fillProgress {
        from {
            width: 0;
        }
        to {
            width: inherit;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-links a.active {
        color: #FF6B35;
        font-weight: bold;
    }

    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%cWelcome to Kundan Kumar\'s Portfolio! 🚀', 'font-size: 20px; color: #FF6B35; font-weight: bold;');
console.log('%cLet\'s build something amazing together!', 'font-size: 14px; color: #004E89;');
