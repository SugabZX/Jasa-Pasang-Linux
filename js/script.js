// ============================================================
// LinuxKop — Custom JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- Smooth scroll untuk link jangkar ----
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 60;
                window.scrollTo({ top: top, behavior: 'smooth' });
                // tutup navbar mobile jika terbuka
                const navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navCollapse)?.hide();
                }
            }
        });
    });

    // ---- Navbar efek scroll + tombol back-to-top ----
    const navbar = document.getElementById('mainNav');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 40) { navbar.classList.add('scrolled'); }
        else { navbar.classList.remove('scrolled'); }
        if (window.scrollY > 500) { backToTop.classList.add('show'); }
        else { backToTop.classList.remove('show'); }
    });
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Sorot menu aktif sesuai section yang dilihat ----
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(function (l) {
                    l.classList.toggle('active', l.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spyObserver.observe(s); });

    // ---- Animasi fade-up saat elemen masuk viewport ----
    const animated = document.querySelectorAll('.service-card, .distro-card, .stat-item, .advantage-item, .about-image-wrap, .terminal-card');
    animated.forEach(function (el) { el.classList.add('fade-up'); });
    const fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('data-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    animated.forEach(function (el) { fadeObserver.observe(el); });

    // ---- Animasi hitung angka statistik ----
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 60));
                const timer = setInterval(function () {
                    current += step;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = current + (target === 98 ? '%' : target === 30 ? '' : '+');
                }, 25);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObserver.observe(c); });

    // ---- Validasi & submit form kontak ----
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;
            ['nama', 'email', 'pesan'].forEach(function (id) {
                const field = document.getElementById(id);
                const ok = id === 'email'
                    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
                    : field.value.trim() !== '';
                field.classList.toggle('is-invalid', !ok);
                if (!ok) valid = false;
            });
            if (valid) {
                form.reset();
                success.classList.remove('d-none');
                setTimeout(function () { success.classList.add('d-none'); }, 5000);
            }
        });
        // hapus pesan error saat user mulai mengetik
        form.querySelectorAll('input, textarea').forEach(function (f) {
            f.addEventListener('input', function () { this.classList.remove('is-invalid'); });
        });
    }

    console.log('LinuxKop — website jasa pasang Linux siap digunakan!');
});
