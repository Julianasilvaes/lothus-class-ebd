document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initContactForm();
  initHeroMockCard();
  initFeatureCardScrollExpand();
});

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    const icon = item.querySelector('.faq-item__icon');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-item__answer').style.maxHeight = null;
        other.querySelector('.faq-item__icon').textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
      }
    });
  });
}

function initHeroMockCard() {
  const tabsWrap = document.getElementById('mockTabs');
  const panelsWrap = document.getElementById('mockPanels');

  if (!tabsWrap || !panelsWrap) return;

  const tabs = Array.from(tabsWrap.querySelectorAll('button'));
  const panels = Array.from(panelsWrap.querySelectorAll('.mock-panel'));

  let current = 0;
  const INTERVAL_MS = 4000;

  function showPanel(index) {
    tabs.forEach((tab, i) => tab.classList.toggle('is-active', i === index));
    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
  }

  function nextPanel() {
    current = (current + 1) % panels.length;
    showPanel(current);
  }

  let timer = setInterval(nextPanel, INTERVAL_MS);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      current = index;
      showPanel(current);
      clearInterval(timer);
      timer = setInterval(nextPanel, INTERVAL_MS);
    });
  });
}

function initFeatureCardScrollExpand() {
  const cards = document.querySelectorAll('.feature-card');

  if (!cards.length || !('IntersectionObserver' in window)) return;

  const mobileQuery = window.matchMedia('(max-width: 860px)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    },
    { threshold: 0.4 }
  );

  function syncObserver() {
    cards.forEach((card) => {
      observer.unobserve(card);
      card.classList.remove('is-visible');
    });

    if (mobileQuery.matches) {
      cards.forEach((card) => observer.observe(card));
    }
  }

  syncObserver();
  mobileQuery.addEventListener('change', syncObserver);
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    feedback.textContent = 'Recebido! (destino do formulário ainda não configurado)';
    feedback.classList.add('is-success');
  });
}
