import './styles/main.css';
import { initHeader } from './components/Header.js';
import { initStickyCTA } from './components/WhatsAppButton.js';
import { observeElements } from './utils/helpers.js';
import { businessConfig, getWhatsAppUrlForService } from './config/business.js';

const SERVICE_SLUGS = {
  'relaxation-massage-buxar': 'relaxation-massage',
  'aroma-wellness-buxar': 'aroma-wellness',
  'body-spa-buxar': 'body-spa',
  'facial-glow-buxar': 'facial-glow'
};

function getServiceFromUrl() {
  const path = window.location.pathname;
  for (const [slug, id] of Object.entries(SERVICE_SLUGS)) {
    if (path.includes(slug)) {
      return businessConfig.services.find(s => s.id === id);
    }
  }
  return null;
}

function initSEO() {
  const service = getServiceFromUrl();
  if (!service) return;
  
  const title = `${service.name} in Buxar | Luxury Spa & Saloon`;
  const description = `${service.description} Book your ${service.duration} session for ₹${service.price.toLocaleString('en-IN')}.`;
  const ogImage = `https://luxuryspasaloon.com${service.image}`;
  const canonicalUrl = `https://luxuryspasaloon.com/${service.slug}/`;
  
  document.title = title;
  
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);
  
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);
  
  const ogImageEl = document.querySelector('meta[property="og:image"]');
  if (ogImageEl) ogImageEl.setAttribute('content', ogImage);
  
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
  
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', title);
  
  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', description);
  
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) twitterImage.setAttribute('content', ogImage);

  // Update structured data in the page
  updateStructuredData(service, canonicalUrl, ogImage);
}

function updateStructuredData(service, canonicalUrl, ogImage) {
  // Update Service schema
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
      url: canonicalUrl
    },
    serviceType: service.category
  };

  // Update BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://luxuryspasaloon.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://luxuryspasaloon.com/#services'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: canonicalUrl
      }
    ]
  };

  // LocalBusiness schema
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

  // WebSite schema
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

  // Add all schemas to head
  const schemas = [serviceSchema, breadcrumbSchema, localBusinessSchema, websiteSchema];
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

function createServicePageSection(service) {
  const section = document.createElement('section');
  section.className = 'service-page section';
  section.setAttribute('aria-labelledby', 'service-title');
  
  const whatsappUrl = getWhatsAppUrlForService(service.name);
  
  section.innerHTML = `
    <div class="container">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item"><a href="/#services">Services</a></li>
          <li class="breadcrumb-item" aria-current="page">${service.name}</li>
        </ol>
      </nav>
      
      <div class="service-page-content">
        <div class="service-page-image fade-in">
          <img src="${service.image}" alt="${service.name} at Luxury Spa & Saloon in Buxar" loading="eager" width="800" height="600">
        </div>
        <div class="service-page-info fade-in">
          <h1 id="service-title" class="service-page-title">${service.name}</h1>
          <div class="service-page-meta">
            <span class="service-page-price">₹${service.price.toLocaleString('en-IN')}</span>
            <span class="service-page-duration">${getIcon('clock')} ${service.duration}</span>
          </div>
          <p class="service-page-description">${service.description}</p>
          
          <div class="service-page-benefits">
            <h2>Benefits</h2>
            <ul>
              <li>Reduces stress and anxiety</li>
              <li>Improves blood circulation</li>
              <li>Relieves muscle tension</li>
              <li>Promotes better sleep</li>
              <li>Enhances overall well-being</li>
            </ul>
          </div>
          
          <div class="service-page-cta">
            <a href="${whatsappUrl}" class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer" aria-label="Book ${service.name} on WhatsApp">
              <span class="btn-icon">${getIcon('whatsapp')}</span>
              Book on WhatsApp
            </a>
            <a href="tel:${businessConfig.callPhone.replace(/\s/g, '')}" class="btn btn-secondary btn-lg" aria-label="Call to book ${service.name}">
              <span class="btn-icon">${getIcon('phone')}</span>
              Call Now
            </a>
          </div>
          
          <div class="service-page-location">
            <h3>Visit Us in Buxar</h3>
            <address>
              ${getIcon('location')} ${businessConfig.address}<br>
              ${getIcon('clock')} ${businessConfig.hours}
            </address>
            <a href="${businessConfig.googleMaps}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-gold">
              ${getIcon('map')} Get Directions
            </a>
          </div>
        </div>
      </div>
      
      <!-- Related Services -->
      <div class="related-services fade-in">
        <h2>Other Services You May Like</h2>
        <div class="related-services-grid">
          ${businessConfig.services.filter(s => s.id !== service.id).map(s => `
            <article class="related-service-card card">
              <div class="related-service-image">
                <img src="${s.image}" alt="${s.name} at Luxury Spa & Saloon" loading="lazy" width="400" height="300">
              </div>
              <div class="related-service-content">
                <h3>${s.name}</h3>
                <p>${s.description}</p>
                <div class="related-service-meta">
                  <span>₹${s.price.toLocaleString('en-IN')}</span>
                  <span>${getIcon('clock')} ${s.duration}</span>
                </div>
                <a href="/${s.slug}/" class="btn btn-outline-gold btn-sm">View Details</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  return section;
}

function getIcon(name) {
  const icons = {
    whatsapp: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.454.13-.606.149-.149.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 3.41 3.41 0 00-.96-.195 3.31 3.31 0 00-1.23.4c-2.6.94-4.308-1.712-3.474-4.62.71-2.464 3.206-4.42 5.784-4.794 2.223-.31 4.377.8 5.931 2.58 1.583 1.816 1.76 4.127 1.179 5.905-.468 1.414-1.186 2.74-2.313 3.813-.612.587-1.272 1.174-1.932 1.767-.308.277-.718.277-1.063-.006z"/></svg>`,
    phone: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    clock: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    location: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    map: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11"/><path d="M12 2v20M3 11h18"/></svg>`
  };
  return icons[name] || '';
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
  
  const service = getServiceFromUrl();
  if (!service) {
    window.location.href = '/';
    return;
  }
  
  const main = document.querySelector('main') || document.createElement('main');
  main.id = 'main-content';
  
  const serviceSection = createServicePageSection(service);
  main.appendChild(serviceSection);
  
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