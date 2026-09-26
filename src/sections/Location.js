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
  callBtn.href = `tel:${businessConfig.phone.replace(/\s/g, '')}`;
  callBtn.className = 'btn btn-secondary location-btn';
  callBtn.innerHTML = `${getIcon('phone')} Call`;
  
  const mapBtn = document.createElement('a');
  mapBtn.href = businessConfig.googleMaps;
  mapBtn.target = '_blank';
  mapBtn.rel = 'noopener noreferrer';
  mapBtn.className = 'btn btn-outline-gold location-btn';
  mapBtn.innerHTML = `${getIcon('map')} View on Maps`;
  
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
          <div class="map-placeholder" aria-label="Map showing Aura Wellness Spa location in Buxar, Bihar">
            <div class="map-placeholder-content">
              ${getIcon('map')}
              <p>Map Preview</p>
              <span>${businessConfig.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return section;
}