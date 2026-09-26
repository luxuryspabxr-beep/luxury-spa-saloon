import { getIcon } from './Icon.js';

export function createReviewCard(review, index = 0) {
  const card = document.createElement('article');
  card.className = 'review-card card fade-in';
  card.dataset.reviewId = review.id;
  
  const stars = Array.from({ length: 5 }, (_, i) => 
    `<span class="review-star" aria-hidden="true">${i < review.rating ? getIcon('starFilled') : getIcon('star')}</span>`
  ).join('');
  
  card.innerHTML = `
    <div class="review-card-header">
      <div class="review-stars" aria-label="${review.rating} out of 5 stars">
        ${stars}
      </div>
    </div>
    <blockquote class="review-card-text">"${review.text}"</blockquote>
    <footer class="review-card-footer">
      <cite class="review-card-author">— ${review.author}</cite>
      ${review.verified ? '<span class="review-verified" aria-label="Verified review">✓ Verified</span>' : ''}
    </footer>
    <div class="review-card-disclaimer" aria-hidden="true">Demo review</div>
  `;
  
  return card;
}

export function createReviewCards(reviews) {
  const container = document.createElement('div');
  container.className = 'reviews-grid';
  container.role = 'list';
  container.setAttribute('aria-label', 'Customer reviews');
  
  reviews.forEach((review, index) => {
    const card = createReviewCard(review, index);
    card.classList.add(`stagger-${(index % 4) + 1}`);
    container.appendChild(card);
  });
  
  return container;
}