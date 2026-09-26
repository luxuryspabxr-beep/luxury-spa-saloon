import { getIcon } from './Icon.js';

export function createAccordionItem(faq, index) {
  const item = document.createElement('details');
  item.className = 'accordion-item fade-in';
  item.dataset.faqId = faq.id;
  
  const summary = document.createElement('summary');
  summary.className = 'accordion-summary';
  summary.setAttribute('aria-expanded', 'false');
  summary.innerHTML = `
    <span class="accordion-question">${faq.question}</span>
    <span class="accordion-icon" aria-hidden="true">${getIcon('chevronDown')}</span>
  `;
  
  const content = document.createElement('div');
  content.className = 'accordion-content';
  content.innerHTML = `<p>${faq.answer}</p>`;
  
  item.appendChild(summary);
  item.appendChild(content);
  
  summary.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = item.open;
    item.open = !isOpen;
    summary.setAttribute('aria-expanded', !isOpen);
  });
  
  item.addEventListener('toggle', () => {
    summary.setAttribute('aria-expanded', item.open);
  });
  
  return item;
}

export function createAccordion(faqs) {
  const container = document.createElement('div');
  container.className = 'accordion';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Frequently asked questions');
  
  faqs.forEach((faq, index) => {
    const item = createAccordionItem(faq, index);
    item.classList.add(`stagger-${(index % 4) + 1}`);
    container.appendChild(item);
  });
  
  return container;
}