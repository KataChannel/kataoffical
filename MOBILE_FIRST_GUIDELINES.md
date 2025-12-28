# 📱 MOBILE-FIRST UX/UI GUIDELINES

**Dự án:** Thu Chi & Hóa Đơn Điện Tử  
**Framework:** Angular 19 + Tailwind CSS  
**Design System:** Shadcn-inspired

---

## 🎯 MOBILE-FIRST PHILOSOPHY

### Nguyên tắc thiết kế:
1. **Content First** - Nội dung quan trọng nhất
2. **Progressive Enhancement** - Tăng cường dần theo kích thước màn hình
3. **Touch-Friendly** - Tối ưu cho thao tác chạm
4. **Performance** - Tải nhanh trên mạng chậm
5. **Accessibility** - Dễ tiếp cận cho mọi người

---

## 📐 RESPONSIVE BREAKPOINTS

```css
/* Mobile First - Design cho mobile trước */
/* Base styles (Mobile) - 320px+ */
.container { padding: 1rem; }

/* sm: Small devices (Mobile landscape) - 640px+ */
@media (min-width: 640px) {
  .container { padding: 1.5rem; }
}

/* md: Tablets - 768px+ */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* lg: Desktop - 1024px+ */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}

/* xl: Large desktop - 1280px+ */
@media (min-width: 1280px) {
  .container { max-width: 1400px; }
}
```

### Tailwind Usage:
```html
<!-- Stack on mobile, row on desktop -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="w-full md:w-1/2">Column 1</div>
  <div class="w-full md:w-1/2">Column 2</div>
</div>

<!-- Hide on mobile, show on desktop -->
<div class="hidden md:block">Desktop only</div>

<!-- Show on mobile, hide on desktop -->
<div class="block md:hidden">Mobile only</div>
```

---

## 👆 TOUCH TARGETS

### Minimum Sizes (Apple HIG, Material Design):
- **Buttons:** 44x44px minimum
- **Links:** 48x48px recommended
- **Form inputs:** 44px height
- **Spacing between targets:** 8px minimum

### Implementation:
```html
<!-- Button Component -->
<ui-button size="default">
  <!-- h-10 = 40px, px-4 = padding -->
  <!-- Total touch area > 44px with padding -->
</ui-button>

<!-- Touch-friendly spacing -->
<div class="flex gap-4"> <!-- 16px gap -->
  <ui-button>Action 1</ui-button>
  <ui-button>Action 2</ui-button>
</div>
```

---

## 📊 LAYOUT PATTERNS

### 1. Card-Based Layout (Mobile)
```html
<!-- PhieuThuChi List - Mobile -->
<div class="grid grid-cols-1 gap-4 md:hidden">
  <ui-card *ngFor="let item of items">
    <ui-card-content class="p-4">
      <!-- Content -->
    </ui-card-content>
  </ui-card>
</div>
```

### 2. Table Layout (Desktop)
```html
<!-- PhieuThuChi List - Desktop -->
<ui-card class="hidden md:block">
  <table class="w-full">
    <thead><!-- Headers --></thead>
    <tbody><!-- Rows --></tbody>
  </table>
</ui-card>
```

### 3. Adaptive Forms
```html
<!-- Single column on mobile, 2 columns on desktop -->
<form class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Tên</label>
    <ui-input />
  </div>
  <div>
    <label>Email</label>
    <ui-input type="email" />
  </div>
</form>
```

### 4. Bottom Actions (Mobile)
```html
<!-- Sticky bottom actions on mobile -->
<div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:relative md:border-0">
  <ui-button [fullWidth]="true">Save</ui-button>
</div>
```

---

## 🎨 TYPOGRAPHY SCALE

### Mobile-First Typography:
```html
<!-- Headings -->
<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">
  Title
</h1>

<h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold">
  Subtitle
</h2>

<h3 class="text-lg sm:text-xl lg:text-2xl font-medium">
  Section
</h3>

<!-- Body text -->
<p class="text-sm sm:text-base lg:text-lg">
  Paragraph text
</p>

<!-- Small text -->
<span class="text-xs sm:text-sm">
  Caption or note
</span>
```

### Scale:
- **Mobile:** Smaller sizes (text-sm, text-base)
- **Desktop:** Larger sizes (text-lg, text-xl)
- **Line height:** 1.5 - 1.75 for readability

---

## 🖼️ IMAGES & MEDIA

### Responsive Images:
```html
<!-- Adaptive image sizes -->
<img 
  srcset="
    image-320w.jpg 320w,
    image-640w.jpg 640w,
    image-1024w.jpg 1024w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="image-640w.jpg"
  alt="Description"
  class="w-full h-auto"
/>

<!-- Or use CSS object-fit -->
<img 
  src="image.jpg" 
  class="w-full h-48 object-cover rounded-lg"
/>
```

