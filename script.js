const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir navegación' : 'Cerrar navegación');
  mobileMenu?.classList.toggle('is-open', !isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir navegación');
    mobileMenu.classList.remove('is-open');
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Detiene la marquesina de reseñas cuando su sección está fuera de pantalla.
const testimonialSection = document.querySelector('.testimonial-section');
if (testimonialSection && 'IntersectionObserver' in window) {
  testimonialSection.classList.add('is-offscreen');
  const testimonialObserver = new IntersectionObserver(([entry]) => {
    testimonialSection.classList.toggle('is-offscreen', !entry.isIntersecting);
  }, { threshold: .01 });
  testimonialObserver.observe(testimonialSection);
}

if (window.gsap && window.ScrollTrigger && !reducedMotion) {
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // ===== Entrada premium del hero =====
  // El título, subtítulo, tarjetas, header y CTA ya se animan con las
  // keyframes CSS del diseño original (title-up, stat-in, cta-up...).
  // GSAP solo añade el asentamiento cinematográfico de la foto de fondo,
  // que no tiene animación CSS, para no duplicar ni pisar nada.
  const heroImg = document.querySelector('.hero__backdrop img');
  if (heroImg) {
    gsap.fromTo(heroImg,
      { scale: 1.06 },
      { scale: 1.035, duration: 1.9, ease: 'power2.out', clearProps: 'transform' }
    );
  }

  // Parallax sutil del fondo al dejar el hero (escala, sin descubrir bordes).
  const heroBackdrop = document.querySelector('.hero__backdrop');
  const heroSection = document.querySelector('.hero');
  if (heroBackdrop && heroSection) {
    gsap.fromTo(heroBackdrop,
      { scale: 1 },
      {
        scale: 1.09,
        ease: 'none',
        scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true },
      }
    );
  }

  // Reveals suaves de texto (idénticos al diseño de referencia).
  const textReveal = (sectionSelector, textSelector, fromVars, start = 'top 84%') => {
    const section = document.querySelector(sectionSelector);
    if (!section) return;
    const targets = gsap.utils.toArray(section.querySelectorAll(textSelector));
    if (!targets.length) return;

    gsap.fromTo(targets,
      { autoAlpha: 0, ...fromVars },
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: .72,
        stagger: .105,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: section, start, once: true },
      }
    );
  };

  // Reveals suaves de texto.
  textReveal('.about-section', '.section-kicker, h2, .section-body', { y: 20 });
  textReveal('.services-section', '.section-kicker, h2, .section-intro > p', { x: -18 }, 'top 86%');

  textReveal('.featured-section', '.section-kicker, h2, .featured-copy > p:not(.section-kicker), .featured-copy dl', { y: 22 });
  textReveal('.testimonial-section', '.testimonial-heading > .section-kicker, .testimonial-heading > h2, .testimonial-heading > p:last-child', { x: 16 }, 'top 88%');
  textReveal('.contact-section', '.contact-copy > .section-kicker, .contact-copy > h2, .contact-copy > .contact-lead', { y: 19 }, 'top 86%');

  // Animación premium de la sección de departamentos.
  const selected = document.querySelector('.selected-section');
  if (selected) {
    const cards = gsap.utils.toArray('.selected-card', selected);
    const headingItems = [selected.querySelector('.section-kicker'), selected.querySelector('h2'), selected.querySelector('.outline-button')].filter(Boolean);
    const selectedTimeline = gsap.timeline({
      scrollTrigger: { trigger: selected, start: 'top 80%', once: true },
      onComplete: () => gsap.set([...headingItems, ...cards], { clearProps: 'transform,opacity,visibility' }),
    });

    selectedTimeline
      .from(headingItems[0], { x: -30, autoAlpha: 0, duration: .6, ease: 'power3.out' })
      .from(headingItems[1], { x: -52, autoAlpha: 0, duration: .85, ease: 'power4.out' }, '-=.32')
      .from(headingItems[2], { x: 36, autoAlpha: 0, duration: .65, ease: 'power3.out' }, '-=.55')
      .fromTo(cards,
        { x: (index) => index % 2 ? 66 : -66, clipPath: (index) => index % 2 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', autoAlpha: 0 },
        { x: 0, clipPath: 'inset(0 0% 0 0%)', autoAlpha: 1, duration: 1, stagger: .1, ease: 'power4.inOut' },
        '-=.18'
      );
  }

  // Reveal elegante de las imágenes grandes (mismo lenguaje visual que los departamentos).
  const imageReveal = (containerSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const img = container.querySelector('img');
    const badge = container.querySelector('.since-badge');
    if (!img) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: container, start: 'top 82%', once: true },
      onComplete: () => {
        gsap.set(img, { clearProps: 'transform,opacity,visibility' });
        if (badge) gsap.set(badge, { clearProps: 'transform,opacity,visibility' });
      },
    });

    tl.fromTo(img,
      { clipPath: 'inset(12% 7% 12% 7%)', scale: 1.12, autoAlpha: 0 },
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, autoAlpha: 1, duration: 1.25, ease: 'power4.out' }
    );
    if (badge) {
      tl.fromTo(badge, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7, ease: 'power3.out' }, '-=.55');
    }
  };
  imageReveal('.about-visual');
  imageReveal('.featured-visual');

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready.then(refresh);
}
const inquiryForm = document.querySelector('#whatsapp-inquiry');
const inquiryStatus = document.querySelector('#inquiry-status');

inquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;

  const data = new FormData(inquiryForm);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const apartmentType = String(data.get('projectType') || '').trim();
  const stayMessage = String(data.get('message') || '').trim();
  const whatsappMessage = [
    'Hola Complejo Mirador Azul,',
    '',
    'Quiero consultar por una estadía.',
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    `Departamento: ${apartmentType}`,
    `Detalles: ${stayMessage || 'A confirmar'}`,
  ].join('\n');

  if (inquiryStatus) inquiryStatus.textContent = 'Abriendo WhatsApp con tu consulta…';
  window.open(`https://wa.me/5492934461718?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener,noreferrer');
});
