let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Mobile menu toggle
menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// Scroll Reveal
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    distance: '60px',
    duration: 1800,
    reset: false, // animate once for a smoother experience
  });

  sr.reveal('.home-text', { delay: 150, origin: 'top' });
  sr.reveal('.home-img', { delay: 300, origin: 'top' });
  sr.reveal('.about, .cta, .contact, .footer', { delay: 150, origin: 'top' });
  sr.reveal('.featured-project, .noteworthy-card:not(.extra-project)', { delay: 100, interval: 100, origin: 'bottom' });
}

// Scroll Event Handlers (Header style, active link, menu closing)
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  // Close menu on scroll
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');

  // Sticky dynamic glassmorphic header
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Active section nav link highlighting
  let currentSectionId = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 180) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active-nav');
    }
  });
});

const typedGreetingEl = document.querySelector('#typed-greeting');
const typedNameEl = document.querySelector('#typed-name');
const typedTextEl = document.querySelector('#typed-text');
const typingLineContainer = document.querySelector('.typing-line');
const greetingText = "Hello, I'm";
const nameText = 'Akshat Singh Nayal';
const typingSentence = 'I build scalable backend systems, full-stack web applications, and AI-powered solutions using modern technologies.';
const highlightedRole = 'scalable backend systems';

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderTypedSentence(visibleText) {
  if (!typedTextEl) return;

  const roleStart = typingSentence.indexOf(highlightedRole);

  if (roleStart === -1) {
    typedTextEl.textContent = visibleText;
    return;
  }

  const roleEnd = roleStart + highlightedRole.length;
  const visibleLength = visibleText.length;

  const before = visibleText.slice(0, Math.min(visibleLength, roleStart));
  const highlighted = visibleText.slice(Math.min(visibleLength, roleStart), Math.min(visibleLength, roleEnd));
  const after = visibleText.slice(Math.min(visibleLength, roleEnd));

  typedTextEl.innerHTML = `${escapeHtml(before)}<span class="typed-highlight">${escapeHtml(highlighted)}</span>${escapeHtml(after)}`;
}

function startIntroTypingOnce(onComplete) {
  if (!typedGreetingEl || !typedNameEl) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedGreetingEl.textContent = greetingText;
    typedNameEl.textContent = nameText;
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  let greetingIndex = 0;
  let nameIndex = 0;

  const typeName = () => {
    typedNameEl.textContent = nameText.substring(0, nameIndex);

    if (nameIndex < nameText.length) {
      nameIndex += 1;
      setTimeout(typeName, 55);
      return;
    }

    if (typeof onComplete === 'function') onComplete();
  };

  const typeGreeting = () => {
    typedGreetingEl.textContent = greetingText.substring(0, greetingIndex);

    if (greetingIndex < greetingText.length) {
      greetingIndex += 1;
      setTimeout(typeGreeting, 65);
      return;
    }

    setTimeout(typeName, 120);
  };

  typeGreeting();
}

function setTypingLineHeight() {
  if (!typedTextEl || !typingLineContainer) return;

  const currentText = typedTextEl.textContent;
  typingLineContainer.style.minHeight = '';
  renderTypedSentence(typingSentence);
  typingLineContainer.style.minHeight = `${Math.ceil(typingLineContainer.getBoundingClientRect().height)}px`;
  renderTypedSentence(currentText);
}

function startTypingEffect() {
  if (!typedTextEl) return;

  setTypingLineHeight();
  window.addEventListener('resize', setTypingLineHeight);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderTypedSentence(typingSentence);
    return;
  }

  let charIndex = 0;
  let deleting = false;

  const type = () => {
    renderTypedSentence(typingSentence.substring(0, charIndex));

    if (!deleting && charIndex < typingSentence.length) {
      charIndex += 1;
      setTimeout(type, 55);
      return;
    }

    if (!deleting && charIndex === typingSentence.length) {
      deleting = true;
      setTimeout(type, 1400);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(type, 25);
      return;
    }

    deleting = false;
    setTimeout(type, 350);
  };

  type();
}

