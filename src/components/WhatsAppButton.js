import { getIcon } from './Icon.js';
import { businessConfig, getWhatsAppUrl, getWhatsAppUrlForService } from '../config/business.js';

export function createWhatsAppButton(options = {}) {
  const {
    text = 'Book on WhatsApp',
    icon = true,
    size = 'md',
    variant = 'primary',
    service = null,
    className = '',
    ariaLabel = 'Book appointment on WhatsApp'
  } = options;
  
  const url = service ? getWhatsAppUrlForService(service) : getWhatsAppUrl();
  
  const btn = document.createElement('a');
  btn.href = url;
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.className = `whatsapp-btn whatsapp-btn--${size} whatsapp-btn--${variant} ${className}`;
  btn.setAttribute('aria-label', ariaLabel);
  
  let iconHtml = '';
  if (icon) {
    iconHtml = `<span class="whatsapp-btn-icon">${getIcon('whatsapp')}</span>`;
  }
  
  btn.innerHTML = `
    ${iconHtml}
    <span class="whatsapp-btn-text">${text}</span>
    ${icon ? `<span class="whatsapp-btn-arrow">${getIcon('chevronRight')}</span>` : ''}
  `;
  
  return btn;
}

export function createStickyCTA() {
  const container = document.createElement('div');
  container.className = 'sticky-cta';
  container.innerHTML = `
    <a href="${getWhatsAppUrl()}" class="sticky-cta-btn sticky-cta-btn--whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp">
      ${getIcon('whatsapp')}
      <span>WhatsApp</span>
    </a>
    <a href="tel:${businessConfig.callPhone.replace(/\s/g, '')}" class="sticky-cta-btn sticky-cta-btn--call" aria-label="Call us">
      ${getIcon('phone')}
      <span>Call</span>
    </a>
  `;
  return container;
}

export function initStickyCTA() {
  const cta = createStickyCTA();
  document.body.appendChild(cta);
  return cta;
}