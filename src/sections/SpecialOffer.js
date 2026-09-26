import { getIcon } from '../components/Icon.js';
import { createWhatsAppButton } from '../components/WhatsAppButton.js';
import { businessConfig, getWhatsAppUrl } from '../config/business.js';

export function createSpecialOfferSection() {
  const section = document.createElement('section');
  section.className = 'special-offer section';
  section.setAttribute('aria-labelledby', 'offer-title');
  
  const whatsappBtn = createWhatsAppButton({
    text: businessConfig.specialOffer.ctaText,
    size: 'md',
    variant: 'primary',
    className: 'offer-cta'
  });
  
  section.innerHTML = `
    <div class="container">
      <div class="offer-card card fade-in">
        <div class="offer-badge">${getIcon('starFilled')} ${businessConfig.specialOffer.title}</div>
        <h2 id="offer-title" class="offer-title">${businessConfig.specialOffer.description}</h2>
        <div class="offer-cta-wrapper">
          ${whatsappBtn.outerHTML}
        </div>
      </div>
    </div>
  `;
  
  return section;
}