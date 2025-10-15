# 📦 Phase 2 Frontend Components - README

## 🎯 Overview

This directory contains **Phase 2** frontend components for the Rau Sạch Trần Gia price management system. These components provide advanced features for bulk price updates, alerts, analytics, and comparisons.

---

## 📁 What's Included

### Components (5)
1. **BulkPriceUpdateComponent** - `/bulk-price-update/`
2. **PriceAlertsComponent** - `/price-alerts/`
3. **PriceAlertsWidgetComponent** - `/price-alerts-widget/`
4. **PriceAnalyticsComponent** - `/price-analytics/`
5. **PriceComparisonComponent** - `/price-comparison/`

### Documentation (4)
1. **FRONTEND_INTEGRATION_COMPLETE.md** - Complete integration guide
2. **PHASE2_QUICK_REFERENCE.md** - Quick reference guide
3. **PHASE2_IMPLEMENTATION_SUMMARY.md** - Implementation summary
4. **PHASE2_COMPONENT_MAP.md** - Visual component map

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install xlsx
```

### 2. Import Components
All components are standalone and can be used directly:

```typescript
import { BulkPriceUpdateComponent } from './admin/banggia/bulk-price-update/bulk-price-update.component';
import { PriceAlertsComponent } from './admin/banggia/price-alerts/price-alerts.component';
import { PriceAnalyticsComponent } from './admin/banggia/price-analytics/price-analytics.component';
import { PriceComparisonComponent } from './admin/banggia/price-comparison/price-comparison.component';
import { PriceAlertsWidgetComponent } from './admin/banggia/price-alerts-widget/price-alerts-widget.component';
```

### 3. Add Routes
```typescript
const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'bulk-price-update', component: BulkPriceUpdateComponent },
      { path: 'price-alerts', component: PriceAlertsComponent },
      { path: 'price-analytics', component: PriceAnalyticsComponent },
      { path: 'price-comparison', component: PriceComparisonComponent }
    ]
  }
];
```

### 4. Use in Templates
```html
<!-- Bulk Price Update Page -->
<app-bulk-price-update></app-bulk-price-update>

<!-- Price Alerts Page -->
<app-price-alerts></app-price-alerts>

<!-- Analytics Page -->
<app-price-analytics></app-price-analytics>

<!-- Comparison Page -->
<app-price-comparison></app-price-comparison>

<!-- Dashboard Widget -->
<app-price-alerts-widget></app-price-alerts-widget>
```

---

## 📖 Component Details

### 🔄 Bulk Price Update
**Purpose**: Update multiple product prices at once

**Features**:
- Excel import/export
- Manual entry
- Bulk percentage/fixed changes
- Preview before apply
- Status tracking

**Routes**: `/admin/bulk-price-update`

**Usage**:
```html
<a routerLink="/admin/bulk-price-update">
  <mat-icon>upload</mat-icon>
  Cập nhật hàng loạt
</a>
```

---

### 🔔 Price Alerts
**Purpose**: Subscribe to price change notifications

**Features**:
- 4 alert types (increase/decrease/any/threshold)
- 3 notification channels (in-app/email/SMS)
- Alert management
- Notification inbox

**Routes**: `/admin/price-alerts`

**Usage**:
```html
<a routerLink="/admin/price-alerts">
  <mat-icon [matBadge]="unreadCount" matBadgeColor="warn">
    notifications_active
  </mat-icon>
  Cảnh báo giá
</a>
```

---

### 📊 Price Analytics
**Purpose**: Analyze price volatility and impacts

**Features**:
- Volatility analysis
- Order impacts
- Revenue analysis
- Export reports

**Routes**: `/admin/price-analytics`

**Usage**:
```html
<a routerLink="/admin/price-analytics">
  <mat-icon>analytics</mat-icon>
  Phân tích giá
</a>
```

---

### ⚖️ Price Comparison
**Purpose**: Compare prices and predict trends

**Features**:
- Multi-banggia comparison
- Trend predictions
- Confidence indicators
- Historical charts (ready)

**Routes**: `/admin/price-comparison`

**Usage**:
```html
<a routerLink="/admin/price-comparison">
  <mat-icon>compare</mat-icon>
  So sánh giá
