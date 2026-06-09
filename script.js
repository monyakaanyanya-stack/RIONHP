/* ============================================================
   RION Performance Coaching — Scripts (Enhanced)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile nav ----------
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navOverlay = document.querySelector('.header__overlay');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      nav.classList.toggle('is-open');
      if (navOverlay) navOverlay.classList.toggle('is-open');
    });

    const closeNav = () => {
      burger.classList.remove('is-active');
      nav.classList.remove('is-open');
      if (navOverlay) navOverlay.classList.remove('is-open');
    };

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeNav);
    }
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      document.querySelectorAll('.faq-item__question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.classList.remove('is-open');
      });

      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('is-open');
      }
    });
  });

  // ---------- Scroll fade-up ----------
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  // ---------- Stagger animation ----------
  const staggerParents = new Set();
  document.querySelectorAll('.stagger-item').forEach(el => {
    staggerParents.add(el.parentElement);
  });

  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const parent = entry.target;
          const items = parent.querySelectorAll('.stagger-item');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('is-visible');
            }, i * 120);
          });
          staggerObserver.unobserve(parent);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  staggerParents.forEach(parent => staggerObserver.observe(parent));

  // ---------- Header scroll (hide/show + style) ----------
  const header = document.getElementById('header');
  let lastScroll = 0;
  let headerTicking = false;

  window.addEventListener('scroll', () => {
    if (!headerTicking) {
      requestAnimationFrame(() => {
        const current = window.scrollY;

        if (current > 80) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }

        if (current > lastScroll && current > 400) {
          header.classList.add('header--hidden');
        } else {
          header.classList.remove('header--hidden');
        }

        lastScroll = current;
        headerTicking = false;
      });
      headerTicking = true;
    }
  });

  // ---------- Scroll progress bar ----------
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // ---------- Hero particles ----------
  const particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'hero__particle';
      p.style.left = Math.random() * 100 + '%';
      const size = (Math.random() * 3 + 1) + 'px';
      p.style.width = size;
      p.style.height = size;
      p.style.animationDuration = (Math.random() * 8 + 6) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      particleContainer.appendChild(p);
    }
  }

  // ---------- Hero parallax on mouse move ----------
  const hero = document.getElementById('hero');
  const heroContent = hero ? hero.querySelector('.hero__content') : null;
  const heroBg = hero ? hero.querySelector('.hero__bg-gradient') : null;

  if (hero && heroContent && window.innerWidth > 768) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroContent.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
      if (heroBg) {
        heroBg.style.transform = `translate(${x * 15}px, ${y * 15}px) scale(1.05)`;
      }
    });

    hero.addEventListener('mouseleave', () => {
      heroContent.style.transition = 'transform 0.6s ease';
      heroContent.style.transform = '';
      if (heroBg) {
        heroBg.style.transition = 'transform 0.6s ease';
        heroBg.style.transform = '';
      }
      setTimeout(() => {
        heroContent.style.transition = '';
        if (heroBg) heroBg.style.transition = '';
      }, 600);
    });
  }

  // ---------- Card glow follow mouse ----------
  document.querySelectorAll('.worry-card, .coaching-card, .value-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // ---------- Subtle parallax on scroll for key elements ----------
  const parallaxEls = document.querySelectorAll('.about__headline, .closing__lead');
  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        parallaxEls.forEach(el => {
          const rect = el.getBoundingClientRect();
          const windowH = window.innerHeight;
          if (rect.top < windowH && rect.bottom > 0) {
            const progress = (windowH - rect.top) / (windowH + rect.height);
            const offset = (progress - 0.5) * -15;
            el.style.transform = `translateY(${offset}px)`;
          }
        });
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // ---------- Smooth anchor scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerH = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
