import './styles/main.css';
import { initHeader } from './components/Header.js';
import { initStickyCTA } from './components/WhatsAppButton.js';
import { createHeroSection } from './sections/Hero.js';
import { createSpecialOfferSection } from './sections/SpecialOffer.js';
import { createServicesSection } from './sections/Services.js';
import { createWhyChooseUsSection } from './sections/WhyChooseUs.js';
import { createGallerySection } from './sections/Gallery.js';
import { createReviewsSection } from './sections/Reviews.js';
import { createAboutSection } from './sections/About.js';
import { createAppointmentCTASection } from './sections/AppointmentCTA.js';
import { createLocationSection } from './sections/Location.js';
import { createFAQSection } from './sections/FAQ.js';
import { createFinalCTASection } from './sections/FinalCTA.js';
import { createFooterSection } from './sections/Footer.js';
import { observeElements } from './utils/helpers.js';
import { businessConfig } from './config/business.js';

function initSEO() {
  document.title = businessConfig.seo.title;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', businessConfig.seo.description);
  }
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', businessConfig.seo.title);
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', businessConfig.seo.description);
  
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', businessConfig.seo.ogImage);
  
  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) ogType.setAttribute('content', 'website');
  
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', window.location.href);
  
  const twitterCard = document.querySelector('meta[name="twitter:card"]');
  if (twitterCard) twitterCard.setAttribute('content', 'summary_large_image');
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessConfig.name,
    description: businessConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hanuman Nagar, Bypass Road, Near New Bus Stand, Jaso',
      addressLocality: 'Buxar',
      addressRegion: 'Bihar',
      postalCode: '802101',
      addressCountry: 'IN'
    },
    telephone: businessConfig.phone,
    url: window.location.href,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:00'
    },
    priceRange: '₹₹',
    image: businessConfig.seo.ogImage
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

function initScrollAnimations() {
  observeElements('.fade-in', (el) => {
    el.classList.add('visible');
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        target.focus({ preventScroll: true });
      }
    });
  });
}

function initMobileMenu() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  const menuBtn = header.querySelector('.header-menu-btn');
  const mobileMenu = header.querySelector('#mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isOpen);
      mobileMenu.hidden = isOpen;
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
    
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        document.body.style.overflow = '';
      });
    });
  }
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
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

function init() {
  initSEO();
  
  const main = document.querySelector('main') || document.createElement('main');
  main.id = 'main-content';
  
  const sections = [
    createHeroSection(),
    createSpecialOfferSection(),
    createServicesSection(),
    createWhyChooseUsSection(),
    createGallerySection(),
    createReviewsSection(),
    createAboutSection(),
    createAppointmentCTASection(),
    createLocationSection(),
    createFAQSection(),
    createFinalCTASection(),
    createFooterSection()
  ];
  
  sections.forEach(section => main.appendChild(section));
  
  document.body.appendChild(main);
  
  initHeader();
  initStickyCTA();
  
  initScrollAnimations();
  initSmoothScroll();
  initMobileMenu();
  initHeaderScroll();
  
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.prepend(skipLink);
  
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}