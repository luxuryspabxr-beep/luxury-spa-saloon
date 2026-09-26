import { createServiceCards } from '../components/ServiceCard.js';
import { businessConfig } from '../config/business.js';

export function createServicesSection() {
  const section = document.createElement('section');
  section.id = 'services';
  section.className = 'services section';
  section.setAttribute('aria-labelledby', 'services-title');
  
  const serviceCards = createServiceCards(businessConfig.services);
  
  section.innerHTML = `
    <div class="container">
      <header class="section-header fade-in">
        <h2 id="services-title">Our Services</h2>
        <p>Choose the experience that suits you.</p>
      </header>
      <div class="services-wrapper" role="list" aria-label="Spa services">
        ${serviceCards.outerHTML}
      </div>
    </div>
  `;
  
  return section;
}