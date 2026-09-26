import { createAccordion } from '../components/Accordion.js';
import { businessConfig } from '../config/business.js';

export function createFAQSection() {
  const section = document.createElement('section');
  section.id = 'faq';
  section.className = 'faq section';
  section.setAttribute('aria-labelledby', 'faq-title');
  
  const accordion = createAccordion(businessConfig.faq);
  
  section.innerHTML = `
    <div class="container">
      <header class="section-header fade-in">
        <h2 id="faq-title">Frequently Asked Questions</h2>
      </header>
      <div class="faq-wrapper fade-in">
        ${accordion.outerHTML}
      </div>
    </div>
  `;
  
  return section;
}