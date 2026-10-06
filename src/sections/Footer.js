import { getIcon } from '../components/Icon.js';
import { createWhatsAppButton } from '../components/WhatsAppButton.js';
import { businessConfig, getWhatsAppUrl } from '../config/business.js';

export function createFooterSection() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.setAttribute('role', 'contentinfo');
  
  const whatsappBtn = createWhatsAppButton({
    text: 'WhatsApp',
    size: 'sm',
    variant: 'primary',
    className: 'footer-whatsapp'
  });
  
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand fade-in">
          <a href="#hero" class="footer-logo" aria-label="${businessConfig.name} - Home">
            <img src="/assets/images/Logo.png" alt="${businessConfig.name}" class="footer-logo-image">
            <span class="logo-text">${businessConfig.name}</span>
          </a>
          <p class="footer-description">${businessConfig.description}</p>
          <div class="footer-social">
            <a href="${businessConfig.instagram}" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Luxury Spa & Saloon on Instagram">
              ${getIcon('instagram')}
            </a>
            <a href="${businessConfig.facebook}" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Luxury Spa & Saloon on Facebook">
              ${getIcon('facebook')}
            </a>
          </div>
        </div>
        
        <nav class="footer-nav fade-in" aria-label="Quick links">
          <h3 class="footer-heading">Quick Links</h3>
          <ul class="footer-links">
            ${businessConfig.footer.quickLinks.map(link => `
              <li><a href="${link.href}" class="footer-link">${link.label}</a></li>
            `).join('')}
          </ul>
        </nav>
        
        <div class="footer-contact fade-in" aria-label="Contact information">
          <h3 class="footer-heading">Contact Us</h3>
          <address class="footer-address">
            <div class="footer-contact-item">
              ${getIcon('location')}
              <span>${businessConfig.address}</span>
            </div>
            <div class="footer-contact-item">
              ${getIcon('phone')}
              <a href="tel:${businessConfig.callPhone.replace(/\s/g, '')}" class="footer-link">${businessConfig.callPhone}</a>
            </div>
            <div class="footer-contact-item">
              ${whatsappBtn.outerHTML}
            </div>
            <div class="footer-contact-item">
              ${getIcon('clock')}
              <span>${businessConfig.hours}</span>
            </div>
          </address>
        </div>
      </div>
      
      <div class="footer-bottom">
        <nav class="footer-legal" aria-label="Legal links">
          <ul class="footer-legal-links">
            ${businessConfig.footer.legalLinks.map(link => `
              <li><a href="${link.href}" class="footer-legal-link">${link.label}</a></li>
            `).join('')}
          </ul>
        </nav>
        <p class="footer-copyright">${businessConfig.footer.copyright}</p>
        <p class="footer-demo-notice">Designed & Developed by <a href="https://www.swiftgrowthdigital.com/" target="_blank" rel="noopener noreferrer">SwiftGrowthDigital.com</a></p>
      </div>
    </div>
  `;
  
  return footer;
}