import { getIcon } from '../components/Icon.js';
import { createWhatsAppButton } from '../components/WhatsAppButton.js';
import { businessConfig, getWhatsAppUrl } from '../config/business.js';

export function createAppointmentCTASection() {
  const section = document.createElement('section');
  section.id = 'appointment-cta';
  section.className = 'appointment-cta section';
  section.setAttribute('aria-labelledby', 'appointment-cta-title');
  
  const whatsappBtn = createWhatsAppButton({
    text: 'WhatsApp Us',
    size: 'lg',
    variant: 'primary',
    className: 'appointment-cta-btn'
  });
  
  const callBtn = document.createElement('a');
  callBtn.href = `tel:${businessConfig.callPhone.replace(/\s/g, '')}`;
  callBtn.className = 'btn btn-secondary btn-lg appointment-cta-btn';
  callBtn.innerHTML = `${getIcon('phone')} Call Now`;
  
  section.innerHTML = `
    <div class="container">
      <div class="appointment-cta-card card fade-in">
        <h2 id="appointment-cta-title">Ready to Relax?</h2>
        <p class="appointment-cta-text">Message us on WhatsApp to check availability, ask about services and book your appointment.</p>
        <div class="appointment-cta-buttons">
          ${whatsappBtn.outerHTML}
          ${callBtn.outerHTML}
        </div>
      </div>
    </div>
  `;
  
  return section;
}