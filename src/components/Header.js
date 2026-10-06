import { getIcon } from './Icon.js';
import { businessConfig, getWhatsAppUrl } from '../config/business.js';
import { smoothScroll } from '../utils/helpers.js';

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
    <div class="header-container container">
      <a href="#hero" class="header-logo" aria-label="${businessConfig.name} - Home">
        <img src="/assets/images/Logo.png" alt="${businessConfig.name}" class="header-logo-image">
        <span class="logo-text">${businessConfig.name}</span>
      </a>
      
      <nav class="header-nav" aria-label="Main navigation">
        <ul class="header-nav-list">
          <li><a href="#hero" class="header-nav-link">Home</a></li>
          <li><a href="#services" class="header-nav-link">Services</a></li>
          <li><a href="#gallery" class="header-nav-link">Gallery</a></li>
          <li><a href="#reviews" class="header-nav-link">Reviews</a></li>
          <li><a href="#about" class="header-nav-link">About</a></li>
          <li><a href="#contact" class="header-nav-link">Contact</a></li>
        </ul>
      </nav>
      
      <div class="header-actions">
        <a href="${getWhatsAppUrl()}" class="header-btn header-btn-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Book on WhatsApp">
          ${getIcon('whatsapp')}
          <span class="header-btn-text">Book Appointment</span>
        </a>
      </div>
    </div>
  `;

  return header;
}

export function initHeader() {
  const header = createHeader();
  document.body.prepend(header);
  initHeaderScroll(header);
  return header;
}

function initHeaderScroll(header) {
  let lastScroll = 0;
  const headerHeight = 72;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > headerHeight) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > headerHeight) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}