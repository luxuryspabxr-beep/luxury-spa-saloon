import { getIcon, createIcon } from '../components/Icon.js';
import { businessConfig } from '../config/business.js';

export function createAboutSection() {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'about section';
  section.setAttribute('aria-labelledby', 'about-title');
  
  const infoCards = businessConfig.about.infoCards.map(card => `
    <div class="about-info-card card fade-in">
      <div class="about-info-icon">${getIcon(card.label.toLowerCase().includes('location') ? 'location' : card.label.toLowerCase().includes('hour') ? 'clock' : 'booking')}</div>
      <div class="about-info-content">
        <h3 class="about-info-label">${card.label}</h3>
        <p class="about-info-value">${card.value}</p>
      </div>
    </div>
  `).join('');
  
  section.innerHTML = `
    <div class="container">
      <div class="about-content">
        <div class="about-text fade-in">
          <header class="section-header section-header-left">
            <h2 id="about-title">${businessConfig.about.title}</h2>
          </header>
          <p class="about-description">${businessConfig.about.description}</p>
          <div class="about-info-cards">
            ${infoCards}
          </div>
        </div>
        <div class="about-image fade-in">
          <img src="${businessConfig.about.image}" alt="Aura Wellness Spa interior" loading="lazy" width="600" height="500">
        </div>
      </div>
    </div>
  `;
  
  return section;
}