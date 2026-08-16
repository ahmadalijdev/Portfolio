const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const revealElements = document.querySelectorAll('.section-heading, .about-content, .skill-group, .project-card, .contact-wrapper');

const updateHeader = () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const closeMenu = () => {
  menuToggle.classList.remove('active');
  mainNav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');

  menuToggle.classList.toggle('active', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const updateActiveSection = () => {
  const scrollPosition = window.scrollY + 180;
  let currentSection = 'home';

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentSection}`;
    link.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', updateActiveSection, { passive: true });
updateActiveSection();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add('reveal', 'visible');
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.12
});

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href = `mailto:ahmadalij.dev@gmail.com?subject=${subject}&body=${body}`;

  formStatus.textContent = 'Opening your email application...';
  contactForm.reset();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 700) {
    closeMenu();
  }
});