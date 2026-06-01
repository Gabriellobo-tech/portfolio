/* =============================================
   Gabriel Sousa Lobo — Portfolio JavaScript
   Funcionalidades: Navbar, Typed Text,
   Reveal on Scroll, Skill Bars, Form, etc.
============================================= */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar scrolled state
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top visibility
  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Trigger skill bar animations when visible
  animateSkillBars();
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== TYPED TEXT EFFECT =====
const texts = [
  'Estudante de Engenharia de Software',
  'Desenvolvedor em Formação',
  'Apaixonado por Tecnologia',
  'Futuro Dev Full Stack'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextEl = document.getElementById('typedText');

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    // Typing
    typedTextEl.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      // Pause at end before deleting
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    // Deleting
    typedTextEl.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  const speed = isDeleting ? 45 : 80;
  setTimeout(typeEffect, speed);
}

// Start typed effect after short delay
setTimeout(typeEffect, 1000);

// ===== REVEAL ON SCROLL (Intersection Observer) =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;

  const skillsSection = document.getElementById('habilidades');
  if (!skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(fill => {
      const width = fill.getAttribute('data-w');
      fill.style.width = width + '%';
    });
  }
}

// Run once on load in case already visible
animateSkillBars();

// ===== SMOOTH ACTIVE NAV LINK (Scroll Spy) =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => spyObserver.observe(section));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formMsg.style.color = '#fc8181';
      formMsg.textContent = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    // Envio real via Formspree
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

    fetch('https://formspree.io/f/mnjreqqy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: document.getElementById('subject').value.trim(),
        message: message
      })
    })
    .then(res => {
      if (res.ok) {
        formMsg.style.color = '#68d391';
        formMsg.textContent = '✓ Mensagem enviada com sucesso! Retornarei em breve.';
        contactForm.reset();
      } else {
        formMsg.style.color = '#fc8181';
        formMsg.textContent = '✗ Erro ao enviar. Tente novamente ou entre em contato por e-mail.';
      }
    })
    .catch(() => {
      formMsg.style.color = '#fc8181';
      formMsg.textContent = '✗ Erro de conexão. Verifique sua internet e tente novamente.';
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Mensagem';
      setTimeout(() => { formMsg.textContent = ''; }, 6000);
    });
  });
}

// ===== PARALLAX SUBTLE ON ORBs =====
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const xFactor = (e.clientX / window.innerWidth - 0.5) * 20;
  const yFactor = (e.clientY / window.innerHeight - 0.5) * 20;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${xFactor * factor}px, ${yFactor * factor}px)`;
  });
});

// ===== CARD TILT EFFECT ON SKILL CARDS =====
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== ACTIVE NAV STYLE =====
// Inject active nav CSS dynamically
const styleEl = document.createElement('style');
styleEl.textContent = `
  .active-nav {
    color: var(--text-primary) !important;
  }
  .active-nav::after {
    width: 100% !important;
  }
`;
document.head.appendChild(styleEl);

// ===== CONSOLE SIGNATURE =====
console.log('%c👋 Gabriel Sousa Lobo — Portfolio', 'color: #63b3ed; font-size: 16px; font-weight: bold;');
console.log('%cEngenharia de Software | UCB Brasília', 'color: #a0a0b8; font-size: 12px;');