// ============================================
// MÚSICA DE FONDO
// ============================================
const weddingMusic = document.getElementById('weddingMusic');
let musicStarted = false;

function tryPlayMusic() {
    if (!weddingMusic || musicStarted) return;
    weddingMusic.play().then(() => {
        musicStarted = true;
        document.getElementById('musicIcon')?.classList.add('music-playing');
    }).catch(() => {});
}

// Loader: se cierra al tocar/clic (garantiza que la música empiece al "abrir")
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    let closed = false;
    
    function closeLoaderAndPlay() {
        if (closed) return;
        closed = true;
        loader.classList.add('hidden');
        tryPlayMusic();
        setTimeout(() => { loader.style.display = 'none'; }, 600);
    }
    
    loader.addEventListener('click', closeLoaderAndPlay, { once: true });
    loader.addEventListener('touchstart', closeLoaderAndPlay, { once: true, passive: true });
    
    setTimeout(closeLoaderAndPlay, 3000);

    // Si el autoplay fue bloqueado, intentar reproducir en el primer toque/clic en cualquier parte
    function tryPlayOnFirstInteraction() {
        tryPlayMusic();
        document.removeEventListener('click', tryPlayOnFirstInteraction);
        document.removeEventListener('touchstart', tryPlayOnFirstInteraction);
    }
    document.addEventListener('click', tryPlayOnFirstInteraction, { once: true });
    document.addEventListener('touchstart', tryPlayOnFirstInteraction, { once: true, passive: true });
});

// ============================================
// LOADING SCREEN
// ============================================

