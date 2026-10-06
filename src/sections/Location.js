import { getIcon } from '../components/Icon.js';
import { createWhatsAppButton } from '../components/WhatsAppButton.js';
import { businessConfig, getWhatsAppUrl } from '../config/business.js';

export function createLocationSection() {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'location section';
  section.setAttribute('aria-labelledby', 'location-title');
  
  const whatsappBtn = createWhatsAppButton({
    text: 'WhatsApp',
    size: 'md',
    variant: 'primary',
    className: 'location-btn'
  });
  
  const callBtn = document.createElement('a');
  callBtn.href = `tel:${businessConfig.callPhone.replace(/\s/g, '')}`;
  callBtn.className = 'btn btn-secondary location-btn';
  callBtn.innerHTML = `${getIcon('phone')} Call`;
  
  const mapBtn = document.createElement('a');
  mapBtn.href = 'https://www.google.com/maps/search/?api=1&query=Luxury%20Spa%20%26%20Saloon%2C%20Hanuman%20Nagar%2C%20Bypass%20Road%2C%20Near%20New%20Bus%20Stand%2C%20Jaso%2C%20Buxar%2C%20Bihar%20802101';
  mapBtn.target = '_blank';
  mapBtn.rel = 'noopener noreferrer';
  mapBtn.className = 'btn btn-outline-gold location-btn';
  mapBtn.innerHTML = `${getIcon('map')} View on Maps`;
  
  const mapEmbedUrl = 'https://www.google.com/maps?q=Hanuman%20Nagar%2C%20Bypass%20Road%2C%20Near%20New%20Bus%20Stand%2C%20Jaso%2C%20Buxar%2C%20Bihar%20802101&output=embed';
  
  section.innerHTML = `
    <div class="container">
      <header class="section-header fade-in">
        <h2 id="location-title">Visit Us</h2>
      </header>
      <div class="location-content">
        <div class="location-info fade-in">
          <h3 class="location-name">${businessConfig.name}</h3>
          <address class="location-address">
            ${getIcon('location')} ${businessConfig.address}
          </address>
          <div class="location-hours">
            ${getIcon('clock')} ${businessConfig.hours}
          </div>
          <div class="location-actions">
            ${whatsappBtn.outerHTML}
            ${callBtn.outerHTML}
            ${mapBtn.outerHTML}
          </div>
        </div>
        <div class="location-map fade-in">
          <iframe
            src="${mapEmbedUrl}"
            width="100%"
            height="100%"
            style="border: 0; border-radius: var(--radius-xl);"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Luxury Spa & Saloon Location"
          ></iframe>
        </div>
      </div>
    </div>
  `;
  
  return section;
}