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
  
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', businessConfig.seo.title);
  
  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', businessConfig.seo.description);
  
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) twitterImage.setAttribute('content', businessConfig.seo.ogImage);

  // LocalBusiness structured data
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    name: businessConfig.name,
    description: businessConfig.description,
    url: 'https://luxuryspasaloon.com/',
    telephone: businessConfig.callPhone,
    email: businessConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hanuman Nagar, Bypass Road, Near New Bus Stand, Jaso',
      addressLocality: 'Buxar',
      addressRegion: 'Bihar',
      postalCode: '802101',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessConfig.coordinates.lat,
      longitude: businessConfig.coordinates.lng
    },
    logo: 'https://luxuryspasaloon.com/assets/images/Logo.png',
    image: businessConfig.seo.ogImage,
    sameAs: [
      businessConfig.instagram,
      businessConfig.facebook
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '11:00',
        closes: '21:00'
      }
    ],
    priceRange: '₹₹',
    areaServed: {
      '@type': 'City',
      name: 'Buxar',
      containedInPlace: {
        '@type': 'State',
        name: 'Bihar',
        containedInPlace: {
          '@type': 'Country',
          name: 'India'
        }
      }
    },
    hasMap: businessConfig.googleMaps,
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: businessConfig.coordinates.lat,
        longitude: businessConfig.coordinates.lng
      },
      geoRadius: '20000'
    }
  };

  const lbScript = document.createElement('script');
  lbScript.type = 'application/ld+json';
  lbScript.textContent = JSON.stringify(localBusinessSchema);
  document.head.appendChild(lbScript);

  // Service schema for each service
  businessConfig.services.forEach(service => {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: {
        '@type': 'DaySpa',
        name: businessConfig.name,
        url: 'https://luxuryspasaloon.com/'
      },
      areaServed: {
        '@type': 'City',
        name: 'Buxar'
      },
      offers: {
        '@type': 'Offer',
        name: service.name,
        description: service.description,
        price: service.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `https://luxuryspasaloon.com/${service.slug}/`
      },
      serviceType: service.category
    };

    const svcScript = document.createElement('script');
    svcScript.type = 'application/ld+json';
    svcScript.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(svcScript);
  });

  // FAQ structured data
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: businessConfig.faq.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const faqScript = document.createElement('script');
  faqScript.type = 'application/ld+json';
  faqScript.textContent = JSON.stringify(faqStructuredData);
  document.head.appendChild(faqScript);

  // WebSite schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: businessConfig.name,
    url: 'https://luxuryspasaloon.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://luxuryspasaloon.com/?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const wsScript = document.createElement('script');
  wsScript.type = 'application/ld+json';
  wsScript.textContent = JSON.stringify(websiteSchema);
  document.head.appendChild(wsScript);

  // BreadcrumbList schema (homepage)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://luxuryspasaloon.com/'
      }
    ]
  };

  const bcScript = document.createElement('script');
  bcScript.type = 'application/ld+json';
  bcScript.textContent = JSON.stringify(breadcrumbSchema);
  document.head.appendChild(bcScript);
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