// script.js - Interactivity for BZI Recruitment Site
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile Hamburger Menu ---------- */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', String(!isOpen));

            // Simple X animation
            if (!isOpen) {
                bar1.style.transform = 'rotate(45deg) translate(4px, 4px)';
                bar2.style.opacity = '0';
                bar3.style.transform = 'rotate(-45deg) translate(4px, -4px)';
            } else {
                bar1.style.transform = 'none';
                bar2.style.opacity = '1';
                bar3.style.transform = 'none';
            }
        });

        // Close menu after tapping a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                bar1.style.transform = 'none';
                bar2.style.opacity = '1';
                bar3.style.transform = 'none';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Job Vacancy Listings ---------- */
    const jobListings = document.getElementById('job-listings');
    const jobs = [
        { title: 'Heavy Duty Driver', country: 'Saudi Arabia', type: 'Skilled', salary: 'SAR 1,800 - 2,200 / month', seats: 12 },
        { title: 'Electrician (Industrial)', country: 'UAE', type: 'Skilled', salary: 'AED 2,000 - 2,500 / month', seats: 8 },
        { title: 'Warehouse Helper', country: 'Qatar', type: 'Unskilled', salary: 'QAR 1,200 - 1,400 / month', seats: 25 },
        { title: 'CNC Machine Operator', country: 'Saudi Arabia', type: 'Skilled', salary: 'SAR 2,000 - 2,600 / month', seats: 6 },
        { title: 'Construction Labor', country: 'Oman', type: 'Unskilled', salary: 'OMR 130 - 160 / month', seats: 30 },
        { title: 'AC Technician', country: 'UAE', type: 'Skilled', salary: 'AED 1,900 - 2,300 / month', seats: 10 },
    ];

    if (jobListings) {
        jobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card';
            card.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-bold text-gray-900">${job.title}</h3>
                    <span class="job-badge">${job.type}</span>
                </div>
                <p class="text-sm text-gray-500 mb-1">📍 ${job.country}</p>
                <p class="text-sm text-gray-700 font-semibold mb-1">${job.salary}</p>
                <p class="text-xs text-green-600 font-semibold mb-4">${job.seats} seats available</p>
                <a href="#apply" class="block text-center btn-premium py-2 rounded text-sm font-bold">Apply For This Role</a>
            `;
            jobListings.appendChild(card);
        });
    }

    /* ---------- FAQ Accordion ---------- */
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    /* ---------- License Image Lightbox ---------- */
    const licenseThumb = document.getElementById('license-thumb');
    const lightbox = document.getElementById('license-lightbox');
    const lightboxClose = document.getElementById('lightbox-close');

    if (licenseThumb && lightbox) {
        licenseThumb.addEventListener('click', () => lightbox.classList.remove('hidden'));
        lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.add('hidden');
        });
    }

    /* ---------- Candidate Application Form ---------- */
    const submitBtn = document.getElementById('app-submit-btn');
    const statusMsg = document.getElementById('app-status');

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const name = document.getElementById('app-name').value.trim();
            const phone = document.getElementById('app-phone').value.trim();
            const trade = document.getElementById('app-trade').value.trim();

            if (!name || !phone || !trade) {
                statusMsg.textContent = 'Please fill your Name, Contact Number, and Trade before submitting.';
                statusMsg.className = 'text-sm text-center mt-4 text-red-600 font-semibold';
                statusMsg.classList.remove('hidden');
                return;
            }

            // Note: this is a static front-end demo. Wire this up to your
            // backend / form service (e.g. Formspree, Google Sheets API,
            // or your own server) to actually receive submissions.
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                statusMsg.textContent = `Thank you ${name}, your application has been received. Our HR team will contact you on ${phone} shortly.`;
                statusMsg.className = 'text-sm text-center mt-4 text-green-700 font-semibold';
                statusMsg.classList.remove('hidden');
                submitBtn.textContent = 'Submit Application';
                submitBtn.disabled = false;
            }, 1200);
        });
    }
});
