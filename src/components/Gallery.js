import { getIcon } from './Icon.js';

export function createGalleryItem(item, index) {
  const figure = document.createElement('figure');
  figure.className = 'gallery-item fade-in';
  figure.dataset.index = index;
  figure.dataset.imageId = item.id;
  
  figure.innerHTML = `
    <img 
      src="${item.thumb || item.image}" 
      alt="${item.alt || item.title}"
      loading="lazy"
      width="400"
      height="300"
      data-full="${item.image}"
    >
    <figcaption class="gallery-caption">${item.title}</figcaption>
  `;
  
  figure.addEventListener('click', () => openLightbox(item, index));
  
  return figure;
}

export function createGallery(images) {
  const container = document.createElement('div');
  container.className = 'gallery-grid';
  container.role = 'list';
  container.setAttribute('aria-label', 'Spa gallery');
  
  images.forEach((item, index) => {
    const figure = createGalleryItem(item, index);
    figure.classList.add(`stagger-${(index % 6) + 1}`);
    container.appendChild(figure);
  });
  
  return container;
}

let lightbox = null;

function openLightbox(item, index) {
  if (lightbox) {
    lightbox.remove();
  }
  
  lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', `Image ${index + 1}: ${item.title}`);
  
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox">${getIcon('close')}</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous image">${getIcon('chevronLeft')}</button>
    <div class="lightbox-content">
      <img src="${item.image}" alt="${item.alt || item.title}" loading="eager">
      <p class="lightbox-caption">${item.title}</p>
    </div>
    <button class="lightbox-nav lightbox-next" aria-label="Next image">${getIcon('chevronRight')}</button>
  `;
  
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';
  
  requestAnimationFrame(() => lightbox.classList.add('lightbox-open'));
  
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const img = lightbox.querySelector('img');
  
  const closeLightbox = () => {
    lightbox.classList.remove('lightbox-open');
    setTimeout(() => {
      lightbox.remove();
      lightbox = null;
      document.body.style.overflow = '';
    }, 300);
  };
  
  const navigate = (direction) => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let newIndex = index + direction;
    if (newIndex < 0) newIndex = galleryItems.length - 1;
    if (newIndex >= galleryItems.length) newIndex = 0;
    
    const newItem = galleryItems[newIndex].dataset;
    const fullSrc = galleryItems[newIndex].querySelector('img').dataset.full;
    const title = galleryItems[newIndex].querySelector('.gallery-caption').textContent;
    const alt = galleryItems[newIndex].querySelector('img').alt;
    
    img.src = fullSrc;
    img.alt = alt;
    lightbox.querySelector('.lightbox-caption').textContent = title;
    lightbox.setAttribute('aria-label', `Image ${newIndex + 1}: ${title}`);
    index = newIndex;
  };
  
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  const handleKey = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  };
  
  document.addEventListener('keydown', handleKey);
  
  lightbox._cleanup = () => {
    document.removeEventListener('keydown', handleKey);
  };
}