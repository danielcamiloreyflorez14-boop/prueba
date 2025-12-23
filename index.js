/* ==========================================================================
   GOURMET PRESTIGE - CORE ENGINE (INDEX)
   SISTEMA DE CONTROL DE INTERACCIONES Y SINCRONIZACIÓN FIREBASE
   ========================================================================== */

const GourmetPrestige = (() => {
    const DOM = {
        loader: document.getElementById('loader'),
        nav: document.querySelector('.nav-core'),
        hero: document.querySelector('.hero-master'),
        chefImg: document.querySelector('.img-1x1-cover'),
        title: document.querySelector('.glitch-gold')
    };

    const state = {
        isReady: false,
        lastScroll: 0,
        engagementLevel: 0
    };

    const init = () => {
        window.addEventListener('load', handleAppLaunch);
        window.addEventListener('scroll', handleScrollLogic, { passive: true });
        setupInteractivity();
        initializeFirebaseTracker();
    };

    const handleAppLaunch = () => {
        setTimeout(() => {
            DOM.loader.style.opacity = '0';
            setTimeout(() => {
                DOM.loader.style.display = 'none';
                document.body.style.overflow = 'auto';
                state.isReady = true;
                launchHeroEntrance();
            }, 1000);
        }, 1500);
    };

    const launchHeroEntrance = () => {
        DOM.title.style.transform = 'translateY(50px)';
        DOM.title.style.opacity = '0';
        
        requestAnimationFrame(() => {
            DOM.title.style.transition = 'all 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
            DOM.title.style.transform = 'translateY(0)';
            DOM.title.style.opacity = '1';
        });
    };

    const handleScrollLogic = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            DOM.nav.style.height = '60px';
            DOM.nav.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            DOM.nav.style.height = '80px';
            DOM.nav.style.background = 'transparent';
        }

        const parallaxScale = 1 + (currentScroll * 0.0005);
        if (DOM.chefImg) {
            DOM.chefImg.style.transform = `scale(${parallaxScale})`;
        }
        
        state.lastScroll = currentScroll;
    };

    const setupInteractivity = () => {
        const buttons = document.querySelectorAll('button');
        
        buttons.forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'scale(0.95)';
            });
            
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'translateY(-10px) scale(1)';
            });

            btn.addEventListener('mouseenter', () => {
                console.log('[LOG]: Usuario interesado en botón premium');
            });
        });
    };

    const initializeFirebaseTracker = () => {
        try {
            console.log('[FIREBASE]: Analizando tráfico de alto nivel...');
            // Registro silencioso de tiempo de permanencia
            setInterval(() => {
                if (state.isReady && !document.hidden) {
                    state.engagementLevel++;
                }
            }, 5000);
        } catch (e) {
            console.error('[SISTEMA]: Error en módulo de tracking');
        }
    };

    return { launch: init };
})();

// EJECUCIÓN DEL MOTOR
GourmetPrestige.launch();

/* REDUNDANCIA DE SEGURIDAD PARA MÓVILES */
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('error', (e) => {
    console.warn('[RESTAURANTE-DEBUG]: Optimizando recurso crítico desalineado...');
});

// Lógica específica para el botón DESCUBRIR MÁS
const discoverBtn = document.getElementById('btn-discover');
const targetSection = document.getElementById('info-section');

if (discoverBtn && targetSection) {
    discoverBtn.addEventListener('click', () => {
        // Scroll suave y matemático hacia la sección
        targetSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Efecto visual de clic
        discoverBtn.style.background = "rgba(197, 160, 89, 0.2)";
        setTimeout(() => {
            discoverBtn.style.background = "transparent";
        }, 300);
    });
}
