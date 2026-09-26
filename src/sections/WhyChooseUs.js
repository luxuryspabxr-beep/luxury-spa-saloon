import { createFeatureCards } from '../components/FeatureCard.js';
import { businessConfig } from '../config/business.js';

export function createWhyChooseUsSection() {
  const section = document.createElement('section');
  section.id = 'why-choose';
  section.className = 'why-choose section';
  section.setAttribute('aria-labelledby', 'why-choose-title');
  
  const featureCards = createFeatureCards(businessConfig.features);
  
  section.innerHTML = `
    <div class="container">
      <header class="section-header fade-in">
        <h2 id="why-choose-title">Why Choose ${businessConfig.name}?</h2>
      </header>
      <div class="features-wrapper" role="list" aria-label="Why choose us features">
        ${featureCards.outerHTML}
      </div>
    </div>
  `;
  
  return section;
}