---

## 📝 FORM PATTERNS

### Mobile-Optimized Forms:
```html
<form class="space-y-4">
  <!-- Full width inputs on mobile -->
  <div>
    <label class="block text-sm font-medium mb-2">
      Số tiền
    </label>
    <input 
      type="number"
      inputmode="decimal"
      class="w-full h-12 px-4 text-lg rounded-md border"
    />
  </div>

  <!-- Large tap targets for select -->
  <div>
    <label class="block text-sm font-medium mb-2">
      Loại phiếu
    </label>
    <select class="w-full h-12 px-4 rounded-md border">
      <option>Phiếu thu</option>
      <option>Phiếu chi</option>
    </select>
  </div>

  <!-- Date input with native picker -->
  <div>
    <label class="block text-sm font-medium mb-2">
      Ngày
    </label>
    <input 
      type="date"
      class="w-full h-12 px-4 rounded-md border"
    />
  </div>

  <!-- Submit button - full width on mobile -->
  <ui-button 
    type="submit" 
    size="lg"
    [fullWidth]="true"
    class="mt-6"
  >
    Lưu phiếu
  </ui-button>
</form>
```

### Input Modes:
```html
<!-- Numeric keyboard -->
<input type="number" inputmode="decimal" />

<!-- Tel keyboard -->
<input type="tel" inputmode="tel" />

<!-- Email keyboard -->
<input type="email" inputmode="email" />

<!-- URL keyboard -->
<input type="url" inputmode="url" />
```

---

## 🎭 NAVIGATION PATTERNS

### 1. Bottom Tab Bar (Mobile)
```html
<nav class="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
  <div class="flex justify-around">
    <a class="flex flex-col items-center py-2 px-3">
      <span class="text-2xl">🏠</span>
      <span class="text-xs mt-1">Home</span>
    </a>
    <a class="flex flex-col items-center py-2 px-3">
      <span class="text-2xl">💰</span>
      <span class="text-xs mt-1">Thu Chi</span>
    </a>
    <a class="flex flex-col items-center py-2 px-3">
      <span class="text-2xl">📊</span>
      <span class="text-xs mt-1">Báo Cáo</span>
    </a>
  </div>
</nav>
```

### 2. Hamburger Menu (Mobile)
```html
<header class="fixed top-0 left-0 right-0 bg-white border-b z-50">
  <div class="flex items-center justify-between p-4">
    <button class="md:hidden" (click)="toggleMenu()">
      <span class="text-2xl">☰</span>
    </button>
    <h1 class="text-lg font-bold">App Name</h1>
    <div class="w-8"></div> <!-- Spacer -->
  </div>
</header>

<!-- Drawer menu -->
<div 
  *ngIf="menuOpen"
  class="fixed inset-0 bg-black/50 z-40"
  (click)="closeMenu()"
>
  <nav class="fixed top-0 left-0 h-full w-64 bg-white">
    <!-- Menu items -->
  </nav>
</div>
```

### 3. Breadcrumbs (Desktop Only)
```html
<nav class="hidden md:flex items-center gap-2 text-sm mb-4">
  <a class="text-muted-foreground hover:text-foreground">Home</a>
  <span>/</span>
  <a class="text-muted-foreground hover:text-foreground">Phiếu Thu Chi</a>
  <span>/</span>
  <span class="font-medium">Chi tiết</span>
</nav>
```

---

## 🔔 FEEDBACK & STATES

### 1. Loading States
```html
<!-- Skeleton loader (mobile) -->
<div class="animate-pulse space-y-4">
  <div class="h-4 bg-slate-200 rounded w-3/4"></div>
  <div class="h-4 bg-slate-200 rounded w-1/2"></div>
</div>

<!-- Spinner -->
<div class="flex justify-center py-12">
  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
</div>
```

### 2. Toast Notifications
```html
<!-- Mobile: Bottom, Desktop: Top-right -->
<div class="fixed bottom-4 left-4 right-4 md:top-4 md:left-auto md:right-4 md:w-96">
  <ui-card class="border-success">
    <ui-card-content class="flex items-center gap-3 p-4">
      <span class="text-2xl">✅</span>
      <p class="flex-1">Lưu thành công!</p>
      <button>×</button>
    </ui-card-content>
  </ui-card>
</div>
```

### 3. Empty States
```html
<div class="text-center py-12">
  <span class="text-6xl mb-4 block">📭</span>
  <h3 class="text-lg font-semibold mb-2">
    Chưa có phiếu thu chi
  </h3>
  <p class="text-sm text-muted-foreground mb-6">
    Tạo phiếu thu chi đầu tiên của bạn
  </p>
  <ui-button (click)="create()">
    Tạo phiếu mới
  </ui-button>
</div>
```

