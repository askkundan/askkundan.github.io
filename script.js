// ---------------------------------------------------------------
// Kundan Kumar — Portfolio interactions
// ---------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------
     Mobile navigation toggle
     ------------------------------------------------------------- */

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {

    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach((a) => {

      a.addEventListener('click', () => {
        links.classList.remove('open');
      });

    });
  }


  /* -------------------------------------------------------------
     Mark active navigation link based on current page
     ------------------------------------------------------------- */

  const current =
    location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach((a) => {

    const href = a.getAttribute('href');

    if (
      href === current ||
      (current === '' && href === 'index.html')
    ) {
      a.classList.add('active');
    }

  });


  /* -------------------------------------------------------------
     Animate skill meters / dials / language bars
     ------------------------------------------------------------- */

  const fillTargets =
    document.querySelectorAll('[data-fill]');

  if (fillTargets.length) {

    const io = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const el = entry.target;
          const value =
            el.getAttribute('data-fill');

          if (el.classList.contains('dial-ring')) {

            const circumference = 251.2;

            const offset =
              circumference -
              (circumference * value / 100);

            el.style.strokeDashoffset = offset;

          } else {

            el.style.width = value + '%';

          }

          io.unobserve(el);

        });

      },
      {
        threshold: 0.4
      }
    );

    fillTargets.forEach((el) => {
      io.observe(el);
    });

  }


  /* -------------------------------------------------------------
     Animate numeric counters
     ------------------------------------------------------------- */

  const counters =
    document.querySelectorAll('[data-count]');

  if (counters.length) {

    const ioC = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const el = entry.target;

          const target =
            parseInt(
              el.getAttribute('data-count'),
              10
            );

          const suffix =
            el.getAttribute('data-suffix') || '';

          const duration = 1100;
          const start = performance.now();

          function tick(now) {

            const progress =
              Math.min(
                (now - start) / duration,
                1
              );

            const eased =
              1 - Math.pow(1 - progress, 3);

            el.textContent =
              Math.round(eased * target) +
              suffix;

            if (progress < 1) {
              requestAnimationFrame(tick);
            }

          }

          requestAnimationFrame(tick);

          ioC.unobserve(el);

        });

      },
      {
        threshold: 0.5
      }
    );

    counters.forEach((el) => {
      ioC.observe(el);
    });

  }

});