startIntroTypingOnce(startTypingEffect);

// Toggle noteworthy projects visibility
const toggleBtn = document.getElementById('toggle-projects-btn');
const extraProjects = document.querySelectorAll('.extra-project');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    let anyHidden = false;
    extraProjects.forEach(proj => {
      if (proj.classList.contains('hide-project')) {
        anyHidden = true;
      }
    });

    if (anyHidden) {
      extraProjects.forEach(proj => {
        proj.classList.remove('hide-project');
      });
      toggleBtn.textContent = 'Show Less';
    } else {
      extraProjects.forEach(proj => {
        proj.classList.add('hide-project');
      });
      toggleBtn.textContent = 'Show More';
    }
  });
}

// Mobile project disclosures preserve the original nodes and desktop structure.
(() => {
  if (!document.getElementById('home')) return;
  const mobileLayout = window.matchMedia('(max-width: 768px)');
  const disclosures = [];
  const skillDisclosures = [];
  const intro = document.createElement('p');
  intro.className = 'mobile-intro';
  intro.textContent = typingSentence;
  const railControls = document.createElement('div');
  railControls.className = 'mobile-project-controls';
  railControls.innerHTML = '<span>SELECTED WORK · SWIPE TO EXPLORE</span><button type="button" aria-label="Previous featured project">←</button><button type="button" aria-label="Next featured project">→</button>';
  const rail = document.querySelector('.featured-showcase');
  railControls.querySelectorAll('button').forEach((button, index) => {
    button.addEventListener('click', () => {
      rail.scrollBy({ left: (index ? 1 : -1) * (rail.firstElementChild.getBoundingClientRect().width + 16), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  });

  const syncProjectDetails = () => {
    if (mobileLayout.matches && !disclosures.length) {
      document.querySelector('.typing-line').after(intro);
      rail.before(railControls);
      document.querySelectorAll('#services .row').forEach((card) => {
        const nodes = Array.from(card.childNodes);
        const details = document.createElement('details');
        details.className = 'mobile-skill-details';
        const summary = document.createElement('summary');
        const icon = card.querySelector('i');
        const heading = card.querySelector('h3');
        summary.append(icon, heading);
        details.append(summary, card.querySelector('p'));
        card.append(details);
        skillDisclosures.push({ card, nodes, details });
      });
      document.querySelectorAll('.noteworthy-card').forEach((card) => {
        const description = card.querySelector('.project-description, .noteworthy-description');
        const tech = card.querySelector('.project-tech-list, .noteworthy-tech');
        if (!description || !tech) return;
        const details = document.createElement('details');
        details.className = 'mobile-project-details';
        const summary = document.createElement('summary');
        summary.textContent = 'Details & tech stack';
        const title = card.querySelector('.project-title, .noteworthy-title').textContent.trim();
        summary.setAttribute('aria-label', `${title}: details and tech stack`);
        description.before(details);
        details.append(summary, description, tech);
        disclosures.push({ details, description, tech });
      });
    } else if (!mobileLayout.matches) {
      intro.remove();
      railControls.remove();
      skillDisclosures.splice(0).forEach(({ card, nodes, details }) => {
        card.replaceChildren(...nodes);
      });
      disclosures.splice(0).forEach(({ details, description, tech }) => {
        details.replaceWith(description, tech);
      });
    }
  };
  mobileLayout.addEventListener('change', syncProjectDetails);
  syncProjectDetails();

  // The existing div menu remains visually identical, with keyboard support.
  menu.setAttribute('role', 'button');
  menu.setAttribute('tabindex', '0');
  menu.setAttribute('aria-label', 'Toggle navigation');
  const syncMenuState = () => menu.setAttribute('aria-expanded', String(navbar.classList.contains('active')));
  menu.addEventListener('click', syncMenuState);
  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      menu.click();
    }
  });
  window.addEventListener('scroll', syncMenuState, { passive: true });
  syncMenuState();
})();
