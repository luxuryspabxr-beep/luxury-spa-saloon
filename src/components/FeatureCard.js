import { getIcon } from './Icon.js';

const featureIcons = {
  comfort: 'comfort',
  professional: 'professional',
  location: 'locationIcon',
  booking: 'booking',
  personalized: 'personalized',
  clean: 'clean'
};

export function createFeatureCard(feature) {
  const card = document.createElement('article');
  card.className = 'feature-card card fade-in';
  card.dataset.featureId = feature.id;
  
  const iconName = featureIcons[feature.icon] || 'comfort';
  
  card.innerHTML = `
    <div class="feature-icon">${getIcon(iconName)}</div>
    <h3 class="feature-title">${feature.title}</h3>
    <p class="feature-description">${feature.description}</p>
  `;
  
  return card;
}

export function createFeatureCards(features) {
  const container = document.createElement('div');
  container.className = 'features-grid';
  container.role = 'list';
  container.setAttribute('aria-label', 'Why choose us features');
  
  features.forEach((feature, index) => {
    const card = createFeatureCard(feature);
    card.classList.add(`stagger-${(index % 6) + 1}`);
    container.appendChild(card);
  });
  
  return container;
}