# 🚀 Phase 2 Frontend Components - Quick Reference

## Overview
This document provides a quick reference for all Phase 2 components in the Rau Sạch Trần Gia price management system.

---

## 📦 Components Summary

### 1. Bulk Price Update Component
**Path**: `frontend/src/app/admin/banggia/bulk-price-update/`  
**Route**: `/admin/bulk-price-update`  
**Icon**: `upload`

**What it does**: Update multiple product prices at once via Excel import or manual entry

**Key Features**:
- Excel import/export with template
- Manual price entry
- Bulk percentage or fixed amount changes
- Preview before applying
- Real-time status tracking
- Summary statistics

**Quick Start**:
```html
<!-- Add to navigation -->
<a mat-list-item routerLink="/admin/bulk-price-update">
  <mat-icon>upload</mat-icon>
  Cập nhật giá hàng loạt
</a>
```

---

### 2. Price Alerts Component
**Path**: `frontend/src/app/admin/banggia/price-alerts/`  
**Route**: `/admin/price-alerts`  
**Icon**: `notifications_active`

**What it does**: Subscribe to price change notifications and manage alerts

**Alert Types**:
- 📈 **Increase**: Price goes up
- 📉 **Decrease**: Price goes down
- 🔔 **Any Change**: Any price modification
- ⚠️ **Threshold**: Price exceeds limit

**Notification Channels**:
- 📱 In-app notifications
- 📧 Email alerts
- 💬 SMS messages

**Quick Start**:
```html
<!-- Add to navigation -->
<a mat-list-item routerLink="/admin/price-alerts">
  <mat-icon [matBadge]="unreadCount" matBadgeColor="warn">
    notifications_active
  </mat-icon>
  Cảnh báo giá
</a>
```

---

### 3. Price Alerts Widget
**Path**: `frontend/src/app/admin/banggia/price-alerts-widget/`  
**Usage**: Dashboard component  
**Icon**: `notifications_active`

**What it does**: Shows recent price changes on the dashboard

**Quick Start**:
```html
<!-- Add to dashboard -->
<div class="dashboard-grid">
  <app-price-alerts-widget></app-price-alerts-widget>
</div>
```

**Features**:
- Shows last 5 price changes
- Unread count badge
- Click to view all alerts
- Real-time updates

---

### 4. Price Analytics Component
**Path**: `frontend/src/app/admin/banggia/price-analytics/`  
**Route**: `/admin/price-analytics`  
**Icon**: `analytics`

**What it does**: Analyze price volatility, order impacts, and revenue effects

**3 Main Sections**:

**A. Price Volatility**
- Track price fluctuations by product
- Identify most volatile products
- View change frequency

**B. Order Impact**
- See which orders were affected by price changes
- Calculate price differences
- Track items affected

**C. Revenue Impact**
- Monthly revenue analysis
- Actual vs. projected comparison
- Price change counts

**Quick Start**:
```html
<!-- Add to navigation -->
<a mat-list-item routerLink="/admin/price-analytics">
  <mat-icon>analytics</mat-icon>
  Phân tích giá
</a>
```

**Filters**:
- Date range (7/30/90 days, custom)
- Banggia selection
- Export to Excel/PDF

---

### 5. Price Comparison Component
**Path**: `frontend/src/app/admin/banggia/price-comparison/`  
**Route**: `/admin/price-comparison`  
**Icon**: `compare`

**What it does**: Compare prices across multiple banggia and predict trends

**2 Tabs**:

**Tab 1: Price Comparison**
- Side-by-side price comparison
- Min/max/average prices
- Price range analysis
- Lowest/highest highlighting

**Tab 2: Trend Predictions**
- 30/60/90-day forecasts
- Trend indicators (↗️↘️➡️)
- Confidence levels
- Price movement predictions

**Quick Start**:
```html
<!-- Add to navigation -->
<a mat-list-item routerLink="/admin/price-comparison">
  <mat-icon>compare</mat-icon>
  So sánh giá
</a>
```

---

## 🎨 Common UI Patterns

### Color Coding
```
🔴 Red/Pink    = Price increase, high volatility, negative impact
🟢 Green       = Price decrease, low volatility, positive impact
🟡 Orange      = Medium volatility, warnings
🔵 Blue        = Information, neutral
⚪ Gray        = Stable, no change
```

### Icons Reference
```
upload              = Bulk operations
notifications_active = Alerts
analytics           = Analytics
compare             = Comparison
trending_up         = Increasing trend
trending_down       = Decreasing trend
trending_flat       = Stable trend
timeline            = Historical data
lightbulb           = Insights
warning             = Alerts/Issues
```

---

## 🔧 Installation & Setup

### 1. Install Dependencies
```bash
cd frontend
npm install xlsx  # For Excel handling
```

