# Responsive Breakpoints Reference Guide

## CSS Media Query Breakpoints

### Mobile-First Strategy
All base CSS is mobile-optimized. Media queries progressively enhance for larger screens.

---

## Breakpoint Details

### 📱 Extra Small (320px - 359px)
**Devices**: iPhone SE, very old devices
**Font Size**: 14px base (reduced from 16px)

**Hero Section**:
- Title: 1.5rem (24px)
- Description: 0.9375rem (15px)
- Location badge: 0.8125rem (13px)
- Stacked vertical layout

**Header**:
- Height: 56px
- Logo: Icon + small text
- Hamburger menu: 40x40px

**Sticky CTA**:
- Visible, 64px height
- Small font for buttons
- Minimal padding

**Service Cards**:
- 1 column
- Reduced padding (1rem)
- Smaller fonts all-around

**Gallery**:
- 2 columns
- Small gap (0.75rem)

---

### 📱 Small Phones (360px - 479px)
**Devices**: iPhone 6, 7, 8, most Android phones
**Font Size**: 16px base

**Hero Section**:
- Title: 1.75rem (28px)
- Description: 0.9375rem (15px)
- Full-width CTA buttons
- Image below text

**Header**:
- Height: 64px (standard mobile)
- Hamburger menu: 44x44px
- Compact spacing

**Sticky CTA**:
- 64px height with improved icons
- Font: 0.75rem for labels
- Proper touch targets

**Service Cards**:
- 1 column (100% width - 1rem margin)
- Padding: 1rem
- Gap: 0.875rem

**Gallery**:
- 2 columns
- Gap: 0.875rem (improved)
- First item: 1 col span (simpler layout)

**Reviews**:
- 1 column stacked
- Cards have borders
- Proper spacing

**About Section**:
- Image first (visual hierarchy)
- Info cards: 1 column
- Text below

---

### 📱 Medium Phones (480px - 639px)
**Devices**: iPhone Plus, larger Android phones
**Font Size**: 16px base

**CSS Media Query**: `@media (min-width: 480px) { ... }`

**Service Cards**:
- 2 columns (50% each, with gap)
- Gap: 1.25rem (improved spacing)
- Better padding utilization

**Gallery**:
- 2-3 column improved layout
- First item: may span 2 columns
- Gap: 0.875rem-1rem

**Reviews**:
- 2 columns possible
- Better card sizing

**Features Grid**:
- 2 columns
- Gap: 1.25rem

**Container Padding**:
- 1.25rem (increased from 1rem)

---

### 📱 Large Phones / Small Tablets (640px - 767px)
**Devices**: iPad Mini, large phablets
**Font Size**: 16px base

**CSS Media Query**: `@media (min-width: 640px) { ... }`

**Service Cards**:
- 2 columns (main layout)
- Improved spacing
- Gap: 1.5rem

**Gallery**:
- 3 columns (more content visible)
- Better grid layout
- First item: 2x2 spanning possible

**Reviews**:
- 2-3 columns
- Improved layout

**Header**:
- Still hamburger menu
- Full navigation hidden

**Sticky CTA**:
- Still visible on mobile
- Will hide at 768px

**About Section**:
- Considering 2-column but mobile-first

---

### 💻 Tablet (768px - 1023px)
**Devices**: iPad, standard tablets
**Font Size**: 16px base

**CSS Media Query**: `@media (min-width: 768px) { ... }`

**Header Changes**:
- Desktop navigation now visible
- Hamburger menu hidden
- Full header at 72px
- Logo text visible
- Full menu: Home, Services, Gallery, Reviews, About, Contact
- Book Appointment button visible

**Sticky CTA**:
- HIDDEN at this breakpoint
- Replaced by desktop header button

**Hero Section**:
- 2-column layout activated
- Text on left, image on right
- Side-by-side design
- Improved spacing: gap 3rem

**Service Cards**:
- 2 columns (maintained)
- Gap: 1.5rem
- Larger cards

**Gallery**:
- 3 columns
- Better masonry layout
- Hover effects enabled

**Reviews**:
- 2 columns
- Better spacing

**About Section**:
- 2-column layout
- Image on right
- Text on left
- Gap: 3rem

**Container Padding**:
- 2.5rem (increased)

**Section Padding**:
- Top/bottom: 6rem (increased)

---

### 💻 Large Tablet / Small Desktop (1024px - 1439px)
**Devices**: iPad Pro, small laptops
**Font Size**: 16px base

**CSS Media Query**: `@media (min-width: 1024px) { ... }`

**Service Cards**:
- 4 columns (full desktop layout)
- Gap: 1.5rem
- Proper sizing: ~280-300px each

**Gallery**:
- 6-column masonry layout
- Complex spanning rules:
  - First item: 3x3
  - Item 4: 2-column span
  - Others: single columns
- Gap: 1.25rem
- Full desktop layout