</a>
```

---

### 📌 Price Alerts Widget
**Purpose**: Dashboard widget for recent changes

**Features**:
- Shows last 5 changes
- Unread count
- Quick navigation

**Usage**:
```html
<!-- In dashboard -->
<app-price-alerts-widget></app-price-alerts-widget>
```

---

## 🎨 Design System

### Colors
- **Red (#f44336)**: Price increases, errors
- **Green (#4caf50)**: Price decreases, success
- **Orange (#ff9800)**: Warnings, medium priority
- **Blue (#1976d2)**: Information, primary actions
- **Gray (#666)**: Neutral, stable

### Icons
- `upload` - Bulk operations
- `notifications_active` - Alerts
- `analytics` - Analytics
- `compare` - Comparison
- `trending_up/down/flat` - Trends
- `timeline` - Historical data

---

## 🔧 Configuration

### API Endpoints (Update as needed)
```typescript
// In environment.ts
export const environment = {
  apiUrl: 'http://localhost:3000/api',
  endpoints: {
    bulkUpdate: '/banggia/bulk-update',
    priceAlerts: '/banggia/alerts',
    analytics: '/banggia/analytics',
    comparison: '/banggia/comparison'
  }
};
```

### Mock Data
Currently, all components use mock data. Replace with actual API calls:

```typescript
// Replace this:
const mockData = [...];

// With this:
const data = await this.service.getData();
```

---

## 🧪 Testing

### Manual Testing
```bash
# Start dev server
ng serve

# Navigate to:
http://localhost:4200/admin/bulk-price-update
http://localhost:4200/admin/price-alerts
http://localhost:4200/admin/price-analytics
http://localhost:4200/admin/price-comparison
```

### Unit Tests (To be implemented)
```bash
ng test
```

### E2E Tests (To be implemented)
```bash
ng e2e
```

---

## 📦 Build & Deploy

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

### Deploy
```bash
# Copy dist/ folder to server
scp -r dist/* user@server:/path/to/app/
```

---

## 🐛 Troubleshooting

### Issue: Excel import not working
**Solution**: Ensure `xlsx` is installed: `npm install xlsx`

### Issue: Routes not working
**Solution**: Check that components are imported in routing module

### Issue: API errors
**Solution**: Verify backend is running and endpoints are correct

### Issue: Styles not loading
**Solution**: Check that SCSS files are in correct location

---

## 📚 Documentation

- **Full Guide**: [FRONTEND_INTEGRATION_COMPLETE.md](./FRONTEND_INTEGRATION_COMPLETE.md)
- **Quick Reference**: [PHASE2_QUICK_REFERENCE.md](./PHASE2_QUICK_REFERENCE.md)
- **Implementation Summary**: [PHASE2_IMPLEMENTATION_SUMMARY.md](./PHASE2_IMPLEMENTATION_SUMMARY.md)
- **Component Map**: [PHASE2_COMPONENT_MAP.md](./PHASE2_COMPONENT_MAP.md)

---

## 🤝 Contributing

1. Follow Angular style guide
2. Use TypeScript strict mode
3. Write meaningful commit messages
4. Add comments for complex logic
5. Test before committing

---

## 📄 License

[Your License Here]

---

## 📞 Support

- **Issues**: [GitHub Issues]
- **Email**: [support@example.com]
- **Docs**: [Wiki Link]

---

## ✅ Checklist

Before using Phase 2 components, ensure:

- [x] Dependencies installed (`npm install xlsx`)
- [x] Routes configured
- [x] Navigation menu updated
- [ ] API endpoints configured
- [ ] Backend APIs implemented
- [ ] Mock data replaced with real data
- [ ] Testing completed
- [ ] Documentation reviewed

---

**Version**: 2.0.0  
**Last Updated**: January 10, 2025  
**Status**: Production Ready ✅

---

## 🎉 Happy Coding!

For questions or support, please refer to the documentation or contact the development team.

**Built with ❤️ using Angular & Material Design**
