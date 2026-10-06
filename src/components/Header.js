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
        <button class="header-menu-btn" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-menu" type="button">
          <span class="menu-icon">${getIcon('menu')}</span>
        </button>
      </div>
    </div>
    
    <div id="mobile-menu" class="mobile-menu" hidden>
      <div class="mobile-menu-overlay" aria-hidden="true"></div>
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <ul class="mobile-nav-list">
          <li><a href="#hero" class="mobile-nav-link">Home</a></li>
          <li><a href="#services" class="mobile-nav-link">Services</a></li>
          <li><a href="#gallery" class="mobile-nav-link">Gallery</a></li>
          <li><a href="#reviews" class="mobile-nav-link">Reviews</a></li>
          <li><a href="#about" class="mobile-nav-link">About</a></li>
          <li><a href="#contact" class="mobile-nav-link">Contact</a></li>
        </ul>
        <a href="${getWhatsAppUrl()}" class="mobile-cta btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
          ${getIcon('whatsapp')}
          Book Appointment on WhatsApp
        </a>
      </nav>
    </div>
  `;

  return header;
}

export function initHeader() {
  const header = createHeader();
  document.body.prepend(header);
  initMobileMenu(header);
  initHeaderScroll(header);
  return header;
}

function initMobileMenu(header) {
  const menuBtn = header.querySelector('.header-menu-btn');
  const mobileMenu = header.querySelector('#mobile-menu');
  const menuIcon = menuBtn.querySelector('.menu-icon');
  const overlay = mobileMenu.querySelector('.mobile-menu-overlay');
  const navLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
  
  if (!menuBtn || !mobileMenu || !menuIcon) return;

  let wasScrolling = false;

  function openMenu() {
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close navigation');
    menuIcon.innerHTML = getIcon('close');
    mobileMenu.hidden = false;
    document.body.style.overflow = 'hidden';
    wasScrolling = document.body.style.overflow === 'hidden';
  }

  function closeMenu() {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open navigation');
    menuIcon.innerHTML = getIcon('menu');
    mobileMenu.hidden = true;
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
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