**Reviews**:
- 4 columns (all visible at once)
- Gap: 1.5rem

**Features Grid**:
- 3 columns (full layout)
- Gap: 2rem
- Hover lift effects

**About Section**:
- 2-column side-by-side
- Gap: 3rem
- Info cards: 3 columns below text

**Header**:
- Full desktop nav
- 72px height
- Logo with text
- All options visible
- Container max-width: 1280px

**Container Padding**:
- 3rem (maximum horizontal padding)
- Centered content

**Section Padding**:
- Top/bottom: 8rem (maximum)

---

### 💻 Large Desktop (1440px+)
**Devices**: Desktop monitors, large laptops
**Font Size**: 16px base

**CSS Media Query**: No additional breakpoint needed
**Max Container Width**: 1280px
**Centered**: Horizontally centered with margins

**All Components**:
- Maximum size maintained
- No stretching beyond 1280px width
- Generous padding on sides
- Professional desktop experience

**Gallery**:
- 6-column masonry
- Maximum spacing
- Largest images

**Reviews**:
- 4-column grid
- Full desktop display
- All reviews visible

**Hero Section**:
- 2-column at max width
- Premium spacing
- Large, high-res image

---

## Mobile-First Media Query Structure

```css
/* Base: Mobile (all breakpoints inherit) */
.container { padding: 0 1rem; }

/* Small phone improvements */
@media (min-width: 480px) {
  .container { padding: 0 1.25rem; }
}

/* Tablet */
@media (min-width: 768px) {
  .container { padding: 0 2.5rem; }
  /* Navigation changes, sticky CTA hidden */
}

/* Large screen */
@media (min-width: 1024px) {
  .container { padding: 0 3rem; }
  /* Multi-column layouts, max sizing */
}
```

---

## Responsive Units Used

### Typography
- `clamp(min, preferred, max)` for flexible sizing
- Example: `font-size: clamp(1.75rem, 5vw, 3.5rem);`
- Scales smoothly between breakpoints

### Spacing
- `rem` for consistent spacing (relative to root font-size)
- `em` for component-relative sizing
- Media query overrides for breakpoints

### Images
- `aspect-ratio` CSS property for consistent sizing
- `object-fit: cover` for proper scaling
- `lazy` loading attribute

---

## Common Device Widths Covered

| Device | Width | Breakpoint | Experience |
|--------|-------|-----------|------------|
| iPhone SE | 320px | Extra Small | Minimal, reduced fonts |
| iPhone 8/7/6 | 375px | Small | Full mobile experience |
| iPhone 12/13/14/15 | 390-430px | Small | Optimized mobile |
| Galaxy S21/S22 | 360px | Small | Optimized mobile |
| iPad Mini | 768px | Tablet | Desktop nav enabled |
| iPad Pro | 1024px | Large Tablet | Full desktop layout |
| Desktop | 1920px | Large Desktop | Max-width container centered |

---

## Touch Target Sizes

### Mobile (< 768px)
- Minimum: 40px (ultra-small screens)
- Recommended: 44px (standard mobile)
- Used for: buttons, menu items, interactive elements

### Desktop (768px+)
- Minimum: 40px
- Recommended: 44px+
- All buttons meet accessibility standards

---

## CSS Custom Properties (Variables)

```css
:root {
  --header-height: 72px;
  --header-height-mobile: 64px;
  --bottom-cta-height: 72px;
  --container-max: 1280px;
  
  /* Updated at small breakpoint */
  @media (max-width: 479px) {
    --header-height: 56px;
  }
}
```

---

## Mobile-First Advantages

1. **Smaller Initial CSS**: Base styles for mobile = less code
2. **Better Performance**: Mobile users get faster load
3. **Progressive Enhancement**: Larger screens get more features
4. **Easier Maintenance**: Add features rather than remove them
5. **Mobile-Centric Thinking**: Prioritizes primary audience

---

## Testing Breakpoints Checklist

- ✅ 320px - Ultra-small phones
- ✅ 360px - Small phones (most common)
- ✅ 375px - iPhone standard
- ✅ 390px - iPhone 12+
- ✅ 414px - Plus-size phones
- ✅ 480px - Phablet/large phone
- ✅ 640px - Landscape phone/small tablet
- ✅ 768px - Tablet (iPad)
- ✅ 1024px - Large tablet/small desktop
- ✅ 1440px - Desktop (most common)
- ✅ 1920px - Large desktop

---

## Future Breakpoint Considerations

Could be added for more granular control:
- 375px (common iPhone, currently covered)
- 412px (specific Android devices)
- 600px (large landscape phones)
- 800px (tablet landscape)
- 1280px (specific desktop size)

Current breakpoints provide excellent coverage for 99%+ of devices.

---

**Last Updated**: 2026-09-26
**Mobile-First**: YES
**Max Container Width**: 1280px
**Standard Mobile Height**: 64px
**Standard Desktop Header**: 72px
