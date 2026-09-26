import { createReviewCards } from '../components/ReviewCard.js';
import { businessConfig } from '../config/business.js';

export function createReviewsSection() {
  const section = document.createElement('section');
  section.id = 'reviews';
  section.className = 'reviews section';
  section.setAttribute('aria-labelledby', 'reviews-title');
  
  const reviewCards = createReviewCards(businessConfig.reviews);
  
  section.innerHTML = `
    <div class="container">
      <header class="section-header fade-in">
        <h2 id="reviews-title">What Our Guests Say</h2>
      </header>
      <div class="reviews-wrapper" role="list" aria-label="Customer reviews">
        ${reviewCards.outerHTML}
      </div>
      <p class="reviews-disclaimer fade-in">* These are demo reviews for demonstration purposes. They will be replaced with genuine customer reviews.</p>
    </div>
  `;
  
  return section;
}