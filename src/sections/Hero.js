import { getIcon, createIcon } from '../components/Icon.js';
import { createWhatsAppButton } from '../components/WhatsAppButton.js';
import { businessConfig, getWhatsAppUrl } from '../config/business.js';
import { smoothScroll } from '../utils/helpers.js';

export function createHeroSection() {
  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'hero section';
  section.setAttribute('aria-labelledby', 'hero-title');
  
  const whatsappBtn = createWhatsAppButton({
    text: 'Book Appointment on WhatsApp',
    size: 'lg',
    variant: 'primary',
    className: 'hero-cta-primary'
  });
  
  const exploreBtn = document.createElement('a');
  exploreBtn.href = '#services';
  exploreBtn.className = 'btn btn-secondary btn-lg hero-cta-secondary';
  exploreBtn.innerHTML = `Explore Services ${getIcon('arrowRight')}`;
  exploreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScroll('#services');
  });
  
  section.innerHTML = `
    <div class="container">
      <div class="hero-content">
        <div class="hero-text fade-in">
          <p class="hero-location">${getIcon('location')} ${businessConfig.location}</p>
          <h1 id="hero-title" class="hero-title">Luxury Spa & Saloon in Buxar, Bihar</h1>
          <p class="hero-description">${businessConfig.description}</p>
          <div class="hero-trust">
            ${businessConfig.trustBadges.map(badge => `
              <span class="trust-badge">${getIcon('starFilled')} ${badge}</span>
            `).join('')}
          </div>
          <div class="hero-ctas">
            ${whatsappBtn.outerHTML}
            ${exploreBtn.outerHTML}
          </div>
        </div>
        <div class="hero-image fade-in">
          <video
            src="/assets/Video/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            class="hero-video"
            width="600"
            height="700"
            aria-label="Luxury Spa & Saloon - Relaxing spa environment"
          ></video>
        </div>
      </div>
    </div>
  `;
  
  return section;
}