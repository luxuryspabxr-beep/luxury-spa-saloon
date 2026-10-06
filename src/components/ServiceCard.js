import { getIcon, createIcon } from './Icon.js';
import { createWhatsAppButton } from './WhatsAppButton.js';

export function createServiceCard(service) {
  const card = document.createElement('article');
  card.className = 'service-card card fade-in';
  card.dataset.serviceId = service.id;
  
  const whatsappBtn = createWhatsAppButton({
    text: 'Book on WhatsApp',
    service: service.name,
    size: 'md',
    variant: 'outline-gold',
    className: 'service-card-btn',
    ariaLabel: `Book ${service.name} on WhatsApp`
  });
  
  card.innerHTML = `
    <div class="service-card-image">
      <img src="${service.image}" alt="" loading="lazy" width="400" height="300">
      <div class="service-card-overlay"></div>
    </div>
    <div class="service-card-content">
      <h3 class="service-card-title">${service.name}</h3>
      <p class="service-card-description">${service.description}</p>
      <div class="service-card-meta">
        <span class="service-card-duration">${getIcon('clock')} ${service.duration}</span>
      </div>
    </div>
  `;
  
  const content = card.querySelector('.service-card-content');
  content.appendChild(whatsappBtn);
  
  return card;
}

export function createServiceCards(services) {
  const container = document.createElement('div');
  container.className = 'services-grid';
  container.role = 'list';
  
  services.forEach((service, index) => {
    const card = createServiceCard(service);
    card.classList.add(`stagger-${(index % 6) + 1}`);
    container.appendChild(card);
  });
  
  return container;
}