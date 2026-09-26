import { createGallery } from '../components/Gallery.js';
import { businessConfig } from '../config/business.js';

export function createGallerySection() {
  const section = document.createElement('section');
  section.id = 'gallery';
  section.className = 'gallery section';
  section.setAttribute('aria-labelledby', 'gallery-title');
  
  const gallery = createGallery(businessConfig.gallery);
  
  section.innerHTML = `
    <div class="container">
      <header class="section-header fade-in">
        <h2 id="gallery-title">Take a Look Inside</h2>
      </header>
      <div class="gallery-wrapper" role="list" aria-label="Spa gallery images">
        ${gallery.outerHTML}
      </div>
    </div>
  `;
  
  return section;
}