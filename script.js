document.addEventListener('DOMContentLoaded', function () {

    // ---- Initialize AOS (Animations) ----
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ---- Mobile Menu ----
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // ---- Back to Top Button ----
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Animated Stats Counter ----
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.parentElement.querySelector('.stat-suffix')?.innerText || '';
        let current = 0;
        const increment = target / 80; // speed
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current);
            }
        }, 20);
    }

    function checkStatsVisibility() {
        if (animated) return;
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            animated = true;
            statNumbers.forEach(el => animateCounter(el));
        }
    }

    window.addEventListener('scroll', checkStatsVisibility);
    checkStatsVisibility(); // check on load

    // ---- Flight Deals ----
    const flights = [
        { from: 'Multan', to: 'Jeddah', airline: 'Saudia', price: 'PKR 89,900', seats: 12 },
        { from: 'Lahore', to: 'Dubai', airline: 'Emirates', price: 'PKR 72,500', seats: 8 },
        { from: 'Islamabad', to: 'Riyadh', airline: 'FlyDubai', price: 'PKR 65,200', seats: 15 },
        { from: 'Karachi', to: 'Doha', airline: 'Qatar Airways', price: 'PKR 78,000', seats: 6 }
    ];
    const flightsGrid = document.getElementById('flightsGrid');
    if (flightsGrid) {
        flights.forEach((f, index) => {
            const card = document.createElement('div');
            card.className = 'flight-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
            card.innerHTML = `
                <div class="route"><span>${f.from}</span><i class="fas fa-arrow-right"></i><span>${f.to}</span></div>
                <div style="font-size:0.8rem;color:var(--gray-600);font-weight:600;margin-top:-2px;">${f.airline}</div>
                <div class="meta"><span><i class="fas fa-users"></i> ${f.seats} seats left</span><span><i class="fas fa-calendar-alt"></i> Flexible</span></div>
                <div class="price">${f.price} <small>round-trip</small></div>
                <a href="#contact" class="btn btn-primary" style="padding:10px 24px;font-size:0.8rem;">Book Now</a>
            `;
            flightsGrid.appendChild(card);
        });
        // Re-init AOS for dynamically added elements
        AOS.refresh();
    }

    // ---- Flight Search Form ----
    const searchForm = document.getElementById('flightSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const from = document.getElementById('fromCity').value || 'your city';
            const to = document.getElementById('toCity').value || 'your destination';
            const depart = document.getElementById('departDate').value || 'soon';
            const cls = document.getElementById('flightClass').value;
            alert(`🔍 Searching flights from ${from} to ${to}\n📅 Departure: ${depart}\n🛫 Class: ${cls}\n\nOur team will contact you with the best options.`);
        });
    }

    // ---- Application Form ----
    const form = document.getElementById('applicationForm');
    const status = document.getElementById('formStatus');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('appName').value.trim();
            const phone = document.getElementById('appPhone').value.trim();
            const email = document.getElementById('appEmail').value.trim();
            const service = document.getElementById('appService').value;
            const message = document.getElementById('appMessage').value.trim();

            if (!name || !phone) {
                status.style.color = '#dc2626';
                status.textContent = '❌ Please fill in your Name and Phone Number.';
                return;
            }

            const btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            status.style.color = '#16a34a';
            status.textContent = '⏳ Submitting...';

            const data = { name, phone, email, service, message };

            fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(result => {
                    status.textContent = `✅ ${result.message || 'Application received!'} Our team will contact you on ${phone}.`;
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
                    form.reset();
                })
                .catch(err => {
                    status.textContent = `✅ Thank you ${name}! Your application has been received. (Demo mode)`;
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
                    form.reset();
                    console.warn('Backend not reachable, demo mode.', err);
                });
        });
    }

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});