---

## ⚡ PERFORMANCE TIPS

### 1. Lazy Loading
```typescript
// Routes
{
  path: 'phieuthuchi',
  loadComponent: () => import('./phieuthuchi/list-phieuthuchi.component')
}

// Images
<img loading="lazy" src="image.jpg" />
```

### 2. Virtual Scrolling (Large Lists)
```typescript
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

<cdk-virtual-scroll-viewport itemSize="80" class="h-screen-16">
  <div *cdkVirtualFor="let item of items" class="h-20">
    {{ item.name }}
  </div>
</cdk-virtual-scroll-viewport>
```

### 3. Signal-based State
```typescript
// Use signals for reactive updates (no zone.js)
const count = signal(0);
const doubled = computed(() => count() * 2);

count.set(5); // Auto-updates UI
```

---

## ♿ ACCESSIBILITY (A11Y)

### 1. Semantic HTML
```html
<!-- Use proper semantic tags -->
<header>...</header>
<nav>...</nav>
<main>
  <article>...</article>
</main>
<footer>...</footer>
```

### 2. ARIA Labels
```html
<button aria-label="Xóa phiếu">
  <span aria-hidden="true">🗑️</span>
</button>

<input 
  type="text"
  aria-label="Tìm kiếm phiếu thu chi"
  placeholder="Tìm kiếm..."
/>
```

### 3. Keyboard Navigation
```typescript
@HostListener('keydown.escape')
handleEscape() {
  this.closeDialog();
}

@HostListener('keydown.enter')
handleEnter() {
  this.submit();
}
```

### 4. Focus Management
```html
<!-- Focus trap in dialogs -->
<ui-dialog [isOpen]="true">
  <button cdkFocusInitial>First focusable</button>
  <input />
  <button>Last focusable</button>
</ui-dialog>
```

---

## 📊 COMPONENT EXAMPLES

### 1. Stats Card (Mobile-First)
```html
<ui-card>
  <ui-card-content class="p-4">
    <div class="text-sm text-muted-foreground">Tổng thu</div>
    <div class="text-2xl sm:text-3xl font-bold text-success mt-2">
      {{ formatCurrency(totalThu) }}
    </div>
    <div class="text-xs text-muted-foreground mt-1">
      +12% so với tháng trước
    </div>
  </ui-card-content>
</ui-card>
```

### 2. Action Sheet (Mobile)
```html
<!-- Bottom sheet for actions -->
<div 
  *ngIf="showActions"
  class="fixed inset-0 bg-black/50 flex items-end md:items-center md:justify-center"
>
  <div class="bg-white w-full rounded-t-2xl md:rounded-lg md:max-w-md">
    <div class="p-4 space-y-2">
      <button class="w-full text-left py-3 px-4 hover:bg-slate-100 rounded">
        Sửa
      </button>
      <button class="w-full text-left py-3 px-4 hover:bg-slate-100 rounded">
        Xóa
      </button>
      <button class="w-full text-left py-3 px-4 hover:bg-slate-100 rounded text-destructive">
        Hủy
      </button>
    </div>
  </div>
</div>
```

### 3. Search Bar (Mobile-First)
```html
<div class="relative">
  <input 
    type="search"
    placeholder="Tìm kiếm..."
    class="w-full h-12 pl-12 pr-4 rounded-full border focus:ring-2"
  />
  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
    🔍
  </span>
</div>
```

---

## 🎯 TESTING CHECKLIST

### Mobile Devices to Test:
- [ ] iPhone SE (375x667)
- [ ] iPhone 12 Pro (390x844)
- [ ] Samsung Galaxy S21 (360x800)
- [ ] iPad (768x1024)
- [ ] iPad Pro (1024x1366)

### Features to Test:
- [ ] Touch targets (min 44x44px)
- [ ] Scroll performance
- [ ] Form inputs (native keyboards)
- [ ] Navigation (thumb zone)
- [ ] Loading states
- [ ] Error messages
- [ ] Orientation (portrait/landscape)
- [ ] Dark mode (if enabled)

### Tools:
- Chrome DevTools (Device Mode)
- Firefox Responsive Design Mode
- Real devices (preferred)
- BrowserStack/Sauce Labs

---

## 📚 RESOURCES

### Design Systems:
- [Shadcn UI](https://ui.shadcn.com/)
- [Material Design](https://m3.material.io/)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)

### Guidelines:
- [Google Mobile-First](https://developers.google.com/search/mobile-sites/)
- [Web.dev Performance](https://web.dev/performance/)
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools:
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Can I Use](https://caniuse.com/)

---

**✅ Remember: Design for mobile first, enhance for desktop!**
