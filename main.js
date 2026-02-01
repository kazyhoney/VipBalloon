document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // EmailJS initialization
    const EMAILJS_PUBLIC_KEY = 'iLvNnFQfkCRSfu1CE';
    const EMAILJS_SERVICE_ID = 'service_gf1uq1m';
    const EMAILJS_TEMPLATE_ID = 'template_fnfjts6';

    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = '送信中...';

            try {
                // Prepare template parameters
                const templateParams = {
                    to_email: 'info@kazaori.co.jp',
                    from_name: contactForm.querySelector('#name').value,
                    from_email: contactForm.querySelector('#email').value,
                    phone: contactForm.querySelector('#phone').value || '未入力',
                    plan: contactForm.querySelector('#plan').value || '未選択',
                    message: contactForm.querySelector('#message').value
                };

                // Send email via EmailJS
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

                // Show success message
                showSuccessMessage();

                // Reset form
                contactForm.reset();

            } catch (error) {
                console.error('送信エラー:', error);
                alert('送信に失敗しました。お手数ですが、もう一度お試しください。');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    function showSuccessMessage() {
        // Create success message overlay
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✓</div>
                <h3>お問い合わせありがとうございます</h3>
                <p>お問い合わせを受け付けました。<br>2営業日以内にご返信させていただきます。</p>
                <button class="btn btn-gold" onclick="this.closest('.success-overlay').remove()">閉じる</button>
            </div>
        `;
        document.body.appendChild(overlay);

        // Auto close after 5 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 5000);
    }
});
