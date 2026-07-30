// 1. LENIS KURULUMU
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

// 2. MANYETİK İMLEÇ
const cursor = document.querySelector('.custom-cursor');
const cursorText = document.querySelector('.cursor-text');

if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    });

    document.querySelectorAll('[data-cursor]').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorText.textContent = item.getAttribute('data-cursor');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorText.textContent = '';
        });
    });
}

// 3. MENÜ YÖNLENDİRMELERİ
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'), { offset: -90, duration: 1.5 });
    });
});

// 4. OTOMATİK SLAYT MOTORU
const slideshows = document.querySelectorAll('.slideshow');

slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide');
    if(slides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3500);
    }
});

// 5. İÇSEL PARALLAX (VİDEO)
gsap.to(".parallax-inner", {
    yPercent: 20, ease: "none",
    scrollTrigger: { trigger: ".parallax-container", start: "top bottom", end: "bottom top", scrub: true }
});

// 6. SİNEMATİK KAYDIRMA ANİMASYONLARI
gsap.from(".hero-bg", { scale: 1.2, opacity: 0, duration: 2, ease: "power3.out" });
gsap.from(".hero-title", { y: 60, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.3 });
gsap.from(".hero-logo", { y: 40, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.5 });

const revealSections = gsap.utils.toArray('.gs-reveal');

revealSections.forEach(section => {
    const boxes = section.querySelectorAll('.gs-box');
    
    gsap.from(section.querySelector('.section-title'), {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" }
    });
    
    if(boxes.length > 0) {
        gsap.from(boxes, {
            y: 80, opacity: 0, scale: 0.95, duration: 1.2, stagger: 0.2, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 75%" }
        });
    }
});

// 7. VLOG VİDEO ÖNİZLEME (HOVER) SİSTEMİ
const vlogCards = document.querySelectorAll('.vlog-card');

vlogCards.forEach(card => {
    const video = card.querySelector('.preview-video');
    
    if (window.matchMedia("(pointer: fine)").matches && video) {
        card.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log("Video oynatma hatası:", e));
        });
        
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; 
        });
    }
});
