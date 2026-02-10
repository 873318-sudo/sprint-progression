document.addEventListener('DOMContentLoaded', () => {
    // only run if hero exists
    const hero = document.querySelector('.hero');
    if (!hero) return; 

    // text splitting
    document.querySelectorAll('.split-heading').forEach(h1 => {
        h1.innerHTML = h1.innerHTML.split('<br>').map(line => `<span class="line">${line}</span>`).join('');
    });

    document.querySelectorAll('.split-subheading').forEach(h2 => {
        h2.innerHTML = `<span class="line">${h2.textContent}</span>`;
    });

    // paragraph splitting
    document.querySelectorAll('.hero-content p').forEach(p => {
        const text = p.innerHTML.trim();
        p.innerHTML = `<span class="line paragraph">${text}</span>`;
    });

    // observer
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // animated lines
                const lines = entry.target.querySelectorAll('.line');
                lines.forEach((line, i) => {
                    setTimeout(() => line.classList.add('active'), i * 150);
                });

                // animate images
                const images = entry.target.querySelectorAll('.hero-visual');
                images.forEach((img, i) => {
                    setTimeout(() => img.classList.add('active'), 400 + (i * 200));
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(hero);
});