### 2. Add Routes (app-routing.module.ts)
```typescript
const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'bulk-price-update',
        loadComponent: () => import('./admin/banggia/bulk-price-update/bulk-price-update.component')
          .then(m => m.BulkPriceUpdateComponent)
      },
      {
        path: 'price-alerts',
        loadComponent: () => import('./admin/banggia/price-alerts/price-alerts.component')
          .then(m => m.PriceAlertsComponent)
      },
      {
        path: 'price-analytics',
        loadComponent: () => import('./admin/banggia/price-analytics/price-analytics.component')
          .then(m => m.PriceAnalyticsComponent)
      },
      {
        path: 'price-comparison',
        loadComponent: () => import('./admin/banggia/price-comparison/price-comparison.component')
          .then(m => m.PriceComparisonComponent)
      }
    ]
  }
];
```

### 3. Update Navigation Menu
```html
<mat-nav-list>
  <!-- Price Management Section -->
  <h3 matSubheader>Quản Lý Giá</h3>
  
  <a mat-list-item routerLink="/admin/banggia">
    <mat-icon>list</mat-icon>
    <span>Bảng giá</span>
  </a>
  
  <a mat-list-item routerLink="/admin/bulk-price-update">
    <mat-icon>upload</mat-icon>
    <span>Cập nhật hàng loạt</span>
  </a>
  
  <a mat-list-item routerLink="/admin/price-alerts">
    <mat-icon matBadge="3" matBadgeColor="warn">notifications_active</mat-icon>
    <span>Cảnh báo giá</span>
  </a>
  
  <a mat-list-item routerLink="/admin/price-analytics">
    <mat-icon>analytics</mat-icon>
    <span>Phân tích</span>
  </a>
  
  <a mat-list-item routerLink="/admin/price-comparison">
    <mat-icon>compare</mat-icon>
    <span>So sánh giá</span>
  </a>
</mat-nav-list>
```

### 4. Add Widget to Dashboard
```html
<!-- dashboard.component.html -->
<div class="dashboard-grid">
  <!-- Stats widgets -->
  <app-stats-widget></app-stats-widget>
  
  <!-- Price alerts widget -->
  <app-price-alerts-widget></app-price-alerts-widget>
  
  <!-- Other widgets -->
</div>
```

---

## 📊 Data Flow

### Bulk Price Update
```
User uploads Excel → Parse data → Preview changes → User confirms → 
API calls (one per product) → Update status → Show results
```

### Price Alerts
```
User creates alert → Save to database → Price changes → 
Trigger alert → Send notification → Show in app/email/SMS
```

### Analytics
```
Select filters → Query database → Calculate metrics → 
Generate charts → Display insights → Export option
```

### Price Comparison
```
Select banggia & products → Fetch prices → Compare values → 
Calculate statistics → Predict trends → Display results
```

---

## 🐛 Troubleshooting

### Excel Import Not Working
**Problem**: File upload fails  
**Solution**: Check that `xlsx` package is installed and file is .xlsx/.xls format

### Notifications Not Showing
**Problem**: No alerts appearing  
**Solution**: Check that alert is enabled and notification channel is selected

### Charts Not Displaying
**Problem**: Empty charts or data  
**Solution**: Verify date range has data and banggia is selected

### API Errors
**Problem**: 500/404 errors  
**Solution**: Ensure backend APIs are running and endpoints match service URLs

---

## 🎯 Best Practices

### Performance
- Use pagination for large datasets (>100 rows)
- Implement virtual scrolling for very large tables
- Cache analytics data (5-10 minute TTL)
- Debounce search inputs (300ms)

### UX
- Show loading spinners during API calls
- Provide clear error messages
- Use optimistic UI updates where possible
- Add confirmation dialogs for destructive actions

### Security
- Validate user permissions before bulk operations
- Log all price changes with user ID
- Rate limit API calls
- Sanitize Excel input data

### Code Quality
- Use TypeScript strict mode
- Follow Angular style guide
- Write unit tests for services
- Document complex logic

---

## 📚 Related Documentation

- [FRONTEND_INTEGRATION_COMPLETE.md](./FRONTEND_INTEGRATION_COMPLETE.md) - Full documentation
- [PRICE_HISTORY_IMPLEMENTATION.md](./PRICE_HISTORY_IMPLEMENTATION.md) - Backend implementation
- [API.md](./docs/api-overview.md) - API reference

---

## ✅ Testing Checklist

Quick test to verify everything works:

- [ ] Navigate to each route successfully
- [ ] Upload Excel file in bulk update
- [ ] Create a price alert
- [ ] View analytics dashboard
- [ ] Compare prices across banggia
- [ ] Widget displays on dashboard
- [ ] All icons display correctly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] API calls successful

---

**Last Updated**: January 10, 2025  
**Version**: 2.0.0  
**Author**: AI Assistant  
**Status**: Production Ready ✅
