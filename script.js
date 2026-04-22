// ===========================
// Cal.com embed (scheduling)
// Namespaces must match data-cal-namespace on each booking button.
// ===========================
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "Cal");
Cal("init", "trial", { origin: "https://cal.com" });
Cal("init", "individual", { origin: "https://cal.com" });
Cal("init", "group", { origin: "https://cal.com" });

// ===========================
// Language Switching
// ===========================
const langBtns = document.querySelectorAll('.lang-btn');
let currentLang = localStorage.getItem('theway-lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('theway-lang', lang);
    document.documentElement.setAttribute('data-lang', lang);

    // Update toggle buttons
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update all translatable elements
    document.querySelectorAll('[data-en][data-pt]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            // Check if the element has child SVGs we need to preserve
            const svgs = el.querySelectorAll('svg');
            if (svgs.length > 0 && el.children.length > 0 && !el.querySelector('[data-en]')) {
                // For buttons/links with SVG icons, keep SVGs and update text
                const textNode = Array.from(el.childNodes).find(n => n.nodeType === 3 && n.textContent.trim());
                if (textNode) {
                    textNode.textContent = '\n                        ' + text + '\n                    ';
                }
            } else if (el.children.length === 0 || el.querySelector('strong')) {
                el.innerHTML = text;
            } else {
                // Only update direct text content
                const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === 3);
                if (textNodes.length > 0) {
                    textNodes.forEach(n => { if (n.textContent.trim()) n.textContent = text; });
                }
            }
        }
    });
}

// Initialize language
langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Apply saved language on load
if (currentLang !== 'en') {
    setLanguage(currentLang);
}

// ===========================
// Mobile Menu
// ===========================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu on link click
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ===========================
// Navbar scroll
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 50);
});

// ===========================
// Smooth scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll animations
// ===========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.feature-card, .course-card, .why-card, .testimonial-card, .faq-item, .teacher-content, .booking-card, .hero-image-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ===========================
// Active nav
// ===========================
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
    const scrollY = window.scrollY + navbar.offsetHeight + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (scrollY >= top && scrollY < top + section.offsetHeight) {
            navLinks.forEach(l => l.classList.remove('active'));
            if (link) link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// ===========================
// FAQ accordion
// ===========================
document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
            item.classList.add('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
        }
    });
});

// ===========================
// Testimonial rotation (mobile)
// ===========================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (testimonialCards.length > 0 && window.innerWidth <= 768) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === currentTestimonial ? 'block' : 'none';
        });
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
}

if (window.innerWidth <= 768) {
    setInterval(rotateTestimonials, 5000);
}
