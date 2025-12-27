document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DE AUTENTICACIÓN CON FIREBASE ---
    // TODO: Pega aquí tu objeto de configuración de Firebase
    const firebaseConfig = {
        apiKey: "TU_API_KEY",
        authDomain: "TU_AUTH_DOMAIN",
        projectId: "TU_PROJECT_ID",
        storageBucket: "TU_STORAGE_BUCKET",
        messagingSenderId: "TU_MESSAGING_SENDER_ID",
        appId: "TU_APP_ID"
    };

    // Inicializar Firebase
    // Nota: Verificamos si firebase está definido para evitar errores si el script no carga
    if (typeof firebase !== 'undefined') {
        try {
            firebase.initializeApp(firebaseConfig);
            const auth = firebase.auth();
            const provider = new firebase.auth.GoogleAuthProvider();
            
            const loginBtn = document.getElementById('login-btn');

            if (loginBtn) {
                // Manejar clic en el botón de login
                loginBtn.addEventListener('click', () => {
                    if (auth.currentUser) {
                        // Si el usuario ya está logueado, hacer logout
                        auth.signOut();
                    } else {
                        // Si no, iniciar sesión con Google
                        auth.signInWithPopup(provider).catch(error => {
                            console.error("Error durante el inicio de sesión:", error);
                        });
                    }
                });

                // Escuchar cambios en el estado de autenticación
                auth.onAuthStateChanged(user => {
                    if (user) {
                        // Usuario ha iniciado sesión
                        console.log('Usuario conectado: ' + user.displayName);
                        console.log('Email: ' + user.email);
                        loginBtn.textContent = 'Mi Cuenta';
                    } else {
                        // Usuario ha cerrado sesión
                        loginBtn.textContent = 'Iniciar Sesión';
                    }
                });
            }
        } catch (e) {
            console.log("Firebase no configurado o error al iniciar:", e);
        }
    }

    // --- 2. LÓGICA DEL CAMBIADOR DE TEMA (MODO OSCURO/CLARO) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        if (icon) icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

        themeToggle.addEventListener('click', () => {
            let newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (icon) icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // --- 3. LÓGICA DEL SISTEMA DE TABS ---
    const tabsNav = document.querySelector('.tabs-nav');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabsNav) {
        tabsNav.addEventListener('click', (e) => {
            if (e.target.matches('.tab-button')) {
                const tabId = e.target.dataset.tab;
                tabsNav.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                e.target.classList.add('active');
                const panel = document.getElementById(tabId);
                if (panel) panel.classList.add('active');
            }
        });
    }

    // --- 4. LÓGICA DE ANIMACIÓN AL HACER SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
});
