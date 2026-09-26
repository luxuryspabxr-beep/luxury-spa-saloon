import { createWhatsAppButton } from '../components/WhatsAppButton.js';
import { businessConfig, getWhatsAppUrl } from '../config/business.js';

export function createFinalCTASection() {
  const section = document.createElement('section');
  section.className = 'final-cta section';
  section.setAttribute('aria-labelledby', 'final-cta-title');
  
  const whatsappBtn = createWhatsAppButton({
    text: 'Book Appointment on WhatsApp',
    size: 'lg',
    variant: 'primary',
    className: 'final-cta-btn'
  });
  
  section.innerHTML = `
    <div class="container">
      <div class="final-cta-card card fade-in">
        <h2 id="final-cta-title">Your Time. Your Relaxation.</h2>
        <p class="final-cta-text">Take a break and book your spa experience today.</p>
        <div class="final-cta-action">
          ${whatsappBtn.outerHTML}
        </div>
      </div>
    </div>
  `;
  
  return section;
}