// ============================================
// CONTADOR REGRESIVO AVANZADO
// ============================================
function updateCountdown() {
    const weddingDate = new Date('2026-09-12T16:00:00');
    const now = new Date();
    const timeDiff = weddingDate - now;

    if (timeDiff <= 0) {
        document.getElementById('days').textContent = '000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Animación de cambio de números
    const animateNumber = (element, newValue, oldValue) => {
        if (newValue !== oldValue) {
            element.style.transform = 'scale(1.2)';
            element.style.color = 'var(--gold)';
            setTimeout(() => {
                element.textContent = String(newValue).padStart(3, '0');
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 200);
        } else {
            element.textContent = String(newValue).padStart(3, '0');
        }
    };

    animateNumber(document.getElementById('days'), days, parseInt(document.getElementById('days').textContent) || 0);
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Actualizar contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================
// ANIMACIONES AL SCROLL (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos al cargar
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.event-card, .gallery-item, .message-card, .dress-code-card, .countdown-card, .invitation-card, .ceremony-card, .envelope-card, .qr-recuerdos-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ============================================
// PARALLAX EFFECT EN HERO
// ============================================
let lastScrollTop = 0;
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    if (hero && heroImage) {
        const heroHeight = hero.offsetHeight;
        if (scrolled < heroHeight) {
            if (isMobile) {
                // Parallax reducido en móviles para mejor rendimiento
                const parallaxOffset = scrolled * 0.1;
                heroImage.style.transform = `translate(-50%, calc(-50% + ${parallaxOffset}px)) scale(1.1)`;
            } else {
                // Parallax completo en desktop
                const parallaxOffset = scrolled * 0.25;
                const scale = 1.05 + (scrolled / heroHeight) * 0.03;
                heroImage.style.transform = `translate(-50%, calc(-50% + ${parallaxOffset}px)) scale(${scale})`;
            }
        }
    }
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (scrolled > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    lastScrollTop = scrolled;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// ============================================
// BACK TO TOP BUTTON
// ============================================
document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// FOOTER ICONS FUNCTIONALITY
// ============================================
document.getElementById('countdownIcon')?.addEventListener('click', () => {
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// BOTÓN AGENDAR RECORDATORIO
// ============================================
document.getElementById('btnReminder')?.addEventListener('click', (e) => {
    e.preventDefault();
    const weddingDate = new Date('2026-09-12T16:00:00');
    const title = encodeURIComponent('Boda Helen & Juan David');
    const details = encodeURIComponent('¡Te esperamos en nuestra boda! Urapanes del Bosque, Cajamarca - Tolima');
    const location = encodeURIComponent('Urapanes del Bosque, Cajamarca, Tolima');
    const startDate = weddingDate.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(weddingDate.getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, '');
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(googleUrl, '_blank', 'noopener,noreferrer');
});

document.getElementById('galleryIcon')?.addEventListener('click', () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btnVerFotos')?.addEventListener('click', () => {
    document.getElementById('galleryGrid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.getElementById('musicIcon')?.addEventListener('click', () => {
    if (!weddingMusic) return;
    if (weddingMusic.paused) {
        weddingMusic.play();
        document.getElementById('musicIcon')?.classList.add('music-playing');
    } else {
        weddingMusic.pause();
        document.getElementById('musicIcon')?.classList.remove('music-playing');
    }
});

document.getElementById('qrIcon')?.addEventListener('click', () => {
    document.getElementById('recuerdos')?.scrollIntoView({ behavior: 'smooth' });
});

// ============================================
// FORMULARIO RSVP
// Guardado: Google Sheets (ilimitado) + localStorage (respaldo)
// ============================================
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbymymb4dTawe3djNr9dMxjmjlw9qGsY3NYV1FldrbrYg60X7_1KqI5qG1pJMkkIEpC_fw/exec';
const rsvpForm = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            attendance: document.querySelector('input[name="attendance"]:checked')?.value,
            allergies: document.getElementById('allergies')?.value || '',
            message: document.getElementById('rsvpMessage').value,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('rsvps', JSON.stringify([...(JSON.parse(localStorage.getItem('rsvps') || '[]')), formData]));
        
        if (GOOGLE_SHEETS_URL) {
            try {
                const params = new URLSearchParams({
                    name: formData.name,
                    attendance: formData.attendance || '',
                    allergies: formData.allergies,
                    message: formData.message,
                    timestamp: formData.timestamp
                });
                await fetch(GOOGLE_SHEETS_URL + '?' + params.toString(), { method: 'GET' });
            } catch (err) {}
        }
        
        const formWrapper = document.getElementById('rsvpFormWrapper');
        if (formWrapper) formWrapper.style.display = 'none';
        rsvpSuccess.style.display = 'block';
        setTimeout(() => rsvpSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    });
}

// ============================================
// GALERÍA DE IMÁGENES
// ============================================
function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const imageUrls = [
        'images/imagen1.jpg',
        'images/imagen2.jpg',
        'images/imagen3.jpg',
        'images/imagen4.jpg',
        'images/imagen5.jpg',
        'images/imagen6.jpg'
    ];
    
    galleryGrid.innerHTML = '';
    
    const sizeClasses = ['gallery-item-small', 'gallery-item-small', 'gallery-item-wide', 'gallery-item-large', 'gallery-item-tall', 'gallery-item-small'];
    const rotationClasses = ['gallery-rotate-left', 'gallery-rotate-right', '', 'gallery-rotate-left', 'gallery-rotate-right', 'gallery-rotate-left'];
    
    imageUrls.forEach((url, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item fade-in ' + sizeClasses[index] + ' ' + rotationClasses[index];
        
        const imgWrap = document.createElement('div');
        imgWrap.className = 'gallery-img-wrap';
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Fotografía ${index + 1} de Helen & Juan David`;
        img.loading = 'lazy';
        img.onerror = function() {
            this.style.display = 'none';
        };
        imgWrap.appendChild(img);
        galleryItem.appendChild(imgWrap);
        galleryItem.addEventListener('click', () => openImageModal(url));
        
        galleryGrid.appendChild(galleryItem);
        observer.observe(galleryItem);
    });
}

// Modal para ver imagen en grande - optimizado para móvil
function openImageModal(imageUrl) {
    const isMobile = window.innerWidth <= 768;
    
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease-out;
        padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    `;
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Fotografía ampliada';
    img.style.cssText = `
        max-width: ${isMobile ? '95%' : '90%'};
        max-height: ${isMobile ? '85%' : '90%'};
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Cerrar');
    closeBtn.style.cssText = `
        position: absolute;
        top: max(20px, env(safe-area-inset-top));
        right: max(20px, env(safe-area-inset-right));
        color: white;
        font-size: ${isMobile ? '2rem' : '3rem'};
        cursor: pointer;
        width: ${isMobile ? '48px' : '50px'};
        height: ${isMobile ? '48px' : '50px'};
        min-width: 44px;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.25)';
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.15)';
        closeBtn.style.transform = 'scale(1)';
    });
    
    closeBtn.addEventListener('touchstart', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        closeBtn.style.transform = 'scale(0.95)';
    }, { passive: true });
    
    closeBtn.addEventListener('touchend', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.15)';
        closeBtn.style.transform = 'scale(1)';
    }, { passive: true });
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === closeBtn) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Sección Mesa de Regalos - diseño estático elegante (sin animación de sobres)

// ============================================
// EFECTOS DE HOVER MEJORADOS
// ============================================
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// PREVENIR ZOOM EN DOBLE TAP (MÓVILES)
// ============================================
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    updateCountdown();
    
    // Agregar animación a elementos con data-aos
    document.querySelectorAll('[data-aos]').forEach((el, index) => {
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease-out';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(el);
        }, delay);
    });
});

// ============================================
// MENSAJE EN CONSOLA
// ============================================
console.log('%c💒 Invitación de Boda - Helen & Juan David', 'color: #133514; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado con amor para una ocasión especial ❤️', 'color: #d4af37; font-size: 12px;');
